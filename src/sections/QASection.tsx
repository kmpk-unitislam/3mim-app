import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelpCircle, MessageCircle, ArrowRight, MapPin, RefreshCcw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function QASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const keywordsRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card slide up
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Question mark bounce
      const questionMark = cardRef.current?.querySelector('.question-icon');
      if (questionMark) {
        gsap.fromTo(
          questionMark,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyword animation on flip
  useEffect(() => {
    if (isFlipped && !hasFlipped) {
      setHasFlipped(true);
      const keywords = keywordsRef.current?.querySelectorAll('.keyword');
      if (keywords) {
        keywords.forEach((keyword, index) => {
          gsap.fromTo(
            keyword,
            { backgroundSize: '0% 100%' },
            {
              backgroundSize: '100% 100%',
              duration: 0.5,
              delay: 0.3 + index * 0.15,
              ease: 'power2.out',
            }
          );
        });
      }
    }
  }, [isFlipped, hasFlipped]);

  return (
    <section
      id="qa"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 landscape:py-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      }}
    >
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 landscape:mb-6">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-teal mb-4">
            SOALAN & JAWAPAN
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Q&A Flipcard Container */}
        <div
          className="relative max-w-6xl mx-auto perspective-1000"
          style={{ perspective: '1200px' }}
        >
          {/* Decorative Tap Indicator (Outer) */}
          <div className="absolute -top-12 right-4 sm:right-0 animate-bounce flex items-center gap-2 text-teal font-medium z-20 pointer-events-none bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-teal/10">
            <RefreshCcw className="w-4 h-4" />
            <span className="text-sm">Tekan untuk baca {isFlipped ? 'soalan' : 'jawapan'}</span>
          </div>

          <div
            ref={cardRef}
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full cursor-pointer transition-transform duration-700 ease-in-out opacity-0"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front: Question Box */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-teal to-teal-light rounded-[2.5rem] p-8 sm:p-12 landscape:p-6 text-white shadow-glow-teal flex flex-col justify-center items-center text-center`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Question Icon */}
              <div className="question-icon absolute -top-8 -left-2 sm:-left-6 w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-glow-gold pointer-events-none">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <p className="text-gold-light text-base lg:text-lg uppercase tracking-[0.2em] font-semibold mb-6">
                  Soalan
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl landscape:text-2xl font-display font-bold leading-tight max-w-2xl mx-auto text-balance">
                  Bilakah seseorang boleh melaksanakan solat jamak dan qasar?
                </h3>
              </div>

              {/* Decorative Background */}
              <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none">
                <MessageCircle className="w-40 h-40" />
              </div>
            </div>

            {/* Back: Answer Box */}
            {/* Relative to provide height to the parent card element */}
            <div
              className={`relative w-full bg-white rounded-[2.5rem] p-8 sm:p-12 landscape:p-6 border-2 border-teal/20 shadow-xl flex flex-col justify-center`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                minHeight: '400px'
              }}
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center pointer-events-none blur-xl"></div>

              <div className="relative z-10">
                <p className="text-gold text-base lg:text-lg uppercase tracking-[0.2em] font-semibold mb-6">
                  Jawapan
                </p>
                <p
                  ref={keywordsRef}
                  className="text-2xl sm:text-3xl text-gray-800 leading-relaxed font-medium"
                >
                  <span className="keyword bg-gradient-to-r from-gold/40 to-gold/20 bg-no-repeat" style={{ backgroundSize: '0% 100%' }}>
                    Selepas
                  </span>{' '}
                  keluar dari{' '}
                  <span className="keyword bg-gradient-to-r from-teal/30 to-teal/10 bg-no-repeat" style={{ backgroundSize: '0% 100%' }}>
                    kariah
                  </span>{' '}
                  tetapi{' '}
                  <span className="keyword bg-gradient-to-r from-gold/40 to-gold/20 bg-no-repeat" style={{ backgroundSize: '0% 100%' }}>
                    sebelum
                  </span>{' '}
                  masuk ke kariah atau kawasan yang dituju.
                </p>
              </div>

              {/* Visual Explanation */}
              <div className="mt-10 p-6 sm:p-8 bg-mint/50 border border-teal/10 rounded-3xl relative z-10">
                <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap lg:flex-nowrap">
                  {/* Kariah Asal */}
                  <div className="text-center flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm border border-teal/10">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-teal" />
                    </div>
                    <span className="text-xs sm:text-sm text-teal-dark font-semibold block whitespace-nowrap">Kariah Asal</span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-gold flex-shrink-0 hidden md:block" />

                  {/* RNR / Exit Point */}
                  <div className="text-center animate-rnr-blink flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex flex-col items-center justify-center mb-3 mx-auto shadow-glow-gold border-2 sm:border-4 border-white/20">
                      <span className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center">Sempadan<br />Kariah</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-gold-dark font-bold bg-gold/10 px-2 sm:px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap block">
                      Selepas Keluar
                    </span>
                  </div>

                  {/* Journey */}
                  <div className="hidden md:flex flex-col items-center mx-1 lg:mx-2 opacity-90 flex-1 min-w-0">
                    <div className="flex items-center w-full">
                      <div className="flex-1 border-t-2 border-dashed border-emerald-400 min-w-[5px] lg:min-w-[10px]"></div>
                      <div className="bg-emerald-100 border border-emerald-200 px-2 py-1.5 lg:px-3 lg:py-2 rounded-xl lg:rounded-full mx-1 shadow-sm flex flex-col lg:flex-row items-center justify-center gap-1 flex-shrink min-w-0 overflow-hidden">
                        <span className="text-sm lg:text-lg flex-shrink-0">🚗</span>
                        <span className="text-[9px] lg:text-[10px] xl:text-xs text-emerald-800 font-semibold text-center leading-tight">Sepanjang perjalanan dibolehkan<br className="hidden lg:block" /> jamak dan qasar</span>
                      </div>
                      <div className="flex-1 border-t-2 border-dashed border-emerald-400 min-w-[5px] lg:min-w-[10px]"></div>
                    </div>
                  </div>

                  {/* Before Entry */}
                  <div className="text-center animate-rnr-blink flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex flex-col items-center justify-center mb-3 mx-auto shadow-glow-gold border-2 sm:border-4 border-white/20">
                      <span className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center">Sempadan<br />Kariah</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-gold-dark font-bold bg-gold/10 px-2 sm:px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap block">
                      Sebelum Masuk
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-teal flex-shrink-0 hidden md:block" />

                  {/* Kariah Tujuan */}
                  <div className="text-center flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm border border-teal/10">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-teal" />
                    </div>
                    <span className="text-xs sm:text-sm text-teal-dark font-semibold block whitespace-nowrap">Kariah Tujuan</span>
                  </div>
                </div>
              </div>

              {/* Key Point */}
              <div className="mt-8 p-5 bg-teal/5 rounded-2xl border border-teal/10 flex items-start gap-4 relative z-10">
                <span className="font-bold text-teal uppercase tracking-widest text-[10px] bg-teal/10 px-3 py-1.5 rounded flex-shrink-0">Tip</span>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Solat jamak dan qasar boleh dilakukan di{' '}
                  <span className="text-gold-dark font-bold">RNR</span>,{' '}
                  <span className="text-gold-dark font-bold">masjid</span> atau{' '}
                  <span className="text-gold-dark font-bold">surau</span> yang dilalui selepas keluar dari kariah asal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
