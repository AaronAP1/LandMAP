import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const businessFeatures = [
  {
    title: 'Experiencia Premium',
    description: 'Servidor Pensado y desarrollado para ofrecer la mejor experiencia de juego.'
  },
  {
    title: 'Comunidad Activa',
    description: 'Forma parte de una comunidad dinámica con eventos regulares y contenido exclusivo.'
  }
];

const partners = [
  'NVIDIA',
  'CLOUDFLARE',
  'AMAZON AWS',
  'INTEL'
];

const platformFeatures = [
  {
    title: 'Launcher Propio',
    description: 'Cliente oficial optimizado para descargas rápidas y actualizaciones automáticas.'
  },
  {
    title: 'Rendimiento Óptimo',
    description: 'Servidor de buena calidad y configuracion para una experiencia fluida'
  },
  {
    title: 'Equipo Dedicado',
    description: 'Soporte técnico especializado disponible para resolver problemas al instante.'
  },
  {
    title: 'Sistema VTC Propio',
    description: 'Sistema desarrollado propio para gestionar empresas, mods, eventos y más.'
  }
];

const serverCapabilities = [
  {
    title: 'Mapas Variados',
    description: 'Rotación semanal y temporada de mapas únicos: urbanos, panorámicos y técnicos.'
  },
  {
    title: 'Eventos ',
    description: 'Eventos semanales, mensuales para mantener la emoción.'
  },
  {
    title: 'Atento a la Comunidad',
    description: 'El equipo escucha activamente el feedback para mejorar continuamente la experiencia de juego.'
  },
  {
    title: 'Launcher AndesMP',
    description: 'Cliente oficial optimizado que descarga y actualiza todo automáticamente.'
  },
  {
    title: 'Sistema de Empresas',
    description: 'Crea o únete a empresas para competir en el ranking'
  },
  {
    title: 'Contenido Mensual',
    description: 'Nuevos mapas, eventos y características cada mes para experiencia fresca.'
  }
];

const staffMembers = [
  {
    role: 'Fundador Andes MP',
    name: 'Bless',
    discord: 'Linux#0001',
    badge: 'rose',
    badgeBg: 'border-rose-500/50 bg-rose-500/5'
  },
  {
    role: 'Fundador Andes MP',
    name: 'Juan de Dios',
    discord: 'Luiz2510#0001',
    badge: 'rose',
    badgeBg: 'border-rose-500/50 bg-rose-500/5'
  },
  {
    role: 'Fundador Andes MP',
    name: 'Diosito',
    discord: 'TSA#0001',
    badge: 'rose',
    badgeBg: 'border-rose-500/50 bg-rose-500/5'
  }
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
};

export default function ServerPage() {
  return (
    <main className="relative overflow-hidden bg-black px-4 pb-20 pt-40 sm:px-6 lg:px-8">
      {/* Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-12 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-[460px] w-[460px] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-[380px] w-[380px] rounded-full bg-rose-400/8 blur-3xl" />
      </div>

      {/* Hero Section */}
      <motion.section {...reveal} className="relative mx-auto max-w-5xl text-center">
        <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
          Bienvenido a
          <br />
          <span className="text-emerald-400">Andes MP</span>
          <br />
          Servidor Simulación Peruano
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/70 sm:text-base">
          Experimenta Andes MP como nunca antes. Servidor estable con comunidad activa, mapas exclusivos y eventos emocionantes que suceden.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          
        </div>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* Business Features Section */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl text-center">
        <div className="grid gap-8 lg:grid-cols-2">
          {businessFeatures.map((feature) => (
            <div key={feature.title} className="text-left">
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* Partners Logo Section */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.15em] text-white/50">
          Con lo mejor en servidores
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] py-6"
            >
              <span className="text-sm font-semibold text-white/60">{partner}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* Platform Description */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl text-center">
        <h2 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
          Servidor confiable y
          <br />
          <span className="text-cyan-300">Pensada para todos los jugadores</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/70 sm:text-base">
          AndesMP ofrece la experiencia de juego más completa con infraestructura profesional, equipo de soporte dedicado y actualizaciones regulares. Únete, vamos a formar algo nuevo.
        </p>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* Platform Features Grid */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-4 transition hover:bg-white/[0.05]"
            >
              <h3 className="text-sm font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-xs text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* Main Features Section */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.15em] text-cyan-300">CARACTERÍSTICAS</p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          Lo que hace de AndesMP especial
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
          Cada característica está diseñada para ofrecerte la mejor experiencia de MapleStory privado con innovaciones que no encontrarás en otros servidores.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serverCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              {...reveal}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 text-left"
            >
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded bg-white/10">
                <span className="text-xs font-bold text-cyan-300">0{index + 1}</span>
              </div>
              <h3 className="text-base font-bold text-white">{capability.title}</h3>
              <p className="mt-2 text-xs text-white/70">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* Staff Section */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Nuestro <span className="text-emerald-400">Equipo</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70">
          Conoce al dedicado staff que mantiene Andes MP funcionando sin problemas.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staffMembers.map((member, index) => (
            <motion.div
              key={member.name}
              {...reveal}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition hover:bg-white/[0.05]"
            >
              <div className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${member.badgeBg}`}>
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {member.role}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{member.name}</h3>
              <p className="mt-2 text-xs text-white/60">Perfil</p>
              <button className="mt-4 rounded-md border border-cyan-400/50 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 transition hover:bg-cyan-400/20">
                
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Separator */}
      <motion.div {...reveal} className="relative mx-auto mt-16 max-w-5xl border-t border-white/10" />

      {/* CTA Section */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-4xl text-center">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-amber-300/10 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            ¿Listo para la aventura?
            <br />
            Descarga el cliente ahora
          </h2>
          <p className="mt-4 text-sm text-white/70">
            Nuestro launcher oficial te instala todo automáticamente. Comienza a jugar en minutos.
          </p>
          <button className="mt-6 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
            Descargar Launcher
          </button>
        </div>
      </motion.section>

      {/* Back Button */}
      <motion.section {...reveal} className="relative mx-auto mt-16 max-w-5xl">
        <div className="border-t border-white/10 pt-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-white/70 transition hover:text-white"
          >
        
          </Link>
        </div>
      </motion.section>
    </main>
  );
}