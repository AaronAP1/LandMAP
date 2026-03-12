import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import FeaturesIntro from './sections/FeaturesIntro';
import Intake from './sections/Intake';
import Plan from './sections/Plan';
import Build from './sections/Build';
import Diffs from './sections/Diffs';
import Monitor from './sections/Monitor';
import Changelog from './sections/Changelog';
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
        <Diffs />
        <Monitor />
        <Changelog />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
