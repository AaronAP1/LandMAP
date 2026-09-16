# Mapa de rutas

Contenido generado por **TsMap.Canvas** e importado con:

```bash
node scripts/import-tsmap.mjs "C:/Users/xdxdxdxd/ts-map-export/AndesMaps"
```

Ese script copia `Tiles/` y `Overlays/` aqui, y escribe `src/data/map-data.json`
con las ciudades y los puntos de interes. Ejecutalo cada vez que regeneres el
mapa desde el mod.

```
public/map/
  Tiles/      21.845 archivos, ~22 MB, zoom 0-7   (en .gitignore)
  Overlays/   34 iconos                            (versionado)
```

## Pendiente: regenerar sin nombres de ciudad

TsMap **dibuja los nombres de ciudad dentro de los PNG**. La web pinta ademas
sus propias etiquetas en HTML (`.map-city`), asi que ahora mismo cada ciudad
aparece dos veces: el texto salmon horneado en la tile y el texto blanco encima.

Para arreglarlo, en TsMap.Canvas **desactiva el renderizado de nombres de
ciudad** y vuelve a generar. Las etiquetas HTML son preferibles porque:

- heredan la tipografia y el color del sitio,
- se leen bien en cualquier zoom sin repixelarse,
- pueden hacerse interactivas (clic para filtrar, enlazar a una ruta...).

Si prefieres lo contrario, quita el bucle de `new Marker(...)` en
`src/components/RouteMap.tsx`.

## Por que las tiles no estan en git

Pesan ~22 MB repartidos en casi 22.000 archivos y se regeneran desde el mod.
En produccion se sirven desde nginx; ver `deploy/nginx.conf.example`.

## Notas de proyeccion

MapLibre solo entiende Web Mercator, pero eso no deforma nada: el mundo
Mercator proyectado es un cuadrado y el arbol de tiles de TsMap tambien, asi
que encajan 1:1. Las coordenadas del juego se traducen a lat/lng ficticias en
`src/lib/tsmap.ts`. Esas lat/lng no significan nada geografico.

Por lo mismo **no se usa ScaleControl**: la escala en kilometros que calcularia
MapLibre sobre coordenadas inventadas no tiene sentido (marcaba "5000 km").
