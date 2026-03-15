import { motion } from 'framer-motion';

const features = [
  {
    figure: 'V0 0.1',
    title: 'Variedad de Mapas',
    description: 'La forma de cambiar y probar semanalmente nuevos mapas ',
  },
  {
    figure: 'V0 0.2',
    title: 'Mapa DEFINITIVO',
    description: 'Mientras se trabaja en el mapa definitivo, se lanzarán mapas semanales para que la comunidad pueda disfrutar de nuevas experiencias de conducción cada semana.',
  },
  {
    figure: 'V0 0.3',
    title: 'Es un simulador ETS2',
    description: 'Compartimos la misma pasión por la simulación, pero con un enfoque en la comunidad y la colaboración.',
  },
];

export default function FeaturesIntro() {
  const partners = ['Busscar', 'Busstar', 'G6', 'G7', 'New G7', 'G8', 'Comil', 'Zeus', 'Pickups', 'Camiones', 'Carga Especial'];
  const partnerStyles = [
    'font-black uppercase tracking-[0.18em]',
    'font-serif italic tracking-[0.08em]',
    'font-mono uppercase tracking-[0.28em]',
    'font-black tracking-[0.22em]',
    'font-serif font-semibold tracking-[0.04em]',
    'italic font-semibold tracking-[0.12em]',
    'font-mono font-bold tracking-[0.22em]',
    'font-black italic tracking-[0.08em]',
    'font-serif uppercase tracking-[0.14em]',
    'font-semibold tracking-[0.16em]',
  ];
  const marqueePartners = [...partners, ...partners];

  return (
    <section className="relative overflow-hidden pb-32 pt-0">
      <div className="mb-24 overflow-hidden border-y border-white/10 bg-black">
        <div className="h-28 bg-[radial-gradient(120%_120%_at_50%_5%,rgba(255,255,255,0.40),rgba(255,255,255,0.08)_38%,rgba(0,0,0,0)_72%)]" />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-16 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />

            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
              className="flex w-max items-center gap-16 whitespace-nowrap sm:gap-20"
            >
              {marqueePartners.map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className={`text-[24px] text-white/90 sm:text-[28px] ${partnerStyles[index % partnerStyles.length]}`}
                >
                  {partner}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Una gran variedad de buses.
            <span className="text-white/55"> Explora la colección de buses disponibles en el servidor.
Diferentes marcas, generaciones y configuraciones para una experiencia de conducción única.</span>
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Una nueva forma de Simular.
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Diseñado por jugadores para jugadores, descubre la forma definitiva de experimentar la simulación en mapas peruanos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.figure}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                {/* Figure label */}
                <div className="absolute top-4 right-4 text-xs text-white/30 font-mono">
                  {feature.figure}
                </div>

                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-white/20 to-white/5" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 border-t border-white/10 pt-16"
        >
          <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <h3 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Conoce a los fundadores de la Idea y su visión para el servidor.
            </h3>

            <div className="flex flex-col justify-between gap-10">
              <p className="max-w-xl text-lg leading-relaxed text-white/65 sm:text-2xl sm:leading-[1.35]">
                Descubre la historia detrás de AndesMP y cómo su visión única se traduce en una experiencia de conducción inigualable.
              </p>

              <div className="text-xl text-white/35 sm:text-3xl">
                <span className="font-medium">1.0</span>
                <span className="ml-4">Conoce más</span>
                <span className="ml-3">-&gt;</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
