import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const chartData = [
  { month: 'Feb 2025', value: 8 },
  { month: 'May 2025', value: 12 },
  { month: 'Aug 2025', value: 6 },
  { month: 'Nov 2025', value: 14 },
];

const projects = [
  { name: 'UI refresh', status: 'At risk', author: 'romain', time: '1 day ago', description: 'iOS implementation is mostly complete, but Android updates are still work in progress. Risk of timeline slip if remaining design decisions aren\'t finalized soon.' },
  { name: 'Tokyo launch', status: 'On track', author: 'julian', time: '3 hours ago', description: 'Localization efforts have been completed. Everything else on track for launch in early September.' },
];

const cycleData = [
  { agent: 'Cursor', value: 45 },
  { agent: 'Codex', value: 32 },
  { agent: 'No Agent', value: 28 },
];

export default function Monitor() {
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
              Understand
              <br />
              progress at scale
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Take the guesswork out of product development with project updates, analytics, and dashboards that surface what needs your attention.
            </p>
            <a
              href="#monitor"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                5.0
                <span className="text-white/60">Monitor</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right Content - Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Chart Section */}
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm">Issue count by created date</span>
                </div>
                <div className="flex items-end gap-8 h-32">
                  {[18, 16, 14, 12, 10, 8, 6, 4, 2, 0].map((value) => (
                    <div key={value} className="flex-1 flex flex-col justify-end">
                      <span className="text-white/30 text-xs mb-2">{value}</span>
                      <div className="w-full h-px bg-white/10" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {chartData.map((item) => (
                    <span key={item.month} className="text-white/40 text-xs">{item.month}</span>
                  ))}
                </div>
              </div>

              {/* Cycle Time */}
              <div className="p-4 border-b border-white/5">
                <div className="text-white/60 text-sm mb-3">Cycle time by agent</div>
                <div className="space-y-2">
                  {cycleData.map((item) => (
                    <div key={item.agent} className="flex items-center gap-3">
                      <span className="text-white/60 text-sm w-20">{item.agent}</span>
                      <div className="flex-1 h-4 bg-white/[0.03] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/20 rounded-full"
                          style={{ width: `${(item.value / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Pulse */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-sm">Weekly Pulse for Mar 12</span>
                  <button className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded text-white/60 text-xs hover:bg-white/10 transition-colors">
                    <Play className="w-3 h-3" />
                    1.0×
                  </button>
                </div>

                {/* Projects */}
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.name} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-medium">{project.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            project.status === 'At risk'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                        <span>By {project.author}</span>
                        <span>·</span>
                        <span>{project.time}</span>
                      </div>
                      <p className="text-white/50 text-sm">{project.description}</p>
                    </div>
                  ))}
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { num: '5.1', name: 'Pulse' },
                    { num: '5.2', name: 'Insights' },
                    { num: '5.3', name: 'Dashboards' },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5"
                    >
                      <span className="text-white/40 text-xs">{item.num}</span>
                      <span className="text-white/70 text-sm">{item.name}</span>
                      <PlusIcon />
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

function PlusIcon() {
  return (
    <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
