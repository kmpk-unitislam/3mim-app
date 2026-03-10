import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Home, MapPin, Navigation, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Scenario = 1 | 2 | 3;

export default function SituasiPerjalananSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const [activeScenario, setActiveScenario] = useState<Scenario>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [sectionInView, setSectionInView] = useState(false);

  // Refs for node pulse animations
  const mastautinNodeRef = useRef<HTMLDivElement>(null);
  const musafirNodeRef = useRef<HTMLDivElement>(null);
  const mukimNodeRef = useRef<HTMLDivElement>(null);

  // SVG Path refs for each route
  const path1Ref = useRef<SVGPathElement>(null); // Mastautin -> Mukim
  const path2aRef = useRef<SVGPathElement>(null); // Mastautin -> Musafir
  const path2bRef = useRef<SVGPathElement>(null); // Musafir -> Mukim
  const path3Ref = useRef<SVGPathElement>(null); // Musafir -> Mastautin

  // Glow trail refs for scenario 1
  const glowTrail1Ref = useRef<SVGPathElement>(null); // Red zone 1 (Mastautin to Kariah Selepas)
  const glowTrail2Ref = useRef<SVGPathElement>(null); // Green zone (Kariah Selepas to Kariah Sebelum)
  const glowTrail3Ref = useRef<SVGPathElement>(null); // Red zone 2 (Kariah Sebelum to Mukim)
  const carGlowRef = useRef<SVGCircleElement>(null); // Glow circle under car

  // Glow trail refs for scenario 2
  const glow2aRedRef = useRef<SVGPathElement>(null);   // Leg1: Red zone (Kariah Selepas)
  const glow2aGreenRef = useRef<SVGPathElement>(null); // Leg1: Green zone (musafir)
  const glow2bGreenRef = useRef<SVGPathElement>(null); // Leg2: Green zone (musafir)
  const glow2bRedRef = useRef<SVGPathElement>(null);   // Leg2: Red zone (Kariah Sebelum)

  // Glow trail refs for scenario 3
  const glow3aRedRef = useRef<SVGPathElement>(null);   // Leg1 (To Musafir): Red zone (Kariah Selepas)
  const glow3aGreenRef = useRef<SVGPathElement>(null); // Leg1 (To Musafir): Green zone
  const glow3bGreenRef = useRef<SVGPathElement>(null); // Leg2 (Back to Mastautin): Green line from Musafir to edge
  const glow3bRedRef = useRef<SVGPathElement>(null);   // Leg2 (Back to Mastautin): Red line from edge to Mastautin

  // Car chat bubble ref
  const chatBubbleRef = useRef<SVGGElement>(null);

  // Observe when section enters viewport (one-shot)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Map container animation
      gsap.fromTo(
        mapRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Draw all paths with staggered animation
      const paths = [path1Ref, path2aRef, path2bRef, path3Ref];
      paths.forEach((pathRef, index) => {
        if (pathRef.current) {
          // Start visible immediately - opacity is controlled by activeScenario
          gsap.fromTo(
            pathRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              delay: 0.5 + index * 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate car for each scenario — only after section is visible
  useEffect(() => {
    if (!carRef.current || isAnimating || !sectionInView) return;

    setIsAnimating(true);
    const car = carRef.current;

    // Reset car position and make visible
    gsap.set(car, { opacity: 0, x: 0, y: 0 });

    // Reset ALL glow trails from all scenarios
    const allTrails = [
      glowTrail1Ref.current, glowTrail2Ref.current, glowTrail3Ref.current,
      glow2aRedRef.current, glow2aGreenRef.current, glow2bGreenRef.current, glow2bRedRef.current,
      glow3aRedRef.current, glow3aGreenRef.current, glow3bRedRef.current,
    ];
    allTrails.forEach(trail => {
      if (trail) {
        const len = trail.getTotalLength();
        gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      }
    });
    if (carGlowRef.current) {
      gsap.set(carGlowRef.current, { opacity: 0 });
    }
    if (chatBubbleRef.current) {
      gsap.set(chatBubbleRef.current, { opacity: 0, scale: 0, transformOrigin: "bottom center" });
    }

    let animationTimeline: gsap.core.Timeline;

    switch (activeScenario) {
      case 1: // Mastautin -> Mukim
        if (path1Ref.current) {
          // Reset glow trails
          const trails = [glowTrail1Ref.current, glowTrail2Ref.current, glowTrail3Ref.current];
          trails.forEach(trail => {
            if (trail) {
              const len = trail.getTotalLength();
              gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
            }
          });

          // Reset car glow
          if (carGlowRef.current) {
            gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0 });
          }

          animationTimeline = gsap.timeline({
            onStart: () => setStatusText("Bertolak dari Mastautin..."),
            onComplete: () => {
              setIsAnimating(false);
              setStatusText("Tiba di Mukim. Solat penuh semula.");
              gsap.fromTo(mukimNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            },
          });

          animationTimeline
            .set(car, { opacity: 1 })
            // Set initial car glow to red
            .set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 })

            // === ZONE 1: Red glow (Within Kariah Selepas circle) ===
            .add(() => setStatusText("🔴 Dalam kariah Mastautin. Solat penuh."))
            .to(car, {
              motionPath: {
                path: path1Ref.current,
                align: path1Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.29,
              },
              duration: 1.5,
              ease: 'power1.inOut',
            })
            // Draw red glow trail
            .to(glowTrail1Ref.current, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            }, '<')

            // === ZONE 2: Green glow (Outside kariah circles) ===
            .add(() => {
              setStatusText("🟢 Keluar kariah. Musafir — boleh jamak/qasar.");
              // Change car glow to green
              gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path1Ref.current,
                align: path1Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.29,
                end: 0.765,
              },
              duration: 5,
              ease: 'none',
            })
            // Draw green glow trail
            .to(glowTrail2Ref.current, {
              strokeDashoffset: 0,
              duration: 5,
              ease: 'none',
            }, '<')

            // === ZONE 3: Red glow (Within Kariah Sebelum circle) ===
            .add(() => {
              setStatusText("🔴 Masuk kariah Mukim. Solat penuh semula.");
              // Change car glow back to red
              gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path1Ref.current,
                align: path1Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.765,
                end: 1,
              },
              duration: 1.5,
              ease: 'power1.inOut',
            })
            // Draw red glow trail
            .to(glowTrail3Ref.current, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            }, '<');
        }
        break;

      case 2: // Mastautin -> Musafir -> Mukim
        if (path2aRef.current && path2bRef.current) {
          // Reset scenario 2 glow trails
          const s2trails = [glow2aRedRef.current, glow2aGreenRef.current, glow2bGreenRef.current, glow2bRedRef.current];
          s2trails.forEach(trail => {
            if (trail) {
              const len = trail.getTotalLength();
              gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
            }
          });

          // Reset car glow
          if (carGlowRef.current) {
            gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0 });
          }

          animationTimeline = gsap.timeline({
            onStart: () => setStatusText("Bertolak dari Mastautin..."),
            onComplete: () => {
              setIsAnimating(false);
              setStatusText("Tiba di Mukim. Solat penuh semula.");
              gsap.fromTo(mukimNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            },
          });

          animationTimeline
            .set(car, { opacity: 1, scale: 1 })
            .set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 })

            // === LEG 1: Mastautin -> Musafir ===

            // Zone 1a: Red glow (within Kariah Selepas circle)
            .add(() => setStatusText("🔴 Dalam kariah Mastautin. Solat penuh."))
            .to(car, {
              motionPath: {
                path: path2aRef.current,
                align: path2aRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.29,
              },
              duration: 1.5,
              ease: 'power1.inOut',
            })
            .to(glow2aRedRef.current, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            }, '<')

            // Zone 1b: Green glow (musafir zone, rest of leg 1)
            .add(() => {
              setStatusText("🟢 Keluar kariah. Musafir — boleh jamak/qasar.");
              gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path2aRef.current,
                align: path2aRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.29,
                end: 1,
              },
              duration: 3,
              ease: 'none',
            })
            .to(glow2aGreenRef.current, {
              strokeDashoffset: 0,
              duration: 3,
              ease: 'none',
            }, '<')

            // Pause at Musafir node
            .add(() => {
              setStatusText("🟢 Singgah di Musafir. Boleh jamak/qasar.");
              gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            })
            // Move car up to rest horizontally
            .to(car, {
              y: 235,
              rotation: 0,
              scale: 1.3,
              duration: 0.4,
              ease: 'back.out(1.5)'
            })
            .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
            .to(car, { scale: 1, duration: 1.2 }) // resting duration
            .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
            // Return car to path
            .to(car, {
              y: 280,
              duration: 0.4,
              ease: 'power2.in'
            })

            // === LEG 2: Musafir -> Mukim ===

            // Zone 2a: Green glow (musafir zone, most of leg 2)
            .add(() => setStatusText("🟢 Menyambung perjalanan. Masih musafir."))
            .to(car, {
              motionPath: {
                path: path2bRef.current,
                align: path2bRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.765,
              },
              duration: 3,
              ease: 'none',
            })
            .to(glow2bGreenRef.current, {
              strokeDashoffset: 0,
              duration: 3,
              ease: 'none',
            }, '<')

            // Zone 2b: Red glow (within Kariah Sebelum circle)
            .add(() => {
              setStatusText("🔴 Masuk kariah Mukim. Solat penuh semula.");
              gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path2bRef.current,
                align: path2bRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.765,
                end: 1,
              },
              duration: 1.5,
              ease: 'power1.inOut',
            })
            .to(glow2bRedRef.current, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            }, '<');
        }
        break;

      case 3: // Musafir -> Mastautin (But starting from Mastautin)
        if (path2aRef.current && path3Ref.current) {
          // Reset scenario 3 glow trails
          const s3trails = [glow3aRedRef.current, glow3aGreenRef.current, glow3bGreenRef.current, glow3bRedRef.current];
          s3trails.forEach(trail => {
            if (trail) {
              const len = trail.getTotalLength();
              gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
            }
          });

          // Reset car glow and chat bubble
          if (carGlowRef.current) gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0 });
          if (chatBubbleRef.current) gsap.set(chatBubbleRef.current, { opacity: 0, scale: 0 });

          animationTimeline = gsap.timeline({
            onStart: () => setStatusText("Bertolak dari Mastautin ke Musafir..."),
            onComplete: () => {
              setIsAnimating(false);
              setStatusText("Tiba di Mastautin. Solat biasa.");
              gsap.fromTo(mastautinNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            },
          });

          animationTimeline
            .set(car, { opacity: 1, scale: 1 })
            .set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 })

            // === LEG 1: Mastautin -> Musafir ===

            // Zone 1a: Red glow (within Kariah Selepas circle)
            .add(() => setStatusText("🔴 Dalam kariah Mastautin. Solat penuh."))
            .to(car, {
              motionPath: {
                path: path2aRef.current,
                align: path2aRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.29,
              },
              duration: 1.5,
              ease: 'power1.inOut',
            })
            .to(glow3aRedRef.current, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            }, '<')

            // Zone 1b: Green glow (musafir zone)
            .add(() => {
              setStatusText("🟢 Keluar kariah. Musafir — boleh jamak/qasar.");
              gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path2aRef.current,
                align: path2aRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.29,
                end: 1,
              },
              duration: 3,
              ease: 'power1.inOut',
            })
            .to(glow3aGreenRef.current, {
              strokeDashoffset: 0,
              duration: 3,
              ease: 'power1.inOut',
            }, '<')

            // Pause at Musafir node
            .add(() => {
              setStatusText("Berehat di Musafir...");
              gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            })
            // Rest position
            .to(car, {
              y: 235,
              rotation: 0,
              duration: 0.5,
              ease: 'back.out(1.5)'
            })
            .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
            .to(car, { duration: 1.5 }) // pause duration
            .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
            // Return to path
            .to(car, {
              y: 280,
              duration: 0.4,
              ease: 'power2.in'
            })

            // === LEG 2: Musafir -> Mastautin ===
            .add(() => {
              setStatusText("🔴 Pulang balik ke Mastautin. Masih musafir.");
              gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path3Ref.current,
                align: path3Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 0.765,
              },
              duration: 2.5,
              ease: 'none',
            })
            .to(glow3bGreenRef.current, {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: 'none',
            }, '<')
            .add(() => {
              setStatusText("🔴 Masuk kariah Mastautin. Solat biasa.");
              gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 });
            })
            .to(car, {
              motionPath: {
                path: path3Ref.current,
                align: path3Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0.765,
                end: 1,
              },
              duration: 1.5,
              ease: 'power1.inOut',
            })
            .to(glow3bRedRef.current, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power1.inOut',
            }, '<');
        }
        break;
    }

    return () => {
      if (animationTimeline) animationTimeline.kill();
    };
  }, [activeScenario, sectionInView]);

  const scenarios = [
    {
      id: 1,
      title: 'Mastautin → Mukim',
      description: 'Dari tempat tinggal tetap ke tempat menetap sementara (lebih 3 hari)',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 2,
      title: 'Mastautin → Musafir → Mukim',
      description: 'Dari mastautin ke musafir (≥81km) kemudian ke mukim',
      icon: <Navigation className="w-5 h-5" />,
    },
    {
      id: 3,
      title: 'Musafir → Mastautin',
      description: 'Dalam perjalanan kembali ke tempat tinggal tetap',
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <section
      id="situasi-perjalanan"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 landscape:py-8 overflow-hidden"
      style={{ backgroundColor: '#f0faf7' }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23024c44'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 landscape:mb-4 opacity-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl landscape:text-3xl font-display font-bold text-teal mb-4 landscape:mb-2">
            SITUASI PERJALANAN
          </h2>
          <p className="text-xl text-gray-600 font-display max-w-2xl mx-auto">
            Tiga situasi perjalanan yang memerlukan pemahaman tentang hukum solat
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Scenario Buttons */}
        <div className="flex flex-wrap justify-center gap-4 landscape:gap-2 mb-12 landscape:mb-4">
          {scenarios.map((scenario) => (
            <Button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id as Scenario)}
              className={`px-6 py-4 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeScenario === scenario.id
                ? 'bg-teal text-white shadow-glow-teal scale-105'
                : 'bg-white text-teal hover:bg-teal/10 shadow-card'
                }`}
              disabled={isAnimating}
            >
              {scenario.icon}
              {scenario.title}
            </Button>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="text-center mb-8 h-8">
          {statusText && (
            <span className="inline-block px-4 py-1 bg-teal/10 text-teal font-semibold rounded-full text-sm animate-fade-in">
              {statusText}
            </span>
          )}
        </div>

        {/* Active Scenario Description */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-2xl px-8 py-4 landscape:px-5 landscape:py-2 shadow-card border border-teal/10">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-teal">
                {scenarios[activeScenario - 1].title}:
              </span>{' '}
              {scenarios[activeScenario - 1].description}
            </p>
          </div>
        </div>

        {/* Mind Map Visualization */}
        <div
          ref={mapRef}
          className="relative mx-auto max-w-3xl landscape:max-w-lg opacity-0"
        >
          <div className="relative aspect-square max-w-2xl mx-auto">
            {/* Main Circle Background */}
            <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-teal/5 to-teal/10 border-2 border-dashed border-teal/20" />

            {/* SVG Roads and Paths */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Definitions */}
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#1a1a1a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="roadGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="50%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#d4a574" />
                </marker>
              </defs>

              {/* Path 1: Mastautin -> Mukim (Straight road) */}
              <g className="transition-opacity duration-500" style={{ opacity: activeScenario === 1 ? 1 : 0.2 }}>
                <path
                  ref={path1Ref}
                  d="M 100 120 L 300 120"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={activeScenario === 1 ? "10" : "6"}
                  strokeLinecap="round"
                />
                {/* Dashed Center Line */}
                <path
                  d="M 100 120 L 300 120"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="8,6"
                  strokeOpacity="0.9"
                />
              </g>

              {/* Path 2a: Mastautin -> Musafir (Left diagonal down) */}
              <g className="transition-opacity duration-500" style={{ opacity: activeScenario === 2 ? 1 : 0.2 }}>
                <path
                  ref={path2aRef}
                  d="M 100 120 Q 150 200, 200 280"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={activeScenario === 2 ? "10" : "6"}
                  strokeLinecap="round"
                  filter={activeScenario === 2 ? "url(#glow)" : ""}
                />
                <path
                  d="M 100 120 Q 150 200, 200 280"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.5"
                />
              </g>

              {/* Path 2b: Musafir -> Mukim (Right diagonal up) */}
              <g className="transition-opacity duration-500" style={{ opacity: activeScenario === 2 ? 1 : 0.2 }}>
                <path
                  ref={path2bRef}
                  d="M 200 280 Q 250 200, 300 120"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={activeScenario === 2 ? "10" : "6"}
                  strokeLinecap="round"
                  filter={activeScenario === 2 ? "url(#glow)" : ""}
                />
                <path
                  d="M 200 280 Q 250 200, 300 120"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.5"
                />
              </g>

              {/* Path 3: Musafir -> Mastautin (Left diagonal up) */}
              <g className="transition-opacity duration-500" style={{ opacity: activeScenario === 3 ? 1 : 0.2 }}>
                <path
                  ref={path3Ref}
                  d="M 200 280 Q 150 200, 100 120"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={activeScenario === 3 ? "10" : "6"}
                  strokeLinecap="round"
                  filter={activeScenario === 3 ? "url(#glow)" : ""}
                />
                <path
                  d="M 200 280 Q 150 200, 100 120"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.5"
                />
              </g>

              {/* Duplicate Path 2a visual for Scenario 3 so both legs are visible */}
              <g className="transition-opacity duration-500" style={{ opacity: activeScenario === 3 ? 1 : 0 }}>
                <path
                  d="M 100 120 Q 150 200, 200 280"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth={activeScenario === 3 ? "10" : "6"}
                  strokeLinecap="round"
                  filter={activeScenario === 3 ? "url(#glow)" : ""}
                />
                <path
                  d="M 100 120 Q 150 200, 200 280"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  strokeOpacity="0.5"
                />
              </g>

              {/* Distance Labels */}
              <text
                x="200"
                y="110"
                textAnchor="middle"
                className="fill-teal text-sm font-bold"
                style={{ fontSize: '14px' }}
              >
                ≥81 KM
              </text>
              <text
                x="130"
                y="210"
                textAnchor="middle"
                className="fill-teal text-sm font-bold"
                transform="rotate(-55, 130, 210)"
                style={{ fontSize: '14px' }}
              >
                ≥81 KM
              </text>
              <text
                x="270"
                y="210"
                textAnchor="middle"
                className="fill-teal text-sm font-bold"
                transform="rotate(55, 270, 210)"
                style={{ fontSize: '14px' }}
              >
                ≥81 KM
              </text>

              {/* Glow Trail Segments for Scenario 1 */}
              {/* Red zone 1: Within Kariah Selepas circle (x=100 to x=158) */}
              <path
                ref={glowTrail1Ref}
                d="M 100 120 L 158 120"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Green zone: Outside kariah circles (x=158 to x=253) */}
              <path
                ref={glowTrail2Ref}
                d="M 158 120 L 253 120"
                fill="none"
                stroke="#22c55e"
                strokeWidth="14"
                strokeLinecap="butt"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Red zone 2: Within Kariah Sebelum circle (x=253 to x=300) */}
              <path
                ref={glowTrail3Ref}
                d="M 253 120 L 300 120"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />

              {/* Glow Trail Segments for Scenario 2 */}
              {/* Leg 1 Red: Kariah Selepas zone on path2a */}
              <path
                ref={glow2aRedRef}
                d="M 100 120 Q 114 143, 129 166"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Leg 1 Green: Musafir zone on path2a */}
              <path
                ref={glow2aGreenRef}
                d="M 129 166 Q 185 256, 200 280"
                fill="none"
                stroke="#22c55e"
                strokeWidth="14"
                strokeLinecap="butt"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Leg 2 Green: Musafir zone on path2b */}
              <path
                ref={glow2bGreenRef}
                d="M 200 280 Q 237 221, 274 161"
                fill="none"
                stroke="#22c55e"
                strokeWidth="14"
                strokeLinecap="butt"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Leg 2 Red: Kariah Sebelum zone on path2b */}
              <path
                ref={glow2bRedRef}
                d="M 274 161 Q 287 141, 300 120"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />

              {/* Glow Trail Segments for Scenario 3 */}
              {/* Leg 1 Red: Kariah Selepas zone on path2a */}
              <path
                ref={glow3aRedRef}
                d="M 100 120 Q 114 143, 129 166"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Leg 1 Green: Musafir zone to Musafir */}
              <path
                ref={glow3aGreenRef}
                d="M 129 166 Q 185 256, 200 280"
                fill="none"
                stroke="#22c55e"
                strokeWidth="14"
                strokeLinecap="butt"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              {/* Leg 2 Red: Return journey from Musafir to Mastautin */}
              <path
                ref={glow3bGreenRef}
                d="M 200 280 Q 165 224, 129 166"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="butt"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />
              <path
                ref={glow3bRedRef}
                d="M 129 166 Q 114 143, 100 120"
                fill="none"
                stroke="#ef4444"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0"
                style={{ filter: 'blur(3px)' }}
              />

              <g style={{ opacity: 0 }}></g>
            </svg>

            {/* Mastautin Node (Top Left) */}
            <div
              ref={mastautinNodeRef}
              className="absolute pointer-events-none"
              style={{ top: '30%', left: '25%' }}
            >
              {/* Capsule offset up and left so its bottom touches the origin exactly */}
              <div
                className={`absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center shadow-glow-teal transition-transform duration-300 ${activeScenario === 1 || activeScenario === 2 ? 'scale-110 ring-4 ring-teal/20' : ''}`}
                style={{ top: '-28px', left: '-28px', transform: 'translate(-50%, -50%) rotate(-45deg)' }}
              >
                <span className="text-white text-[10px] sm:text-xs font-bold">MASTAUTIN</span>
              </div>

              {/* Kariah Selepas - Anchored to shroud both SVG paths without touching capsule */}
              <div
                className="absolute z-10 pointer-events-auto"
                style={{ top: '40px', left: '60px', transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-teal rounded-full flex flex-col items-center justify-center">
                  <span className="text-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight">Sempadan<br />Kariah</span>
                </div>
              </div>
            </div>

            {/* Mukim Node (Top Right) */}
            <div
              ref={mukimNodeRef}
              className="absolute pointer-events-none"
              style={{ top: '30%', left: '75%' }}
            >
              {/* Capsule offset up and right so its bottom touches the origin exactly */}
              <div
                className={`absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center shadow-glow-teal transition-transform duration-300 ${activeScenario === 1 || activeScenario === 2 ? 'scale-110 ring-4 ring-teal/20' : ''}`}
                style={{ top: '-28px', left: '28px', transform: 'translate(-50%, -50%) rotate(35deg)' }}
              >
                <span className="text-white text-[10px] sm:text-xs font-bold">MUKIM</span>
              </div>

              {/* Kariah Sebelum - Anchored to shroud both SVG paths without touching capsule */}
              <div
                className="absolute z-10 pointer-events-auto"
                style={{ top: '40px', left: '-60px', transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-teal rounded-full flex flex-col items-center justify-center">
                  <span className="text-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight">Sempadan<br />Kariah</span>
                </div>
              </div>
            </div>

            {/* Musafir Node (Bottom Center) */}
            <div
              ref={musafirNodeRef}
              className="absolute"
              style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className={`w-32 h-16 sm:w-40 sm:h-20 bg-gradient-to-br from-soft-green to-teal rounded-full flex flex-col items-center justify-center shadow-glow-teal transition-transform duration-300 ${activeScenario === 2 || activeScenario === 3 ? 'scale-110 ring-4 ring-teal/20' : ''}`}>
                <span className="text-white text-sm sm:text-base font-bold mt-1">MUSAFIR</span>
                <span className="text-white/90 text-sm sm:text-base font-semibold mt-0.5">1+3+1</span>
              </div>
            </div>

            {/* RNR Icon in the Center */}
            <div
              className="absolute flex flex-col items-center"
              style={{ top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="flex flex-col items-center leading-none mb-1.5">
                <span className="text-teal font-display font-extrabold text-2xl">R</span>
                <span className="text-teal font-display font-extrabold text-lg my-0.5">&</span>
                <span className="text-teal font-display font-extrabold text-2xl">R</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center shadow-lg">
                <Coffee className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Overlay SVG for Car (rendered above the nodes) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))" }}
            >
              <g ref={carRef} style={{ opacity: 0 }}>
                <circle ref={carGlowRef} cx="0" cy="0" r="22" fill="#ef4444" fillOpacity="0.4" style={{ filter: 'blur(4px)' }} />
                <circle cx="0" cy="0" r="16" fill="white" stroke="#d4a574" strokeWidth="2" strokeDasharray="2,2" />
                <text x="0" y="5" textAnchor="middle" style={{ fontSize: '18px', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}>🚗</text>

                <g ref={chatBubbleRef} style={{ opacity: 0 }}>
                  <path d="M 15 -35 Q 25 -35 25 -25 L 25 -15 Q 25 -5 15 -5 L 5 -5 L -5 5 L 0 -5 L -15 -5 Q -25 -5 -25 -15 L -25 -25 Q -25 -35 -15 -35 Z" fill="white" stroke="#024c44" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                  <text x="0" y="-17" textAnchor="middle" fill="#024c44" style={{ fontSize: '9px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Berehat</text>
                </g>
              </g>
            </svg>

          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Mastautin Info */}
          <div className="bg-white rounded-2xl p-6 shadow-card border-t-4 border-teal">
            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-teal" />
            </div>
            <h4 className="text-lg font-display font-bold text-teal mb-2">
              Mastautin
            </h4>
            <p className="text-gray-600 text-sm">
              Tempat tinggal tetap seseorang. Tidak boleh melakukan qasar atau
              jamak.
            </p>
            <div className="mt-3 text-xs text-teal/70 bg-teal/5 rounded-lg px-3 py-2">
              <span className="font-semibold">Sempadan:</span> Kariah Selepas
            </div>
          </div>

          {/* Musafir Info */}
          <div className="bg-white rounded-2xl p-6 shadow-card border-t-4 border-soft-green">
            <div className="w-12 h-12 bg-soft-green/10 rounded-full flex items-center justify-center mb-4">
              <Navigation className="w-6 h-6 text-soft-green" />
            </div>
            <h4 className="text-lg font-display font-bold text-soft-green mb-2">
              Musafir
            </h4>
            <p className="text-gray-600 text-sm">
              Dalam perjalanan ≥81km. Boleh melakukan qasar dan jamak selama 3
              hari (1+3+1).
            </p>
            <div className="mt-3 text-xs text-soft-green/70 bg-soft-green/5 rounded-lg px-3 py-2">
              <span className="font-semibold">Tempoh:</span> 1 hari pergi + 3 hari + 1 hari balik
            </div>
          </div>

          {/* Mukim Info */}
          <div className="bg-white rounded-2xl p-6 shadow-card border-t-4 border-gold">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <h4 className="text-lg font-display font-bold text-gold mb-2">
              Mukim
            </h4>
            <p className="text-gray-600 text-sm">
              Menetap sementara &gt;3 hari. Boleh melakukan qasar dan jamak
              mengikut tempoh.
            </p>
            <div className="mt-3 text-xs text-gold/70 bg-gold/5 rounded-lg px-3 py-2">
              <span className="font-semibold">Sempadan:</span> Kariah Sebelum
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
