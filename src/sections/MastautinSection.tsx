import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, Briefcase, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MastautinSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Concentric circles animation
      const circles = circlesRef.current?.querySelectorAll('.concentric-circle');
      if (circles) {
        circles.forEach((circle, index) => {
          gsap.fromTo(
            circle,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.1 + index * 0.05,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // House icon rise + settle
      gsap.fromTo(
        imageRef.current,
        { y: 50, scale: 0.8, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Title fade down
      gsap.fromTo(
        titleRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
          delay: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Examples stagger fade
      const examples = contentRef.current?.querySelectorAll('.example-item');
      if (examples) {
        gsap.fromTo(
          examples,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const examples = [
    { icon: <Home className="w-5 h-5" />, text: 'Rumah keluarga' },
    { icon: <Building2 className="w-5 h-5" />, text: 'Rumah sendiri' },
    { icon: <Briefcase className="w-5 h-5" />, text: 'Tempat kerja tetap' },
  ];

  return (
    <section
      id="mastautin"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center py-20 landscape:py-8 overflow-hidden"
      style={{ backgroundColor: '#f0faf7' }}
    >
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}mastautin.mp4`} preload="auto" />
      {/* Concentric Circles Background */}
      <div
        ref={circlesRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="concentric-circle absolute rounded-full border-2 border-teal/20 animate-circle-expand"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16 landscape:pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 items-center">
          {/* Left Image */}
          <div ref={imageRef} className="opacity-0">
            <div className="relative flex justify-center">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md animate-house-float">
                <img
                  src={`${import.meta.env.BASE_URL}mastautin-illustration.jpg`}
                  alt="Mastautin Illustration"
                  className="w-full h-auto object-cover"
                />
              </div>


            </div>
          </div>

          {/* Right Content */}
          <div className="text-center lg:text-left">
            {/* Title */}
            <div ref={titleRef} className="opacity-0 flex items-center justify-center lg:justify-start gap-4 mb-4">
              <h2 className="text-5xl sm:text-6xl md:text-7xl landscape:text-4xl font-display font-bold text-teal">
                MASTAUTIN
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
                  aria-label="Dengar audio Mastautin"
                  title="Dengar Audio"
                >
                  <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            </div>
            <p className="text-xl landscape:text-base text-gold font-display mb-8 landscape:mb-4">
              Tempat Tinggal Tetap
            </p>
            {/* Definition */}
            <div ref={contentRef} className="opacity-0">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Mastautin ialah{' '}
                <span className="font-semibold text-teal">
                  tempat tinggal tetap
                </span>{' '}
                seseorang yang menjadi pusat kehidupan dan aktiviti harian.
              </p>

              {/* Examples */}
              <div className="space-y-4">
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                  Contoh Mastautin:
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {examples.map((example, index) => (
                    <div
                      key={index}
                      className="example-item flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 opacity-0"
                    >
                      <span className="text-teal">{example.icon}</span>
                      <span className="text-gray-700 font-medium">
                        {example.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Point */}
              <div className="mt-8 p-4 bg-gold/10 rounded-xl border-l-4 border-gold">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold text-teal">Nota:</span> Mastautin
                  adalah tempat di mana seseorang merasa{' '}
                  <span className="text-gold font-medium">selesa dan stabil</span>{' '}
                  untuk menetap dalam jangka masa yang lama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
