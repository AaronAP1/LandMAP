/**
 * Enlaces externos y datos del servidor usados en toda la app.
 * Centralizados para que no se dupliquen ni se desincronicen entre paginas.
 */

export const DISCORD_URL = 'https://discord.gg/eYeqrj3PAx';
export const WHATSAPP_URL = 'https://chat.whatsapp.com/KwPuFTPy77j5sZOA8wVAb6';
/**
 * Instalador del HUB. Todas las descargas apuntan siempre a "latest": al subir
 * una version nueva se reemplaza ese archivo en S3 y la web no se toca.
 */
export const HUB_FILENAME = 'HubANDES_Setup_latest.exe';
export const HUB_DOWNLOAD_URL =
  `https://andesmap.s3.us-east-2.amazonaws.com/Ejecutable/${HUB_FILENAME}`;

export const ROOM_ID = '85568392936601477';

export const ROUTES = {
  home: '/',
  servidor: '/servidor',
  rutas: '/rutas',
  recursos: '/recursos',
  guias: '/recursos?tab=guias',
  mods: '/recursos?tab=mods',
  faq: '/recursos?tab=faq',
  comunidad: '/comunidad',
  reglas: '/reglas',
  eventos: '/eventos',
  contacto: '/contacto',
} as const;
