import { Link } from 'react-router-dom';
import { trackOutbound } from '../lib/analytics';
import {
  DISCORD_URL,
  HUB_DOWNLOAD_URL,
  WHATSAPP_URL,
  ROUTES,
} from '../lib/links';

type FooterLink = { name: string; to?: string; href?: string };

const footerColumns: FooterLink[][] = [
  [
    { name: 'Descargar HUB', href: HUB_DOWNLOAD_URL },
    { name: 'Servidor', to: ROUTES.servidor },
    { name: 'Guias', to: ROUTES.guias },
    { name: 'Mods', to: ROUTES.mods },
    { name: 'Eventos', to: ROUTES.eventos },
  ],
  [
    { name: 'Comunidad', to: ROUTES.comunidad },
    { name: 'Reglas', to: ROUTES.reglas },
    { name: 'Contacto', to: ROUTES.contacto },
    { name: 'Discord', href: DISCORD_URL },
    { name: 'WhatsApp', href: WHATSAPP_URL },
  ],
];

const bottomLinks: FooterLink[] = [
  { name: 'Sobre AndesMP', to: ROUTES.servidor },
  { name: 'Empresas VTC', to: ROUTES.comunidad },
  { name: 'Reglas', to: ROUTES.reglas },
  { name: 'FAQ', to: ROUTES.faq },
];

function FooterItem({ link, className }: { link: FooterLink; className: string }) {
  if (link.href) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutbound(link.href!)}
        className={className}
      >
        {link.name}
      </a>
    );
  }
  return (
    <Link to={link.to ?? ROUTES.home} className={className}>
      {link.name}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div>
            <p className="max-w-md text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Experiencia que despega.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:justify-self-end">
            {footerColumns.map((column, index) => (
              <ul key={index} className="space-y-3 text-base sm:text-lg">
                {column.map((link) => (
                  <li key={link.name}>
                    <FooterItem
                      link={link}
                      className="text-white/82 transition-colors hover:text-white"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden">
          <div className="text-[clamp(4.5rem,18vw,14rem)] font-medium leading-[0.9] tracking-[-0.08em] text-white">
            AndesMP
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-medium text-white/88">AndesMP</div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {bottomLinks.map((link) => (
              <FooterItem
                key={link.name}
                link={link}
                className="transition-colors hover:text-white"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
