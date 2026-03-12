import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const codeDiff = {
  filename: 'kinetic-ios/src/screens/Home/HomeScreen.tsx',
  before: `import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useVehicleState } from '@hooks/useVehicleState'
import { Dashboard } from '@components/Dashboard'

export const HomeScreen = () => {
  const { vehicleState, isFullySynced } = useVehicleState()

  if (!isFullySynced) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View>
      <Dashboard state={vehicleState} />
    </View>
  )
}`,
  after: `import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useVehicleState, SyncStatus } from '@hooks/useVehicleState'
import { Dashboard } from '@components/Dashboard'

export const HomeScreen = () => {
  const { vehicleState, syncStatus } = useVehicleState()

  if (syncStatus === SyncStatus.PENDING) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View>
      <Dashboard 
        state={vehicleState} 
        syncStatus={syncStatus} 
      />
    </View>
  )
}`,
};

export default function Diffs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Code Diff */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              {/* Diff Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                <code className="text-white/60 text-sm">{codeDiff.filename}</code>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">+12</span>
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">-8</span>
                </div>
              </div>

              {/* Code Diff */}
              <div className="p-4 overflow-x-auto">
                <div className="font-mono text-sm">
                  {/* Before */}
                  <div className="mb-4">
                    <div className="text-white/40 text-xs mb-2">Before</div>
                    <pre className="text-white/50">
                      {codeDiff.before.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-white/20 w-8 text-right mr-4 select-none">{i + 1}</span>
                          <span className={line.includes('isFullySynced') || line.includes('!isFullySynced') ? 'bg-red-500/10 text-red-300' : ''}>
                            {line}
                          </span>
                        </div>
                      ))}
                    </pre>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-4" />

                  {/* After */}
                  <div>
                    <div className="text-white/40 text-xs mb-2">After</div>
                    <pre className="text-white/50">
                      {codeDiff.after.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="text-white/20 w-8 text-right mr-4 select-none">{i + 1}</span>
                          <span className={
                            line.includes('SyncStatus') || line.includes('syncStatus') 
                              ? 'bg-green-500/10 text-green-300' 
                              : line.includes('syncStatus') && line.includes('PENDING')
                              ? 'bg-green-500/10 text-green-300'
                              : ''
                          }>
                            {line}
                          </span>
                        </div>
                      ))}
                    </pre>
                  </div>
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
              Review PRs and
              <br />
              agent output
            </h2>
            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              Understand code changes at a glance with structural diffs for human and agent output. Review, discuss, and merge — all within Linear.
            </p>
            <a
              href="#diffs"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white/10 rounded-full">
                4.0
                <span className="text-white/60">Diffs (Coming soon)</span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
