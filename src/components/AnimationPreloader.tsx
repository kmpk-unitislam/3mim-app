import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Home, MapPin, Car, Navigation, CalendarDays, Sparkles, Heart, Building2, Briefcase, Coffee, ArrowLeft, ArrowRight, ArrowDown, HelpCircle, Clock } from 'lucide-react';

gsap.registerPlugin(MotionPathPlugin);

interface AnimationPreloaderProps {
    isPlaying: boolean;
    onComplete: () => void;
}

export default function AnimationPreloader({ isPlaying, onComplete }: AnimationPreloaderProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Slides refs
    const slide0Ref = useRef<HTMLDivElement>(null); // Opening
    const slide1Ref = useRef<HTMLDivElement>(null); // Tiga Mim
    const slide1MastautinRef = useRef<HTMLDivElement>(null);
    const slide1MukimRef = useRef<HTMLDivElement>(null);
    const slide1MusafirRef = useRef<HTMLDivElement>(null);
    const audioMastautinRef = useRef<HTMLAudioElement>(null);
    const audioMukimRef = useRef<HTMLAudioElement>(null);
    const audioMusafirRef = useRef<HTMLAudioElement>(null);
    const slide2Ref = useRef<HTMLDivElement>(null); // Tempoh
    const slide345Ref = useRef<HTMLDivElement>(null); // Situasi Perjalanan (holds all 3 scenarios automatically)
    const slide7Ref = useRef<HTMLDivElement>(null); // Closing

    // Situasi Perjalanan specific refs
    const path1Ref = useRef<SVGPathElement>(null);
    const path2aRef = useRef<SVGPathElement>(null);
    const path2bRef = useRef<SVGPathElement>(null);
    const path3Ref = useRef<SVGPathElement>(null);
    const path3aRef = useRef<SVGPathElement>(null);
    const carRef = useRef<SVGGElement>(null);
    const carGlowRef = useRef<SVGCircleElement>(null);
    const chatBubbleRef = useRef<SVGGElement>(null);
    const glowTrail1Ref = useRef<SVGPathElement>(null);
    const glowTrail2Ref = useRef<SVGPathElement>(null);
    const glowTrail3Ref = useRef<SVGPathElement>(null);
    const glow2aRedRef = useRef<SVGPathElement>(null);
    const glow2aGreenRef = useRef<SVGPathElement>(null);
    const glow2bGreenRef = useRef<SVGPathElement>(null);
    const glow2bRedRef = useRef<SVGPathElement>(null);
    const glow3aRedRef = useRef<SVGPathElement>(null);
    const glow3aGreenRef = useRef<SVGPathElement>(null);
    const glow3bGreenRef = useRef<SVGPathElement>(null);
    const glow3bRedRef = useRef<SVGPathElement>(null);
    const mastautinNodeRef = useRef<HTMLDivElement>(null);
    const musafirNodeRef = useRef<HTMLDivElement>(null);
    const musafir3Ref = useRef<HTMLSpanElement>(null);
    const mukimNodeRef = useRef<HTMLDivElement>(null);
    const audioSit1Ref = useRef<HTMLAudioElement>(null);
    const audioSit2Ref = useRef<HTMLAudioElement>(null);
    const audioSit3Ref = useRef<HTMLAudioElement>(null);
    const dynamicTitleRef = useRef<HTMLHeadingElement>(null);
    const slideSituasiTitleRef = useRef<HTMLDivElement>(null);
    const scenarioSlideRef = useRef<HTMLDivElement>(null);
    const scenarioSlideTextRef = useRef<HTMLHeadingElement>(null);
    const slideQaTitleRef = useRef<HTMLDivElement>(null);
    const slideQaSlideRef = useRef<HTMLDivElement>(null);
    const qaFlipInnerRef = useRef<HTMLDivElement>(null);
    const qaKeywordsRef = useRef<HTMLParagraphElement>(null);
    const qaTimerContainerRef = useRef<HTMLDivElement>(null);
    const qaTimerTextRef = useRef<HTMLSpanElement>(null);

    // Internal refs for Situasi text updates during animation (now running in background)
    const sitStatusTextRef = useRef("");
    const sitDescTextRef = useRef("");

    useEffect(() => {
        if (!isPlaying) return;

        document.body.style.overflow = 'hidden';

        // Reset visibility
        gsap.set(overlayRef.current, { y: '0%', opacity: 1 });
        const slides = [slide0Ref, slide1Ref, slide1MastautinRef, slide1MukimRef, slide1MusafirRef, slide2Ref, slideSituasiTitleRef, slide345Ref, slide7Ref];
        slides.forEach(s => gsap.set(s.current, { opacity: 0, y: 30 }));

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                onComplete();
            },
        });
        tlRef.current = tl;

        const indepTweens: gsap.core.Tween[] = [];

        const showSlide = (ref: React.RefObject<HTMLDivElement | null>, duration = 0.6) => {
            return tl.to(ref.current, { opacity: 1, y: 0, duration, ease: 'power3.out' }, '>');
        };
        const hideSlide = (ref: React.RefObject<HTMLDivElement | null>, delay = 1.0) => {
            return tl.to(ref.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, `>+${delay}`);
        };

        // --- SLIDE 0: MAIN OPENING ---
        showSlide(slide0Ref, 0.5);
        const s0Items = slide0Ref.current?.querySelectorAll('.anim-item');
        if (s0Items?.length) {
            tl.fromTo(s0Items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: 'power3.out' }, '<+0.2');
        }
        hideSlide(slide0Ref, 1.5);

        // --- SLIDE 1: TIGA MIM CLONE ---
        showSlide(slide1Ref);
        const mimHeader = slide1Ref.current?.querySelector('.mim-hdr');
        if (mimHeader) tl.fromTo(mimHeader, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<');
        const mimCards = slide1Ref.current?.querySelectorAll('.mim-card');
        if (mimCards?.length) {
            tl.fromTo(mimCards, { rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '<+0.2');
        }
        hideSlide(slide1Ref, 2.0);

        // --- SLIDE 1A: MASTAUTIN CLONE ---
        showSlide(slide1MastautinRef, 0.5);
        const masHdr = slide1MastautinRef.current?.querySelector('.mas-hdr');
        const masDesc = slide1MastautinRef.current?.querySelector('.mas-desc');
        const masImg = slide1MastautinRef.current?.querySelector('.mas-img');
        const concentricCircles = slide1MastautinRef.current?.querySelectorAll('.concentric-circle');
        tl.add(() => { if (audioMastautinRef.current) audioMastautinRef.current.play().catch(() => { }); }, '<');
        if (concentricCircles) tl.fromTo(concentricCircles, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.15, stagger: 0.15, duration: 0.8 }, '<');
        if (masImg) tl.fromTo(masImg, { y: 50, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, '<+0.2');
        if (masHdr) tl.fromTo(masHdr, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.2');
        if (masDesc) tl.fromTo(masDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '<+0.3');
        hideSlide(slide1MastautinRef, 6.0); // 6.03s audio

        // --- SLIDE 1B: MUKIM CLONE ---
        showSlide(slide1MukimRef, 0.5);
        const mukHdr = slide1MukimRef.current?.querySelector('.muk-hdr');
        const mukDesc = slide1MukimRef.current?.querySelector('.muk-desc');
        const mukImg = slide1MukimRef.current?.querySelector('.muk-img');
        tl.add(() => { if (audioMukimRef.current) audioMukimRef.current.play().catch(() => { }); }, '<');
        if (mukImg) tl.fromTo(mukImg, { y: 50, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, '<+0.2');
        if (mukHdr) tl.fromTo(mukHdr, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.2');
        if (mukDesc) tl.fromTo(mukDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '<+0.3');
        hideSlide(slide1MukimRef, 13.9); // 13.93s audio

        // --- SLIDE 1C: MUSAFIR CLONE ---
        showSlide(slide1MusafirRef, 0.5);
        const musHdr = slide1MusafirRef.current?.querySelector('.mus-hdr');
        const musDesc = slide1MusafirRef.current?.querySelector('.mus-desc');
        const musImg = slide1MusafirRef.current?.querySelector('.mus-img');
        const musPath = slide1MusafirRef.current?.querySelector('.mus-path');
        tl.add(() => { if (audioMusafirRef.current) audioMusafirRef.current.play().catch(() => { }); }, '<');
        if (musImg) tl.fromTo(musImg, { y: 50, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' }, '<+0.2');
        if (musHdr) tl.fromTo(musHdr, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.2');
        if (musDesc) tl.fromTo(musDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '<+0.3');
        if (musPath) {
            tl.fromTo(musPath, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' }, '<+0.5');
        }
        hideSlide(slide1MusafirRef, 12.2); // 12.24s audio

        // --- SLIDE 2: TEMPOH CLONE ---
        showSlide(slide2Ref);
        const tempohTitle = slide2Ref.current?.querySelector('.tempoh-hdr');
        const tempohCal = slide2Ref.current?.querySelector('.tempoh-cal');
        const tempohDesc = slide2Ref.current?.querySelector('.tempoh-desc');
        if (tempohTitle) tl.fromTo(tempohTitle, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, '<');
        if (tempohCal) tl.fromTo(tempohCal, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, '<');
        if (tempohDesc) tl.fromTo(tempohDesc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.2');

        const calDays = slide2Ref.current?.querySelectorAll('.calendar-day:not(:empty)');
        if (calDays?.length) {
            tl.fromTo(calDays, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.02, duration: 0.2, ease: 'back.out(1.2)' }, '<');
        }
        const highDays = slide2Ref.current?.querySelectorAll('.day-highlighted');
        if (highDays?.length) {
            tl.to(highDays, { scale: 1.1, boxShadow: '0 0 20px rgba(2, 76, 68, 0.5)', duration: 0.4, ease: 'back.out(1.7)' }, '<+0.8');
        }

        const mainThreeText = slide2Ref.current?.querySelector('.animate-main-3');
        if (mainThreeText) {
            const t = gsap.to(mainThreeText, {
                scale: 1.3,
                opacity: 0.5,
                textShadow: '0 0 25px rgba(255, 255, 255, 1)',
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
            indepTweens.push(t);
        }

        hideSlide(slide2Ref, 2.5);

        // --- NEW SLIDE: SITUASI TITLE ---
        showSlide(slideSituasiTitleRef, 0.5);
        const sitMainHdr = slideSituasiTitleRef.current?.querySelector('.sit-hdr');
        if (sitMainHdr) tl.fromTo(sitMainHdr, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '<');
        // Hide title slide
        hideSlide(slideSituasiTitleRef, 2.0);

        // Map setup (invisible initially)
        const sitMap = slide345Ref.current?.querySelector('.sit-map');
        const dynamicTitle = dynamicTitleRef.current;
        
        // Make all paths dim initially when they are shown later
        const allPaths = [path1Ref, path2aRef, path2bRef, path3Ref, path3aRef];

        const car = carRef.current;
        if (car) {
            const resetTrails = () => {
                const trs = [glowTrail1Ref, glowTrail2Ref, glowTrail3Ref, glow2aRedRef, glow2aGreenRef, glow2bGreenRef, glow2bRedRef, glow3aRedRef, glow3aGreenRef, glow3bGreenRef, glow3bRedRef];
                trs.forEach(t => { if (t.current) { const L = t.current.getTotalLength(); gsap.set(t.current, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); } });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0 });
                gsap.set(chatBubbleRef.current, { opacity: 0, scale: 0, transformOrigin: 'bottom center' });
                // Dim all main paths
                [path1Ref, path2aRef, path2bRef, path3Ref, path3aRef].forEach(p => { if (p.current) gsap.set(p.current, { opacity: 0.2 }); });
            };

            // ==== SCENARIO 1 ====
            tl.add(() => {
                if (scenarioSlideTextRef.current) scenarioSlideTextRef.current.innerHTML = "SITUASI 1<br/><span class='text-2xl sm:text-3xl md:text-4xl text-gold mt-4 block'>Mastautin → Mukim</span>";
            }, '+=0.5');
            
            // Show title slide
            tl.to(scenarioSlideRef.current, { opacity: 1, y: 0, duration: 0.5 });
            tl.to({}, { duration: 2.5 }); // Hold title
            tl.to(scenarioSlideRef.current, { opacity: 0, y: -20, duration: 0.5 });

            // Setup and Show Map Slide for Scenario 1
            tl.add(() => {
                if (dynamicTitle) dynamicTitle.innerHTML = "SITUASI 1<br/><span class='text-lg sm:text-2xl md:text-3xl text-gold mt-1 block font-medium'>Mastautin → Mukim</span>";
                // audio will be played by sub-timeline sync below
                sitDescTextRef.current = ("Mastautin → Mukim");
                sitStatusTextRef.current = ("Bertolak dari Mastautin...");
                const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                if (n1) n1.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n2) n2.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                resetTrails();
                if (path1Ref.current) gsap.set(path1Ref.current, { opacity: 1 });
                gsap.set(car, { opacity: 0, scale: 1, filter: 'none' });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 });
            });
            showSlide(slide345Ref);
            if (sitMap) tl.fromTo(sitMap, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '<+0.2');
            allPaths.forEach((p, i) => { if (p.current) tl.fromTo(p.current, { opacity: 0 }, { opacity: 0.2, duration: 0.3 }, i === 0 ? '<' : '<+0.1'); });
            if (path1Ref.current) tl.to(path1Ref.current, { opacity: 1, duration: 0.3 }, '<');

            // Pause master TL to run audio-synced sub-timeline
            tl.add(() => {
                tl.pause();

                const audio = audioSit1Ref.current!;
                const subTl = gsap.timeline({
                    onComplete: () => {
                        sitStatusTextRef.current = ("Tiba di Mukim. Solat penuh semula.");
                        gsap.fromTo(mukimNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                        const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                        const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                        if (n1) n1.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (n2) n2.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (path1Ref.current) gsap.to(path1Ref.current, { opacity: 0.2, duration: 0.3 });
                        gsap.set(car, { opacity: 0 });
                        // Resume master after a brief hold
                        gsap.delayedCall(1.0, () => tl.play());
                    },
                });

                subTl
                    .set(car, { opacity: 1 })
                    .add(() => { sitStatusTextRef.current = "🔴 Dalam kariah Mastautin. Solat penuh."; })
                    .to(car, { motionPath: { path: path1Ref.current!, align: path1Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.29 }, duration: 1.5, ease: 'power1.inOut' })
                    .set(glowTrail1Ref.current, { opacity: 1 }, '<')
                    .to(glowTrail1Ref.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🟢 Keluar kariah. Musafir — boleh jamak/qasar."); gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 }); })
                    .to(car, { motionPath: { path: path1Ref.current!, align: path1Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.29, end: 0.765 }, duration: 2.5, ease: 'none' })
                    .set(glowTrail2Ref.current, { opacity: 1 }, '<')
                    .to(glowTrail2Ref.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🔴 Masuk kariah Mukim. Solat penuh semula."); gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 }); })
                    .to(car, { motionPath: { path: path1Ref.current!, align: path1Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.765, end: 1 }, duration: 1.5, ease: 'power1.inOut' })
                    .set(glowTrail3Ref.current, { opacity: 1 }, '<')
                    .to(glowTrail3Ref.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<');

                // Sync sub-timeline duration to audio duration, then play both
                const playAndSync = () => {
                    if (audio.duration && audio.duration !== Infinity && !isNaN(audio.duration)) {
                        subTl.duration(audio.duration);
                    }
                    audio.play().catch(() => {});
                };

                if (audio.readyState >= 1) {
                    playAndSync();
                } else {
                    let triggered = false;
                    const onMeta = () => { if (!triggered) { triggered = true; playAndSync(); } audio.onloadedmetadata = null; };
                    audio.onloadedmetadata = onMeta;
                    setTimeout(() => { if (!triggered) { triggered = true; playAndSync(); } }, 1000);
                }
            });

            // Hide Map Slide for next Scenario Transition
            hideSlide(slide345Ref, 0.5);

            // ==== SCENARIO 2 ====
            tl.add(() => {
                if (scenarioSlideTextRef.current) scenarioSlideTextRef.current.innerHTML = "SITUASI 2<br/><span class='text-2xl sm:text-3xl md:text-4xl text-gold mt-4 block'>Mastautin → Musafir → Mukim</span>";
            }, '+=0.5');
            
            // Show title slide
            tl.to(scenarioSlideRef.current, { opacity: 1, y: 0, duration: 0.5 });
            tl.to({}, { duration: 2.5 }); // Hold title
            tl.to(scenarioSlideRef.current, { opacity: 0, y: -20, duration: 0.5 });

            // Setup and Show Map Slide for Scenario 2
            tl.add(() => {
                if (dynamicTitle) dynamicTitle.innerHTML = "SITUASI 2<br/><span class='text-lg sm:text-2xl md:text-3xl text-gold mt-1 block font-medium'>Mastautin → Musafir → Mukim</span>";
                sitDescTextRef.current = ("Mastautin \u2192 Musafir \u2192 Mukim");
                sitStatusTextRef.current = ("Bertolak dari Mastautin...");
                const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                const n3 = musafirNodeRef.current?.children[0] as HTMLElement;
                if (n1) n1.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n2) n2.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n3) n3.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                resetTrails();
                if (path2aRef.current) gsap.set(path2aRef.current, { opacity: 1 });
                if (path2bRef.current) gsap.set(path2bRef.current, { opacity: 1 });
                gsap.set(car, { opacity: 0, scale: 1 });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 });
            });
            showSlide(slide345Ref);
            if (sitMap) tl.fromTo(sitMap, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '<+0.2');
            allPaths.forEach((p, i) => { if (p.current) tl.fromTo(p.current, { opacity: 0 }, { opacity: 0.2, duration: 0.3 }, i === 0 ? '<' : '<+0.1'); });
            if (path2aRef.current) tl.to(path2aRef.current, { opacity: 1, duration: 0.3 }, '<');
            if (path2bRef.current) tl.to(path2bRef.current, { opacity: 1, duration: 0.3 }, '<');

            // Pause master TL for audio-synced sub-timeline (Scenario 2)
            tl.add(() => {
                tl.pause();
                const audio = audioSit2Ref.current!;
                const subTl = gsap.timeline({
                    onComplete: () => {
                        sitStatusTextRef.current = ("Tiba di Mukim. Solat penuh semula.");
                        gsap.fromTo(mukimNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                        const nn1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                        const nn2 = mukimNodeRef.current?.children[0] as HTMLElement;
                        const nn3 = musafirNodeRef.current?.children[0] as HTMLElement;
                        if (nn1) nn1.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (nn2) nn2.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (nn3) nn3.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (path2bRef.current) gsap.to(path2bRef.current, { opacity: 0.2, duration: 0.3 });
                        gsap.set(car, { opacity: 0 });
                        gsap.delayedCall(1.0, () => tl.play());
                    },
                });
                subTl
                    .set(car, { opacity: 1 })
                    .add(() => { sitStatusTextRef.current = "🔴 Dalam kariah Mastautin. Solat penuh."; })
                    .to(car, { motionPath: { path: path2aRef.current!, align: path2aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.35 }, duration: 1.5, ease: 'power1.inOut' })
                    .set(glow2aRedRef.current, { opacity: 1 }, '<')
                    .to(glow2aRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🟢 Keluar kariah. Musafir — boleh jamak/qasar."); gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 }); })
                    .to(car, { motionPath: { path: path2aRef.current!, align: path2aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.35, end: 1 }, duration: 2.5, ease: 'none' })
                    .set(glow2aGreenRef.current, { opacity: 1 }, '<')
                    .to(glow2aGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🟢 Singgah di Musafir."); gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' }); })
                    .to(musafir3Ref.current, { scale: 1.5, textShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24", color: "#fbbf24", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, "<")
                    .to(car, { y: 205, rotation: 0, scale: 1.3, duration: 0.4, ease: 'back.out(1.5)' }, "<")
                    .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
                    .to(car, { scale: 1, duration: 1.2 })
                    .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
                    .to(car, { y: 280, duration: 0.4, ease: 'power2.in' })
                    .add(() => { sitStatusTextRef.current = ("🟢 Menyambung perjalanan. Masih musafir."); })
                    .to(car, { motionPath: { path: path2bRef.current!, align: path2bRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.65 }, duration: 2.5, ease: 'none' })
                    .set(glow2bGreenRef.current, { opacity: 1 }, '<')
                    .to(glow2bGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🔴 Masuk kariah Mukim. Solat penuh semula."); gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 }); })
                    .to(car, { motionPath: { path: path2bRef.current!, align: path2bRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.65, end: 1 }, duration: 1.5, ease: 'power1.inOut' })
                    .set(glow2bRedRef.current, { opacity: 1 }, '<')
                    .to(glow2bRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<');
                const playAndSync2 = () => {
                    if (audio.duration && audio.duration !== Infinity && !isNaN(audio.duration)) { subTl.duration(audio.duration); }
                    audio.play().catch(() => {});
                };
                if (audio.readyState >= 1) { playAndSync2(); }
                else {
                    let t2 = false;
                    const onM = () => { if (!t2) { t2 = true; playAndSync2(); } audio.onloadedmetadata = null; };
                    audio.onloadedmetadata = onM;
                    setTimeout(() => { if (!t2) { t2 = true; playAndSync2(); } }, 1000);
                }
            });

            // Hide Map Slide for next Scenario Transition
            hideSlide(slide345Ref, 0.5);

            // ==== SCENARIO 3 ====
            tl.add(() => {
                if (scenarioSlideTextRef.current) scenarioSlideTextRef.current.innerHTML = "SITUASI 3<br/><span class='text-2xl sm:text-3xl md:text-4xl text-gold mt-4 block'>Mukim → Musafir → Mastautin</span>";
            }, '+=0.5');
            
            // Show title slide
            tl.to(scenarioSlideRef.current, { opacity: 1, y: 0, duration: 0.5 });
            tl.to({}, { duration: 2.5 }); // Hold title
            tl.to(scenarioSlideRef.current, { opacity: 0, y: -20, duration: 0.5 });

            // Setup and Show Map Slide for Scenario 3
            tl.add(() => {
                if (dynamicTitle) dynamicTitle.innerHTML = "SITUASI 3<br/><span class='text-lg sm:text-2xl md:text-3xl text-gold mt-1 block font-medium'>Mukim → Musafir → Mastautin</span>";
                // audio will be played by sub-timeline sync below
                sitDescTextRef.current = ("Mukim → Musafir → Mastautin");
                sitStatusTextRef.current = ("Bertolak dari Mukim ke Musafir...");
                const n1 = musafirNodeRef.current?.children[0] as HTMLElement;
                const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                if (n1) n1.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n2) n2.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                resetTrails();
                if (path3aRef.current) gsap.set(path3aRef.current, { opacity: 1 });
                if (path3Ref.current) gsap.set(path3Ref.current, { opacity: 1 });
                gsap.set(car, { opacity: 0, scale: 1, scaleX: 1, scaleY: -1 });
                gsap.set(carGlowRef.current, { fill: '#22c55e', opacity: 0.5 });
            });
            showSlide(slide345Ref);
            if (sitMap) tl.fromTo(sitMap, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '<+0.2');
            allPaths.forEach((p, i) => { if (p.current) tl.fromTo(p.current, { opacity: 0 }, { opacity: 0.2, duration: 0.3 }, i === 0 ? '<' : '<+0.1'); });
            if (path3aRef.current) tl.to(path3aRef.current, { opacity: 1, duration: 0.3 }, '<');
            if (path3Ref.current) tl.to(path3Ref.current, { opacity: 1, duration: 0.3 }, '<');

            // Pause master TL for audio-synced sub-timeline (Scenario 3)
            tl.add(() => {
                tl.pause();
                const audio = audioSit3Ref.current!;
                const subTl = gsap.timeline({
                    onComplete: () => {
                        sitStatusTextRef.current = ("Tiba di Mastautin. Solat biasa.");
                        gsap.fromTo(mastautinNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                        const nn1 = musafirNodeRef.current?.children[0] as HTMLElement;
                        const nn2 = mukimNodeRef.current?.children[0] as HTMLElement;
                        if (nn1) nn1.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (nn2) nn2.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                        if (path3aRef.current) gsap.to(path3aRef.current, { opacity: 0.2, duration: 0.3 });
                        if (path3Ref.current) gsap.to(path3Ref.current, { opacity: 0.2, duration: 0.3 });
                        gsap.set(car, { opacity: 0 });
                        gsap.delayedCall(1.0, () => tl.play());
                    },
                });
                subTl
                    .set(car, { opacity: 1 })
                    .add(() => { sitStatusTextRef.current = "🟢 Keluar dari Mukim. Mula musafir."; })
                    .to(car, { motionPath: { path: path3aRef.current!, align: path3aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: 180, start: 0, end: 0.29 }, duration: 1.5, ease: 'power1.inOut' })
                    .set(glow3aRedRef.current, { opacity: 1 }, '<')
                    .to(glow3aRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🟢 Dalam perjalanan. Musafir — boleh jamak/qasar."); gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 }); })
                    .to(car, { motionPath: { path: path3aRef.current!, align: path3aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: 180, start: 0.29, end: 1 }, duration: 3.0, ease: 'power1.inOut' })
                    .set(glow3aGreenRef.current, { opacity: 1 }, '<')
                    .to(glow3aGreenRef.current, { strokeDashoffset: 0, duration: 3.0, ease: 'power1.inOut' }, '<')
                    .add(() => { sitStatusTextRef.current = ("Berehat di Musafir..."); gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' }); gsap.set(car, { rotation: 0, scaleY: 1 }); })
                    .to(musafir3Ref.current, { scale: 1.5, textShadow: "0 0 10px #fbbf24, 0 0 20px #fbbf24", color: "#fbbf24", duration: 0.4, yoyo: true, repeat: 3, ease: "sine.inOut" }, "<")
                    .to(car, { y: 235, duration: 0.5, ease: 'back.out(1.5)' }, "<")
                    .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
                    .to(car, { duration: 1.5 })
                    .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
                    .to(car, { y: 280, duration: 0.4, ease: 'power2.in' })
                    .add(() => { sitStatusTextRef.current = ("🟢 Menyambung ke Mastautin. Masih musafir."); gsap.set(car, { scaleY: 1 }); })
                    .to(car, { motionPath: { path: path3Ref.current!, align: path3Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: 180, start: 0, end: 0.765 }, duration: 2.5, ease: 'none' })
                    .set(glow3bGreenRef.current, { opacity: 1 }, '<')
                    .to(glow3bGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                    .add(() => { sitStatusTextRef.current = ("🔴 Masuk kariah Mastautin. Solat penuh semula."); gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 }); })
                    .to(car, { motionPath: { path: path3Ref.current!, align: path3Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: 180, start: 0.765, end: 1 }, duration: 1.5, ease: 'power1.inOut' })
                    .set(glow3bRedRef.current, { opacity: 1 }, '<')
                    .to(glow3bRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<');
                const playAndSync3 = () => {
                    if (audio.duration && audio.duration !== Infinity && !isNaN(audio.duration)) { subTl.duration(audio.duration); }
                    audio.play().catch(() => {});
                };
                if (audio.readyState >= 1) { playAndSync3(); }
                else {
                    let t3 = false;
                    const onM = () => { if (!t3) { t3 = true; playAndSync3(); } audio.onloadedmetadata = null; };
                    audio.onloadedmetadata = onM;
                    setTimeout(() => { if (!t3) { t3 = true; playAndSync3(); } }, 1000);
                }
            });
        }

        hideSlide(slide345Ref, 0.5);

        // --- NEW: QnA TITLE SLIDE ---
        showSlide(slideQaTitleRef);
        tl.fromTo(slideQaTitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        tl.to({}, { duration: 2.0 }); // Hold title
        tl.to(slideQaTitleRef.current, { opacity: 0, y: -20, duration: 0.5 });
        hideSlide(slideQaTitleRef, 0);

        // --- NEW: QnA CARD SLIDE ---
        showSlide(slideQaSlideRef);
        const qaFront = slideQaSlideRef.current?.querySelector('.qa-front-face');
        const qaBack = slideQaSlideRef.current?.querySelector('.qa-back-face');
        if (qaBack) gsap.set(qaBack, { visibility: 'hidden' });
        if (qaFront) gsap.set(qaFront, { visibility: 'visible' });

        tl.fromTo(slideQaSlideRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        tl.to({}, { duration: 1.0 }); // give a second to read question before starting clock

        // Show timer and count down 10 seconds
        tl.fromTo(qaTimerContainerRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" });
        tl.to(qaTimerTextRef.current, {
            duration: 10,
            innerHTML: 0,
            snap: { innerHTML: 1 },
            ease: "none"
        });
        tl.to(qaTimerContainerRef.current, { opacity: 0, scale: 0.8, duration: 0.4 }, "-=0.4");

        // Flip the card
        tl.to(qaFlipInnerRef.current, { rotateY: 180, duration: 0.8, ease: "power3.inOut" });
        // Toggle visibility exactly halfway through the flip (at 90 degrees)
        if (qaFront) tl.set(qaFront, { visibility: 'hidden' }, "<0.4");
        if (qaBack) tl.set(qaBack, { visibility: 'visible' }, "<0");

        // Highlight keywords sequentially
        const qaKeywords = qaKeywordsRef.current?.querySelectorAll('.keyword');
        if (qaKeywords) {
            tl.fromTo(qaKeywords, { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '+=0.3');
        }

        // Wait to read answer
        tl.to({}, { duration: 5.5 });

        // Hide QnA slide
        tl.to(slideQaSlideRef.current, { opacity: 0, y: -30, duration: 0.5 });
        hideSlide(slideQaSlideRef, 0);

        // --- SLIDE 7: CLOSING CLONE ---
        showSlide(slide7Ref);
        const clWords = slide7Ref.current?.querySelectorAll('.cl-word');
        if (clWords?.length) {
            tl.fromTo(clWords, { y: 60, opacity: 0, rotateX: -30 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '<+0.2');
        }
        const clEmoji = slide7Ref.current?.querySelector('.cl-emoji');
        if (clEmoji) tl.fromTo(clEmoji, { scale: 0, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.7)' }, '<+0.5');

        // Hold final slide
        tl.to({}, { duration: 2.5 });

        // Exit preloader completely
        tl.to(slide7Ref.current, { opacity: 0, duration: 0.5 }, '>');
        tl.to(overlayRef.current, { y: '-100%', duration: 1, ease: 'power3.inOut' }, '>-0.2');

        return () => {
            tl.kill();
            indepTweens.forEach(t => t.kill());
            document.body.style.overflow = '';
        };
    }, [isPlaying]);

    const handleSkip = () => {
        // Pause the master timeline immediately to prevent any further callbacks
        tlRef.current?.pause();

        // Pause and reset all audio
        [audioMastautinRef, audioMukimRef, audioMusafirRef, audioSit1Ref, audioSit2Ref, audioSit3Ref].forEach(ref => {
            if (ref.current) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });

        // Smoothly fade out the entire preloader instead of scrubbing
        if (overlayRef.current) {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    tlRef.current?.kill();
                    onComplete();
                }
            });
        } else {
            tlRef.current?.kill();
            onComplete();
        }
    };

    if (!isPlaying) return null;

    const calDays = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div
            ref={overlayRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                background: 'transparent',
            }}
        >
            {/* Dynamic Backgrounds specific to exact clones to look identical */}
            <div className="absolute inset-0 bg-[#012b25]" />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#012b25_0%,#024c44_50%,#01201b_100%)] opacity-80" />

            {/* ---------------- SLIDE 0: MAIN OPENING ---------------- */}
            <div ref={slide0Ref} className="absolute inset-0 flex flex-col items-center justify-center p-8 landscape:p-4 text-center pointer-events-none text-white">
                <div className="anim-item text-gold font-serif text-[clamp(1.3rem,4vw,2rem)] landscape:text-[clamp(1rem,3vw,1.5rem)] mb-3 landscape:mb-1" style={{ textShadow: '0 0 24px rgba(212,175,55,0.4)' }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                <div className="anim-item font-display text-[clamp(2.5rem,7vw,4.5rem)] landscape:text-[clamp(1.8rem,5vw,3rem)] font-bold tracking-[0.12em]" style={{ textShadow: '0 0 30px rgba(212,175,55,0.3)' }}>PETA MUKA</div>
                <div className="anim-item font-display text-[clamp(2.5rem,7vw,4.5rem)] landscape:text-[clamp(1.8rem,5vw,3rem)] font-bold text-gold tracking-[0.12em] mb-3 landscape:mb-1" style={{ textShadow: '0 0 30px rgba(212,175,55,0.4)' }}>TIGA MIM</div>
                <div className="anim-item text-white/60 text-[clamp(0.85rem,2vw,1.1rem)] tracking-[0.2em] font-light">PANDUAN SOLAT MUSAFIR: JAMAK &amp; QASAR</div>
            </div>

            {/* ---------------- SLIDE 1: TIGA MIM EXACT CLONE ---------------- */}
            <div ref={slide1Ref} className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0faf7] px-4 sm:px-6 lg:px-8 py-12 landscape:py-4 text-black opacity-0 pointer-events-none overflow-auto">
                <div className="mim-hdr text-center">
                    <h2 className="text-5xl sm:text-6xl landscape:text-3xl font-display font-bold text-teal mb-4 landscape:mb-2">3 MIM</h2>
                    <p className="text-xl landscape:text-base text-gray-600 font-display">Tiga Kategori Perjalanan</p>
                    <div className="flex justify-center mt-6 landscape:mt-2"><div className="w-16 h-1 bg-gold rounded-full" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 landscape:gap-4 mt-12 landscape:mt-4 w-full max-w-7xl landscape:max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
                    {[
                        { id: 'mastautin', title: 'MASTAUTIN', sub: 'Tempat Tinggal Tetap', desc: 'Kediaman kekal seseorang yang menjadi pusat kehidupan seharian.', icon: <Home className="w-8 h-8 text-white" /> },
                        { id: 'mukim', title: 'MUKIM', sub: 'Menetap Sementara', desc: 'Tinggal di sesuatu tempat lebih dari tiga hari tanpa niat menetap kekal.', icon: <MapPin className="w-8 h-8 text-white" /> },
                        { id: 'musafir', title: 'MUSAFIR', sub: 'Dalam Perjalanan', desc: 'Seseorang yang melakukan perjalanan melebihi 81 kilometer.', icon: <Car className="w-8 h-8 text-white" /> },
                    ].map((c) => (
                        <div key={c.id} className="mim-card relative bg-white rounded-2xl shadow-card p-6 sm:p-8 landscape:p-4 flex flex-col items-center justify-center text-center">
                            <div className="rounded-full bg-teal w-16 h-16 landscape:w-10 landscape:h-10 flex items-center justify-center mb-4 landscape:mb-2">{c.icon}</div>
                            <h3 className="text-xl sm:text-2xl landscape:text-lg font-display font-bold text-teal mb-2 landscape:mb-1">{c.title}</h3>
                            <p className="text-gold font-medium mb-4 landscape:mb-1 text-sm sm:text-base landscape:text-xs">{c.sub}</p>
                            <p className="text-gray-600 text-sm leading-relaxed hidden sm:block landscape:text-xs">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------------- SLIDE 1A: MASTAUTIN EXACT CLONE ---------------- */}
            <div ref={slide1MastautinRef} className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 landscape:py-4 text-black opacity-0 pointer-events-none overflow-auto" style={{ backgroundColor: '#f0faf7' }}>
                <audio ref={audioMastautinRef} src={`${import.meta.env.BASE_URL}mastautin.mp4`} preload="auto" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="concentric-circle absolute rounded-full border-2 border-teal/20" style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px` }} />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 landscape:gap-6 items-center max-w-7xl w-full z-10 mx-auto">
                    <div className="mas-img relative flex justify-center w-full">
                        <div className="relative rounded-3xl landscape:rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm lg:max-w-md aspect-[4/3] landscape:aspect-[5/4] bg-teal/5">
                            <img src={`${import.meta.env.BASE_URL}mastautin-illustration.jpg`} alt="Mastautin" className="w-full h-full object-cover block" />
                        </div>
                    </div>
                    <div className="text-center lg:text-left landscape:text-left">
                        <div className="mas-hdr">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl landscape:text-3xl font-display font-bold text-teal mb-2 lg:mb-4 landscape:mb-1">MASTAUTIN</h2>
                            <p className="text-lg sm:text-xl landscape:text-base text-gold font-display mb-4 lg:mb-8 landscape:mb-2">Tempat Tinggal Tetap</p>
                        </div>
                        <div className="mas-desc">
                            <p className="text-base sm:text-xl landscape:text-sm text-gray-700 leading-relaxed mb-6 lg:mb-8 landscape:mb-3">Mastautin ialah <span className="font-semibold text-teal">tempat tinggal tetap</span> seseorang yang menjadi pusat kehidupan dan aktiviti harian.</p>
                            <div className="flex flex-wrap justify-center lg:justify-start landscape:justify-start gap-4 landscape:gap-2">
                                <div className="flex items-center gap-2 bg-white px-4 py-3 landscape:px-3 landscape:py-2 rounded-xl shadow-card"><Building2 className="w-5 h-5 text-teal" /><span className="text-gray-700 font-medium text-sm sm:text-base landscape:text-xs">Rumah sendiri</span></div>
                                <div className="flex items-center gap-2 bg-white px-4 py-3 landscape:px-3 landscape:py-2 rounded-xl shadow-card"><Briefcase className="w-5 h-5 text-teal" /><span className="text-gray-700 font-medium text-sm sm:text-base landscape:text-xs">Tempat kerja tetap</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- SLIDE 1B: MUKIM EXACT CLONE ---------------- */}
            <div ref={slide1MukimRef} className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 landscape:py-4 text-black opacity-0 pointer-events-none overflow-auto" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0faf7 100%)' }}>
                <audio ref={audioMukimRef} src={`${import.meta.env.BASE_URL}mukim.mp4`} preload="auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 landscape:gap-6 items-center max-w-7xl w-full z-10 mx-auto">
                    <div className="muk-img relative flex justify-center w-full">
                        <div className="relative rounded-3xl landscape:rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm lg:max-w-md aspect-[4/3] landscape:aspect-[5/4] bg-teal/5">
                            <img src={`${import.meta.env.BASE_URL}mukim-illustration.jpg`} alt="Mukim" className="w-full h-full object-cover block" />
                        </div>
                    </div>
                    <div className="text-center lg:text-left landscape:text-left">
                        <div className="muk-hdr">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl landscape:text-3xl font-display font-bold text-teal mb-2 lg:mb-4 landscape:mb-1">MUKIM</h2>
                            <p className="text-lg sm:text-xl landscape:text-base text-gold font-display mb-4 lg:mb-8 landscape:mb-2">Tinggal Sementara</p>
                        </div>
                        <div className="muk-desc">
                            <p className="text-base sm:text-lg landscape:text-sm text-gray-700 leading-relaxed mb-6 lg:mb-8 landscape:mb-3">Mukim bermaksud tinggal dan menetap di sesuatu tempat <span className="font-semibold text-teal">lebih dari tiga hari</span>, tetapi tidak berniat untuk menjadikannya tempat tinggal tetap selamanya.</p>
                            <div className="inline-flex items-center gap-4 landscape:gap-3 bg-gradient-to-r from-teal to-teal-light rounded-2xl p-4 sm:p-6 landscape:p-3 shadow-glow-teal text-left">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 landscape:w-12 landscape:h-12 rounded-full bg-white/20 flex items-center justify-center"><span className="text-3xl sm:text-5xl landscape:text-2xl font-display font-bold text-white">3</span></div>
                                <div><p className="text-2xl sm:text-3xl landscape:text-xl font-display font-bold text-white">&gt; 3 Hari</p><p className="text-white/80 text-xs sm:text-sm landscape:text-xs">Tempoh minimum untuk dianggap mukim</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- SLIDE 1C: MUSAFIR EXACT CLONE ---------------- */}
            <div ref={slide1MusafirRef} className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 landscape:py-4 text-black opacity-0 pointer-events-none overflow-auto" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)' }}>
                <audio ref={audioMusafirRef} src={`${import.meta.env.BASE_URL}musafir.mp4`} preload="auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 landscape:gap-6 items-center max-w-7xl w-full z-10 mx-auto">
                    <div className="mus-img relative flex justify-center w-full">
                        <div className="relative rounded-3xl landscape:rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm lg:max-w-md aspect-[4/3] landscape:aspect-[5/4] bg-teal/5">
                            <img src={`${import.meta.env.BASE_URL}musafir-illustration.jpg`} alt="Musafir" className="w-full h-full object-cover block" />
                        </div>
                    </div>
                    <div className="text-center lg:text-left landscape:text-left">
                        <div className="mus-hdr">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl landscape:text-3xl font-display font-bold text-teal mb-2 lg:mb-4 landscape:mb-1">MUSAFIR</h2>
                            <p className="text-lg sm:text-xl landscape:text-base text-gold font-display mb-4 lg:mb-8 landscape:mb-2">Dalam Perjalanan</p>
                        </div>
                        <div className="mus-desc">
                            <p className="text-base sm:text-lg landscape:text-sm text-gray-700 leading-relaxed mb-6 lg:mb-8 landscape:mb-3">Musafir ialah seseorang yang melakukan perjalanan melebihi <span className="font-semibold text-teal">dua marhalah</span> atau <span className="font-semibold text-teal">81 kilometer</span>.</p>
                            <div className="inline-flex items-center gap-4 sm:gap-6 landscape:gap-3 bg-gradient-to-r from-gold to-gold-light rounded-2xl p-4 sm:p-6 landscape:p-3 shadow-glow-gold mb-8 landscape:mb-3 text-left">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 landscape:w-12 landscape:h-12 rounded-full bg-white/30 flex items-center justify-center"><Navigation className="w-8 h-8 sm:w-12 sm:h-12 landscape:w-6 landscape:h-6 text-white" /></div>
                                <div><div className="flex items-baseline gap-2"><p className="text-3xl sm:text-5xl landscape:text-2xl font-display font-bold text-white">≥ 81</p><p className="text-white/90 text-2xl landscape:text-lg font-bold font-display tracking-wide animate-km-glow">KM</p></div><p className="text-white/70 text-xs sm:text-sm landscape:text-xs mt-1">Jarak minimum untuk menjadi musafir</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>\n\n            {/* ---------------- SLIDE 2: TEMPOH EXACT CLONE (Updated) ---------------- */}
            <div ref={slide2Ref} className="absolute inset-0 flex items-center justify-center bg-[#f0faf7] p-4 sm:p-8 landscape:p-4 text-black opacity-0 pointer-events-none overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 max-w-7xl w-full items-center">
                    {/* Left Calendar */}
                    <div className="tempoh-cal">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-6">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-5 h-5 text-teal" />
                                    <span className="text-lg font-display font-bold text-teal">Januari 2026</span>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-4 mb-2">
                                {['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'].map((d) => (
                                    <div key={d} className="calendar-day text-center text-xs text-gray-500 font-medium py-2">{d}</div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-4">
                                <div className="calendar-day" /><div className="calendar-day" /><div className="calendar-day" />
                                {calDays.map(i => {
                                    const isHighlight = i >= 4 && i <= 6;
                                    const isTravel = i === 3 || i === 7;
                                    return (
                                        <div key={i} className={`calendar-day relative flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-sm font-medium transition-all duration-300 ${isHighlight ? 'day-highlighted bg-teal text-white animate-day-pulse' : isTravel ? 'bg-teal/10 text-teal font-bold' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}>
                                            {i}
                                            {isTravel && <span className="absolute -bottom-4 text-[10px] text-teal font-bold whitespace-nowrap">{i === 3 ? 'Pergi' : 'Balik'}</span>}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Legend */}
                            <div className="mt-8 flex flex-wrap gap-4 justify-center">
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-teal rounded animate-day-pulse" /><span className="text-sm text-gray-600">3 Hari Qasar & Jamak</span></div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-teal/20 rounded" /><span className="text-sm text-gray-600 font-medium">Pergi & Balik</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div>
                        {/* Title */}
                        <div className="tempoh-hdr">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl landscape:text-3xl font-display font-bold text-teal mb-4 landscape:mb-2">
                                TEMPOH JAMAK
                                <span className="block text-gold">&amp; QASAR</span>
                            </h2>
                            <p className="text-xl landscape:text-base text-gray-600 font-display mb-8 landscape:mb-4">
                                Bilakah Boleh Dilakukan?
                            </p>
                        </div>

                        {/* Explanation */}
                        <div className="tempoh-desc">
                            <p className="text-lg landscape:text-sm text-gray-700 leading-relaxed mb-8 landscape:mb-3">
                                Tempoh dibolehkan melakukan qasar dan jamak untuk musafir ialah{' '}
                                <span className="font-semibold text-teal">tiga hari</span> tidak
                                termasuk perjalanan pergi dan balik.
                            </p>

                            {/* Visual Breakdown */}
                            <div className="bg-white rounded-2xl p-6 landscape:p-3 shadow-card">
                                <div className="flex items-center justify-center gap-4 flex-wrap">
                                    {/* Travel Day - Pergi */}
                                    <div className="text-center">
                                        <div className="w-12 h-12 landscape:w-9 landscape:h-9 bg-teal/10 rounded-full flex items-center justify-center mb-2 border border-teal/20">
                                            <span className="text-lg landscape:text-sm font-display font-bold text-teal">1</span>
                                        </div>
                                        <span className="text-xs text-teal font-bold tracking-wide">Pergi</span>
                                    </div>
                                    <div className="text-gray-300">→</div>
                                    {/* 3 Days Highlighted */}
                                    <div className="text-center">
                                        <div className="w-16 h-16 landscape:w-12 landscape:h-12 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center mb-2 shadow-glow-teal">
                                            <span className="animate-main-3 inline-block text-2xl landscape:text-lg font-display font-bold text-white">3</span>
                                        </div>
                                        <span className="text-sm font-semibold text-teal">Hari</span>
                                    </div>
                                    <div className="text-gray-300">→</div>
                                    {/* Travel Day - Balik */}
                                    <div className="text-center">
                                        <div className="w-12 h-12 landscape:w-9 landscape:h-9 bg-teal/10 rounded-full flex items-center justify-center mb-2 border border-teal/20">
                                            <span className="text-lg landscape:text-sm font-display font-bold text-teal">1</span>
                                        </div>
                                        <span className="text-xs text-teal font-bold tracking-wide">Balik</span>
                                    </div>
                                </div>
                                <p className="text-center text-gray-500 text-sm mt-4 landscape:mt-2">
                                    Tidak termasuk hari perjalanan pergi dan balik
                                </p>
                            </div>

                            {/* Key Point */}
                            <div className="mt-6 landscape:mt-3 p-4 landscape:p-3 bg-gold/10 rounded-xl border-l-4 border-gold">
                                <p className="text-gray-700 text-sm">
                                    <span className="font-semibold text-teal">Perhatian:</span>{' '}
                                    Tempoh 3 hari ini adalah untuk melakukan solat{' '}
                                    <span className="text-gold font-medium">qasar</span> (mengqasar solat) dan{' '}
                                    <span className="text-gold font-medium">jamak</span> (menjamak solat).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- NEW SLIDE: SITUASI PERJALANAN TITLE ---------------- */}
            <div ref={slideSituasiTitleRef} className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0faf7] p-4 text-black opacity-0 pointer-events-none">
                <div className="sit-hdr text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl landscape:text-4xl font-display font-bold text-teal mb-4 landscape:mb-2">SITUASI PERJALANAN</h2>
                    <p className="text-lg sm:text-xl landscape:text-base text-gray-600 font-display max-w-xl mx-auto mb-6 landscape:mb-3">
                        Tiga situasi perjalanan yang memerlukan pemahaman tentang hukum solat
                    </p>
                    <div className="flex justify-center"><div className="w-24 h-1 bg-gold rounded-full" /></div>
                </div>
            </div>

            {/* ---------------- SLIDE 3/4/5: SITUASI PERJALANAN MAP ---------------- */}
            <div ref={slide345Ref} className="absolute inset-0 flex flex-col items-center justify-start bg-[#f0faf7] pt-4 landscape:pt-2 pb-2 landscape:pb-1 px-4 text-black opacity-0 pointer-events-none overflow-hidden">
                <audio ref={audioSit1Ref} src={`${import.meta.env.BASE_URL}No.1.m4a`} preload="auto" />
                <audio ref={audioSit2Ref} src={`${import.meta.env.BASE_URL}No 2.m4a`} preload="auto" />
                <audio ref={audioSit3Ref} src={`${import.meta.env.BASE_URL}No 3.m4a`} preload="auto" />

                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center h-full justify-center">
                    {/* Section Header - Absolute to avoid pushing map size */}
                    <div className="absolute top-2 sm:top-6 landscape:top-1 text-center z-50 pointer-events-none w-full px-4">
                        <h2 ref={dynamicTitleRef} className="text-2xl sm:text-3xl md:text-4xl landscape:text-2xl font-display font-bold text-teal mb-1 sm:mb-2">
                        </h2>
                        <div className="flex justify-center mt-2"><div className="w-16 h-1 bg-gold rounded-full" /></div>
                    </div>

                    {/* Mind Map Visualization (Original Section Wrapper) */}
                    <div className="relative w-full flex-shrink-0 flex items-center justify-center min-h-0 pt-0 sm:pt-4 scale-105 sm:scale-110 lg:scale-125 landscape:scale-110">
                        <div className="relative aspect-square w-full mx-auto" style={{ maxWidth: 'min(95%, 85vh, 50rem)' }}>
                            {/* Main Circle Background */}
                            <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-teal/5 to-teal/10 border-2 border-dashed border-teal/20" />

                            {/* SVG Roads and Paths */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                                {/* Definitions */}
                                <defs>
                                    <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.5" />
                                        <stop offset="50%" stopColor="#1a1a1a" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.5" />
                                    </linearGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Path 1: Mastautin -> Mukim (Straight road) */}
                                <g className="transition-opacity duration-500" style={{ opacity: 0.2 }}>
                                    <path ref={path1Ref} d="M 100 120 L 300 120" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M 100 120 L 300 120" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8,6" strokeOpacity="0.9" />
                                </g>

                                {/* Path 2a: Mastautin -> Musafir (Left diagonal down) */}
                                <g className="transition-opacity duration-500" style={{ opacity: 0.2 }}>
                                    <path ref={path2aRef} d="M 100 120 Q 150 200, 200 280" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M 100 120 Q 150 200, 200 280" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" />
                                </g>

                                {/* Path 2b: Musafir -> Mukim (Right diagonal up) */}
                                <g className="transition-opacity duration-500" style={{ opacity: 0.2 }}>
                                    <path ref={path2bRef} d="M 200 280 Q 250 200, 300 120" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M 200 280 Q 250 200, 300 120" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" />
                                </g>

                                {/* Path 3: Musafir -> Mastautin (Left diagonal up) */}
                                <g className="transition-opacity duration-500" style={{ opacity: 0.2 }}>
                                    <path ref={path3Ref} d="M 200 280 Q 150 200, 100 120" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M 200 280 Q 150 200, 100 120" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" />
                                </g>

                                {/* Path 3a: Mukim -> Musafir (Right diagonal down) */}
                                <g className="transition-opacity duration-500" style={{ opacity: 0.2 }}>
                                    <path ref={path3aRef} d="M 300 120 Q 250 200, 200 280" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                                    <path d="M 300 120 Q 250 200, 200 280" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" />
                                </g>

                                {/* Distance Labels */}
                                <text x="200" y="102" textAnchor="middle" className="fill-[#024c44] text-sm font-extrabold" style={{ fontSize: '15px', letterSpacing: '0.5px' }}>≥81 KM</text>
                                <text x="123" y="220" textAnchor="middle" className="fill-[#024c44] text-sm font-extrabold" transform="rotate(-55, 123, 220)" style={{ fontSize: '15px', letterSpacing: '0.5px' }}>≥81 KM</text>
                                <text x="277" y="220" textAnchor="middle" className="fill-[#024c44] text-sm font-extrabold" transform="rotate(55, 277, 220)" style={{ fontSize: '15px', letterSpacing: '0.5px' }}>≥81 KM</text>

                                {/* Glow Trail Segments */}
                                <path ref={glowTrail1Ref} d="M 100 120 L 158 120" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glowTrail2Ref} d="M 158 120 L 253 120" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glowTrail3Ref} d="M 253 120 L 300 120" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />

                                <path ref={glow2aRedRef} d="M 100 120 Q 114 143, 129 166" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glow2aGreenRef} d="M 129 166 Q 185 256, 200 280" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glow2bGreenRef} d="M 200 280 Q 237 221, 274 161" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glow2bRedRef} d="M 274 161 Q 287 141, 300 120" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />

                                <path ref={glow3aRedRef} d="M 300 120 Q 287 141, 274 161" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glow3aGreenRef} d="M 274 161 Q 237 221, 200 280" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glow3bGreenRef} d="M 200 280 Q 165 224, 129 166" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                                <path ref={glow3bRedRef} d="M 129 166 Q 114 143, 100 120" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                            </svg>

                            {/* Mastautin Node (Top Left) */}
                            <div ref={mastautinNodeRef} className="absolute pointer-events-none" style={{ top: '30%', left: '25%' }}>
                                <div className="absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-[#9b1d1d] to-[#b92b2b] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(185,43,43,0.6)] transition-transform duration-300" style={{ top: '-28px', left: '-28px', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                                    <span className="text-white text-[10px] sm:text-xs font-bold shadow-sm">MASTAUTIN</span>
                                </div>
                                <div className="absolute z-10 pointer-events-auto" style={{ top: '25px', left: '35px', transform: 'translate(-50%, -50%)' }}>
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-red-600 rounded-full flex flex-col items-center justify-center">
                                        <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">KARIAH<br />SELEPAS</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mukim Node (Top Right) */}
                            <div ref={mukimNodeRef} className="absolute pointer-events-none" style={{ top: '30%', left: '75%' }}>
                                <div className="absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-[#9b1d1d] to-[#b92b2b] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(185,43,43,0.6)] transition-transform duration-300" style={{ top: '-28px', left: '28px', transform: 'translate(-50%, -50%) rotate(45deg)' }}>
                                    <span className="text-white text-[10px] sm:text-xs font-bold shadow-sm">MUKIM</span>
                                </div>
                                <div className="absolute z-10 pointer-events-auto" style={{ top: '25px', left: '-35px', transform: 'translate(-50%, -50%)' }}>
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-red-600 rounded-full flex flex-col items-center justify-center">
                                        <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">KARIAH<br />SEBELUM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Musafir Node (Bottom Center) */}
                            <div ref={musafirNodeRef} className="absolute" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <div className="w-32 h-16 sm:w-40 sm:h-20 bg-gradient-to-br from-[#025046] to-[#01352e] rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(2,76,68,0.5)] transition-transform duration-300">
                                    <span className="text-white text-sm sm:text-base font-bold mt-1 shadow-sm">MUSAFIR</span>
                                    <span className="text-white/90 text-sm sm:text-base font-semibold mt-0.5 shadow-sm">
                                        1+<span ref={musafir3Ref} className="inline-block relative z-10 font-extrabold text-lg sm:text-xl mx-0.5 origin-bottom" style={{textShadow: "none", color: "rgba(255,255,255,0.9)"}}>3</span>+1
                                    </span>
                                </div>
                            </div>

                            {/* RNR Icon in the Center */}
                            <div className="absolute flex flex-col items-center" style={{ top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.2))" }}>
                                <g ref={carRef} style={{ opacity: 0 }}>
                                    <circle ref={carGlowRef} cx="0" cy="0" r="22" fill="#ef4444" fillOpacity="0.4" style={{ filter: 'blur(4px)' }} />
                                    <circle cx="0" cy="0" r="16" fill="white" stroke="#d4a574" strokeWidth="2" strokeDasharray="2,2" />
                                    <text x="0" y="5" textAnchor="middle" style={{ fontSize: '18px', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}>🚗</text>

                                    {/* Chat Bubble */}
                                    <g ref={chatBubbleRef} style={{ opacity: 0 }}>
                                        <path d="M 15 -35 Q 25 -35 25 -25 L 25 -15 Q 25 -5 15 -5 L 5 -5 L -5 5 L 0 -5 L -15 -5 Q -25 -5 -25 -15 L -25 -25 Q -25 -35 -15 -35 Z" fill="white" stroke="#024c44" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                                        <text x="0" y="-17" textAnchor="middle" fill="#024c44" style={{ fontSize: '9px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Berehat</text>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- NEW: INDIVIDUAL SCENARIO TITLE SLIDE ---------------- */}
            <div ref={scenarioSlideRef} className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-[#f0faf7] p-4 text-black opacity-0 pointer-events-none">
                <div className="text-center">
                    <h2 ref={scenarioSlideTextRef} className="text-4xl sm:text-5xl md:text-6xl landscape:text-4xl font-display font-bold text-teal mb-4 landscape:max-lg:mb-2">
                    </h2>
                    <div className="flex justify-center mt-4"><div className="w-24 h-1 bg-gold rounded-full" /></div>
                </div>
            </div>

            {/* ---------------- SLIDE: QnA TITLE ---------------- */}
            <div ref={slideQaTitleRef} className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0faf7] p-4 text-black opacity-0 pointer-events-none z-[60]">
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl landscape:text-4xl font-display font-bold text-teal mb-4 landscape:mb-2">SOALAN &amp; JAWAPAN</h2>
                    <div className="flex justify-center mt-6 landscape:mt-2"><div className="w-24 h-1 bg-gold rounded-full" /></div>
                </div>
            </div>

            {/* ---------------- SLIDE: QnA CONTENT ---------------- */}
            <div ref={slideQaSlideRef} className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 landscape:p-3 text-black opacity-0 pointer-events-none z-[60] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(245, 245, 245) 100%)' }}>
                <div className="w-full max-w-5xl mx-auto portrait-scale" style={{ perspective: '1200px' }}>
                    <div ref={qaFlipInnerRef} className="relative w-full transition-transform" style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* Front: Question Box */}
                        <div className="qa-front-face absolute inset-0 bg-gradient-to-br from-teal to-teal-light rounded-[2.5rem] p-8 sm:p-12 landscape:max-lg:p-6 text-white shadow-glow-teal flex flex-col justify-center items-center text-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}>
                            <div className="question-icon absolute -top-8 -left-2 sm:-left-6 w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-glow-gold pointer-events-none">
                                <HelpCircle className="w-10 h-10 text-white" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-gold-light text-base lg:text-lg uppercase tracking-[0.2em] font-semibold mb-6">Soalan</p>
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl landscape:max-lg:text-2xl font-display font-bold leading-tight max-w-2xl mx-auto text-balance mb-8">Bilakah seseorang boleh melaksanakan solat jamak dan qasar?</h3>
                            </div>
                            <div ref={qaTimerContainerRef} className="absolute bottom-8 flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-white pointer-events-none opacity-0 shadow-lg border border-white/20">
                                <Clock className="w-6 h-6 animate-pulse text-gold" />
                                <span ref={qaTimerTextRef} className="font-display font-bold text-2xl tracking-wider w-8 text-left">10</span>
                            </div>
                        </div>

                        {/* Back: Answer Box */}
                        <div className="qa-back-face relative w-full bg-white rounded-[2.5rem] p-8 sm:p-12 landscape:max-lg:p-6 border-2 border-teal/20 shadow-xl flex flex-col justify-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)', minHeight: '400px', visibility: 'hidden' }}>
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center pointer-events-none blur-xl"></div>
                            <div className="relative z-10">
                                <p className="text-gold text-base lg:text-lg uppercase tracking-[0.2em] font-semibold mb-6">Jawapan</p>
                                <p ref={qaKeywordsRef} className="text-2xl sm:text-3xl text-[#1f2937] leading-relaxed font-medium">
                                    <span className="keyword bg-gradient-to-r from-[#f3e3d6] to-[#f3e3d6] bg-no-repeat" style={{ backgroundSize: '0% 100%' }}>Selepas</span>{' '}
                                    keluar dari{' '}
                                    <span className="keyword bg-gradient-to-r from-[#cadcd8] to-[#cadcd8] bg-no-repeat" style={{ backgroundSize: '0% 100%' }}>kariah mukim atau mastautin</span>{' '}
                                    tetapi{' '}
                                    <span className="keyword bg-gradient-to-r from-[#f3e3d6] to-[#f3e3d6] bg-no-repeat" style={{ backgroundSize: '0% 100%' }}>sebelum</span>{' '}
                                    masuk ke kariah mukim atau mastautin.
                                </p>
                            </div>

                            {/* Visual Explanation */}
                            <div className="mt-10 p-6 sm:p-8 bg-mint/50 border border-teal/10 rounded-3xl relative z-10 w-full">
                                <div className="flex flex-col md:flex-row landscape:max-lg:flex-row items-center justify-center gap-4 md:gap-0 landscape:max-lg:gap-0 flex-nowrap w-full">
                                    {/* Left Box */}
                                    <div className="flex flex-col md:flex-row landscape:max-lg:flex-row items-center gap-2 sm:gap-4 md:gap-6 p-3 sm:p-5 rounded-[2.5rem] border-2 border-red-500 shadow-sm relative overflow-hidden w-full md:w-auto landscape:max-lg:w-auto">
                                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(239, 68, 68), rgb(239, 68, 68) 2px, transparent 2px, transparent 12px)' }}></div>
                                        <div className="absolute inset-0 bg-red-50 pointer-events-none"></div>
                                        <div className="text-center flex-shrink-0 relative z-10">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm border border-teal/10">
                                                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-teal" />
                                            </div>
                                            <span className="text-xs sm:text-sm text-teal-dark font-semibold block whitespace-nowrap">Kariah Asal</span>
                                            <span className="text-[10px] sm:text-xs text-gray-500 font-medium block whitespace-nowrap mt-0.5">Mukim/Mastautin</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-gold flex-shrink-0 hidden md:block landscape:max-lg:block relative z-10" />
                                        <ArrowDown className="w-4 h-4 text-gold flex-shrink-0 block md:hidden landscape:max-lg:hidden relative z-10" />
                                        <div className="text-center animate-rnr-blink flex-shrink-0 relative z-10">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex flex-col items-center justify-center mb-3 mx-auto shadow-glow-gold border-2 sm:border-4 border-white/20">
                                                <span className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center">Kariah<br />Sebelum</span>
                                            </div>
                                            <span className="text-[9px] sm:text-[10px] text-gold-dark font-bold px-2 sm:px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap block bg-white shadow-sm border border-gold/10">Selepas Keluar</span>
                                        </div>
                                    </div>
                                    {/* Middle Path */}
                                    <div className="flex landscape:max-lg:flex flex-col items-center opacity-90 flex-1 min-w-[20px] lg:min-w-[40px] my-4 md:my-0 landscape:max-lg:my-0">
                                        <div className="flex flex-col md:flex-row landscape:max-lg:flex-row items-center w-full">
                                            <div className="flex-1 border-l-2 md:border-l-0 md:border-t-2 landscape:max-lg:border-l-0 landscape:max-lg:border-t-2 border-dashed border-emerald-400 min-h-[20px] md:min-h-0 md:min-w-[5px] lg:min-w-[10px]" />
                                            <div className="bg-emerald-100 border border-emerald-200 px-2 py-1.5 lg:px-3 lg:py-2 rounded-xl lg:rounded-full mx-1 shadow-sm flex flex-col md:flex-row landscape:max-lg:flex-row items-center justify-center gap-1 flex-shrink min-w-0 overflow-hidden">
                                                <span className="text-sm lg:text-lg flex-shrink-0">🚗</span>
                                                <span className="text-[9px] lg:text-[10px] xl:text-xs text-emerald-800 font-semibold text-center leading-tight">Sepanjang perjalanan dibolehkan<br /> jamak dan qasar</span>
                                            </div>
                                            <div className="flex-1 border-l-2 md:border-l-0 md:border-t-2 landscape:max-lg:border-l-0 landscape:max-lg:border-t-2 border-dashed border-emerald-400 min-h-[20px] md:min-h-0 md:min-w-[5px] lg:min-w-[10px]" />
                                        </div>
                                    </div>
                                    {/* Right Box */}
                                    <div className="flex flex-col md:flex-row landscape:max-lg:flex-row items-center gap-2 sm:gap-4 md:gap-6 p-3 sm:p-5 rounded-[2.5rem] border-2 border-red-500 shadow-sm relative overflow-hidden w-full md:w-auto landscape:max-lg:w-auto">
                                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(239, 68, 68), rgb(239, 68, 68) 2px, transparent 2px, transparent 12px)' }}></div>
                                        <div className="absolute inset-0 bg-red-50 pointer-events-none"></div>
                                        <div className="text-center animate-rnr-blink flex-shrink-0 relative z-10">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex flex-col items-center justify-center mb-3 mx-auto shadow-glow-gold border-2 sm:border-4 border-white/20">
                                                <span className="text-white font-bold text-[10px] sm:text-xs leading-tight text-center">Kariah<br />Selepas</span>
                                            </div>
                                            <span className="text-[9px] sm:text-[10px] text-gold-dark font-bold px-2 sm:px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap block bg-white shadow-sm border border-gold/10">Sebelum Masuk</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-teal flex-shrink-0 hidden md:block landscape:max-lg:block relative z-10" />
                                        <ArrowDown className="w-4 h-4 text-teal flex-shrink-0 block md:hidden landscape:max-lg:hidden relative z-10" />
                                        <div className="text-center flex-shrink-0 relative z-10">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm border border-teal/10">
                                                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-teal" />
                                            </div>
                                            <span className="text-xs sm:text-sm text-teal-dark font-semibold block whitespace-nowrap">Kariah Tujuan</span>
                                            <span className="text-[10px] sm:text-xs text-gray-500 font-medium block whitespace-nowrap mt-0.5">Mukim/Mastautin</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Key Point */}
                            <div className="mt-8 p-5 bg-teal/5 rounded-2xl border border-teal/10 flex items-start gap-4 relative z-10">
                                <span className="font-bold text-teal uppercase tracking-widest text-[10px] bg-teal/10 px-3 py-1.5 rounded flex-shrink-0">Tip</span>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    Solat jamak dan qasar boleh dilakukan di <span className="text-gold-dark font-bold">RNR</span>, <span className="text-gold-dark font-bold">masjid</span> atau <span className="text-gold-dark font-bold">surau</span> yang dilalui selepas keluar dari kariah asal.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ---------------- SLIDE 7: CLOSING EXACT CLONE ---------------- */}
            <div ref={slide7Ref} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #024c44 0%, #0a3d36 100%)' }}>
                {/* Animated Path Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M 10 50 Q 30 20, 50 50 T 90 50" fill="none" stroke="#d4a574" strokeWidth="0.3" vectorEffect="non-scaling-stroke" /></svg>
                <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto text-white">
                    <div className="flex justify-center mb-6 landscape:mb-3"><Sparkles className="w-10 h-10 landscape:w-7 landscape:h-7 text-[#d4af37]" /></div>
                    <div className="mb-8 landscape:mb-4" style={{ perspective: '1000px' }}>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl landscape:text-4xl font-display font-bold text-white mb-4 landscape:mb-2">
                            <span className="cl-word inline-block">Semoga</span> <span className="cl-word inline-block text-[#d4af37]">Bermanfaat</span>
                        </h2>
                        <h3 className="text-4xl sm:text-5xl landscape:text-3xl font-display font-bold text-white/90">
                            <span className="cl-word inline-block">Terima</span> <span className="cl-word inline-block">Kasih</span>
                        </h3>
                    </div>
                    <div className="cl-emoji flex justify-center mb-8 landscape:mb-4">
                        <div className="w-20 h-20 landscape:w-14 landscape:h-14 bg-gradient-to-br from-[#d4af37] to-[#fef08a] rounded-full flex items-center justify-center"><span className="text-4xl landscape:text-2xl">😊</span></div>
                    </div>
                    <div className="mt-16 landscape:mt-6 pt-8 landscape:pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-white/50 text-sm">
                        <Heart className="w-4 h-4 text-[#d4af37]" /><span>Dibuat dengan kasih sayang untuk umat Islam</span>
                    </div>
                </div>
            </div>

            {/* LOMPAT SKIP COMPONENT */}
            <button
                onClick={handleSkip}
                className="fixed bottom-7 right-9 landscape:bottom-3 landscape:right-4 bg-white border-2 border-gold text-gold font-bold text-sm landscape:text-xs px-6 py-2.5 landscape:px-4 landscape:py-1.5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:bg-teal hover:border-teal hover:text-white hover:-translate-y-1 transition-all duration-300 z-[100000] tracking-widest"
            >
                HENTIKAN ANIMASI
            </button>

        </div>
    );
}
