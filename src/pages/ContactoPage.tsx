import { ArrowUpRight } from 'lucide-react';
import { trackOutbound } from '../lib/analytics';
import PageShell, {
  GhostLink,
  PrimaryLink,
  SectionLabel,
} from '../components/PageShell';
import { DISCORD_URL, WHATSAPP_URL, ROUTES } from '../lib/links';
import { Link } from 'react-router-dom';

const CONTACTS = [
  {
    name: 'Discord',
    handle: 'Soporte y tickets',
    description:
      'La via mas rapida. Abre un ticket para problemas de conexion, reportes de conducta, apelaciones o registro de empresas.',
    href: DISCORD_URL,
  },
  {
    name: 'WhatsApp',
    handle: 'Grupo de la comunidad',
    description:
      'Para consultas informales y avisos rapidos. No se atienden reportes ni apelaciones por este canal.',
    href: WHATSAPP_URL,
  },
];

const TOPICS = [
  {
    title: 'No puedo conectarme',
    description:
      'Verifica que el HUB este actualizado y que estes usando el ID de sala vigente. Si sigue fallando, abre un ticket con una captura del error.',
    action: { label: 'Ver guias', to: ROUTES.guias },
  },
  {
    title: 'Quiero reportar a un conductor',
    description:
      'Envia captura o video con la fecha y la ruta. Sin evidencia el staff no puede tomar accion sobre un reporte.',
    action: { label: 'Ver reglas', to: ROUTES.reglas },
  },
  {
    title: 'Quiero apelar una sancion',
    description:
      'Las sanciones se comunican con motivo y evidencia. Si crees que hubo un error, abre un ticket explicando tu version.',
    action: { label: 'Ver sanciones', to: ROUTES.reglas },
  },
  {
    title: 'Quiero registrar mi empresa VTC',
    description:
      'Necesitas nombre, ciudad base y logo. Una vez aprobada aparece en el directorio y puede reclutar conductores.',
    action: { label: 'Ver empresas', to: ROUTES.comunidad },
  },
  {
    title: 'Quiero proponer un evento',
    description:
      'Cuenta el tipo de salida, la ruta y el horario que tienes en mente. Se evalua para la agenda de la semana.',
    action: { label: 'Ver eventos', to: ROUTES.eventos },
  },
  {
    title: 'Quiero auspiciar o colaborar',
    description:
      'Escribe al staff en Discord describiendo la propuesta. Se responde a todas, aunque no siempre de inmediato.',
    action: { label: 'Sobre el servidor', to: ROUTES.servidor },
  },
];

export default function ContactoPage() {
  return (
    <PageShell
      eyebrow="Contacto"
      title="Soporte y comunicacion directa con el equipo de AndesMP."
      lead="Si necesitas ayuda, quieres reportar algo o enviar feedback, estos son los canales para comunicarte con el staff."
      actions={
        <>
          <PrimaryLink href={DISCORD_URL}>Abrir ticket en Discord</PrimaryLink>
          <GhostLink href={WHATSAPP_URL}>Grupo de WhatsApp</GhostLink>
        </>
      }
    >
      <section>
        <SectionLabel>Canales</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
          {CONTACTS.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound(contact.href)}
              className="group bg-[#0a0a0a] p-7 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl text-white">{contact.name}</h2>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                    {contact.handle}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {contact.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionLabel>Antes de escribir</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic) => (
            <article
              key={topic.title}
              className="flex flex-col bg-[#0a0a0a] p-6"
            >
              <h2 className="text-lg leading-snug text-white">{topic.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                {topic.description}
              </p>
              <Link
                to={topic.action.to}
                className="group mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
              >
                {topic.action.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
