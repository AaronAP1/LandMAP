import type { PostHog } from 'posthog-js';

/**
 * Capa fina sobre PostHog.
 *
 * Dos decisiones importantes:
 *
 * 1. PostHog se carga con import() dinamico. Pesa ~86 KB gzip y no hace falta
 *    para pintar la pagina: en el bundle principal empujaba el chunk de 496 KB
 *    a 754 KB. Asi sale en su propio chunk y se descarga despues del render.
 *
 * 2. Sin VITE_POSTHOG_KEY (por ejemplo en desarrollo) todo esto no hace nada,
 *    para no ensuciar las metricas con trafico propio.
 */

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com';

let client: PostHog | null = null;

/** Eventos disparados antes de que el cliente termine de cargar. */
const pending: Array<[string, Record<string, unknown> | undefined]> = [];

export async function initAnalytics() {
  if (!KEY || client) return;

  const { default: posthog } = await import('posthog-js');

  posthog.init(KEY, {
    api_host: HOST,
    // Los pageviews los mandamos a mano desde el router: al ser una SPA, el
    // automatico solo contaria la primera carga.
    capture_pageview: false,
    capture_pageleave: true,
    // Registra clics, envios de formulario y cambios de input sin instrumentar
    // nada. Es lo que permite ver "que partes se usan" sin escribir eventos.
    autocapture: true,
  });

  client = posthog;

  for (const [event, properties] of pending) {
    posthog.capture(event, properties);
  }
  pending.length = 0;
}

/** Evento personalizado. Sin clave configurada, no hace nada. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (!KEY) return;
  if (!client) {
    pending.push([event, properties]);
    return;
  }
  client.capture(event, properties);
}

/** Pageview manual, para el cambio de ruta de react-router. */
export function trackPageview(path: string) {
  track('$pageview', { $current_url: window.location.href, path });
}

/**
 * Deduce el evento a partir del destino y lo etiqueta con la ruta actual.
 * Evita tener que pasar el nombre de la seccion por props en cada boton.
 */
export function trackOutbound(href: string) {
  const location = window.location.pathname;
  if (href.includes('discord.gg')) {
    track(EVENTS.discordClick, { location });
  } else if (href.includes('chat.whatsapp.com')) {
    track(EVENTS.whatsappClick, { location });
  } else if (href.includes('HubANDES')) {
    track(EVENTS.hubDownload, { location });
  }
}

/**
 * Nombres de evento centralizados: evita que el mismo evento se escriba de dos
 * formas distintas y acabe partido en dos series dentro de PostHog.
 */
export const EVENTS = {
  hubDownload: 'hub_download',
  discordClick: 'discord_click',
  whatsappClick: 'whatsapp_click',
  busTabClick: 'bus_tab_click',
  faqOpen: 'faq_open',
  roomIdCopy: 'room_id_copy',
} as const;
