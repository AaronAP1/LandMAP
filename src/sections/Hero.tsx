import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import andesMpBanner from '../img/ANDESMPServidorSimulacionets2.png';
import banner from '../img/banner.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d0d0d] pb-16 pt-12 sm:pt-20 lg:pt-24">
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
        <motion.div
          initial={{ opacity: 0, x: 60, y: -40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="pointer-events-none absolute top-0 right-0 z-10 hidden lg:block lg:w-[400px] xl:w-[460px]"
        >
          <motion.div
            className="relative"
            style={{ transform: 'translateY(-220px)' }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute -inset-8 opacity-60 blur-2xl rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,69,0,0.4), rgba(59,130,246,0.2), transparent 70%)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={andesMpBanner}
              alt="AndesMP – Servidor Peruano ETS2"
              className="relative h-auto w-full drop-shadow-[0_12px_40px_rgba(255,69,0,0.3)]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        <div className="relative mb-12 mt-20 sm:mt-36 lg:mt-60">

          <div>
            {/* Left: text */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="group mb-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
                  <span className="text-white transition-all duration-300 group-hover:text-red-400 group-hover:[text-shadow:0_0_10px_rgba(255,255,255,0.35)]">AndesMP</span>{' '}
                  servidor
                  <br />
                  para rodar en comunidad
                </h1>
              </motion.div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-xl text-base text-white/50"
            >
              Entra, conecta y disfruta rutas tranquilas, eventos casuales y una comunidad activa sin drama.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              href="#diffs"
              className="group inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 text-sm text-white/60 transition-colors hover:text-white sm:ml-4"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                <Sparkles className="h-3 w-3" />
                Muy Pronto
              </span>
              Estado del servidor AndesMP
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
            </div>{/* end text */}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="absolute inset-0 scale-110 bg-gradient-radial from-blue-500/[0.12] via-blue-500/[0.03] to-transparent blur-3xl" />

          <img
            src={banner}
            alt="AndesMP Banner"
            className="w-full rounded-xl border border-blue-500/20 shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
