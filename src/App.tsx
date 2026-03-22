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

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#090909] text-white">
      <Navbar />
      <CountdownBar />
      <main className="pt-44 sm:pt-32">
        <Hero />
        <FeaturesIntro />
        <Intake />
        <Plan />
        <Build />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
