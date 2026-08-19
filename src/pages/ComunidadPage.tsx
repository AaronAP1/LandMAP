import { ArrowUpRight } from 'lucide-react';
import { trackOutbound } from '../lib/analytics';
import PageShell, {
  GhostLink,
  PrimaryLink,
  SectionLabel,
} from '../components/PageShell';
import { DISCORD_URL, WHATSAPP_URL } from '../lib/links';
import cruzDelSurLogo from '../img/CruzdelSurLogo.png';
import judithLogo from '../img/JudithLogo.png';
import movilBusLogo from '../img/MovilBusLogo.png';
import palominoLogo from '../img/PalominoLogo.png';

const CHANNELS = [
  {
    name: 'Discord',
    handle: 'Canal principal',
    description:
      'Anuncios, agenda de eventos, coordinacion de convoys, soporte y tickets. Es donde ocurre todo el dia a dia del servidor.',
    href: DISCORD_URL,
  },
  {
    name: 'WhatsApp',
    handle: 'Grupo de la comunidad',
    description:
      'Avisos rapidos y conversacion informal para quienes prefieren seguir el servidor desde el movil.',
    href: WHATSAPP_URL,
  },
];

const COMPANIES = [
  { name: 'Turismo Judith', city: 'Lima', fleet: '18 unidades', members: '24 conductores', logo: judithLogo, logoBg: 'bg-[#52c7c8]' },
  { name: 'Cruz del Sur', city: 'Huaraz', fleet: '26 unidades', members: '31 conductores', logo: cruzDelSurLogo, logoBg: 'bg-[#0d2a5f]' },
  { name: 'Palomino', city: 'Puquio', fleet: '14 unidades', members: '17 conductores', logo: palominoLogo, logoBg: 'bg-white' },
  { name: 'Movil Bus', city: 'Piura', fleet: '10 unidades', members: '12 conductores', logo: movilBusLogo, logoBg: 'bg-[#c81d25]' },
];

const STAFF = [
  {
    name: 'Bless',
    role: 'Fundador',
    description:
      'Coordina las salidas del dia y la direccion general del servidor.',
  },
  {
    name: 'Juan de Dios',
    role: 'Fundador',
    description:
      'Lleva la logistica de convoys: puntos de parada, combustible y orden de salida.',
  },
  {
    name: 'Diosito',
    role: 'Fundador',
    description:
      'Se encarga de los modos especiales y de lo que se abre despues del convoy.',
  },
];

const PARTICIPATE = [
  {
    step: '01',
    title: 'Entra al Discord',
    description:
      'Presentate en el canal de bienvenida y revisa los anuncios. Ahi se publica el ID de sala vigente y la agenda del dia.',
  },
  {
    step: '02',
    title: 'Sal en una ruta libre',
    description:
      'La ruta de bienvenida es la forma mas facil de conocer a la comunidad sin exigencia de tiempos ni formacion cerrada.',
  },
  {
    step: '03',
    title: 'Unete a una empresa',
    description:
      'Entra a una VTC consolidada o crea la tuya. Es lo que convierte las rutas sueltas en una temporada con historia.',
  },
];

export default function ComunidadPage() {
  return (
    <PageShell
      eyebrow="Comunidad"
      title="Una comunidad peruana que rueda junta, sin drama y sin barreras de entrada."
      lead="Empresas VTC, staff, canales de conversacion y la forma mas rapida de pasar de mirar a estar en la ruta."
      actions={
        <>
          <PrimaryLink href={DISCORD_URL}>Unirse al Discord</PrimaryLink>
          <GhostLink href={WHATSAPP_URL}>Grupo de WhatsApp</GhostLink>
        </>
      }
    >
      <section>
        <SectionLabel>Canales</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          {CHANNELS.map((channel) => (
            <a
              key={channel.name}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound(channel.href)}
              className="group bg-[#0a0a0a] p-7 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl text-white">{channel.name}</h2>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                    {channel.handle}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {channel.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Empresas VTC activas</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANIES.map((company) => (
            <article key={company.name} className="bg-[#0a0a0a] p-6">
              <div
                className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg ${company.logoBg}`}
              >
                <img
                  src={company.logo}
                  alt={`Logo de ${company.name}`}
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="mt-4 text-base text-white">{company.name}</h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                {company.city}
              </p>
              <dl className="mt-4 space-y-1 text-sm text-white/50">
                <div className="flex justify-between gap-4">
                  <dt>Flota</dt>
                  <dd className="text-white/70">{company.fleet}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Miembros</dt>
                  <dd className="text-white/70">{company.members}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-white/40">
          ¿Quieres registrar la tuya? Se solicita al staff en Discord con el
          nombre, la ciudad base y el logo.
        </p>
      </section>

      <section className="mt-20">
        <SectionLabel>Staff</SectionLabel>
        <div className="border-t border-white/10">
          {STAFF.map((member) => (
            <article
              key={member.name}
              className="grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[220px_140px_1fr] sm:items-baseline sm:gap-8"
            >
              <h2 className="text-lg text-white">{member.name}</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#e0512f]">
                {member.role}
              </span>
              <p className="max-w-2xl text-sm leading-relaxed text-white/50">
                {member.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Como empezar</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          {PARTICIPATE.map((item) => (
            <article key={item.step} className="bg-[#0a0a0a] p-6">
              <span className="font-mono text-[11px] text-white/30">
                {item.step}
              </span>
              <h2 className="mt-4 text-lg text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
