import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountdownBar from './components/CountdownBar';
import Hero from './sections/Hero';
import FeaturesIntro from './sections/FeaturesIntro';
import Intake from './sections/Intake';
import Plan from './sections/Plan';
import Build from './sections/Build';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import NavPage from './pages/NavPage';
import ServerPage from './pages/ServerPage';
import ConstructionPage from './pages/ConstructionPage';

function HomePage() {
  return (
    <main className="pt-44 sm:pt-32">
      <Hero />
      <FeaturesIntro />
      <Intake />
      <Plan />
      <Build />
      <Testimonials />
      <CTA />
    </main>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090909] text-white">
      <Navbar />
      <CountdownBar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/servidor"
            element={
              <PageTransition>
                <ServerPage />
              </PageTransition>
            }
          />
          <Route
            path="/recursos"
            element={
              <PageTransition>
                <ConstructionPage />
              </PageTransition>
            }
          />
          <Route
            path="/comunidad"
            element={
              <PageTransition>
                <ConstructionPage />
              </PageTransition>
            }
          />
          <Route
            path="/reglas"
            element={
              <PageTransition>
                <ConstructionPage />
              </PageTransition>
            }
          />
          <Route
            path="/eventos"
            element={
              <PageTransition>
                <ConstructionPage />
              </PageTransition>
            }
          />
          <Route
            path="/contacto"
            element={
              <PageTransition>
                <NavPage
                  title="Contacto"
                  subtitle="Soporte y comunicacion directa"
                  description="Si necesitas ayuda o quieres enviar feedback, aqui tienes los canales para comunicarte con el equipo de AndesMP."
                />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NavPage
                  title="Pagina no encontrada"
                  subtitle="Error 404"
                  description="La ruta que buscaste no existe. Puedes volver al inicio desde el logo del menu."
                />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
