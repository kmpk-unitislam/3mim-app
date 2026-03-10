import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Navigation, MapPin, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MusafirSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Road path draw animation
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        // Animate path draw on scroll
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Car movement along path tied to scroll
        if (carRef.current && pathRef.current) {
          gsap.to(carRef.current, {
            motionPath: {
              path: pathRef.current,
              align: pathRef.current,
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          });
        }
      }

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
      className="relative w-full min-h-screen flex items-center py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      }}
    >
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}musafir.mp4`} preload="auto" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Title */}
            <div ref={titleRef} className="opacity-0 flex items-center gap-4 mb-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-teal">
                MUSAFIR
              </h2>
              <div className="relative">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play().catch((e) => console.log('Audio play failed:', e));
                    }
                    const bubble = document.getElementById('bubble-musafir');
                    if (bubble) bubble.style.display = 'none';
                  }}
                  className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full bg-teal/10 hover:bg-teal/20 flex items-center justify-center text-teal transition-colors shadow-sm cursor-pointer"
                  aria-label="Dengar audio Musafir"
                  title="Dengar Audio"
                >
                  <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                {/* Floating bubble indicator */}
                <div id="bubble-musafir" className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce">
                  <div className="bg-teal text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    Tekan sini 🔊
                  </div>
                  <div className="w-2 h-2 bg-teal rotate-45 mx-auto -mt-1" />
                </div>
              </div>
            </div>
            <p className="text-xl text-gold font-display mb-8">
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
          <div ref={imageRef} className="order-1 lg:order-2 opacity-0">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}musafir-illustration.jpg`}
                  alt="Musafir Illustration"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Animated Car Badge */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-teal rounded-full flex items-center justify-center shadow-glow-teal animate-car-bounce">
                <Car className="w-10 h-10 text-white" />
              </div>

              {/* Distance Marker */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-card">
                <p className="text-teal font-bold text-lg">81 KM</p>
                <p className="text-gray-500 text-xs">Minimum</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Path Visualization */}
        <div className="mt-16 relative hidden lg:block">
          <svg
            className="w-full h-24"
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
          >
            {/* Background Road */}
            <path
              d="M 0 80 Q 200 20, 400 50 T 800 30"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Animated Road Line */}
            <path
              ref={pathRef}
              d="M 0 80 Q 200 20, 400 50 T 800 30"
              fill="none"
              stroke="url(#roadGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 5"
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#024c44" />
                <stop offset="50%" stopColor="#d4a574" />
                <stop offset="100%" stopColor="#024c44" />
              </linearGradient>
            </defs>
          </svg>

          {/* Milestone Markers */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[0, 27, 54, 81].map((km, index) => (
              <div
                key={index}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${(index / 3) * 100}%`,
                  top: index % 2 === 0 ? '60%' : '20%',
                }}
              >
                <div className="w-4 h-4 bg-gold rounded-full shadow-glow-gold animate-pulse" />
                <span className="text-xs text-gray-500 mt-1">{km}km</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
