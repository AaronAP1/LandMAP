/**
 * Jugadores conectados, para el mapa de /rutas.
 *
 * El HUB hace ping cada 3 s a /v1/live/ping y el backend guarda el estado en
 * Redis con TTL de 30 s. Aqui solo leemos el snapshot: si alguien desaparece
 * de la respuesta es que expiro su clave, no hay que llevar cuentas propias.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? 'https://api.andesmp.site';

/** Cada cuanto se pide el snapshot. Igual que la cadencia de ping del HUB. */
export const POLL_MS = 3000;

export type LivePlayer = {
  id: string;
  steamId?: string;
  name: string;
  vtc: string | null;
  /** Coordenada X del mundo del juego. */
  x: number;
  /** Coordenada Z del juego (el plano horizontal, NO la altitud). */
  z: number;
  /** Grados 0-360, 0 = norte. */
  heading: number;
  /** km/h. */
  speed: number;
};

export type LiveSnapshot = {
  serverTime: number;
  players: LivePlayer[];
  /** Entradas descartadas por no cumplir el contrato. */
  dropped: number;
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

/**
 * Valida una entrada contra el contrato.
 *
 * Se es estricto a proposito con `z`: si el backend empezara a mandar `y` (la
 * altitud del SDK) los jugadores apareceran amontonados en una franja en vez
 * de repartidos por el mapa, y es un fallo dificil de diagnosticar mirando el
 * mapa. Mejor descartar y contarlo que pintar basura.
 */
function parsePlayer(raw: unknown): LivePlayer | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const p = raw as Record<string, unknown>;

  if (typeof p.id !== 'string' || !p.id) return null;
  if (!isFiniteNumber(p.x) || !isFiniteNumber(p.z)) return null;

  return {
    id: p.id,
    steamId: typeof p.steamId === 'string' ? p.steamId : undefined,
    name: typeof p.name === 'string' && p.name ? p.name : 'Conductor',
    vtc: typeof p.vtc === 'string' && p.vtc ? p.vtc : null,
    x: p.x,
    z: p.z,
    heading: isFiniteNumber(p.heading) ? ((p.heading % 360) + 360) % 360 : 0,
    speed: isFiniteNumber(p.speed) ? Math.round(p.speed) : 0,
  };
}

export async function fetchLivePlayers(signal?: AbortSignal): Promise<LiveSnapshot> {
  const response = await fetch(`${API_BASE}/v1/live/players`, {
    signal,
    // El endpoint es publico; no mandamos credenciales.
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`/v1/live/players devolvio ${response.status}`);
  }

  const body: unknown = await response.json();
  const raw = (body as { players?: unknown })?.players;
  const list = Array.isArray(raw) ? raw : [];

  const players: LivePlayer[] = [];
  for (const entry of list) {
    const parsed = parsePlayer(entry);
    if (parsed) players.push(parsed);
  }

  return {
    serverTime:
      isFiniteNumber((body as { serverTime?: unknown })?.serverTime)
        ? ((body as { serverTime: number }).serverTime)
        : Date.now(),
    players,
    dropped: list.length - players.length,
  };
}

/**
 * Jugadores falsos que recorren el mapa, para poder trabajar la capa sin
 * nadie conectado. Se activa con ?mock=8 en la URL de /rutas.
 */
export function createMockSnapshot(count: number, bounds: {
  x1: number;
  z1: number;
  x2: number;
  z2: number;
}): LiveSnapshot {
  const now = Date.now();
  const players: LivePlayer[] = [];

  for (let i = 0; i < count; i++) {
    // Cada uno describe un circulo a distinta velocidad y radio.
    const phase = (now / 1000) * (0.05 + i * 0.01) + i;
    const cx = bounds.x1 + ((bounds.x2 - bounds.x1) * (0.25 + (i % 3) * 0.25));
    const cz = bounds.z1 + ((bounds.z2 - bounds.z1) * (0.25 + (i % 4) * 0.2));
    const radius = (bounds.x2 - bounds.x1) * 0.06;

    players.push({
      id: `mock-${i}`,
      name: `Conductor ${i + 1}`,
      vtc: i % 3 === 0 ? 'Cruz del Sur' : i % 3 === 1 ? 'Turismo Judith' : null,
      x: cx + Math.cos(phase) * radius,
      z: cz + Math.sin(phase) * radius,
      // Tangente a la circunferencia, convertida a rumbo 0=norte.
      heading: (((-phase * 180) / Math.PI + 90) % 360 + 360) % 360,
      speed: 60 + ((i * 7) % 40),
    });
  }

  return { serverTime: now, players, dropped: 0 };
}
