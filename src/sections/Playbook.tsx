import * as Accordion from '@radix-ui/react-accordion';
import { EVENTS, track } from '../lib/analytics';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const DISCORD_URL = 'https://discord.gg/eYeqrj3PAx';

const SERVER_EVENTS = [
  'Convoy en empresas',
  'Cargas especiales con escolta',
  'Chapa tu tombo',
  'Dakar comunitario',
  'Ruta libre con paradas',
];

const MODES = [
  'Horario normal',
  'Horas libres',
  'Todo vale',
  'Evento especial',
];

const FAQ = [
  {
    id: 'agenda',
    question: '¿Como funciona la agenda del servidor?',
    answer:
      'Cada dia se publica la agenda en el canal de eventos: convoys, cargas especiales y mini juegos. Las salidas tienen briefing 15 minutos antes, con puntos de parada, combustible y orden de salida ya confirmados.',
  },
  {
    id: 'horas-libres',
    question: '¿Que pasa en las horas libres?',
    answer:
      'Son ventanas con menos restricciones para quienes quieren jugar suelto. Se avisan con anticipacion y estan marcadas en el horario, asi nadie se confunde entre una ruta seria y una hora libre.',
  },
  {
    id: 'reglas',
    question: '¿Que esta prohibido en un convoy?',
    answer:
      'Respeto en convoys y rutas publicas, nada de choques intencionales y prioridad al orden del staff. Son las tres reglas base y se aplican en cualquier horario que no sea "todo vale".',
  },
  {
    id: 'todo-vale',
    question: '¿"Todo vale" significa que no hay sanciones?',
    answer:
      'Significa sancion leve, no ausencia de reglas. Es una ventana puntual y supervisada; fuera de ese horario las reglas base vuelven a aplicarse por completo.',
  },
  {
    id: 'organiza',
    question: '¿Quien organiza los eventos especiales?',
    answer:
      'El staff coordina fechas, moderadores y revision de cargas y remolques habilitados. Cualquiera puede proponer un evento en Discord y se evalua para la agenda de la semana.',
  },
];

function Label({ children }: { children: string }) {
  return (
    <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e0512f]">
      {children}
    </p>
  );
}

export default function Playbook() {
  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(75% 60% at 25% 40%, #000 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(75% 60% at 25% 40%, #000 0%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Columna izquierda: declaracion + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="max-w-md text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:text-[26px]">
              De los convoys diarios a los modos especiales, cada regla del
              servidor esta pensada para que rodar en grupo siempre funcione.
            </h2>

            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(EVENTS.discordClick, { location: 'playbook' })}
              className="mt-8 inline-block bg-[#e0512f] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#f0603c]"
            >
              Unirse al Discord
            </a>
          </motion.div>

          {/* Columna derecha: bloques de contenido */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="space-y-16"
          >
            <div>
              <Label>Eventos</Label>
              <ul className="space-y-2">
                {SERVER_EVENTS.map((item) => (
                  <li
                    key={item}
                    className="text-lg leading-snug text-white sm:text-xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Label>Modos de juego</Label>
              <ul className="space-y-2">
                {MODES.map((item) => (
                  <li
                    key={item}
                    className="text-lg leading-snug text-white sm:text-xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Label>Reglas y dudas</Label>
              <Accordion.Root
                type="single"
                collapsible
                defaultValue={FAQ[0].id}
                onValueChange={(value) =>
                  value && track(EVENTS.faqOpen, { question: value })
                }
                className="border-t border-white/10"
              >
                {FAQ.map((item) => (
                  <Accordion.Item
                    key={item.id}
                    value={item.id}
                    className="border-b border-white/10"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left [&[data-state=open]_.icon-plus]:hidden [&[data-state=closed]_.icon-minus]:hidden">
                        <span className="text-base leading-snug text-white sm:text-lg">
                          {item.question}
                        </span>
                        <Plus className="icon-plus h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-white" />
                        <Minus className="icon-minus h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-white" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-white/50 sm:text-base">
                        {item.answer}
                      </p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
