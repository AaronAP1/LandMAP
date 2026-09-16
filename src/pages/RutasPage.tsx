import { Suspense, lazy } from 'react';
import PageShell, { SectionLabel } from '../components/PageShell';
import mapData from '../data/map-data.json';

/**
 * MapLibre pesa ~800 KB y solo hace falta en esta pagina. Cargandolo aparte,
 * el bundle principal no lo arrastra para quien nunca abre el mapa.
 */
const RouteMap = lazy(() => import('../components/RouteMap'));

const CITIES = mapData.cities as Array<{ name: string; x: number; y: number }>;
const OVERLAYS = mapData.overlays as Array<{ type: string }>;

/** Cuenta de puntos por tipo, para el resumen. */
const COUNTS = OVERLAYS.reduce<Record<string, number>>((acc, item) => {
  acc[item.type] = (acc[item.type] ?? 0) + 1;
  return acc;
}, {});

const SUMMARY = [
  { label: 'Ciudades', value: CITIES.length },
  { label: 'Gasolineras', value: COUNTS.Fuel ?? 0 },
  { label: 'Empresas', value: 8 },
  { label: 'Paradas', value: COUNTS['Bus Stop'] ?? 0 },
  { label: 'Garajes', value: COUNTS.Garage ?? 0 },
  { label: 'Talleres', value: COUNTS.Service ?? 0 },
];

export default function RutasPage() {
  return (
    <PageShell
      eyebrow="Rutas"
      title="El mapa de PeruRoads, ciudad por ciudad."
      lead="Las rutas peruanas del servidor, con sus ciudades, gasolineras y paradas. Acerca el mapa para ver los puntos de interes."
    >
      <section>
        <div className="h-[72vh] min-h-[440px] overflow-hidden rounded-2xl border border-white/10">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center bg-[#0f0f0f]">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
                  Cargando mapa
                </p>
              </div>
            }
          >
            <RouteMap />
          </Suspense>
        </div>
      </section>

      <section className="mt-16">
        <SectionLabel>En el mapa</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {SUMMARY.map((item) => (
            <article key={item.label} className="bg-[#0a0a0a] p-5">
              <p className="text-2xl font-medium tracking-[-0.02em] text-white">
                {item.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Ciudades</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.map((city) => (
            <article key={city.name} className="bg-[#0a0a0a] px-5 py-4">
              <h2 className="text-base text-white">{city.name}</h2>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
