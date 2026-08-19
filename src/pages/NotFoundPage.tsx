import { Link } from 'react-router-dom';
import PageShell, { PrimaryRoute, SectionLabel } from '../components/PageShell';
import { ROUTES } from '../lib/links';

const DESTINATIONS = [
  { label: 'Servidor', to: ROUTES.servidor, description: 'Que es AndesMP y como funciona.' },
  { label: 'Recursos', to: ROUTES.recursos, description: 'Guias, mods y preguntas frecuentes.' },
  { label: 'Comunidad', to: ROUTES.comunidad, description: 'Empresas VTC, staff y canales.' },
  { label: 'Reglas', to: ROUTES.reglas, description: 'Reglas base, modos y sanciones.' },
  { label: 'Eventos', to: ROUTES.eventos, description: 'Convoys, retos y mini juegos.' },
  { label: 'Contacto', to: ROUTES.contacto, description: 'Soporte directo con el staff.' },
];

export default function NotFoundPage() {
  return (
    <PageShell
      eyebrow="Error 404"
      title="Esta ruta no existe en el mapa."
      lead="El enlace que seguiste no lleva a ninguna parte. Puedes volver al inicio o saltar directo a cualquier seccion del servidor."
      actions={<PrimaryRoute to={ROUTES.home}>Volver al inicio</PrimaryRoute>}
    >
      <section>
        <SectionLabel>Ir a</SectionLabel>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-[#0a0a0a] p-6 transition-colors hover:bg-white/[0.03]"
            >
              <h2 className="text-lg text-white">{item.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
