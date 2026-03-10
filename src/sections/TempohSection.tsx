import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, ArrowRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TempohSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title slide from right
      gsap.fromTo(
        titleRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Calendar scale + fade
      gsap.fromTo(
        calendarRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Calendar days grid reveal
      const days = calendarRef.current?.querySelectorAll('.calendar-day');
      if (days) {
        gsap.fromTo(
          days,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            delay: 0.3,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Highlighted days glow
      const highlightedDays = calendarRef.current?.querySelectorAll('.day-highlighted');
      if (highlightedDays) {
        gsap.fromTo(
          highlightedDays,
          { scale: 1, boxShadow: '0 0 0 rgba(2, 76, 68, 0)' },
          {
            scale: 1.1,
            boxShadow: '0 0 20px rgba(2, 76, 68, 0.5)',
            duration: 0.4,
            delay: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content fade
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate calendar days
  const generateDays = () => {
    const days = [];
    const dayNames = ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'];

    // Day headers
    const headers = dayNames.map((day, index) => (
      <div
        key={`header-${index}`}
        className="calendar-day text-center text-xs text-gray-500 font-medium py-2"
      >
        {day}
      </div>
    ));

    // Empty cells for alignment
    for (let i = 0; i < 3; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day" />
      );
    }

    // Actual days
    for (let i = 1; i <= 31; i++) {
      const isHighlighted = i >= 4 && i <= 6; // Days 4, 5, 6 highlighted
      const isTravelDay = i === 3 || i === 7; // Travel days

      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day relative flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-sm font-medium transition-all duration-300 ${isHighlighted
            ? 'day-highlighted bg-teal text-white animate-day-pulse'
            : isTravelDay
              ? 'bg-teal/10 text-teal font-bold'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
        >
          {i}
          {isTravelDay && (
            <span className="absolute -bottom-4 text-[10px] text-teal font-bold whitespace-nowrap">
              {i === 3 ? 'Pergi' : 'Balik'}
            </span>
          )}
        </div>
      );
    }

    return { headers, days };
  };

  const { headers, days } = generateDays();

  return (
    <section
      id="tempoh"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 landscape:py-8"
      style={{ backgroundColor: '#f0faf7' }}
    >
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 items-center">
          {/* Left Calendar */}
          <div ref={calendarRef} className="opacity-0">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card perspective-1000">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal" />
                  <span className="text-lg font-display font-bold text-teal">
                    Januari 2026
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-4 mb-2">{headers}</div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-4">{days}</div>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-teal rounded animate-day-pulse" />
                  <span className="text-sm text-gray-600">3 Hari Qasar & Jamak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-teal/20 rounded" />
                  <span className="text-sm text-gray-600 font-medium">Pergi & Balik</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            {/* Title */}
            <div ref={titleRef} className="opacity-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl landscape:text-3xl font-display font-bold text-teal mb-4 landscape:mb-2">
                TEMPOH JAMAK
                <span className="block text-gold">& QASAR</span>
              </h2>
              <p className="text-xl landscape:text-base text-gray-600 font-display mb-8 landscape:mb-4">
                Bilakah Boleh Dilakukan?
              </p>
            </div>

            {/* Explanation */}
            <div ref={contentRef} className="opacity-0">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Tempoh dibolehkan melakukan qasar dan jamak untuk musafir ialah{' '}
                <span className="font-semibold text-teal">tiga hari</span> tidak
                termasuk perjalanan pergi dan balik.
              </p>

              {/* Visual Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {/* Travel Day - Pergi */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-2 border border-teal/20">
                      <ArrowRight className="w-5 h-5 text-teal" />
                    </div>
                    <span className="text-xs text-teal font-bold tracking-wide">Pergi</span>
                  </div>

                  {/* Arrow */}
                  <div className="text-gray-300">→</div>

                  {/* 3 Days Highlighted */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center mb-2 shadow-glow-teal animate-pulse-glow">
                      <span className="text-2xl font-display font-bold text-white">
                        3
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-teal">Hari</span>
                  </div>

                  {/* Arrow */}
                  <div className="text-gray-300">→</div>

                  {/* Travel Day - Balik */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-2 border border-teal/20">
                      <ArrowLeft className="w-5 h-5 text-teal" />
                    </div>
                    <span className="text-xs text-teal font-bold tracking-wide">Balik</span>
                  </div>
                </div>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Tidak termasuk hari perjalanan pergi dan balik
                </p>
              </div>

              {/* Key Point */}
              <div className="mt-6 p-4 bg-gold/10 rounded-xl border-l-4 border-gold">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold text-teal">Perhatian:</span>{' '}
                  Tempoh 3 hari ini adalah untuk melakukan solat{' '}
                  <span className="text-gold font-medium">qasar</span> (mengqasar
                  solat) dan{' '}
                  <span className="text-gold font-medium">jamak</span>{' '}
                  (menjamak solat).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
