import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Servidor', hasDropdown: true },
  { name: 'Recursos', hasDropdown: true },
  { name: 'Comunidad', href: '#comunidad' },
  { name: 'Reglas', href: '#reglas' },
  { name: 'Eventos', href: '#eventos' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <motion.a
            href="/"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
              <path d="M20 4L4 12L20 20L36 12L20 4Z" fill="#10b981" stroke="#059669" strokeWidth="1.5"/>
              <path d="M4 20L20 28L36 20" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 28L20 36L36 28" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="12" r="2" fill="#fbbf24"/>
            </svg>
            <span className="text-white font-semibold text-lg">AndesMP</span>
          </motion.a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.a
                  href={link.href || '#'}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  whileHover={{ scale: 1.02 }}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </motion.a>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.hasDropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 glass rounded-xl p-2 shadow-2xl"
                    >
                      <div className="p-3 text-sm text-white/50">
                        {link.name === 'Servidor' ? (
                          <div className="space-y-2">
                            <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                              <div className="text-white">Información</div>
                              <div className="text-xs text-white/50">Detalles del servidor</div>
                            </div>
                            <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                              <div className="text-white">Conexión</div>
                              <div className="text-xs text-white/50">Cómo conectarte</div>
                            </div>
                            <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                              <div className="text-white">Rutas</div>
                              <div className="text-xs text-white/50">Explora el mapa</div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                              <div className="text-white">Guías</div>
                              <div className="text-xs text-white/50">Aprende a jugar</div>
                            </div>
                            <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                              <div className="text-white">Mods</div>
                              <div className="text-xs text-white/50">Descargas disponibles</div>
                            </div>
                            <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                              <div className="text-white">FAQ</div>
                              <div className="text-xs text-white/50">Preguntas frecuentes</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#login"
              className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Iniciar sesión
            </motion.a>
            <motion.a
              href="#signup"
              className="px-4 py-2 text-sm font-medium text-black bg-emerald-500 rounded-md hover:bg-emerald-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Descargar Launcher
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
