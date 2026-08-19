import * as Accordion from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageShell, {
  GhostLink,
  PrimaryLink,
  SectionLabel,
} from '../components/PageShell';
import { DISCORD_URL, HUB_DOWNLOAD_URL, ROOM_ID } from '../lib/links';

const EASE = [0.22, 1, 0.36, 1] as const;

const TABS = [
  { id: 'guias', label: 'Guias' },
  { id: 'mods', label: 'Mods' },
  { id: 'faq', label: 'FAQ' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const GUIDES = [
  {
    step: '01',
    title: 'Instalar el HUB de AndesMP',
    description:
      'Descarga el ejecutable, permitelo en Windows si aparece el aviso de SmartScreen y deja que el launcher detecte tu instalacion de Euro Truck Simulator 2.',
  },
  {
    step: '02',
    title: 'Conectarte a la sala',
    description: `Abre el HUB, entra al modo multijugador y pega el ID de sala ${ROOM_ID}. Si la sala esta llena o cerrada, el ID actualizado siempre se anuncia en Discord.`,
  },
  {
    step: '03',
    title: 'Elegir tu carroceria',
    description:
      'El pack de buses se instala junto al HUB. Selecciona la carroceria en el concesionario del juego antes de salir a ruta para evitar desincronizaciones en el convoy.',
  },
  {
    step: '04',
    title: 'Unirte a una empresa VTC',
    description:
      'Puedes entrar a una empresa ya consolidada o crear la tuya. Cada empresa gestiona su flota, sus rutas y sus conductores dentro del sistema del servidor.',
  },
  {
    step: '05',
    title: 'Participar en un convoy',
    description:
      'Llega al punto de salida 15 minutos antes para el briefing. Ahi se confirman paradas, combustible y orden de salida para buses, camiones y cargas especiales.',
  },
  {
    step: '06',
    title: 'Reportar un problema',
    description:
      'Si algo falla en la conexion o ves una conducta que rompe las reglas, avisa al staff en Discord con captura o video. Es la via mas rapida de resolucion.',
  },
];

const MODS = [
  {
    name: 'HUB AndesMP',
    type: 'Launcher',
    description:
      'Cliente oficial del servidor. Instala y actualiza automaticamente el resto del contenido, asi que es lo unico que necesitas descargar a mano.',
    action: { label: 'Descargar', href: HUB_DOWNLOAD_URL },
  },
  {
    name: 'Pack de buses',
    type: 'Vehiculos',
    description:
      'Marcopolo G6, G7 y G8, Busscar Busstar, Comil, camiones y minivans. Se distribuye desde el HUB para que todos corran la misma version.',
    action: { label: 'Via HUB', href: HUB_DOWNLOAD_URL },
  },
  {
    name: 'Mapa de la semana',
    type: 'Mapa',
    description:
      'Mientras se trabaja en el mapa definitivo, cada semana rota un mapa distinto. El HUB lo sincroniza antes de conectarte a la sala.',
    action: { label: 'Via HUB', href: HUB_DOWNLOAD_URL },
  },
  {
    name: 'Skins de empresas',
    type: 'Personalizacion',
    description:
      'Pinturas de las VTC activas del servidor. Si tu empresa quiere la suya, se coordina con el staff en Discord.',
    action: { label: 'Solicitar en Discord', href: DISCORD_URL },
  },
];

const FAQ = [
  {
    id: 'requisitos',
    question: '¿Que necesito para jugar en AndesMP?',
    answer:
      'Euro Truck Simulator 2 en tu PC y el HUB de AndesMP instalado. El launcher se encarga del resto del contenido, no hace falta instalar mods a mano.',
  },
  {
    id: 'costo',
    question: '¿El servidor tiene algun costo?',
    answer:
      'No. Entrar, conducir y participar en los eventos es gratuito. Lo unico que necesitas es tener el juego base.',
  },
  {
    id: 'sala',
    question: '¿Por que no encuentro la sala?',
    answer:
      'El ID de sala puede cambiar entre sesiones. El vigente aparece siempre en la barra superior de esta web y en el canal de anuncios de Discord.',
  },
  {
    id: 'mods-propios',
    question: '¿Puedo usar mis propios mods?',
    answer:
      'Los mods graficos y de sonido no suelen dar problema. Los que alteran fisicas, trafico o vehiculos si rompen la sincronizacion con el resto del convoy, asi que no estan permitidos en ruta.',
  },
  {
    id: 'empresa',
    question: '¿Como creo mi propia empresa VTC?',
    answer:
      'Se solicita al staff en Discord con el nombre, la ciudad base y el logo. Una vez aprobada aparece en el directorio del servidor y puede reclutar conductores.',
  },
  {
    id: 'sancion',
    question: '¿Que pasa si me sancionan?',
    answer:
      'Las sanciones se comunican con el motivo y la evidencia. Si consideras que hubo un error, puedes apelar abriendo un ticket en Discord.',
  },
];

function isTabId(value: string | null): value is TabId {
  return TABS.some((tab) => tab.id === value);
}

export default function RecursosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('tab');
  const active: TabId = isTabId(raw) ? raw : 'guias';

  const selectTab = (id: TabId) => {
    setSearchParams(id === 'guias' ? {} : { tab: id }, { replace: true });
  };

  return (
    <PageShell
      eyebrow="Recursos"
      title="Todo lo que necesitas para entrar al servidor y sacarle provecho."
      lead="Guias paso a paso, el contenido que se instala desde el HUB y las preguntas que mas se repiten en Discord."
      actions={
        <>
          <PrimaryLink href={HUB_DOWNLOAD_URL}>Descargar HUB</PrimaryLink>
          <GhostLink href={DISCORD_URL}>Pedir ayuda en Discord</GhostLink>
        </>
      }
    >
      {/* Selector de pestanas */}
      <div
        role="tablist"
        aria-label="Secciones de recursos"
        className="grid auto-cols-fr grid-flow-col border-y border-white/10"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectTab(tab.id)}
              className={`relative border-l border-white/10 px-4 py-5 text-center text-[13px] transition-colors first:border-l-0 ${
                isActive
                  ? 'bg-white/[0.05] text-white'
                  : 'text-white/45 hover:bg-white/[0.02] hover:text-white/75'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="recursos-tab-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-[#e0512f]"
                  transition={{ duration: 0.35, ease: EASE }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div key={active} className="mt-14">
        {active === 'guias' && (
          <section>
            <SectionLabel>Guias paso a paso</SectionLabel>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((guide) => (
                <article key={guide.step} className="bg-[#0a0a0a] p-6">
                  <span className="font-mono text-[11px] text-white/30">
                    {guide.step}
                  </span>
                  <h2 className="mt-4 text-lg leading-snug text-white">
                    {guide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {guide.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {active === 'mods' && (
          <section>
            <SectionLabel>Contenido del servidor</SectionLabel>
            <div className="border-t border-white/10">
              {MODS.map((mod) => (
                <article
                  key={mod.name}
                  className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[180px_1fr_auto] sm:items-start sm:gap-8"
                >
                  <div>
                    <h2 className="text-lg text-white">{mod.name}</h2>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                      {mod.type}
                    </p>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-white/50">
                    {mod.description}
                  </p>
                  <a
                    href={mod.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                  >
                    {mod.action.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/40">
              Todo el contenido se sincroniza desde el HUB. Descargar mods del
              servidor por fuera puede dejarte con una version distinta a la del
              resto del convoy.
            </p>
          </section>
        )}

        {active === 'faq' && (
          <section>
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <Accordion.Root
              type="single"
              collapsible
              defaultValue={FAQ[0].id}
              className="max-w-3xl border-t border-white/10"
            >
              {FAQ.map((item) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  className="border-b border-white/10"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left [&[data-state=closed]_.icon-minus]:hidden [&[data-state=open]_.icon-plus]:hidden">
                      <span className="text-base leading-snug text-white sm:text-lg">
                        {item.question}
                      </span>
                      <Plus className="icon-plus h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-white" />
                      <Minus className="icon-minus h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-white" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-white/50 sm:text-base">
                      {item.answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </section>
        )}
      </div>
    </PageShell>
  );
}
