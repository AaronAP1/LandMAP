import Navbar from './components/Navbar';
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
    <div className="min-h-screen bg-[#090909] text-white">
      <Navbar />
      <main>
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
