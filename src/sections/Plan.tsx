import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];

const initiatives = [
  {
    name: 'Core Product',
    count: 99,
    items: [
      { name: 'Infra stability', count: 28 },
      { name: 'Autonomous systems', count: 16 },
      { name: 'Mobile apps', count: 8 },
    ],
  },
  {
    name: 'APAC Expansion',
    count: 21,
    items: [
      { name: 'Japan Launch', count: 12 },
      { name: 'Customer-driven priorities', count: 9 },
    ],
  },
];

const roadmapItems = [
  { name: 'UI Refresh', start: 0, duration: 3, phase: 'Core screens' },
  { name: 'Polish', start: 2, duration: 2, phase: 'Internal' },
  { name: 'Split fares', start: 3, duration: 2, phase: 'Public Beta' },
  { name: 'Autonomy status clarity', start: 5, duration: 3, phase: 'Alpha' },
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Roadmap Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                <div className="flex items-center gap-4">
                  {months.map((month, i) => (
                    <div key={month} className="text-center">
                      <div className="text-white/40 text-xs mb-1">{month}</div>
                      <div className="flex gap-1">
                        {[1, 8, 15, 22].map((date) => (
                          <div key={date} className="w-6 h-6 flex items-center justify-center text-white/30 text-xs">
                            {i === 0 ? date : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Initiatives */}
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

              {/* Timeline */}
              <div className="p-4 border-t border-white/5">
                <div className="space-y-3">
                  {roadmapItems.map((item, index) => (
                    <div key={item.name} className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/40 text-xs">2.{index + 1}</span>
                        <span className="text-white/60 text-sm">{item.name}</span>
                        <span className="text-white/40 text-xs">{item.phase}</span>
                        <Plus className="w-3 h-3 text-white/40" />
                      </div>
                      <div className="relative h-6 bg-white/[0.03] rounded overflow-hidden">
                        <div
                          className="absolute top-0 h-full bg-white/10 rounded"
                          style={{
                            left: `${(item.start / months.length) * 100}%`,
                            width: `${(item.duration / months.length) * 100}%`,
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
              Define the
              <br />
              product direction
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps, and clear, up-to-date PRDs.
            </p>
            <a
              href="#plan"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                2.0
                <span className="text-white/60">Plan</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
