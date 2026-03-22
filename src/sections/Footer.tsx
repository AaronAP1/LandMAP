const footerColumns = [
  [
    { name: 'Descargar', href: '#download' },
    { name: 'Producto', href: '#product' },
    { name: 'Docs', href: '#docs' },
    { name: 'Novedades', href: '#updates' },
    { name: 'Auspicios', href: '#press' },
    { name: 'Novedades', href: '#releases' },
  ],
  [
    { name: 'Blog', href: '#blog' },
    { name: 'Contacto', href: '#contact' },
    { name: 'Casos de uso', href: '#use-cases' },
  ],
];

const bottomLinks = [
  { name: 'About AndesMP', href: '#about' },
  { name: 'Empresas', href: '#product' },
  { name: 'Privacidad', href: '#privacy' },
  { name: 'Términos', href: '#terms' },
];

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
                    <a href={link.href} className="text-white/82 transition-colors hover:text-white">
                      {link.name}
                    </a>
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
              <a key={link.name} href={link.href} className="transition-colors hover:text-white">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
