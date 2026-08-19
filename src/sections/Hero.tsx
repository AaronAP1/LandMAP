import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import andesMpLogo from '../img/ANDESMPServidorSimulacionets2.png';
import g6Wide from '../img/buses/g6_andesmp.webp';
import g6Small from '../img/buses/g6_andesmp@800.webp';
import g7Wide from '../img/buses/g7_andesmp.webp';
import g7Small from '../img/buses/g7_andesmp@800.webp';
import newG7Wide from '../img/buses/newg7_andesmp.webp';
import newG7Small from '../img/buses/newg7_andesmp@800.webp';
import g8Wide from '../img/buses/g8_andesmp.webp';
import g8Small from '../img/buses/g8_andesmp@800.webp';
import busscarWide from '../img/buses/busscar_andesmp.webp';
import busscarSmall from '../img/buses/busscar_andesmp@800.webp';
import comilWide from '../img/buses/comil_andesmp.webp';
import comilSmall from '../img/buses/comil_andesmp@800.webp';
import vanWide from '../img/buses/van_andesmp.webp';
import vanSmall from '../img/buses/van_andesmp@800.webp';

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
  /** Version 1600px, usada en desktop. */
  image: string;
  /** Version 800px, usada en moviles via srcSet. */
  imageSmall: string;
};

const SHOWCASES: Showcase[] = [
  {
    id: 'g6',
    tab: 'Marcopolo G6',
    title: 'Marcopolo G6',
    description:
      'La generacion clasica de la ruta peruana. Ideal para convoys largos y viajes nocturnos entre regiones.',
    tags: ['Interprovincial', 'Clasico', 'Convoy'],
    image: g6Wide,
    imageSmall: g6Small,
  },
  {
    id: 'g7',
    tab: 'Marcopolo G7',
    title: 'Marcopolo G7',
    description:
      'El bus mas usado del servidor. Equilibrio entre maniobrabilidad en ciudad y comodidad en carretera.',
    tags: ['Interprovincial', 'Popular', 'Ruta larga'],
    image: g7Wide,
    imageSmall: g7Small,
  },
  {
    id: 'newg7',
    tab: 'Marcopolo New G7',
    title: 'Marcopolo New G7',
    description:
      'La puesta al dia del G7, con frontal renovado y el mismo comportamiento en ruta que ya conoce la comunidad.',
    tags: ['Interprovincial', 'Renovado', 'Ruta larga'],
    image: newG7Wide,
    imageSmall: newG7Small,
  },
  {
    id: 'g8',
    tab: 'Marcopolo G8',
    title: 'Marcopolo G8',
    description:
      'La generacion mas nueva, con acabados modernos y presencia pensada para las flotas premium de las empresas VTC.',
    tags: ['Premium', 'Flota VTC', 'Nuevo'],
    image: g8Wide,
    imageSmall: g8Small,
  },
  {
    id: 'busstar',
    tab: 'Busstar',
    title: 'Busscar Busstar',
    description:
      'Carroceria robusta para rutas de sierra. Pensada para tramos exigentes y horarios de alta demanda.',
    tags: ['Sierra', 'Robusto', 'Alta demanda'],
    image: busscarWide,
    imageSmall: busscarSmall,
  },
  {
    id: 'comil',
    tab: 'Comil',
    title: 'Comil',
    description:
      'Alternativa versatil dentro del servidor, con variantes que encajan tanto en rutas cortas como en servicios especiales.',
    tags: ['Versatil', 'Ruta corta', 'Especial'],
    image: comilWide,
    imageSmall: comilSmall,
  },
  {
    id: 'minivans',
    tab: 'Minivans',
    title: 'Minivans',
    description:
      'Unidades ligeras para trayectos urbanos y conexiones rapidas entre ciudades del mapa.',
    tags: ['Urbano', 'Ligero', 'Conexion'],
    image: vanWide,
    imageSmall: vanSmall,
  },
];

/** Tiempo que permanece visible cada carroceria antes de pasar a la siguiente. */
const AUTOPLAY_MS = 6000;

const META_LEFT = '+ Comunidad peruana de simulacion en ETS2';
const META_RIGHT = ['+ Semana de pruebas activa', '+ Rutas, Empresas, Convoys'];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = SHOWCASES[activeIndex];

  // El progreso se escribe directo sobre el nodo con rAF para no re-renderizar
  // el Hero 60 veces por segundo.
  const progressRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) {
      if (progressRef.current) {
        progressRef.current.style.transform = 'scaleX(1)';
      }
      return;
    }

    let frame = 0;
    let elapsed = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (!pausedRef.current) elapsed += delta;

      const progress = Math.min(elapsed / AUTOPLAY_MS, 1);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      if (progress >= 1) {
        setActiveIndex((index) => (index + 1) % SHOWCASES.length);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  // Precarga la siguiente imagen para que el cambio no muestre un hueco.
  useEffect(() => {
    const next = SHOWCASES[(activeIndex + 1) % SHOWCASES.length];
    const preload = new Image();
    preload.src = next.image;
  }, [activeIndex]);

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
            {SHOWCASES.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={`relative border-l border-white/10 px-4 py-6 text-center text-[13px] transition-colors first:border-l-0 sm:py-8 ${
                    isActive
                      ? 'bg-white/[0.05] text-white'
                      : 'text-white/45 hover:bg-white/[0.02] hover:text-white/75'
                  }`}
                >
                  {item.tab}
                  {/* Barra de carga del autoplay, solo bajo la pestana activa */}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-white/10">
                      <span
                        ref={progressRef}
                        className="block h-full w-full origin-left scale-x-0 bg-[#e0512f]"
                      />
                    </span>
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
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[16/8]">
            <motion.img
              key={`img-${active.id}`}
              src={active.image}
              srcSet={`${active.imageSmall} 800w, ${active.image} 1600w`}
              sizes="(min-width: 1200px) 1136px, 100vw"
              alt={active.title}
              width={1672}
              height={941}
              decoding="async"
              fetchPriority="high"
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
