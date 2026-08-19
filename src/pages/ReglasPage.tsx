import PageShell, {
  GhostRoute,
  PrimaryLink,
  SectionLabel,
} from '../components/PageShell';
import { DISCORD_URL, ROUTES } from '../lib/links';

const BASE_RULES = [
  {
    code: 'R1',
    title: 'Respeto en convoys y rutas publicas',
    description:
      'Nada de insultos, acoso ni discriminacion, ni en el juego ni en los canales de voz. El servidor es de todos y se conduce en grupo.',
  },
  {
    code: 'R2',
    title: 'Nada de choques intencionales',
    description:
      'Embestir, bloquear o sabotear a otro conductor a proposito es la falta mas sancionada. Un accidente pasa; buscarlo, no.',
  },
  {
    code: 'R3',
    title: 'Prioridad al orden del staff',
    description:
      'En convoys y eventos, las indicaciones del staff van primero: orden de salida, velocidad, paradas y desvios.',
  },
  {
    code: 'R4',
    title: 'Conduccion coherente con la ruta',
    description:
      'Respeta el sentido de la via y una velocidad razonable para el grupo. Ir en contra o adelantar el convoy rompe la experiencia del resto.',
  },
  {
    code: 'R5',
    title: 'Mods que no rompan la sincronizacion',
    description:
      'Graficos y sonido no suelen dar problema. Los que alteran fisicas, trafico o vehiculos si desincronizan al convoy y no estan permitidos en ruta.',
  },
  {
    code: 'R6',
    title: 'Un solo nombre por conductor',
    description:
      'Usa el mismo nick en el juego y en Discord. Facilita la moderacion y que tu empresa te identifique en los reportes de ruta.',
  },
];

const MODES = [
  {
    name: 'Horario normal',
    state: 'Reglas activas',
    description:
      'El modo por defecto. Las seis reglas base se aplican por completo y el staff modera de forma activa.',
  },
  {
    name: 'Horas libres',
    state: 'Flexibilidad',
    description:
      'Ventanas anunciadas con anticipacion y menos restricciones, para quienes quieren jugar suelto sin la formalidad de un convoy.',
  },
  {
    name: 'Todo vale',
    state: 'Sancion leve',
    description:
      'Sancion leve, no ausencia de reglas. Es una ventana puntual y supervisada; fuera de ese horario las reglas base vuelven completas.',
  },
  {
    name: 'Evento especial',
    state: 'Supervisado',
    description:
      'Convoys tematicos, retos y carreras con reglas propias anunciadas en el briefing. Lo que se diga ahi manda sobre el modo normal.',
  },
];

const SANCTIONS = [
  {
    level: 'Aviso',
    description:
      'Primera falta leve. Se avisa por voz o por Discord y no queda registro permanente.',
  },
  {
    level: 'Kick',
    description:
      'Salida de la sala en el momento. Se usa cuando la conducta esta afectando a un convoy en curso.',
  },
  {
    level: 'Ban temporal',
    description:
      'Faltas repetidas o choques intencionales confirmados. La duracion depende del historial del conductor.',
  },
  {
    level: 'Ban permanente',
    description:
      'Reservado para sabotaje sistematico, acoso o suplantacion. Se comunica con la evidencia correspondiente.',
  },
];

export default function ReglasPage() {
  return (
    <PageShell
      eyebrow="Reglas"
      title="Reglas claras para que rodar en grupo siempre funcione."
      lead="Estas son las reglas base del servidor, los modos de juego en los que se relajan y como se aplican las sanciones cuando algo se rompe."
      actions={
        <>
          <PrimaryLink href={DISCORD_URL}>Apelar en Discord</PrimaryLink>
          <GhostRoute to={ROUTES.faq}>Ver preguntas frecuentes</GhostRoute>
        </>
      }
    >
      <section>
        <SectionLabel>Reglas base</SectionLabel>
        <div className="border-t border-white/10">
          {BASE_RULES.map((rule) => (
            <article
              key={rule.code}
              className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[80px_1fr] sm:gap-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#e0512f]">
                {rule.code}
              </span>
              <div>
                <h2 className="text-lg leading-snug text-white sm:text-xl">
                  {rule.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
                  {rule.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Modos de juego</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          {MODES.map((mode) => (
            <article key={mode.name} className="bg-[#0a0a0a] p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg text-white">{mode.name}</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                  {mode.state}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {mode.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Sanciones</SectionLabel>
        <div className="border-t border-white/10">
          {SANCTIONS.map((item) => (
            <article
              key={item.level}
              className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[180px_1fr] sm:gap-8"
            >
              <h2 className="text-base text-white">{item.level}</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-white/40">
          Toda sancion se comunica con su motivo y su evidencia. Si crees que
          hubo un error, puedes apelar abriendo un ticket en Discord.
        </p>
      </section>
    </PageShell>
  );
}
