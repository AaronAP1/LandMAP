import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Terminal, Cpu, Zap, GitBranch } from 'lucide-react';

const agents = [
  { name: 'Steven', color: 'from-blue-500 to-cyan-500', icon: Terminal },
  { name: 'Ema', color: 'from-purple-500 to-pink-500', icon: Cpu },
  { name: 'GitHub Copilot', color: 'from-green-500 to-emerald-500', icon: Zap },
  { name: 'Cursor', color: 'from-amber-500 to-orange-500', icon: GitBranch },
];

const steps = [
  { num: '3.1', name: 'Issues' },
  { num: '3.2', name: 'Agents' },
  { num: '3.3', name: 'Linear MCP' },
  { num: '3.4', name: 'Git automations' },
  { num: '3.5', name: 'Cycles' },
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
              Ven, crea y une gente para tu propia empresa de transporte. Con nuestro sistema de VTC, puedes gestionar tu flota, contratar conductores y para ser el mejor. 
            </p>
            <a
              href="#build"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                3.0
                <span className="text-white/60">Build</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right Content - Agent Interface */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Agent Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Terminal className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Codex</span>
                </div>
                <span className="text-white/40 text-xs">Agent</span>
              </div>

              {/* Agent Chat */}
              <div className="p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xs text-white font-medium">
                    J
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">jori</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">On it! I've received your request.</p>
                    <p className="text-white/50 text-sm mt-2">Kicked off a task in <code className="px-1 py-0.5 bg-white/10 rounded text-white/70 text-xs">kinetic/kinetic-iOS</code> environment.</p>
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="p-4 rounded-lg bg-black/50 border border-white/5 font-mono text-sm">
                  <div className="flex items-center gap-2 text-white/40 mb-2">
                    <span>Searching for root AGENTS file</span>
                  </div>
                  <div className="text-white/60">
                    <span className="text-white/40">kinetic/kinetic-iOS$</span> /bin/bash -lc rg --files -g 'AGENTS.md'
                  </div>
                  <div className="text-white/80 mt-1">AGENTS.md</div>
                  <div className="flex items-center gap-2 text-white/40 mt-3">
                    <span>Locating initialization logic for</span>
                    <code className="px-1 py-0.5 bg-white/10 rounded text-white/60 text-xs">vehicle_state</code>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white/40">Thinking</span>
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                  </div>
                </div>

                {/* Agents List */}
                <div className="flex items-center gap-2 flex-wrap">
                  {agents.map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5"
                    >
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${agent.color}`} />
                      <span className="text-white/70 text-xs">{agent.name}</span>
                      {agent.name === 'Codex' && (
                        <span className="text-white/40 text-xs">Agent</span>
                      )}
                    </div>
                  ))}
                </div>
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
