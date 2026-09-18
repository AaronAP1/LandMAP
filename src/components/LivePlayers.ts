import { Marker, type Map as MapLibreMap } from 'maplibre-gl';
import { gameToLngLat, type TileMapInfo } from '../lib/tsmap';
import { POLL_MS, type LivePlayer } from '../lib/live';
import { cardinal, moodSvg } from '../lib/moods';

/**
 * Capa de jugadores en vivo sobre el mapa.
 *
 * El HUB reporta cada 3 s, asi que sin interpolar los iconos darian saltos de
 * ~2 km a velocidad de carretera. Aqui se guarda la posicion anterior y la
 * nueva de cada jugador y se anima entre ambas con requestAnimationFrame, de
 * forma que el movimiento se ve continuo aunque los datos lleguen a 0,33 Hz.
 *
 * Va aparte de RouteMap.tsx porque es logica imperativa sobre el mapa, no
 * React: meterla en el componente obligaria a un efecto por jugador.
 */

type Vec = { x: number; z: number };

type Tracked = {
  marker: Marker;
  label: HTMLElement;
  from: Vec;
  to: Vec;
  /** Momento en que empezo la transicion entre `from` y `to`. */
  startedAt: number;
};

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

function createElement(player: LivePlayer) {
  const root = document.createElement('div');
  root.className = 'map-player';

  // El personaje no rota: los moods de Waze van siempre derechos. El rumbo
  // se comunica en el tooltip como punto cardinal.
  const mood = document.createElement('div');
  mood.className = 'map-player-mood';
  mood.innerHTML = moodSvg(player.id);

  const label = document.createElement('div');
  label.className = 'map-player-label';

  root.append(mood, label);

  return { root, label };
}

export class LivePlayersLayer {
  private readonly map: MapLibreMap;
  private readonly info: TileMapInfo;
  private readonly tracked = new Map<string, Tracked>();
  private frame = 0;
  private disposed = false;

  constructor(map: MapLibreMap, info: TileMapInfo) {
    this.map = map;
    this.info = info;
    this.frame = requestAnimationFrame(this.tick);
  }

  /** Aplica un snapshot nuevo: crea, actualiza y retira marcadores. */
  update(players: LivePlayer[]) {
    if (this.disposed) return;
    const now = performance.now();
    const seen = new Set<string>();

    for (const player of players) {
      seen.add(player.id);
      const target: Vec = { x: player.x, z: player.z };
      const existing = this.tracked.get(player.id);

      if (existing) {
        // Arrancar la nueva transicion desde donde esta pintado ahora mismo,
        // no desde el ultimo dato: si el snapshot llega tarde, saltaria.
        existing.from = this.currentVec(existing, now);
        existing.to = target;
        existing.startedAt = now;
        this.setLabel(existing, player);
        continue;
      }

      const { root, label } = createElement(player);
      const marker = new Marker({ element: root, anchor: 'center' })
        .setLngLat(gameToLngLat(this.info, target.x, target.z))
        .addTo(this.map);

      const entry: Tracked = {
        marker,
        label,
        from: target,
        to: target,
        startedAt: now,
      };
      this.setLabel(entry, player);
      this.tracked.set(player.id, entry);
    }

    // Quien no viene en el snapshot es que expiro su TTL en Redis.
    for (const [id, entry] of this.tracked) {
      if (seen.has(id)) continue;
      entry.marker.remove();
      this.tracked.delete(id);
    }
  }

  private setLabel(entry: Tracked, player: LivePlayer) {
    const speed = `${player.speed} km/h`;
    entry.label.innerHTML =
      `<span class="map-player-name">${escapeHtml(player.name)}</span>` +
      `<span class="map-player-speed">${speed}</span>`;
    const parts = [player.name];
    if (player.vtc) parts.push(player.vtc);
    parts.push(speed, cardinal(player.heading));
    entry.marker.getElement().title = parts.join(' — ');
  }

  private currentVec(entry: Tracked, now: number): Vec {
    const t = Math.min((now - entry.startedAt) / POLL_MS, 1);
    return {
      x: lerp(entry.from.x, entry.to.x, t),
      z: lerp(entry.from.z, entry.to.z, t),
    };
  }

  private readonly tick = () => {
    if (this.disposed) return;
    const now = performance.now();

    for (const entry of this.tracked.values()) {
      const vec = this.currentVec(entry, now);
      entry.marker.setLngLat(gameToLngLat(this.info, vec.x, vec.z));
    }

    this.frame = requestAnimationFrame(this.tick);
  };

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    for (const entry of this.tracked.values()) entry.marker.remove();
    this.tracked.clear();
  }
}

/** Los nombres los eligen los jugadores: nunca van al DOM sin escapar. */
function escapeHtml(value: string): string {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}
