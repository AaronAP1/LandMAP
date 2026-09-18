/**
 * Iconos de conductor para el mapa: los "moods" de Waze que hay en
 * src/img/waze_raster_icons/.
 *
 * Se cargan con import.meta.glob en vez de una lista escrita a mano, asi que
 * anadir o quitar un PNG de esa carpeta basta para cambiar el reparto: no hay
 * que tocar este archivo. Vite les pone hash y los sirve desde /assets, y el
 * navegador solo descarga los que de verdad aparecen en el mapa.
 *
 * Los iconos NO rotan: son personajes, y girados 180 grados se leerian al
 * reves. El rumbo se muestra como punto cardinal en el tooltip.
 */

const modules = import.meta.glob('../img/waze_raster_icons/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/**
 * Ordenado por ruta para que el reparto sea el mismo en cada build. Si el
 * orden dependiera del glob, un jugador podria cambiar de icono al desplegar.
 */
export const MOOD_ICONS: string[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path]);

/**
 * Icono de un conductor.
 *
 * Se elige con un hash del id y no con Math.random: visualmente el reparto se
 * ve igual de variado, pero cada jugador conserva su icono. Con azar puro
 * cambiaria de cara cada vez que se recrea el marcador —por ejemplo si pierde
 * un ping y expira su TTL un momento— y se veria como un parpadeo.
 */
export function moodIcon(id: string): string {
  if (MOOD_ICONS.length === 0) return '';

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return MOOD_ICONS[Math.abs(hash) % MOOD_ICONS.length];
}

/** Rumbo en grados -> punto cardinal, para el tooltip. */
export function cardinal(heading: number): string {
  const points = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return points[Math.round((((heading % 360) + 360) % 360) / 45) % 8];
}
