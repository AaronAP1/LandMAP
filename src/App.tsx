import { motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import CountdownBar from './components/CountdownBar';
import LauncherAlert from './components/LauncherAlert';
import Hero from './sections/Hero';
import FeaturesIntro from './sections/FeaturesIntro';
import Playbook from './sections/Playbook';
import Build from './sections/Build';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import ServerPage from './pages/ServerPage';
import RecursosPage from './pages/RecursosPage';
import ComunidadPage from './pages/ComunidadPage';
import ReglasPage from './pages/ReglasPage';
import EventosPage from './pages/EventosPage';
import ContactoPage from './pages/ContactoPage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './lib/links';

function HomePage() {
  return (
    <main className="pt-44 sm:pt-32">
      <Hero />
      <FeaturesIntro />
      <Playbook />
      <Build />
      <Testimonials />
      <CTA />
    </main>
  );
}

const PAGES = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.servidor, element: <ServerPage /> },
  { path: ROUTES.recursos, element: <RecursosPage /> },
  { path: ROUTES.comunidad, element: <ComunidadPage /> },
  { path: ROUTES.reglas, element: <ReglasPage /> },
  { path: ROUTES.eventos, element: <EventosPage /> },
  { path: ROUTES.contacto, element: <ContactoPage /> },
  { path: '*', element: <NotFoundPage /> },
];

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090909] text-white">
      <Navbar />
      <CountdownBar />
      <LauncherAlert />

      {/* La animacion de entrada se dispara remontando el subarbol con la key
          de la ruta. No usamos AnimatePresence: su modo "wait" espera a que
          termine la animacion de salida, que con React 19 en StrictMode no se
          completa y deja la pagina anterior montada para siempre. */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          {PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>
      </motion.div>

      <Footer />
    </div>
  );
}

export default App;
