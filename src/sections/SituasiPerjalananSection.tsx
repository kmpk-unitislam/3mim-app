import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Coffee } from 'lucide-react';
import { HandDrawnArrow } from '../components/HandDrawnArrow';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Scenario = 1 | 2 | 3;

export default function SituasiPerjalananSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const [activeScenario, setActiveScenario] = useState<Scenario>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [, setStatusText] = useState("");
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Refs for node pulse animations
  const mastautinNodeRef = useRef<HTMLDivElement>(null);
  const musafirNodeRef = useRef<HTMLDivElement>(null);
  const mukimNodeRef = useRef<HTMLDivElement>(null);
  const musafir3Ref = useRef<HTMLSpanElement>(null);

  // SVG Path refs for each route
  const path1Ref = useRef<SVGPathElement>(null); // Mastautin -> Mukim
  const path2aRef = useRef<SVGPathElement>(null); // Mastautin -> Musafir
  const path2bRef = useRef<SVGPathElement>(null); // Musafir -> Mukim
  const path3Ref = useRef<SVGPathElement>(null); // Musafir -> Mastautin
  const path3aRef = useRef<SVGPathElement>(null); // Mukim -> Musafir (Scenario 3 Leg 1)

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

  // Glow trail refs for scenario 3 (Mukim -> Musafir -> Mastautin)
  const glow3aRedRef = useRef<SVGPathElement>(null);   // Leg1 (Mukim to Musafir): Kariah Sebelum zone
  const glow3aGreenRef = useRef<SVGPathElement>(null); // Leg1 (Mukim to Musafir): Musafir zone
  const glow3bGreenRef = useRef<SVGPathElement>(null); // Leg2 (Musafir to Mastautin): Musafir zone
  const glow3bRedRef = useRef<SVGPathElement>(null);   // Leg2 (Musafir to Mastautin): Kariah Selepas zone

  // Car chat bubble ref
  const chatBubbleRef = useRef<SVGGElement>(null);

  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});
  const currentAudioIdRef = useRef<number | null>(null);

  useEffect(() => {
    // initialize audios on mount
    audioRefs.current = {
      1: new Audio(import.meta.env.BASE_URL + 'No.1.m4a'),
      2: new Audio(import.meta.env.BASE_URL + 'No 2.m4a'),
      3: new Audio(import.meta.env.BASE_URL + 'No 3.m4a')
    };

    // Preload them
    Object.values(audioRefs.current).forEach(audio => {
      audio.preload = 'auto';
    });

    return () => {
      // Clean up audios on unmount
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
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

  // Animate car for each scenario — only on button click
  useEffect(() => {
    if (!carRef.current || clickCount === 0) return;

    // Pause any currently playing audio from previous clicks
    if (currentAudioIdRef.current && audioRefs.current[currentAudioIdRef.current]) {
      const prevAudio = audioRefs.current[currentAudioIdRef.current];
      prevAudio.pause();
      prevAudio.currentTime = 0;
    }

    const currentAudio = audioRefs.current[activeScenario];
    currentAudioIdRef.current = activeScenario;

    // Kill any existing animation
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }

    setIsAnimating(true);
    const car = carRef.current;

    // Reset car position and make visible
    gsap.set(car, { opacity: 0, x: 0, y: 0, scaleY: 1 });

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
    if (musafir3Ref.current) {
      gsap.set(musafir3Ref.current, { scale: 1, textShadow: "none", color: "rgba(255,255,255,0.9)" });
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
            .set(car, { opacity: 1, scaleY: 1 })
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
            .set(car, { opacity: 1, scale: 1, scaleY: 1 })
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
              gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            })
            .to(musafir3Ref.current, {
              scale: 1.5,
              textShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #fbbf24, 0 0 40px #fbbf24",
              color: "#fbbf24",
              duration: 0.4,
              yoyo: true,
              repeat: 3,
              ease: "sine.inOut"
            }, "<")
            .to(car, {
              y: 235,
              rotation: 0,
              scale: 1.3,
              duration: 0.4,
              ease: 'back.out(1.5)'
            }, "<")
            .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
            .to(car, { scale: 1, duration: 1.2 })
            .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
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

      case 3: // Mukim -> Musafir -> Mastautin
        if (path3aRef.current && path3Ref.current) {
          // Reset scenario 3 glow trails
          const s3trails = [glow3aRedRef.current, glow3aGreenRef.current, glow3bGreenRef.current, glow3bRedRef.current];
          s3trails.forEach(trail => {
            if (trail) {
              const len = trail.getTotalLength();
              gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
            }
          });

          // Reset car glow and chat bubble
          if (carGlowRef.current) gsap.set(carGlowRef.current, { fill: '#22c55e', opacity: 0 });
          if (chatBubbleRef.current) gsap.set(chatBubbleRef.current, { opacity: 0, scale: 0 });

          animationTimeline = gsap.timeline({
            onStart: () => setStatusText("Bertolak dari Mukim ke Musafir..."),
            onComplete: () => {
              setIsAnimating(false);
              setStatusText("Tiba di Mastautin. Solat penuh semula.");
              gsap.fromTo(mastautinNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
            },
          });

          animationTimeline
            .set(car, { opacity: 1, scale: 1, scaleX: 1, scaleY: -1 })
            .set(carGlowRef.current, { fill: '#22c55e', opacity: 0.5 })

            // === LEG 1: Mukim -> Musafir ===

            // Zone 1a: Kariah Sebelum zone (near Mukim)
            .add(() => setStatusText("🟢 Keluar dari Mukim. Mula musafir."))
            .to(car, {
              motionPath: {
                path: path3aRef.current,
                align: path3aRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: 180,
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

            // Zone 1b: Musafir zone (heading to Musafir)
            .add(() => {
              setStatusText("🟢 Dalam perjalanan. Musafir — boleh jamak/qasar.");
            })
            .to(car, {
              motionPath: {
                path: path3aRef.current,
                align: path3aRef.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: 180,
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
              gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
              // Instantly lay flat right-side up
              gsap.set(car, { rotation: 0, scaleY: 1 });
            })
            .to(musafir3Ref.current, {
              scale: 1.5,
              textShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24, 0 0 30px #fbbf24, 0 0 40px #fbbf24",
              color: "#fbbf24",
              duration: 0.4,
              yoyo: true,
              repeat: 3,
              ease: "sine.inOut"
            }, "<")
            .to(car, {
              y: 235,
              duration: 0.5,
              ease: 'back.out(1.5)'
            }, "<")
            .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
            .to(car, { duration: 1.5 })
            .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
            .to(car, {
              y: 280,
              duration: 0.4,
              ease: 'power2.in'
            })

            // === LEG 2: Musafir -> Mastautin ===
            .add(() => {
              setStatusText("🟢 Menyambung ke Mastautin. Masih musafir.");
              // Keep scaleY:1 (right-side up) + autoRotate:180 for mirrored path
              gsap.set(car, { scaleY: 1 });
            })
            .to(car, {
              motionPath: {
                path: path3Ref.current,
                align: path3Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: 180,
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
              setStatusText("🟢 Masuk kariah Mastautin. Solat penuh semula.");
            })
            .to(car, {
              motionPath: {
                path: path3Ref.current,
                align: path3Ref.current,
                alignOrigin: [0.5, 0.5],
                autoRotate: 180,
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

    const playAndSync = () => {
      if (animationTimeline) {
        if (currentAudio.duration && currentAudio.duration !== Infinity && !isNaN(currentAudio.duration)) {
          // Sync animation length to audio length exactly
          animationTimeline.duration(currentAudio.duration);
        }
        animationTimelineRef.current = animationTimeline;
      }
      currentAudio.play().catch(e => console.warn("Audio auto-play prevented:", e));
    };

    if (currentAudio.readyState >= 1) {
      playAndSync();
    } else {
      let fallbackTriggered = false;
      const onMetadata = () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          playAndSync();
        }
        currentAudio.onloadedmetadata = null;
      };
      currentAudio.onloadedmetadata = onMetadata;

      // Fallback if metadata fails to load quickly
      setTimeout(() => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          playAndSync();
        }
      }, 1000);
    }

    return () => {
      if (animationTimeline) animationTimeline.kill();
    };
  }, [clickCount]);

  const scenarios = [
    {
      id: 1,
      title: 'Mastautin → Mukim',
      description: 'Dari tempat tinggal tetap ke tempat menetap sementara (lebih 3 hari)',
      icon: <span className="font-display font-bold text-lg w-5 h-5 flex items-center justify-center">1</span>,
    },
    {
      id: 2,
      title: 'Mastautin → Musafir → Mukim',
      description: 'Dari mastautin ke musafir (≥81km) kemudian ke mukim',
      icon: <span className="font-display font-bold text-lg w-5 h-5 flex items-center justify-center">2</span>,
    },
    {
      id: 3,
      title: 'Mukim → Musafir → Mastautin',
      description: 'Dari mukim ke musafir kemudian ke mastautin',
      icon: <span className="font-display font-bold text-lg w-5 h-5 flex items-center justify-center">3</span>,
    },
  ];

  return (
    <section
      id="situasi-perjalanan"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 landscape:max-lg:py-8 overflow-hidden"
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
        <div ref={titleRef} className="text-center mb-12 landscape:max-lg:mb-4 opacity-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl landscape:max-lg:text-3xl font-display font-bold text-teal mb-4 landscape:max-lg:mb-2">
            SITUASI PERJALANAN
          </h2>
          <p className="text-xl text-gray-600 font-display max-w-2xl mx-auto">
            Tiga situasi perjalanan yang memerlukan pemahaman tentang hukum solat
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Layout: Map + Buttons */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-center max-w-6xl mx-auto">

          {/* Mind Map Visualization */}
          <div
            ref={mapRef}
            className="relative w-full lg:w-[60%] flex flex-col items-center flex-shrink-0 opacity-0"
          >
            <div className="min-h-[450px] lg:min-h-[600px] aspect-square lg:aspect-[4/3] relative rounded-3xl w-full max-w-[600px] overflow-hidden bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
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
                <g className="transition-opacity duration-500" style={{ opacity: (activeScenario === 2 || activeScenario === 3) ? 1 : 0.2 }}>
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

                {/* Path 3a: Mukim -> Musafir (Right diagonal down, for Scenario 3 Leg 1) */}
                <g className="transition-opacity duration-500" style={{ opacity: activeScenario === 3 ? 1 : 0 }}>
                  <path
                    ref={path3aRef}
                    d="M 300 120 Q 250 200, 200 280"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth={activeScenario === 3 ? "10" : "6"}
                    strokeLinecap="round"
                    filter={activeScenario === 3 ? "url(#glow)" : ""}
                  />
                  <path
                    d="M 300 120 Q 250 200, 200 280"
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
                  y="102"
                  textAnchor="middle"
                  className="fill-[#024c44] text-sm font-extrabold"
                  style={{ fontSize: '15px', letterSpacing: '0.5px' }}
                >
                  ≥81 KM
                </text>
                <text
                  x="123"
                  y="220"
                  textAnchor="middle"
                  className="fill-[#024c44] text-sm font-extrabold"
                  transform="rotate(-55, 123, 220)"
                  style={{ fontSize: '15px', letterSpacing: '0.5px' }}
                >
                  ≥81 KM
                </text>
                <text
                  x="277"
                  y="220"
                  textAnchor="middle"
                  className="fill-[#024c44] text-sm font-extrabold"
                  transform="rotate(55, 277, 220)"
                  style={{ fontSize: '15px', letterSpacing: '0.5px' }}
                >
                  ≥81 KM
                </text>

                {/* Glow Trail Segments for Scenario 1 */}
                {/* Red zone 1: Within Kariah Selepas circle (x=100 to x=158) */}
                <path
                  ref={glowTrail1Ref}
                  d="M 100 120 L 158 120"
                  fill="none"
                  stroke="#22c55e"
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
                  stroke="#22c55e"
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
                  stroke="#22c55e"
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
                  stroke="#22c55e"
                  strokeWidth="14"
                  strokeLinecap="round"
                  opacity="0"
                  style={{ filter: 'blur(3px)' }}
                />

                {/* Glow Trail Segments for Scenario 3 (Mukim -> Musafir -> Mastautin) */}
                {/* Leg 1: Kariah Sebelum zone (near Mukim) */}
                <path
                  ref={glow3aRedRef}
                  d="M 300 120 Q 287 141, 274 161"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="14"
                  strokeLinecap="round"
                  opacity="0"
                  style={{ filter: 'blur(3px)' }}
                />
                {/* Leg 1: Musafir zone (Mukim side heading to Musafir) */}
                <path
                  ref={glow3aGreenRef}
                  d="M 274 161 Q 237 221, 200 280"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="14"
                  strokeLinecap="butt"
                  opacity="0"
                  style={{ filter: 'blur(3px)' }}
                />
                {/* Leg 2: Musafir zone (Musafir heading to Mastautin) */}
                <path
                  ref={glow3bGreenRef}
                  d="M 200 280 Q 165 224, 129 166"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="14"
                  strokeLinecap="butt"
                  opacity="0"
                  style={{ filter: 'blur(3px)' }}
                />
                {/* Leg 2: Kariah Selepas zone (near Mastautin) */}
                <path
                  ref={glow3bRedRef}
                  d="M 129 166 Q 114 143, 100 120"
                  fill="none"
                  stroke="#22c55e"
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
                  className={`absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-[#9b1d1d] to-[#b92b2b] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(185,43,43,0.6)] transition-transform duration-300 ${activeScenario === 1 || activeScenario === 2 ? 'scale-110 ring-4 ring-red-500/20' : ''}`}
                  style={{ top: '-28px', left: '-28px', transform: 'translate(-50%, -50%) rotate(-45deg)' }}
                >
                  <span className="text-white text-[10px] sm:text-xs font-bold shadow-sm">MASTAUTIN</span>
                </div>

                {/* Kariah Selepas - Anchored to shroud both SVG paths without touching capsule */}
                <div
                  className="absolute z-10 pointer-events-auto"
                  style={{ top: '25px', left: '35px', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-red-600 rounded-full flex flex-col items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">KARIAH<br />SELEPAS</span>
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
                  className={`absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-[#9b1d1d] to-[#b92b2b] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(185,43,43,0.6)] transition-transform duration-300 ${activeScenario === 1 || activeScenario === 2 ? 'scale-110 ring-4 ring-red-500/20' : ''}`}
                  style={{ top: '-28px', left: '28px', transform: 'translate(-50%, -50%) rotate(45deg)' }}
                >
                  <span className="text-white text-[10px] sm:text-xs font-bold shadow-sm">MUKIM</span>
                </div>

                {/* Kariah Sebelum - Anchored to shroud both SVG paths without touching capsule */}
                <div
                  className="absolute z-10 pointer-events-auto"
                  style={{ top: '25px', left: '-35px', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-red-600 rounded-full flex flex-col items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">KARIAH<br />SEBELUM</span>
                  </div>
                </div>
              </div>

              {/* Musafir Node (Bottom Center) */}
              <div
                ref={musafirNodeRef}
                className="absolute"
                style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <div className={`w-32 h-16 sm:w-40 sm:h-20 bg-gradient-to-br from-[#025046] to-[#01352e] rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(2,76,68,0.5)] transition-transform duration-300 ${activeScenario === 2 || activeScenario === 3 ? 'scale-110 ring-4 ring-teal/20' : ''}`}>
                  <span className="text-white text-sm sm:text-base font-bold mt-1 shadow-sm">MUSAFIR</span>
                  <span className="text-white/90 text-sm sm:text-base font-semibold mt-0.5 shadow-sm">
                    1+<span ref={musafir3Ref} className="inline-block relative z-10 font-extrabold text-lg sm:text-xl mx-0.5 origin-bottom" style={{ textShadow: "none", color: "rgba(255,255,255,0.9)" }}>3</span>+1
                  </span>
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

          {/* Scenario Buttons */}
          <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:pl-8 relative">
            {/* Hand-drawn sketch annotation */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 flex flex-col items-center pointer-events-none animate-bounce">
              <span className="text-teal font-['Caveat'] text-2xl sm:text-3xl whitespace-nowrap -rotate-6 mb-1 drop-shadow-sm">Klik di sini</span>
              <HandDrawnArrow className="w-10 h-10 text-teal -ml-4 -mt-2 drop-shadow-sm" />
            </div>
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  if (activeScenario === scenario.id as Scenario) {
                    setClickCount(c => c + 1);
                  } else {
                    setActiveScenario(scenario.id as Scenario);
                    setClickCount(c => c + 1);
                  }
                }}
                disabled={isAnimating}
                className={`w-full relative group flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-500 overflow-hidden ${activeScenario === scenario.id
                    ? 'bg-[#024c44] text-white shadow-[0_8px_30px_rgba(2,76,68,0.3)] scale-[1.02] ring-2 ring-gold/20'
                    : 'bg-white/80 backdrop-blur-sm text-[#024c44] shadow-sm hover:shadow-md border border-[#024c44]/10 hover:border-[#024c44]/30'
                  }`}
              >
                {/* Animated Background for active state */}
                {activeScenario === scenario.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-50 transition-opacity duration-300" />
                )}

                {/* Icon Container */}
                <div className={`relative z-10 p-2.5 rounded-full transition-all duration-300 ${activeScenario === scenario.id
                    ? 'bg-white/20 text-gold shadow-inner'
                    : 'bg-[#024c44]/5 text-[#024c44] group-hover:bg-[#024c44]/10'
                  }`}>
                  {scenario.icon}
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col items-start text-left flex-1">
                  <span className="font-bold text-[15px] sm:text-[16px] tracking-wide mb-0.5">
                    {scenario.title}
                  </span>
                  <span className={`text-[12px] leading-tight transition-colors duration-300 line-clamp-2 ${activeScenario === scenario.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                    {scenario.description}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>{/* end layout */}
      </div>
    </section>
  );
}
