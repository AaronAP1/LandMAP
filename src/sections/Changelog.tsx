import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const changelogItems = [
  {
    title: 'Deeplink to AI coding tools',
    description: 'Starting an issue used to mean manually creating a feature branch. Now it means assembling the right context so your coding agent can take a first pass. We\'ve made this much easier to do in Linear.',
    date: 'Feb 26, 2026',
  },
  {
    title: 'Advanced filters and share issues in private teams',
    description: 'Refine your searches, views, and dashboards with advanced filters. Combine multiple AND/OR conditions to define exactly what you want to see.',
    date: 'Feb 12, 2026',
  },
  {
    title: 'Linear MCP for product management',
    description: 'We\'ve expanded Linear\'s MCP server with support for initiatives, project milestones, and updates. These allow product managers to keep plans up to date and communicate progress from other tools like Cursor and Claude.',
    date: 'Feb 4, 2026',
  },
  {
    title: 'Time in status',
    description: 'Time spent in individual statuses is now tracked and available throughout Linear. Hover over any issue\'s status indicator to see the cumulative time it\'s spent in each status. You can use this to spot where things are getting stuck, identify bottlenecks, and optimize your development process.',
    date: 'Jan 28, 2026',
  },
];

export default function Changelog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Changelog
          </h2>
        </motion.div>

        <div className="space-y-4">
          {changelogItems.map((item, index) => (
            <motion.a
              key={item.title}
              href="#changelog"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="block p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
                <span className="text-white/40 text-sm whitespace-nowrap">{item.date}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <a
            href="#changelog"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
          >
            <span className="text-sm">See all releases</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
