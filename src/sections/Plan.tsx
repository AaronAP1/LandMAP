import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const modes = ['BASE', 'FREE', 'PVP', 'EVENT', 'NIGHT', 'DARK', 'RACE', 'OPEN'];

const initiatives = [
  {
    name: 'Reglas base',
    count: 6,
    items: [
      { name: 'Respeto en convoys y rutas públicas', count: 1 },
      { name: 'Nada de choques intencionales', count: 1 },
      { name: 'Prioridad al orden del staff', count: 1 },
    ],
  },
  {
    name: 'Modos especiales',
    count: 5,
    items: [
      { name: 'Horas libres con menos restricciones', count: 2 },
      { name: 'Todo vale en horarios puntuales', count: 3 },
    ],
  },
];

const roadmapItems = [
  { name: 'Horario normal', start: 0, duration: 2, phase: 'Reglas activas' },
  { name: 'Horas libres', start: 2, duration: 2, phase: 'Flexibilidad' },
  { name: 'Todo vale', start: 4, duration: 1, phase: 'Sin sancion leve' },
  { name: 'Evento especial', start: 5, duration: 3, phase: 'Supervisado' },
];

export default function Plan() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Roadmap */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Modes Header */}
              <div className="border-b border-white/5 bg-[#0d0d0d] px-4 py-3">
                <div className="overflow-x-auto">
                  <div className="flex min-w-max items-center gap-4 pr-2">
                    {modes.map((mode, i) => (
                      <div key={mode} className="min-w-[56px] text-center">
                      <div className="text-white/40 text-xs mb-1">{mode}</div>
                      <div className="flex gap-1">
                        {[1, 8, 15, 22].map((date) => (
                          <div key={date} className="w-6 h-6 flex items-center justify-center text-white/30 text-xs">
                            {i === 0 ? date : i === 2 ? '•' : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rules Groups */}
              <div className="p-4 space-y-4">
                {initiatives.map((initiative) => (
                  <div key={initiative.name} className="border border-white/5 rounded-lg overflow-hidden">
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border border-white/20" />
                        <span className="text-white text-sm font-medium">{initiative.name}</span>
                      </div>
                      <span className="text-white/40 text-xs">{initiative.count}</span>
                    </button>
                    <div className="p-2 space-y-1">
                      {initiative.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between px-3 py-2 rounded hover:bg-white/[0.03] cursor-pointer">
                          <span className="text-white/60 text-sm">{item.name}</span>
                          <span className="text-white/40 text-xs">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mode Timeline */}
              <div className="border-t border-white/5 p-4">
                <div className="space-y-3">
                  {roadmapItems.map((item, index) => (
                    <div key={item.name} className="relative">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="text-white/40 text-xs">2.{index + 1}</span>
                        <span className="text-white/60 text-sm">{item.name}</span>
                        <span className="text-white/40 text-xs">{item.phase}</span>
                        <Plus className="w-3 h-3 text-white/40" />
                      </div>
                      <div className="relative h-6 bg-white/[0.03] rounded overflow-hidden">
                        <div
                          className="absolute top-0 h-full bg-white/10 rounded"
                          style={{
                            left: `${(item.start / modes.length) * 100}%`,
                            width: `${(item.duration / modes.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
              Definamos las reglas
              <br />
              y los modos del servidor
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              La experiencia mejora cuando todos conocen cómo se juega: reglas claras, horas libres bien marcadas y modos especiales como todo vale en ventanas específicas.
            </p>
            <a
              href="#plan"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                2.0
                <span className="text-white/60">Reglas y modos</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
