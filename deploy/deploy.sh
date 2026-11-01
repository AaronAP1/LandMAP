#!/usr/bin/env bash
# Despliegue de la landing en el VPS. Ejecutar EN EL VPS, dentro del repo clonado.
#
#   cd /srv/LandMAP && ./deploy/deploy.sh
#
# Hace: traer cambios -> instalar deps -> build -> publicar en /var/www/andesmp/dist
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="/var/www/andesmp/dist"

cd "$REPO_DIR"

echo "==> Trayendo ultimos cambios"
# dist/ ya no se versiona, pero al compilarse aqui puede tener restos de
# cuando si lo estaba y bloquear el merge. Se descarta: se regenera abajo.
git checkout -- dist 2>/dev/null || true
git pull --ff-only

# Las tiles del mapa NO estan en git: pesan 92 MB en 21.845 archivos y se
# regeneran desde el mod con TsMap. Llegan al VPS aparte (map.tgz) y se
# extraen en public/map/Tiles/, desde donde Vite las copia al dist.
#
# Este guardia existe porque el fallo es silencioso: sin las tiles el build
# funciona igual, el rsync --delete las borra de /var/www y la web queda con
# el mapa en blanco sin que nada avise.
echo "==> Comprobando tiles del mapa"
TILES_DIR="$REPO_DIR/public/map/Tiles"
if [ ! -d "$TILES_DIR" ] || [ -z "$(find "$TILES_DIR" -name '*.png' -print -quit)" ]; then
  echo "ERROR: no hay tiles en $TILES_DIR" >&2
  echo "" >&2
  echo "Sin ellas el mapa de /rutas se publicaria vacio. Extrae el tarball:" >&2
  echo "" >&2
  echo "    tar -tzf $REPO_DIR/map.tgz | head     # ver como viene empaquetado" >&2
  echo "    mkdir -p $TILES_DIR" >&2
  echo "    tar -xzf $REPO_DIR/map.tgz -C ...     # segun lo anterior" >&2
  echo "" >&2
  exit 1
fi
echo "    $(find "$TILES_DIR" -name '*.png' | wc -l) tiles encontradas"

echo "==> Instalando dependencias (npm ci = exactas segun package-lock)"
npm ci

echo "==> Compilando"
npm run build

# Segunda red de seguridad: confirmar que el build se las llevo al dist antes
# de que el rsync --delete toque /var/www.
if [ -z "$(find "$REPO_DIR/dist/map/Tiles" -name '*.png' -print -quit 2>/dev/null)" ]; then
  echo "ERROR: el build no copio las tiles a dist/map/Tiles" >&2
  echo "Se aborta antes del rsync para no borrar las que ya hay publicadas." >&2
  exit 1
fi

echo "==> Publicando en $TARGET"
sudo mkdir -p "$TARGET"
# --delete borra los assets con hash viejo; sin esto /var/www crece sin limite.
sudo rsync -a --delete "$REPO_DIR/dist/" "$TARGET/"
sudo chown -R www-data:www-data "$TARGET"

echo "==> Recargando nginx"
sudo nginx -t
sudo systemctl reload nginx

echo "==> Listo: https://andesmp.site"
