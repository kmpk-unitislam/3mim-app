import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, MapPin, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MusafirSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {


      // Title slide from left
      gsap.fromTo(
        titleRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content fade up
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 81 number scale + glow
      gsap.fromTo(
        numberRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image slide from right
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="musafir"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center py-20 landscape:py-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      }}
    >
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}musafir.mp4`} preload="auto" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 landscape:pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            {/* Title */}
            <div ref={titleRef} className="opacity-0 flex items-center gap-4 mb-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl landscape:text-4xl font-display font-bold text-teal">
                MUSAFIR
              </h2>
              <div className="relative">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play().catch((e) => console.log('Audio play failed:', e));
                    }
                  }}
                  className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full bg-teal/10 hover:bg-teal/20 flex items-center justify-center text-teal transition-colors shadow-sm cursor-pointer"
                  aria-label="Dengar audio Musafir"
                  title="Dengar Audio"
                >
                  <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            </div>
            <p className="text-xl landscape:text-base text-gold font-display mb-8 landscape:mb-4">
              Dalam Perjalanan
            </p>

            {/* Definition */}
            <div ref={contentRef} className="opacity-0">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Musafir ialah seseorang yang melakukan perjalanan melebihi{' '}
                <span className="font-semibold text-teal">dua marhalah</span> atau{' '}
                <span className="font-semibold text-teal">81 kilometer</span>.
              </p>

              {/* Key Number */}
              <div
                ref={numberRef}
                className="inline-flex items-center gap-6 bg-gradient-to-r from-gold to-gold-light rounded-2xl p-6 shadow-glow-gold mb-8 opacity-0"
              >
                <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
                  <Navigation className="w-12 h-12 text-white animate-km-glow" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-display font-bold text-white animate-km-glow">
                      ≥ 81
                    </p>
                    <p className="text-white/90 text-2xl font-bold font-display tracking-wide animate-km-glow">
                      KM
                    </p>
                  </div>
                  <p className="text-white/70 text-sm mt-1">
                    Jarak minimum untuk menjadi musafir
                  </p>
                </div>
              </div>

              {/* Conversion */}
              <div className="flex items-center gap-4 bg-teal/5 rounded-xl p-4">
                <MapPin className="w-6 h-6 text-teal" />
                <div>
                  <p className="text-teal font-semibold">Penukaran Jarak</p>
                  <p className="text-gray-600 text-sm">
                    2 Marhalah = 81 Kilometer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image with Path Animation */}
          <div ref={imageRef} className="order-1 md:order-2 opacity-0">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}musafir-illustration.jpg`}
                  alt="Musafir Illustration"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Distance Marker */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-card">
                <p className="text-teal font-bold text-lg">81 KM</p>
                <p className="text-gray-500 text-xs">Minimum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
