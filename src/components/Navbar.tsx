import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  {
    name: 'Servidor',
    to: '/servidor',
    dropdown: [
      {
        name: 'Informacion',
        description: 'Detalles del servidor',
        to: '/servidor',
      },
    ],
  },
  {
    name: 'Recursos',
    to: '/recursos',
    dropdown: [
      {
        name: 'Guias',
        description: 'Aprende a jugar mejor',
        to: '/recursos?tab=guias',
      },
      {
        name: 'Mods',
        description: 'Descargas disponibles',
        to: '/recursos?tab=mods',
      },
      {
        name: 'FAQ',
        description: 'Preguntas frecuentes',
        to: '/recursos?tab=faq',
      },
    ],
  },
  { name: 'Comunidad', to: '/comunidad' },
  { name: 'Reglas', to: '/reglas' },
  { name: 'Eventos', to: '/eventos' },
  { name: 'Contacto', to: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                <path d="M20 4L4 12L20 20L36 12L20 4Z" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
                <path d="M4 20L20 28L36 20" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 28L20 36L36 28" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="20" cy="12" r="2" fill="#fbbf24"/>
              </svg>
              <span className="text-white font-semibold text-lg">AndesMP</span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
                      location.pathname.startsWith(link.to)
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                ) : (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <motion.span whileHover={{ scale: 1.02 }}>{link.name}</motion.span>
                  </NavLink>
                )}

                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="glass absolute left-0 top-full mt-2 w-64 rounded-xl p-2 shadow-2xl"
                    >
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                        >
                          <div className="text-sm text-white">{item.name}</div>
                          <div className="text-xs text-white/50">{item.description}</div>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://discord.gg/c8jMp8ee7s"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Unirte Discord
            </motion.a>
            <motion.a
              href="#signup"
              className="px-4 py-2 text-sm font-medium text-black bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Descargar Launcher
            </motion.a>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className="block rounded-md px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
