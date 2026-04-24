type NavPageProps = {
  title: string;
  subtitle: string;
  description: string;
  actionLinks?: Array<{
    label: string;
    href: string;
  }>;
};

const quickCards = [
  {
    title: 'Actualizado',
    text: 'Contenido revisado para mantener informacion clara y vigente.',
  },
  {
    title: 'Accion directa',
    text: 'Incluye accesos utiles para que el usuario no pierda tiempo.',
  },
  {
    title: 'Diseno consistente',
    text: 'Misma linea visual que el resto del sitio para una navegacion fluida.',
  },
];

export default function NavPage({ title, subtitle, description, actionLinks }: NavPageProps) {
  return (
    <main className="relative overflow-hidden px-4 pb-20 pt-44 sm:px-6 sm:pt-36 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-12 left-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-black to-black p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Subpagina</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-white/70 sm:text-lg">{subtitle}</p>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">{description}</p>
        </div>
      </section>

      {actionLinks && actionLinks.length > 0 ? (
        <section className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-4">
          {actionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-emerald-300/35 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-100 transition-colors hover:border-emerald-200/70 hover:bg-emerald-400/20"
            >
              {link.label}
            </a>
          ))}
        </section>
      ) : (
        <section className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-emerald-300/40"
            >
              <h2 className="text-lg font-medium text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">{card.text}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
