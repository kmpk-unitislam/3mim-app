import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import TigaMimSection from './sections/TigaMimSection';
import TempohSection from './sections/TempohSection';
import SituasiPerjalananSection from './sections/SituasiPerjalananSection';
import QASection from './sections/QASection';
import ClosingSection from './sections/ClosingSection';
import LandscapeOrientationBlocker from './components/LandscapeOrientationBlocker';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <LandscapeOrientationBlocker />
      {/* Hero Section - Scene 1 */}
      <HeroSection />

      {/* 3 MIM Introduction & Definitions (Horizontal Scroll) - Scene 2 */}
      <TigaMimSection />

      {/* Tempoh Jamak & Qasar - Scene 6 */}
      <TempohSection />

      {/* Situasi Perjalanan - NEW Scene with Mind Map */}
      <SituasiPerjalananSection />

      {/* Q&A Section - Scene 7 */}
      <QASection />

      {/* Closing Section - Scene 8 */}
      <ClosingSection />
    </main>
  );
}

export default App;
