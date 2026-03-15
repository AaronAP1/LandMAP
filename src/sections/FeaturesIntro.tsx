import { motion } from 'framer-motion';

const features = [
  {
    figure: 'FIG 0.2',
    title: 'Built for purpose',
    description: 'Linear is shaped by the practices and principles of world-class product teams.',
  },
  {
    figure: 'FIG 0.3',
    title: 'Powered by AI agents',
    description: 'Designed for workflows shared by humans and agents. From drafting PRDs to pushing PRs.',
  },
  {
    figure: 'FIG 0.4',
    title: 'Designed for speed',
    description: 'Reduces noise and restores momentum to help teams ship with high velocity and focus.',
  },
];

export default function FeaturesIntro() {
  const partners = ['Busscar', 'Busstar', 'G6', 'G7', 'New G7', 'Comil', 'Zeus', 'Pickups'];

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
            className="mb-16 grid grid-cols-2 gap-y-8 text-white/90 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8"
          >
            {partners.map((partner) => (
              <div
                key={partner}
                className="text-center text-[28px] font-semibold tracking-tight text-white/90 sm:text-left sm:text-2xl"
              >
                {partner}
              </div>
            ))}
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
            A new species of product tool.
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.
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
      </div>
    </section>
  );
}
