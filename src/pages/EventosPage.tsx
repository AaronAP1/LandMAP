import PageShell, {
  GhostRoute,
  PrimaryLink,
  SectionLabel,
} from '../components/PageShell';
import { DISCORD_URL, ROUTES } from '../lib/links';

const EVENT_TYPES = [
  {
    code: 'E1',
    name: 'Convoy en empresas',
    format: 'Grupal',
    description:
      'La salida principal del servidor. Cada empresa forma su columna y se rueda una ruta interprovincial con paradas coordinadas.',
  },
  {
    code: 'E2',
    name: 'Cargas especiales con escolta',
    format: 'Cooperativo',
    description:
      'Remolques pesados acompanados por vehiculos de escolta. Ritmo lento, coordinacion alta y mucho control de trafico.',
  },
  {
    code: 'E3',
    name: 'Chapa tu tombo',
    format: 'Mini juego',
    description:
      'Persecuciones libres en carretera. Sin convoy, sin ruta fija y con reglas relajadas dentro de la ventana anunciada.',
  },
  {
    code: 'E4',
    name: 'Dakar comunitario',
    format: 'Reto',
    description:
      'Tramos exigentes fuera de asfalto y por rutas de montana. Se corre por llegar, no por ganar.',
  },
  {
    code: 'E5',
    name: 'Carrera con checkpoints',
    format: 'Competitivo',
    description:
      'Recorrido largo con puntos de control, algunos ocultos. Gana quien mejor lea la ruta, no solo quien acelere mas.',
  },
  {
    code: 'E6',
    name: 'Ruta libre de bienvenida',
    format: 'Comunidad',
    description:
      'Salida tranquila pensada para quienes recien entran al servidor, con paradas en estaciones y sin exigencia de tiempos.',
  },
];

const FLOW = [
  {
    step: '01',
    title: 'Anuncio',
    description:
      'El evento se publica en el canal de eventos de Discord con tipo, ruta y hora de salida.',
  },
  {
    step: '02',
    title: 'Briefing',
    description:
      'Quince minutos antes se confirman puntos de parada, combustible y orden de salida para buses, camiones y cargas especiales.',
  },
  {
    step: '03',
    title: 'Salida',
    description:
      'Se rueda siguiendo las indicaciones del staff. Las reglas base siguen activas salvo que el briefing diga lo contrario.',
  },
  {
    step: '04',
    title: 'Cierre',
    description:
      'Al terminar se abren horas libres o un mini juego para quienes quieran seguir jugando en grupo.',
  },
];

export default function EventosPage() {
  return (
    <PageShell
      eyebrow="Eventos"
      title="Convoys, retos y mini juegos que mantienen al servidor en movimiento."
      lead="La agenda se publica cada dia en Discord. Aqui tienes los tipos de evento que se corren, como funciona una salida y como proponer el tuyo."
      actions={
        <>
          <PrimaryLink href={DISCORD_URL}>Ver la agenda en Discord</PrimaryLink>
          <GhostRoute to={ROUTES.reglas}>Reglas de convoy</GhostRoute>
        </>
      }
    >
      <section>
        <SectionLabel>Tipos de evento</SectionLabel>
        <div className="border-t border-white/10">
          {EVENT_TYPES.map((event) => (
            <article
              key={event.code}
              className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[80px_1fr_160px] sm:items-start sm:gap-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#e0512f]">
                {event.code}
              </span>
              <div>
                <h2 className="text-lg leading-snug text-white sm:text-xl">
                  {event.name}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
                  {event.description}
                </p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35 sm:text-right">
                {event.format}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Como funciona una salida</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW.map((item) => (
            <article key={item.step} className="bg-[#0a0a0a] p-6">
              <span className="font-mono text-[11px] text-white/30">
                {item.step}
              </span>
              <h2 className="mt-4 text-lg text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-white/10 pt-12">
        <SectionLabel>Propon tu evento</SectionLabel>
        <p className="max-w-2xl text-lg leading-relaxed text-white/60">
          Cualquiera puede proponer un evento. Escribe al staff en Discord con
          el tipo de salida, la ruta que tienes en mente y el horario, y se
          evalua para la agenda de la semana.
        </p>
        <div className="mt-8">
          <PrimaryLink href={DISCORD_URL}>Proponer en Discord</PrimaryLink>
        </div>
      </section>
    </PageShell>
  );
}
