import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, BriefcaseBusiness, Bus, Users } from 'lucide-react';
import cruzDelSurLogo from '../img/CruzdelSurLogo.png';
import judithLogo from '../img/JudithLogo.png';
import movilBusLogo from '../img/MovilBusLogo.png';
import palominoLogo from '../img/PalominoLogo.png';

const companies = [
  {
    name: 'Turismo Judith',
    fleet: '18 unidades',
    route: 'Lima',
    members: '24 conductores',
    logo: judithLogo,
    logoBg: 'bg-[#52c7c8]',
  },
  {
    name: 'Cruz del Sur',
    fleet: '26 unidades',
    route: 'Huaraz',
    members: '31 conductores',
    logo: cruzDelSurLogo,
    logoBg: 'bg-[#0d2a5f]',
  },
  {
    name: 'Palomino',
    fleet: '14 unidades',
    route: 'Puquio',
    members: '17 conductores',
    logo: palominoLogo,
    logoBg: 'bg-white',
  },
  {
    name: 'Movil Bus',
    fleet: '10 unidades',
    route: 'Piura',
    members: '12 conductores',
    logo: movilBusLogo,
    logoBg: 'bg-white',
  },
];

const steps = [
  { num: '3.1', name: 'Empresas' },
  { num: '3.2', name: 'Choferes' },
  { num: '3.3', name: 'Rutas' },
  { num: '3.4', name: 'Convoys' },
  { num: '3.5', name: 'Flotas' },
];

export default function Build() {
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
              Trabaja en Empresas
              <br />
              VTC implementado
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Crea tu empresa o únete a una ya consolidada. Organiza flotas, comparte rutas, recluta conductores y compite por convertirte en la VTC más activa del servidor.
            </p>
            <a
              href="#build"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                3.0
                <span className="text-white/60">Empresas VTC</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right Content - VTC Companies */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Companies Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <BriefcaseBusiness className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Directorio VTC</span>
                </div>
                <span className="text-white/40 text-xs">Empresas activas</span>
              </div>

              <div className="p-4 space-y-3">
                {companies.map((company) => (
                  <div
                    key={company.name}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg ${company.logoBg}`}>
                            <img src={company.logo} alt={company.name} className="h-full w-full object-contain" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white">{company.name}</h3>
                            <p className="text-xs text-white/45">{company.route}</p>
                          </div>
                        </div>
                      </div>

                      <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-white/50">
                        Activa
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-black/30 p-3">
                        <div className="flex items-center gap-2 text-white/45">
                          <Bus className="h-3.5 w-3.5" />
                          <span>Flota</span>
                        </div>
                        <div className="mt-1 text-white">{company.fleet}</div>
                      </div>

                      <div className="rounded-lg bg-black/30 p-3">
                        <div className="flex items-center gap-2 text-white/45">
                          <Users className="h-3.5 w-3.5" />
                          <span>Miembros</span>
                        </div>
                        <div className="mt-1 text-white">{company.members}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div className="p-4 border-t border-white/5">
                <div className="flex flex-wrap gap-3">
                  {steps.map((step) => (
                    <div
                      key={step.num}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5"
                    >
                      <span className="text-white/40 text-xs">{step.num}</span>
                      <span className="text-white/70 text-sm">{step.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
