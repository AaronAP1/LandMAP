/**
 * Importa un export de TsMap.Canvas al proyecto.
 *
 *   node scripts/import-tsmap.mjs "C:/Users/xdxdxdxd/ts-map-export/AndesMaps"
 *
 * Hace dos cosas:
 *
 *  1. Copia Tiles/ y Overlays/ a public/map/  (las tiles pesan ~90 MB y estan
 *     en .gitignore: se regeneran desde el mod, no se versionan).
 *  2. Convierte TileMapInfo.json + Cities.json + Overlays.json en un unico
 *     src/data/map-data.json, filtrado al pais del mapa y con solo los campos
 *     que usa la web.
 *
 * Ejecutalo cada vez que regeneres el mapa con TsMap.
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  copyFileSync,
  rmSync,
} from 'node:fs';
import { join } from 'node:path';

/**
 * Copia recursiva con conteo.
 *
 * No usamos fs.cpSync: en algunos entornos (sandboxes, unidades sincronizadas
 * tipo OneDrive) vuelve sin lanzar error y sin haber copiado nada, lo que deja
 * un mapa vacio sin ningun aviso. Copiando fichero a fichero podemos contar lo
 * copiado y fallar si no cuadra.
 */
function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  let files = 0;
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    const dst = join(to, entry.name);
    if (entry.isDirectory()) {
      files += copyTree(src, dst);
    } else {
      copyFileSync(src, dst);
      files += 1;
    }
  }
  return files;
}

const SOURCE = process.argv[2];
const COUNTRY = process.argv[3] ?? 'peru';

if (!SOURCE) {
  console.error('Uso: node scripts/import-tsmap.mjs "<carpeta del export>" [pais]');
  process.exit(1);
}

const required = ['TileMapInfo.json', 'Cities.json', 'Tiles'];
for (const name of required) {
  if (!existsSync(join(SOURCE, name))) {
    console.error(`Falta ${name} en ${SOURCE}`);
    console.error('Apunta a la carpeta que genero TsMap.Canvas.');
    process.exit(1);
  }
}

const readJson = (name) => JSON.parse(readFileSync(join(SOURCE, name), 'utf8'));

const info = readJson('TileMapInfo.json');
const cities = readJson('Cities.json');
const overlays = existsSync(join(SOURCE, 'Overlays.json'))
  ? readJson('Overlays.json')
  : [];

// --- 1. Assets estaticos -----------------------------------------------------

const PUBLIC_MAP = 'public/map';
mkdirSync(PUBLIC_MAP, { recursive: true });

// rmSync antes de copiar: si el mapa encogio, quedarian tiles huerfanas de la
// generacion anterior y el visor mostraria trozos del mapa viejo.
rmSync(join(PUBLIC_MAP, 'Tiles'), { recursive: true, force: true });
const tileCount = copyTree(join(SOURCE, 'Tiles'), join(PUBLIC_MAP, 'Tiles'));

if (tileCount === 0) {
  console.error('No se copio ninguna tile. Revisa permisos sobre public/map.');
  process.exit(1);
}

let iconCount = 0;
if (existsSync(join(SOURCE, 'Overlays'))) {
  rmSync(join(PUBLIC_MAP, 'Overlays'), { recursive: true, force: true });
  iconCount = copyTree(join(SOURCE, 'Overlays'), join(PUBLIC_MAP, 'Overlays'));
}

// --- 2. Datos ---------------------------------------------------------------

const inCountry = (item) => !item.Country || item.Country === COUNTRY;

const data = {
  info: {
    x1: info.x1,
    y1: info.y1,
    x2: info.x2,
    y2: info.y2,
    minZoom: info.minZoom,
    maxZoom: info.maxZoom,
  },
  cities: cities
    .filter(inCountry)
    .map((city) => ({
      name: city.Name,
      x: city.X,
      y: city.Y,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es')),
  overlays: overlays
    .filter((overlay) => !overlay.IsSecret)
    .map((overlay) => ({
      name: overlay.Name,
      type: overlay.Type,
      x: overlay.X,
      y: overlay.Y,
    })),
};

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/map-data.json', JSON.stringify(data, null, 2) + '\n');

// --- Resumen ----------------------------------------------------------------

const types = {};
for (const overlay of data.overlays) {
  types[overlay.type] = (types[overlay.type] ?? 0) + 1;
}

console.log(
  `${tileCount} tiles y ${iconCount} iconos copiados a ${PUBLIC_MAP}/ (zoom ${info.minZoom}-${info.maxZoom})`,
);
console.log(`${data.cities.length} ciudades y ${data.overlays.length} puntos escritos en src/data/map-data.json`);
console.log('Tipos de punto:', Object.entries(types).map(([k, v]) => `${k} ${v}`).join(', '));

if (cities.length !== data.cities.length) {
  console.log(`(${cities.length - data.cities.length} ciudades de otros paises descartadas)`);
}
