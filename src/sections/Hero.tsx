import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import andesMpLogo from '../img/ANDESMPServidorSimulacionets2.png';
import banner from '../img/banner.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

const DISCORD_URL = 'https://discord.gg/eYeqrj3PAx';
const HUB_URL =
  'https://andesmap.s3.us-east-2.amazonaws.com/Ejecutable/HubANDES_Setup_1.6.0.exe';

type Showcase = {
  id: string;
  tab: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
};

const SHOWCASES: Showcase[] = [
  {
    id: 'g6',
    tab: 'Marcopolo G6',
    title: 'Marcopolo G6',
    description:
      'La generacion clasica de la ruta peruana. Ideal para convoys largos y viajes nocturnos entre regiones.',
    tags: ['Interprovincial', 'Clasico', 'Convoy'],
    image: banner,
  },
  {
    id: 'g7',
    tab: 'Marcopolo G7',
    title: 'Marcopolo G7',
    description:
      'El bus mas usado del servidor. Equilibrio entre maniobrabilidad en ciudad y comodidad en carretera.',
    tags: ['Interprovincial', 'Popular', 'Ruta larga'],
    image: banner,
  },
  {
    id: 'g8',
    tab: 'Marcopolo G8',
    title: 'Marcopolo G8',
    description:
      'La generacion mas nueva, con acabados modernos y presencia pensada para las flotas premium de las empresas VTC.',
    tags: ['Premium', 'Flota VTC', 'Nuevo'],
    image: banner,
  },
  {
    id: 'busstar',
    tab: 'Busstar',
    title: 'Busscar Busstar',
    description:
      'Carroceria robusta para rutas de sierra. Pensada para tramos exigentes y horarios de alta demanda.',
    tags: ['Sierra', 'Robusto', 'Alta demanda'],
    image: banner,
  },
  {
    id: 'comil',
    tab: 'Comil',
    title: 'Comil',
    description:
      'Alternativa versatil dentro del servidor, con variantes que encajan tanto en rutas cortas como en servicios especiales.',
    tags: ['Versatil', 'Ruta corta', 'Especial'],
    image: banner,
  },
  {
    id: 'camiones',
    tab: 'Camiones',
    title: 'Camiones',
    description:
      'Para quienes prefieren la carga antes que el pasaje. Trabajo logistico dentro del mismo mapa y las mismas rutas.',
    tags: ['Carga', 'Logistica', 'Trabajo'],
    image: banner,
  },
  {
    id: 'minivans',
    tab: 'Minivans',
    title: 'Minivans',
    description:
      'Unidades ligeras para trayectos urbanos y conexiones rapidas entre ciudades del mapa.',
    tags: ['Urbano', 'Ligero', 'Conexion'],
    image: banner,
  },
];

const META_LEFT = '+ Comunidad peruana de simulacion en ETS2';
const META_RIGHT = ['+ Semana de pruebas activa', '+ Rutas, Empresas, Convoys'];

export default function Hero() {
  const [activeId, setActiveId] = useState(SHOWCASES[1].id);
  const active = SHOWCASES.find((item) => item.id === activeId) ?? SHOWCASES[0];

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pb-20 pt-12 sm:pb-28 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(80%_60%_at_70%_0%,rgba(224,81,47,0.10),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        {/* Fila 1: titular + logo */}
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-[34rem]"
          >
            <h1 className="text-[26px] font-normal leading-[1.22] tracking-[-0.03em] text-white sm:text-[32px] lg:text-[38px]">
              Servidor peruano de ETS2 con rutas reales, empresas VTC y convoys.
              Conduce, disfruta y respeta en comunidad.
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href={HUB_URL}
                rel="noopener noreferrer"
                className="rounded-md bg-[#e0512f] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#f0603c]"
              >
                Descargar HUB
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/80 transition-colors hover:border-white/25 hover:text-white"
              >
                Unirse a Discord
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="justify-self-start lg:justify-self-end"
          >
            <motion.img
              src={andesMpLogo}
              alt="AndesMP - servidor peruano de simulacion ETS2"
              className="h-auto w-[190px] select-none sm:w-[240px] lg:w-[300px] xl:w-[340px]"
              draggable={false}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Fila 2: metadatos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-12 grid gap-3 text-[12px] leading-relaxed text-white/35 sm:mt-16 sm:grid-cols-2"
        >
          <p>{META_LEFT}</p>
          <div className="space-y-1">
            {META_RIGHT.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>

        {/* Fila 3: selector de carrocerias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="-mx-5 mt-8 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="tablist"
            aria-label="Carrocerias disponibles"
            className="grid min-w-max auto-cols-[minmax(140px,1fr)] grid-flow-col border-y border-white/10 sm:min-w-0 sm:auto-cols-fr"
          >
            {SHOWCASES.map((item) => {
              const isActive = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(item.id)}
                  className={`relative border-l border-white/10 px-4 py-6 text-center text-[13px] transition-colors first:border-l-0 sm:py-8 ${
                    isActive
                      ? 'bg-white/[0.05] text-white'
                      : 'text-white/45 hover:bg-white/[0.02] hover:text-white/75'
                  }`}
                >
                  {item.tab}
                  {isActive && (
                    <motion.span
                      layoutId="hero-tab-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-[#e0512f]"
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Fila 4: tarjeta destacada */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[16/8]">
            <motion.img
              key={`img-${active.id}`}
              src={active.image}
              alt={active.title}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <motion.div
              key={`copy-${active.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10"
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-medium tracking-[-0.02em] text-white sm:text-2xl lg:text-3xl">
                {active.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                {active.description}
              </p>

              <Link
                to="/servidor"
                className="group mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
              >
                Ver el servidor
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
