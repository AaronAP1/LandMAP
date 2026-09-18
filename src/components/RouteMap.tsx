import { useEffect, useRef, useState } from 'react';
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  type ErrorEvent,
  type StyleSpecification,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { gameToLngLat, mapBounds, type TileMapInfo } from '../lib/tsmap';
import { LivePlayersLayer } from './LivePlayers';
import { POLL_MS, createMockSnapshot, fetchLivePlayers } from '../lib/live';
import mapData from '../data/map-data.json';

/** Carpeta publica donde import-tsmap.mjs deja Tiles/ y Overlays/. */
const MAP_BASE = '/map';

const INFO = mapData.info as TileMapInfo;
const CITIES = mapData.cities as Array<{ name: string; x: number; y: number }>;
const OVERLAYS = mapData.overlays as Array<{
  name: string;
  type: string;
  x: number;
  y: number;
}>;

/** Tipos de punto que se muestran, con su color. El resto se ignora. */
const OVERLAY_STYLES: Record<string, { color: string; label: string }> = {
  Fuel: { color: '#e0512f', label: 'Gasolineras' },
  Company: { color: '#4b9fd5', label: 'Empresas' },
  Garage: { color: '#8b5cf6', label: 'Garajes' },
  'Bus Stop': { color: '#22c55e', label: 'Paradas' },
  Service: { color: '#eab308', label: 'Talleres' },
  Parking: { color: '#64748b', label: 'Parkings' },
};

/** Los puntos solo aparecen a partir de este zoom: antes saturan el mapa. */
const OVERLAY_MIN_ZOOM = 4;

/**
 * Ajuste de color de las tiles. TsMap hornea un fondo gris azulado claro en los
 * PNG; esto lo oscurece en tiempo de render, sin regenerar el mapa.
 *
 * Como funciona cada valor:
 *
 *  - brightness-max: techo de brillo. Bajarlo oscurece TODO por igual, tambien
 *    las carreteras. Es el mando grueso.
 *  - contrast: separa claros de oscuros. Subirlo hunde el fondo (que es tono
 *    medio) y mantiene arriba las carreteras (que son mas claras). Es lo que
 *    permite oscurecer el fondo SIN apagar las vias.
 *  - saturation: negativo quita el tinte azulado del fondo.
 *
 * Para un fondo aun mas oscuro: baja brightness-max y sube contrast a la par.
 * Pasado cierto punto las carreteras tambien se apagan; si llegas ahi, lo
 * correcto es regenerar en TsMap.Canvas con una paleta oscura.
 */
const TILE_PAINT = {
  'raster-brightness-max': 0.42,
  'raster-saturation': -0.35,
  'raster-contrast': 0.4,
} as const;

export default function RouteMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [online, setOnline] = useState<number | null>(null);
  const [liveError, setLiveError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const bounds = mapBounds(INFO);

    const map = new MapLibreMap({
      container: containerRef.current,
      // Estilo definido en linea: no dependemos de ningun servidor de estilos.
      // Las unicas peticiones que salen son a nuestras propias tiles.
      style: {
        version: 8,
        sources: {
          andes: {
            type: 'raster',
            tiles: [`${window.location.origin}${MAP_BASE}/Tiles/{z}/{x}/{y}.png`],
            tileSize: 256,
            minzoom: INFO.minZoom,
            maxzoom: INFO.maxZoom,
            attribution: 'AndesMP',
          },
        },
        layers: [
          { id: 'fondo', type: 'background', paint: { 'background-color': '#0a0a0a' } },
          { id: 'mapa', type: 'raster', source: 'andes', paint: { ...TILE_PAINT } },
        ],
      } satisfies StyleSpecification,
      bounds,
      fitBoundsOptions: { padding: 24 },
      minZoom: INFO.minZoom,
      // Se permite pasar del zoom maximo de las tiles: MapLibre escala la ultima
      // disponible y asi se puede acercar mas de lo que el mapa tiene resuelto.
      maxZoom: INFO.maxZoom + 2,
      // Nada de maxBounds: el mapa ocupa el mundo Mercator entero, y un
      // maxBounds de 180 grados de ancho revienta MapLibre al calcular el
      // encuadre ("Cannot read properties of null"). Basta con desactivar las
      // copias del mundo para que no se pueda arrastrar a un mapa repetido.
      renderWorldCopies: false,
      attributionControl: false,
      // El mapa es plano: rotarlo o inclinarlo no aporta nada y desorienta.
      dragRotate: false,
      pitchWithRotate: false,
      touchZoomRotate: false,
    });

    mapRef.current = map;

    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    // Sin ScaleControl: las lat/lng son ficticias, asi que la escala en km que
    // calcularia MapLibre no significa nada (marcaba "5000 km").
    map.touchZoomRotate.enable({ around: 'center' });

    // Las ciudades van FUERA de map.on('load'): un Marker es un div absoluto,
    // no necesita que el estilo este cargado. Dentro del evento se perdian
    // cuando StrictMode monta el efecto dos veces y el 'load' del primer mapa
    // llegaba despues de haberlo destruido.
    //
    // Se usan marcadores HTML y no una capa 'symbol' porque las capas de texto
    // de MapLibre exigen un servidor de glyphs (fuentes PBF) declarado en el
    // estilo, y aqui no queremos depender de un servicio externo. Ademas asi
    // heredan la tipografia del sitio.
    for (const city of CITIES) {
      const el = document.createElement('div');
      el.className = 'map-city';
      el.innerHTML =
        '<span class="map-city-dot"></span>' +
        `<span class="map-city-name">${city.name}</span>`;

      new Marker({ element: el, anchor: 'top' })
        .setLngLat(gameToLngLat(INFO, city.x, city.y))
        .addTo(map);
    }

    map.on('error', (event: ErrorEvent) => {
      // Las tiles que faltan en los bordes del arbol son normales: el mapa no
      // es perfectamente cuadrado y hay esquinas sin generar.
      const status = (event.error as { status?: number } | undefined)?.status;
      if (status === 404) return;
      setError(event.error?.message ?? 'Error al cargar el mapa');
    });

    map.on('load', () => {
      // --- Puntos de interes -------------------------------------------------
      const visible = OVERLAYS.filter((item) => OVERLAY_STYLES[item.type]);

      map.addSource('puntos', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: visible.map((item) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: gameToLngLat(INFO, item.x, item.y) },
            properties: { type: item.type, color: OVERLAY_STYLES[item.type].color },
          })),
        },
      });

      map.addLayer({
        id: 'puntos',
        type: 'circle',
        source: 'puntos',
        minzoom: OVERLAY_MIN_ZOOM,
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 2.5, 8, 5],
          'circle-stroke-width': 1,
          'circle-stroke-color': 'rgba(0,0,0,0.6)',
          'circle-opacity': 0.9,
        },
      });

    });

    // --- Jugadores en vivo ---------------------------------------------------
    const players = new LivePlayersLayer(map, INFO);

    // ?mock=8 en la URL genera jugadores falsos que recorren el mapa, para
    // poder trabajar la capa sin nadie conectado.
    const mockCount = Number(
      new URLSearchParams(window.location.search).get('mock') ?? 0,
    );

    let timer = 0;
    let aborter: AbortController | null = null;

    const poll = async () => {
      if (mockCount > 0) {
        const snapshot = createMockSnapshot(mockCount, {
          x1: INFO.x1,
          z1: INFO.y1,
          x2: INFO.x2,
          z2: INFO.y2,
        });
        players.update(snapshot.players);
        setOnline(snapshot.players.length);
        setLiveError(false);
        return;
      }

      // Con la pestana en segundo plano no tiene sentido gastar peticiones.
      if (document.hidden) return;

      aborter?.abort();
      aborter = new AbortController();

      try {
        const snapshot = await fetchLivePlayers(aborter.signal);
        players.update(snapshot.players);
        setOnline(snapshot.players.length);
        setLiveError(false);

        if (snapshot.dropped > 0) {
          console.warn(
            `[live] ${snapshot.dropped} jugadores descartados: faltan x/z o id. ` +
              'Revisa que el backend mande "z" y no "y".',
          );
        }
      } catch (cause) {
        if ((cause as Error)?.name === 'AbortError') return;
        setLiveError(true);
      }
    };

    void poll();
    timer = window.setInterval(poll, POLL_MS);

    // Al volver a la pestana, refrescar ya en vez de esperar al siguiente tick.
    const onVisible = () => {
      if (!document.hidden) void poll();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      aborter?.abort();
      players.destroy();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full bg-[#0f0f0f]" />

      {/* Contador de conectados */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 border border-white/10 bg-black/80 px-3 py-2 backdrop-blur-sm">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            liveError
              ? 'bg-white/25'
              : online && online > 0
                ? 'animate-pulse bg-[#22c55e]'
                : 'bg-white/25'
          }`}
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
          {liveError
            ? 'Sin conexion'
            : online === null
              ? 'Conectando'
              : `${online} en linea`}
        </span>
      </div>

      {/* Leyenda */}
      <div className="pointer-events-none absolute bottom-3 right-3 z-10 hidden border border-white/10 bg-black/80 p-3 backdrop-blur-sm sm:block">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          Desde zoom {OVERLAY_MIN_ZOOM}
        </p>
        <ul className="space-y-1">
          {Object.entries(OVERLAY_STYLES).map(([type, style]) => (
            <li key={type} className="flex items-center gap-2 text-[11px] text-white/60">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: style.color }}
              />
              {style.label}
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <div className="absolute inset-x-3 top-3 z-10 border border-[#e0512f]/40 bg-black/90 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e0512f]">
            Error
          </p>
          <p className="mt-1 text-xs text-white/60">{error}</p>
        </div>
      )}
    </div>
  );
}
