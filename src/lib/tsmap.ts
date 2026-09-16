/**
 * Puente entre las coordenadas del mundo de ETS2 y MapLibre.
 *
 * TsMap.Canvas genera un arbol de tiles cuadrado: en el zoom 0 una sola tile de
 * 256 px cubre todo el mapa, y cada nivel lo subdivide en cuatro. Esa es
 * exactamente la estructura del esquema "slippy" XYZ que usan MapLibre, Mapbox
 * y Google, asi que las tiles se pueden servir tal cual como fuente raster.
 *
 * El detalle es que MapLibre solo entiende Web Mercator. No es un problema:
 * el mundo Mercator proyectado es un CUADRADO y las tiles se pegan a el 1:1,
 * asi que el mapa se ve sin deformar. Lo unico que hay que hacer es traducir
 * las coordenadas del juego a lat/lng falsas que caigan donde toca.
 *
 * Esa lat/lng no significa nada geografico: es solo la direccion que MapLibre
 * entiende para colocar un marcador sobre la tile correcta.
 */

export type TileMapInfo = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  minZoom: number;
  maxZoom: number;
};

/** [lng, lat], el orden que usa MapLibre. */
export type LngLat = [number, number];

/**
 * Coordenada del juego -> lat/lng.
 *
 * Primero normaliza dentro del bounding box para obtener la posicion en el
 * cuadrado [0,1] del esquema de tiles, donde (0,0) es la esquina superior
 * izquierda. Luego aplica la inversa de la proyeccion Mercator esferica.
 *
 * Ojo: TsMap NO invierte el eje vertical. Su Y crece hacia abajo, igual que la
 * fila de tiles, asi que ny se usa directamente.
 */
export function gameToLngLat(info: TileMapInfo, x: number, y: number): LngLat {
  // El mapa es cuadrado; se usa el lado mayor para no deformar si no lo fuera.
  const size = Math.max(info.x2 - info.x1, info.y2 - info.y1);

  const nx = (x - info.x1) / size;
  const ny = (y - info.y1) / size;

  const lng = nx * 360 - 180;
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - 2 * ny))) * 180) / Math.PI;

  return [lng, lat];
}

/** Esquinas [suroeste, noreste] del mapa, para encuadrar y limitar el paneo. */
export function mapBounds(info: TileMapInfo): [LngLat, LngLat] {
  // y2 (abajo en el juego) es el sur, y1 (arriba) es el norte.
  return [
    gameToLngLat(info, info.x1, info.y2),
    gameToLngLat(info, info.x2, info.y1),
  ];
}
