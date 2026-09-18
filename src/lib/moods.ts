/**
 * Iconos de conductor al estilo de los "moods" de Waze: un personaje con
 * ruedas, no una flecha.
 *
 * A diferencia de una flecha, el personaje NO rota: va siempre derecho, que es
 * como se ven en Waze. El rumbo se sigue recibiendo del backend y se muestra
 * como punto cardinal en el tooltip.
 *
 * Cada conductor recibe siempre el mismo mood, derivado de su id, para que no
 * cambie de cara en cada actualizacion ni entre sesiones.
 */

type Mood = {
  name: string;
  /** Color del cuerpo. */
  color: string;
  /** Ojos y boca, dibujados sobre el cuerpo. */
  face: string;
};

const EYE = '#16181d';

/** Ojo abierto. */
const eye = (cx: number) =>
  `<ellipse cx="${cx}" cy="17" rx="2.7" ry="3.4" fill="${EYE}"/>`;

/** Ojo cerrado/feliz, un arco hacia arriba. */
const happyEye = (cx: number) =>
  `<path d="M${cx - 3.6} 18.2 q3.6 -4.6 7.2 0" fill="none" stroke="${EYE}" stroke-width="2.4" stroke-linecap="round"/>`;

/** Ojo guiñado, un arco hacia abajo. */
const winkEye = (cx: number) =>
  `<path d="M${cx - 3.6} 16.4 q3.6 4.4 7.2 0" fill="none" stroke="${EYE}" stroke-width="2.4" stroke-linecap="round"/>`;

const smile =
  `<path d="M16 24.5 q8 7.5 16 0" fill="none" stroke="${EYE}" stroke-width="2.4" stroke-linecap="round"/>`;

const openMouth =
  `<path d="M15.5 23.5 a8.5 8.5 0 0 0 17 0 z" fill="${EYE}"/>` +
  `<path d="M20 30.5 a5 5 0 0 0 8 0 z" fill="#f0603c"/>`;

const tongue =
  `<path d="M16.5 24 q7.5 6.5 15 0" fill="none" stroke="${EYE}" stroke-width="2.4" stroke-linecap="round"/>` +
  `<path d="M24 27.5 a3.4 3.4 0 0 0 6 0 z" fill="#f0603c"/>`;

export const MOODS: Mood[] = [
  {
    name: 'Feliz',
    color: '#ffd21e',
    face: happyEye(15) + happyEye(29) + openMouth,
  },
  {
    name: 'Guino',
    color: '#3cd48f',
    face: eye(15) + winkEye(29) + smile,
  },
  {
    name: 'Tranquilo',
    color: '#4aa8e8',
    face: eye(15) + eye(29) + smile,
  },
  {
    name: 'Lengua',
    color: '#ffa92b',
    face: winkEye(15) + eye(29) + tongue,
  },
  {
    name: 'Sorpresa',
    color: '#a78bfa',
    face:
      eye(15) +
      eye(29) +
      `<ellipse cx="24" cy="27" rx="3.4" ry="4" fill="${EYE}"/>`,
  },
  {
    name: 'Contento',
    color: '#f472b6',
    face: happyEye(15) + happyEye(29) + smile,
  },
];

/**
 * Hash estable del id -> indice de mood. Con el mismo id siempre sale la misma
 * cara, aunque el jugador se reconecte.
 */
export function moodFor(id: string): Mood {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return MOODS[Math.abs(hash) % MOODS.length];
}

/** SVG completo del personaje: ruedas, cuerpo y cara. */
export function moodSvg(id: string): string {
  const mood = moodFor(id);
  return (
    '<svg viewBox="0 0 48 46" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    // Ruedas primero: quedan detras del cuerpo y solo asoman por abajo.
    '<circle cx="14" cy="37" r="7" fill="#16181d"/>' +
    '<circle cx="34" cy="37" r="7" fill="#16181d"/>' +
    '<circle cx="14" cy="37" r="2.6" fill="#6b7080"/>' +
    '<circle cx="34" cy="37" r="2.6" fill="#6b7080"/>' +
    `<rect x="3" y="2" width="42" height="34" rx="13" fill="${mood.color}"/>` +
    mood.face +
    '</svg>'
  );
}

/** Rumbo en grados -> punto cardinal, para el tooltip. */
export function cardinal(heading: number): string {
  const points = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  return points[Math.round(((heading % 360) + 360) % 360 / 45) % 8];
}
