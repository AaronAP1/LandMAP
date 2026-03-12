import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
