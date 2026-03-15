import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const columns = [
  {
    name: 'Hoy',
    count: 4,
    issues: [
      { id: 'EVT-201', title: 'Convoy en empresas', labels: [{ name: 'Convoy', color: 'red' }, { name: '19:30', color: 'blue' }] },
      { id: 'EVT-202', title: 'Cargas especiales con escolta nocturna', labels: [{ name: 'Especial', color: 'orange' }] },
      { id: 'EVT-203', title: 'Chapa tu tombo por la Panamericana', labels: [{ name: 'Mini juego', color: 'purple' }] },
      { id: 'EVT-204', title: 'Ruta libre con parada en estaciones', labels: [{ name: 'Comunidad', color: 'green' }] },
    ],
  },
  {
    name: 'En coordinacion',
    count: 4,
    issues: [
      { id: 'COR-118', title: 'Salida del Dakar comunitario', labels: [{ name: 'Dakar', color: 'orange' }, { name: 'Briefing', color: 'blue' }] },
      { id: 'COR-119', title: 'Puntos de reunión para convoy interprovincial', labels: [{ name: 'Ruta', color: 'green' }] },
      { id: 'COR-120', title: 'Asignación de moderadores para evento nocturno', labels: [{ name: 'Staff', color: 'pink' }] },
      { id: 'COR-121', title: 'Revisión de cargas y remolques habilitados', labels: [{ name: 'Reglas', color: 'purple' }] },
    ],
  },
  {
    name: 'Especiales',
    count: 3,
    issues: [
      { id: 'ESP-090', title: 'Evento temático: Noche de buses clásicos', labels: [{ name: 'Temático', color: 'purple' }] },
      { id: 'ESP-091', title: 'Convoy extremo por rutas de montaña', labels: [{ name: 'Reto', color: 'red' }] },
      { id: 'ESP-092', title: 'Carrera larga con checkpoints ocultos', labels: [{ name: 'Competitivo', color: 'orange' }] },
    ],
  },
  {
    name: 'Completados',
    count: 4,
    issues: [
      { id: 'FIN-061', title: 'Convoy Busscar edición domingo', labels: [{ name: 'Finalizado', color: 'green' }] },
      { id: 'FIN-062', title: 'Cargas especiales por la sierra central', labels: [{ name: 'Finalizado', color: 'green' }] },
      { id: 'FIN-063', title: 'Chapa tu tombo edición nocturna', labels: [{ name: 'Replay', color: 'blue' }] },
      { id: 'FIN-064', title: 'Ruta libre de bienvenida a nuevos usuarios', labels: [{ name: 'Comunidad', color: 'pink' }] },
    ],
  },
];

export default function Intake() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
              Eventos especiales
              <br />
              Cada día algo nuevo
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Revisa la agenda del día, las coordinaciones activas y los eventos especiales que mantienen al servidor siempre en movimiento.
            </p>
            <a
              href="#intake"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                1.0
                <span className="text-white/60">Agenda del servidor</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right Content - Kanban Board */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Board Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm">Canal</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">#eventos-andesmp</span>
                </div>
                <span className="text-white/30 text-xs">Actualizado hoy</span>
              </div>

              {/* Coordination Feed */}
              <div className="p-4 border-b border-white/5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs text-white font-medium">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">Bless staff</span>
                      <span className="text-white/40 text-xs">6:00 PM</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Hoy abrimos con convoy en empresas. Salida oficial desde Lima, briefing 15 minutos antes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs text-white font-medium">
                    D
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">Juan de Dios lead</span>
                      <span className="text-white/40 text-xs">6:08 PM</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Confirmados los puntos de parada, combustible y orden de salida para buses, camiones y cargas especiales.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-xs text-white font-medium">
                    M
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">Diosito </span>
                      <span className="text-white/40 text-xs">6:15 PM</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Después del convoy se habilita Chapa tu tombo y una ruta Dakar libre para quienes quieran seguir jugando en grupo.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-white/60 text-sm">@AndesMP</span>
                  <span className="text-white/40 text-sm">publicar</span>
                  <span className="text-white text-sm">agenda de hoy y próximos especiales</span>
                </div>
              </div>

              {/* Kanban Columns */}
              <div className="flex gap-3 p-4 overflow-x-auto">
                {columns.map((column) => (
                  <div key={column.name} className="flex-shrink-0 w-64">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/60 text-sm font-medium">{column.name}</span>
                      <span className="text-white/40 text-xs">{column.count}</span>
                    </div>
                    <div className="space-y-2">
                      {column.issues.map((issue) => (
                        <div
                          key={issue.id}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-sm bg-white/40" />
                            </div>
                            <span className="text-white/40 text-xs">{issue.id}</span>
                          </div>
                          <p className="text-white/80 text-sm mb-2 line-clamp-2">{issue.title}</p>
                          {issue.labels.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {issue.labels.map((label) => (
                                <span
                                  key={label.name}
                                  className={`px-1.5 py-0.5 rounded text-xs ${
                                    label.color === 'red'
                                      ? 'bg-red-500/20 text-red-400'
                                      : label.color === 'purple'
                                      ? 'bg-purple-500/20 text-purple-400'
                                      : label.color === 'blue'
                                      ? 'bg-blue-500/20 text-blue-400'
                                      : label.color === 'green'
                                      ? 'bg-green-500/20 text-green-400'
                                      : label.color === 'orange'
                                      ? 'bg-orange-500/20 text-orange-400'
                                      : 'bg-pink-500/20 text-pink-400'
                                  }`}
                                >
                                  {label.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
