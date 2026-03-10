import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, BookOpen, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background map fade in
      gsap.fromTo(
        bgRef.current,
        { opacity: 0 },
        {
          opacity: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Map path draw
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Title words rise
      const words = titleRef.current?.querySelectorAll('.title-word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 60, opacity: 0, rotateX: -30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Emoji bounce in
      gsap.fromTo(
        emojiRef.current,
        { scale: 0, rotate: -20 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          delay: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Buttons stagger rise
      const buttons = buttonsRef.current?.querySelectorAll('button');
      if (buttons) {
        gsap.fromTo(
          buttons,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            delay: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Scroll-triggered background zoom
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(bgRef.current, {
            scale: 1 + 0.1 * progress,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Peta Muka - Tiga Mim',
        text: 'Panduan Solat Musafir: Jamak & Qasar',
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Pautan telah disalin!');
    }
  };

  return (
    <section
      id="closing"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #024c44 0%, #0a3d36 100%)',
      }}
    >
      {/* Background Pattern */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}closing-pattern.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0,
        }}
      />

      {/* Animated Path Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 10 50 Q 30 20, 50 50 T 90 50"
          fill="none"
          stroke="#d4a574"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
          className="animate-path-glow"
        />
      </svg>

      {/* Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Layout Container */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Center Content */}
        <div className="flex-1 flex flex-col justify-end text-center pb-8 landscape:pb-4 pt-24 lg:pt-32 landscape:pt-12">
          {/* Sparkle Decoration */}
          <div className="flex justify-center mb-6 mt-auto">
            <Sparkles className="w-10 h-10 text-gold animate-icon-pulse" />
          </div>

          {/* Main Title */}
          <div ref={titleRef} className="mb-8 perspective-1000">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-4">
              <span className="title-word inline-block">Semoga</span>{' '}
              <span className="title-word inline-block text-gold">Bermanfaat</span>
            </h2>
            <h3 className="text-4xl sm:text-5xl font-display font-bold text-white/90">
              <span className="title-word inline-block">Terima</span>{' '}
              <span className="title-word inline-block">Kasih</span>
            </h3>
          </div>

          {/* AI Emoji */}
          <div ref={emojiRef} className="flex justify-center mb-8 opacity-0">
            <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center shadow-glow-gold-strong animate-emoji-smile">
              <span className="text-4xl">😊</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Panduan solat musafir untuk kegunaan semua. Semoga perjalanan anda
            sentiasa diberkati.
          </p>
        </div>

        {/* Footer Pinned to Bottom */}
        <div className="w-full pb-8 landscape:pb-3 mt-auto flex flex-col items-center">

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={handleShare}
              className="bg-white text-teal hover:bg-gold hover:text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow-gold flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Kongsikan
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 bg-transparent"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <BookOpen className="w-5 h-5" />
              Pelajari Lagi
            </Button>
          </div>

          <div className="w-full pt-8 border-t border-white/10 text-center">
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <Heart className="w-4 h-4 text-gold animate-icon-pulse" />
              <span>Dibuat dengan kasih sayang untuk umat Islam</span>
            </div>
            <p className="text-white/30 text-xs mt-4">
              © 2026 Peta Muka - Tiga Mim. Semua hak cipta terpelihara.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
