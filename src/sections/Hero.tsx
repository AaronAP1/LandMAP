import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-[#0d0d0d]">
      {/* Background gradients - layered */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-white/[0.03] via-transparent to-transparent pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 50%, transparent 100%)' }} />
      
      {/* Animated background orbs with better gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-white/[0.04] to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-white/[0.04] to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      {/* Additional subtle orbs for depth */}
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-radial from-purple-500/[0.02] to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-blue-500/[0.02] to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="mb-12 mt-60">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.08] mb-6">
              The product development
              <br />
              system for teams and agents
            </h1>
          </motion.div>

          <div className="flex items-center justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base text-white/50"
            >
              Purpose-built for planning and building products. Designed for the AI era.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 ml-auto"
            >
              <a
                href="#diffs"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors group whitespace-nowrap"
              >
                <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  New
                </span>
                Linear Diffs (Beta)
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* App Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-radial from-emerald-500/[0.15] via-emerald-500/[0.03] to-transparent blur-3xl scale-110" />
          <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 bg-[#0a0a0a] shadow-2xl glow">
            {/* Launcher Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/10 bg-gradient-to-r from-emerald-900/20 to-transparent">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                  <path d="M20 4L4 12L20 20L36 12L20 4Z" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
                  <path d="M4 20L20 28L36 20" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 28L20 36L36 28" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="12" r="2" fill="#fbbf24"/>
                </svg>
                <div>
                  <div className="text-white text-sm font-semibold">AndesMP Launcher</div>
                  <div className="text-emerald-400 text-xs">v2.0.4-beta</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Launcher Content */}
            <div className="flex">
              {/* Sidebar Navigation */}
              <div className="w-48 border-r border-emerald-500/10 bg-gradient-to-b from-emerald-900/10 to-transparent p-3 hidden sm:block">
                <div className="space-y-1">
                  <LauncherSidebarItem icon="play" label="Jugar" active />
                  <LauncherSidebarItem icon="news" label="Noticias" />
                  <LauncherSidebarItem icon="map" label="Mapa" />
                  <LauncherSidebarItem icon="mods" label="Mods" />
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-500/10">
                  <div className="px-2 py-1 text-xs text-emerald-400/60 font-medium uppercase tracking-wider">Comunidad</div>
                  <div className="mt-1 space-y-1">
                    <LauncherSidebarItem icon="users" label="Jugadores" />
                    <LauncherSidebarItem icon="events" label="Eventos" />
                    <LauncherSidebarItem icon="rules" label="Reglas" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-emerald-500/10">
                  <div className="px-2 py-1 text-xs text-emerald-400/60 font-medium uppercase tracking-wider">Mi Cuenta</div>
                  <div className="mt-1 space-y-1">
                    <LauncherSidebarItem icon="profile" label="Perfil" />
                    <LauncherSidebarItem icon="settings" label="Ajustes" />
                  </div>
                </div>
              </div>

              {/* Main Game Area */}
              <div className="flex-1 bg-[#0a0a0a] min-h-[500px] relative">
                {/* Game Banner Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-blue-900/10" />
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Game Title & Status */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl text-white font-semibold">Euro Truck Simulator 2</h2>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 text-sm font-medium">Online</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm">AndesMP - Servidor Peruano Multiplayer</p>
                  </div>

                  {/* Server Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Jugadores</div>
                      <div className="text-white text-xl font-semibold">243<span className="text-white/40 text-base">/500</span></div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Ping</div>
                      <div className="text-emerald-400 text-xl font-semibold">32ms</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Uptime</div>
                      <div className="text-white text-xl font-semibold">99.8%</div>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="space-y-3 mb-6">
                    <InfoRow label="Versión" value="1.50.x" />
                    <InfoRow label="Mapa" value="Perú + Chile Expandido" />
                    <InfoRow label="Modo" value="Convoy Realista" />
                    <InfoRow label="Economía" value="x2 Ganancias" />
                  </div>

                  {/* Play Button */}
                  <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-lg rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/30">
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>JUGAR AHORA</span>
                    </div>
                  </button>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button className="py-2 px-4 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-colors border border-white/10">
                      Verificar Archivos
                    </button>
                    <button className="py-2 px-4 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-colors border border-white/10">
                      Ver Changelog
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Info Panel */}
              <div className="w-64 border-l border-emerald-500/10 bg-gradient-to-b from-emerald-900/10 to-transparent p-4 hidden lg:block">
                <div className="space-y-4">
                  {/* User Profile */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        JD
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">JuanDiaz_PE</div>
                        <div className="text-emerald-400 text-xs">Nivel 24</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
                      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-1.5 rounded-full" style={{ width: '68%' }} />
                    </div>
                    <div className="text-white/40 text-xs">6,820 / 10,000 XP</div>
                  </div>

                  {/* Latest News */}
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-3 font-medium">Últimas Noticias</div>
                    <div className="space-y-2">
                      <NewsItem 
                        title="Nuevo evento: Ruta Cusco"
                        time="Hace 2 horas"
                        badge="Evento"
                      />
                      <NewsItem 
                        title="Actualización v2.0.4"
                        time="Hace 1 día"
                        badge="Update"
                      />
                      <NewsItem 
                        title="Mantenimiento programado"
                        time="Hace 3 días"
                        badge="Info"
                      />
                    </div>
                  </div>

                  {/* Discord Link */}
                  <a href="#" className="block p-3 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 hover:border-indigo-500/50 transition-colors group">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      <span className="text-white text-sm font-medium">Únete al Discord</span>
                    </div>
                    <span className="text-indigo-300 text-xs group-hover:text-indigo-200 transition-colors">+2,450 miembros online</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Launcher Components
function LauncherSidebarItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    play: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
    news: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    map: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
    mods: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
    users: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    events: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    rules: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    profile: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    settings: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  };

  return (
    <button className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
      active 
        ? 'text-emerald-400 bg-emerald-500/20 border border-emerald-500/30' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
    }`}>
      {icons[icon] || icons.play}
      <span className="truncate">{label}</span>
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <span className="text-white/40 text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}

function NewsItem({ title, time, badge }: { title: string; time: string; badge: string }) {
  const badgeColors: Record<string, string> = {
    'Evento': 'bg-amber-500/20 text-amber-400',
    'Update': 'bg-blue-500/20 text-blue-400',
    'Info': 'bg-purple-500/20 text-purple-400',
  };

  return (
    <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-white text-xs font-medium leading-tight flex-1">{title}</span>
        <span className={`px-1.5 py-0.5 rounded text-xs font-medium whitespace-nowrap ${badgeColors[badge] || 'bg-white/10 text-white/60'}`}>
          {badge}
        </span>
      </div>
      <span className="text-white/40 text-xs">{time}</span>
    </div>
  );
}
