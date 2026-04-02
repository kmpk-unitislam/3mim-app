import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play } from 'lucide-react';
import AnimationPreloader from '../components/AnimationPreloader';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [showPreloader, setShowPreloader] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Pattern fade in and scale
      tl.fromTo(
        patternRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 1.2 },
        0.2
      );

      // Title animation - split by words
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: -40 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.12 },
          0.4
        );
      }

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1
      );

      // Description fade in
      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.1
      );

      // Scroll indicator bounce in
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
        1.4
      );

      // Scroll-triggered parallax effects
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(titleRef.current, {
            y: -80 * progress,
            opacity: 1 - progress * 0.7,
          });
          gsap.set(patternRef.current, {
            rotation: 15 * progress,
            scale: 1 + 0.1 * progress,
          });
          gsap.set(scrollIndicatorRef.current, {
            opacity: 1 - progress * 3,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('tiga-mim');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimationPreloader
        isPlaying={showPreloader}
        onComplete={() => setShowPreloader(false)}
      />
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #024c44 0%, #0a3d36 100%)',
        }}
      >
        {/* Animated Islamic Pattern Background */}
        <div
          ref={patternRef}
          className="absolute animate-pattern-rotate"
          style={{
            inset: '-25%',
            backgroundImage: `url(${import.meta.env.BASE_URL}hero-pattern.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0,
          }}
        />

        {/* Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(2, 76, 68, 0.4) 100%)',
          }}
        />

        {/* Particle Effect (CSS-based) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}% `,
                top: `${Math.random() * 100}% `,
                animationDelay: `${Math.random() * 6} s`,
                animationDuration: `${6 + Math.random() * 4} s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto perspective-1000">


          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl landscape:text-4xl md:landscape:text-5xl lg:landscape:text-7xl font-display font-bold text-white mb-4 sm:mb-6 preserve-3d"
          >
            <span className="word inline-block animate-title-glow">PETA</span>{' '}
            <span className="word inline-block animate-title-glow">MUKA</span>
            <span className="block mt-1 sm:mt-2">
              <span className="word inline-block text-gold animate-title-glow">
                TIGA
              </span>{' '}
              <span className="word inline-block text-gold animate-title-glow">
                MIM
              </span>
            </span>
          </h1>

          {/* Divider Line */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              style={{ animation: 'scaleIn 0.5s ease-out 0.9s both' }}
            />
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl landscape:text-lg md:landscape:text-xl lg:landscape:text-3xl text-gold-light font-display mb-4 sm:mb-6 opacity-0"
          >
            Panduan Solat Musafir: Jamak & Qasar
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed opacity-0 landscape:max-lg:hidden"
          >
            Peta Muka ini adalah bertujuan untuk memberi penerangan cara mudah
            untuk memahami rukhsah solat bagi musafir atau panduan untuk
            melaksanakan solat Jamak dan Qasar.
          </p>
          {/* Mainkan Animasi Button */}
          <div className="mt-4 sm:mt-8 flex justify-center">
            <button
              onClick={async () => {
                setShowPreloader(true);
                try {
                  if ('wakeLock' in navigator) {
                    await navigator.wakeLock.request('screen');
                  }
                } catch (e) {
                  console.warn('Wake Lock failed', e);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.55)',
                color: '#D4AF37',
                padding: '10px 26px',
                borderRadius: '30px',
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(6px)',
                transition: 'all 0.25s ease',
                boxShadow: '0 0 18px rgba(212,175,55,0.1)',
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = 'rgba(212,175,55,0.18)';
                btn.style.boxShadow = '0 0 28px rgba(212,175,55,0.25)';
                btn.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = 'rgba(212,175,55,0.08)';
                btn.style.boxShadow = '0 0 18px rgba(212,175,55,0.1)';
                btn.style.transform = 'scale(1)';
              }}
            >
              <Play className="w-3.5 h-3.5" style={{ fill: '#D4AF37' }} />
              MAINKAN ANIMASI
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-center cursor-pointer opacity-0 landscape:max-lg:hidden"
          onClick={scrollToNext}
        >
          <p className="text-white/60 text-sm mb-2">Mula Perjalanan</p>
          <ChevronDown className="w-6 h-6 text-gold mx-auto animate-scroll-bounce" />
        </div>
      </section>
    </>
  );
}
