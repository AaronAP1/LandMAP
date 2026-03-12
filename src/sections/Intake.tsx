import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const columns = [
  {
    name: 'Backlog',
    count: 8,
    issues: [
      { id: 'ENG-2085', title: 'Reduce UI flicker during autonomy...', labels: [] },
      { id: 'ENG-2094', title: 'Add buffering for autonomy event streams', labels: [] },
      { id: 'ENG-2092', title: 'Reduce startup delay caused by vehicle sync', labels: [] },
      { id: 'ENG-2200', title: 'Fix delayed route updates during rerouting', labels: [] },
    ],
  },
  {
    name: 'Todo',
    count: 71,
    issues: [
      { id: 'ENG-926', title: 'Remove UI inconsistencies', labels: [{ name: 'Bug', color: 'red' }, { name: 'Design', color: 'purple' }] },
      { id: 'ENG-2088', title: 'TypeError: Cannot read properties', labels: [{ name: 'Bug', color: 'red' }] },
      { id: 'ENG-924', title: 'Upgrade to Claude Opus 4.5', labels: [{ name: 'AI', color: 'blue' }] },
      { id: 'ENG-1882', title: 'Optimize load times', labels: [{ name: 'Performance', color: 'green' }] },
    ],
  },
  {
    name: 'In Progress',
    count: 3,
    issues: [
      { id: 'ENG-1487', title: 'Remove contentData from GraphQL API', labels: [{ name: 'API', color: 'orange' }] },
      { id: 'MKT-1028', title: 'Launch page assets', labels: [{ name: 'Design', color: 'purple' }] },
      { id: 'ENG-2187', title: 'Prevent duplicate ride requests on poor...', labels: [{ name: 'Bug', color: 'red' }] },
    ],
  },
  {
    name: 'Done',
    count: 53,
    issues: [
      { id: 'ENG-2074', title: 'Clean up deprecated APIs...', labels: [{ name: 'API', color: 'orange' }] },
      { id: 'ENG-1912', title: 'Reduce latency in autonomy st...', labels: [] },
      { id: 'ENG-1951', title: 'Reduce ETA fluctuations durin...', labels: [] },
      { id: 'ENG-1960', title: 'Improve fallback messaging', labels: [{ name: 'UI', color: 'pink' }] },
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
              Make product
              <br />
              operations self-driving
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Turn conversations and customer feedback into actionable issues that are routed, labeled, and prioritized for the right team.
            </p>
            <a
              href="#intake"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                1.0
                <span className="text-white/60">Intake</span>
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
                  <span className="text-white/40 text-sm">Thread in</span>
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">#feedback</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 border-b border-white/5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs text-white font-medium">
                    L
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">lena</span>
                      <span className="text-white/40 text-xs">12:59 PM</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Anyone else noticing the iOS app feels slow to open if you haven't used it in a bit?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs text-white font-medium">
                    D
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">didier</span>
                      <span className="text-white/40 text-xs">12:59 PM</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Yea, we're still blocking initial render on a full vehicle_state sync every time...</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xs text-white font-medium">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">andreas</span>
                      <span className="text-white/40 text-xs">12:59 PM</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">Feels like we could render sooner and load the rest in the background. Probably also worth tracking startup timing so we know how often this happens!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-white/60 text-sm">@Linear</span>
                  <span className="text-white/40 text-sm">create</span>
                  <span className="text-white text-sm">urgent issues</span>
                  <span className="text-white/40 text-sm">and assign to me</span>
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
