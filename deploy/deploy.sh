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
git pull --ff-only

echo "==> Instalando dependencias (npm ci = exactas segun package-lock)"
npm ci

echo "==> Compilando"
npm run build

echo "==> Publicando en $TARGET"
sudo mkdir -p "$TARGET"
# --delete borra los assets con hash viejo; sin esto /var/www crece sin limite.
sudo rsync -a --delete "$REPO_DIR/dist/" "$TARGET/"
sudo chown -R www-data:www-data "$TARGET"

echo "==> Recargando nginx"
sudo nginx -t
sudo systemctl reload nginx

echo "==> Listo: https://andesmp.site"
