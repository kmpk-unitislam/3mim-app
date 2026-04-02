import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MukimSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<SVGPathElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Diagonal divider draw animation
      if (dividerRef.current) {
        const length = dividerRef.current.getTotalLength();
        gsap.set(dividerRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(dividerRef.current, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Title slide from left with mask reveal
      gsap.fromTo(
        titleRef.current,
        { x: -100, clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Number scale + glow burst
      gsap.fromTo(
        numberRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
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
      id="mukim"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center py-20 landscape:py-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0faf7 100%)',
      }}
    >
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}mukim.mp4`} preload="auto" />
      {/* Diagonal SVG Divider */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          ref={dividerRef}
          d="M 55 0 Q 50 50 45 100"
          fill="none"
          stroke="url(#diagonalGradient)"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="diagonalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#024c44" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#d4a574" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#024c44" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 landscape:pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            {/* Title */}
            <div ref={titleRef} className="opacity-0 flex items-center gap-4 mb-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl landscape:text-4xl font-display font-bold text-teal">
                MUKIM
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
                  aria-label="Dengar audio Mukim"
                  title="Dengar Audio"
                >
                  <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            </div>
            <p className="text-xl landscape:text-base text-gold font-display mb-8 landscape:mb-4">
              Tinggal Sementara
            </p>

            {/* Definition */}
            <div ref={contentRef} className="opacity-0">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Mukim bermaksud tinggal dan menetap di sesuatu tempat{' '}
                <span className="font-semibold text-teal">lebih dari tiga hari</span>,
                tetapi tidak berniat untuk menjadikannya tempat tinggal tetap
                selamanya.
              </p>

              {/* Key Highlight */}
              <div
                ref={numberRef}
                className="inline-flex items-center gap-4 bg-gradient-to-r from-teal to-teal-light rounded-2xl p-6 shadow-glow-teal opacity-0"
              >
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-5xl font-display font-bold text-white animate-number-glow">
                    3
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-white">
                    &gt; 3 Hari
                  </p>
                  <p className="text-white/80 text-sm">
                    Tempoh minimum untuk dianggap mukim
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 flex items-center gap-3 text-gray-500">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-sm">
                  Tidak termasuk hari perjalanan pergi dan balik
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="order-1 md:order-2 opacity-0">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[5/4]">
                <img
                  src={`${import.meta.env.BASE_URL}mukim-illustration.jpg`}
                  alt="Mukim Illustration"
                  className="w-full h-full object-cover block"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent" />
              </div>



              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold/20 rounded-full animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
