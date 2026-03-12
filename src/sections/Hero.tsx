import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Download,
  Gamepad2,
  House,
  Newspaper,
  Play,
  Settings,
  Sparkles,
  UserCircle2,
} from 'lucide-react';
import andesMpBanner from '../img/servidorPeruanoETS2AndesMP.svg?url';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d0d0d] pb-16 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 50%, transparent 100%)',
        }}
      />

      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-radial from-white/[0.04] to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-radial from-white/[0.04] to-transparent blur-3xl" style={{ animationDelay: '1.5s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SVG overlaid to the right, out of hero text flow */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute top-0 right-0 z-10 hidden lg:block lg:w-[400px] xl:w-[460px]"
        >
          <img
            src={andesMpBanner}
            alt="AndesMP – Servidor Peruano ETS2"
            className="h-auto w-full drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            style={{ transform: 'translateY(-220px)' }}
          />
        </motion.div>

        <div className="relative mb-12 mt-60">

          <div>
            {/* Left: text */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="mb-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
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

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              href="#diffs"
              className="group ml-auto inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                <Sparkles className="h-3 w-3" />
                New
              </span>
              Linear Diffs (Beta)
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
            </div>{/* end text */}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="absolute inset-0 scale-110 bg-gradient-radial from-blue-500/[0.12] via-blue-500/[0.03] to-transparent blur-3xl" />

          <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-[#060d1f] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1a2c4a] bg-[#071329] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-sm bg-gradient-to-br from-red-500 to-red-700" />
                <span className="text-sm font-semibold text-white">AndesMP Launcher</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>v2.0</span>
                <button className="rounded bg-white/5 px-2 py-1 hover:bg-white/10">_</button>
                <button className="rounded bg-white/5 px-2 py-1 hover:bg-white/10">X</button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <aside className="w-full border-b border-[#1a2c4a] bg-[#101f39] lg:w-56 lg:border-b-0 lg:border-r">
                <div className="border-b border-[#223a61] p-5">
                  <div className="mb-2 text-3xl font-black tracking-tight text-white">ANDESMP</div>
                  <p className="text-xs text-slate-300">Launcher oficial de la comunidad</p>
                </div>

                <div className="space-y-1 p-3">
                  <LauncherSidebarItem icon={<House className="h-4 w-4" />} label="Inicio" active />
                  <LauncherSidebarItem icon={<Gamepad2 className="h-4 w-4" />} label="AndesMP" />
                  <LauncherSidebarItem icon={<Newspaper className="h-4 w-4" />} label="Noticias" />
                </div>

                <div className="mt-10 border-t border-[#223a61] p-3">
                  <LauncherSidebarItem icon={<Settings className="h-4 w-4" />} label="Configuracion" />
                  <LauncherSidebarItem
                    icon={<UserCircle2 className="h-4 w-4" />}
                    label="[JDT] Bless"
                    trailing={<ChevronRight className="h-3.5 w-3.5" />}
                  />
                </div>
              </aside>

              <main className="flex-1 bg-[#050d20]">
                <div className="relative border-b border-[#1a2c4a] p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,15,34,0.98)_45%,rgba(8,15,34,0.45)_100%)]" />
                  <div className="absolute inset-y-0 right-0 w-[45%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),transparent_70%)]" />

                  <div className="relative max-w-2xl">
                    <span className="inline-flex items-center rounded bg-red-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      Servidor oficial
                    </span>
                    <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
                      Bienvenido a AndesMP
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-xl sm:leading-8">
                      Unete a la experiencia multijugador mas emocionante. Construye, explora y compite con jugadores de todo el mundo.
                    </p>
                    <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-500">
                      <Play className="h-4 w-4" fill="currentColor" />
                      Jugar ahora
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-white">Noticias</h3>
                    <button className="text-sm text-slate-300 hover:text-white">Ver todo</button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <LauncherNewsCard
                      badge="Nueva actualizacion"
                      title="Nueva temporada disponible"
                      summary="Cambios de economia, eventos semanales y rutas renovadas para la comunidad."
                    />
                    <LauncherNewsCard
                      badge="Notas del parche"
                      title="Version 2.0 lanzada"
                      summary="Mejoras de rendimiento, nuevo sistema de mods y ajustes de estabilidad en convoy."
                      alt
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1a2c4a] bg-[#08152c] p-4 sm:px-8">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                    <Download className="h-4 w-4" />
                    Descargar mods
                  </button>

                  <button className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-lg bg-[#273754] px-6 py-3 text-lg font-bold text-slate-200 transition hover:bg-[#30466a]">
                    <Play className="h-4 w-4" fill="currentColor" />
                    JUGAR
                  </button>
                </div>
              </main>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LauncherSidebarItem({
  icon,
  label,
  active = false,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition ${
        active
          ? 'bg-red-600/20 text-red-300 ring-1 ring-red-500/40'
          : 'text-slate-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      {trailing}
    </button>
  );
}

function LauncherNewsCard({
  badge,
  title,
  summary,
  alt = false,
}: {
  badge: string;
  title: string;
  summary: string;
  alt?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border p-5 ${
        alt
          ? 'border-slate-600/70 bg-gradient-to-br from-slate-800 to-slate-700'
          : 'border-red-900/70 bg-gradient-to-br from-[#2b0f16] to-[#111827]'
      }`}
    >
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <span className="relative inline-flex rounded bg-blue-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
        {badge}
      </span>
      <h4 className="relative mt-3 text-2xl font-extrabold leading-tight text-white">{title}</h4>
      <p className="relative mt-2 text-sm text-slate-200">{summary}</p>
      <button className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 transition group-hover:text-white">
        Leer mas
        <ChevronRight className="h-4 w-4" />
      </button>
    </article>
  );
}
