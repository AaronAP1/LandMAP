import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ConstructionPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-20">
      {/* Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-12 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-[460px] w-[460px] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Logo */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <img
            src="/src/img/logo-andes.png"
            alt="AndesMP Logo"
            className="h-40 sm:h-48 drop-shadow-2xl"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            En <span className="text-emerald-400">Construcción</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/70 sm:text-base">
            Estamos trabajando en traerte algo increíble. Vuelve pronto para descubrir las novedades de Andes MP.
          </p>

          {/* Progress Bar Animation */}
          <motion.div className="mt-8 h-1 w-32 overflow-hidden rounded-full bg-white/10 sm:w-40">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300"
              animate={{
                width: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
