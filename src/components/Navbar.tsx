import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import {
  DISCORD_URL,
  HUB_DOWNLOAD_URL,
  HUB_FILENAME,
  ROUTES,
} from '../lib/links';

type NavLinkItem = {
  name: string;
  to: string;
  dropdown?: Array<{ name: string; description: string; to: string }>;
};

const navLinks: NavLinkItem[] = [
  {
    name: 'Servidor',
    to: ROUTES.servidor,
    dropdown: [
      {
        name: 'Informacion',
        description: 'Que es AndesMP y como funciona',
        to: ROUTES.servidor,
      },
      {
        name: 'Como conectarte',
        description: 'Instalar el HUB y entrar a la sala',
        to: ROUTES.guias,
      },
    ],
  },
  {
    name: 'Recursos',
    to: ROUTES.recursos,
    dropdown: [
      {
        name: 'Guias',
        description: 'Aprende a jugar mejor',
        to: ROUTES.guias,
      },
      {
        name: 'Mods',
        description: 'Descargas disponibles',
        to: ROUTES.mods,
      },
      {
        name: 'FAQ',
        description: 'Preguntas frecuentes',
        to: ROUTES.faq,
      },
    ],
  },
  { name: 'Comunidad', to: ROUTES.comunidad },
  { name: 'Reglas', to: ROUTES.reglas },
  { name: 'Eventos', to: ROUTES.eventos },
  { name: 'Contacto', to: ROUTES.contacto },
];

const linkClass = (isActive: boolean) =>
  `flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-white/70 hover:bg-white/5 hover:text-white'
  }`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-black/80 backdrop-blur-xl' : ''
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.home} className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none">
              <path d="M20 4L4 12L20 20L36 12L20 4Z" fill="#e0512f" stroke="#b83d1f" strokeWidth="1.5" />
              <path d="M4 20L20 28L36 20" stroke="#e0512f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 28L20 36L36 28" stroke="#e0512f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="12" r="2" fill="#fbbf24" />
            </svg>
            <span className="text-lg font-semibold text-white">AndesMP</span>
          </Link>

          {/* Enlaces desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => link.dropdown && setActiveDropdown(link.name)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setActiveDropdown(null);
                  }
                }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === ROUTES.home}
                  className={({ isActive }) => linkClass(isActive)}
                  aria-haspopup={link.dropdown ? 'menu' : undefined}
                  aria-expanded={
                    link.dropdown ? activeDropdown === link.name : undefined
                  }
                  onClick={closeMenus}
                >
                  <span>{link.name}</span>
                  {link.dropdown && <ChevronDown className="h-3 w-3" />}
                </NavLink>

                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="glass absolute left-0 top-full mt-2 w-64 rounded-xl p-2 shadow-2xl"
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMenus}
                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      >
                        <div className="text-sm text-white">{item.name}</div>
                        <div className="text-xs text-white/50">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm text-white/70 transition-colors hover:text-white sm:block"
            >
              Unirse a Discord
            </a>
            <a
              href={HUB_DOWNLOAD_URL}
              download={HUB_FILENAME}
              rel="noopener noreferrer"
              className="rounded-md bg-[#e0512f] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#f0603c]"
            >
              Descargar HUB
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Menu movil */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenus}
            className="glass mb-3 rounded-xl border border-white/10 p-2 md:hidden"
          >
              {navLinks.map((link) => (
                <div key={link.name} className="mb-1 last:mb-0">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                  {link.dropdown && (
                    <div className="mt-1 space-y-1 pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block rounded-md px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition-colors hover:text-white sm:hidden"
              >
                Unirse a Discord
              </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
