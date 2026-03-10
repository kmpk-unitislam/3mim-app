import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Home, MapPin, Car, Navigation, CalendarDays, ArrowRight, ArrowLeft, Sparkles, Heart, Building2, Briefcase } from 'lucide-react';

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
    const mukimNodeRef = useRef<HTMLDivElement>(null);
    const btn1Ref = useRef<HTMLButtonElement>(null);
    const btn2Ref = useRef<HTMLButtonElement>(null);
    const btn3Ref = useRef<HTMLButtonElement>(null);

    // Internal state for Situasi text updates during animation
    const [sitStatusText, setSitStatusText] = useState("");
    const [sitDescText, setSitDescText] = useState("");

    useEffect(() => {
        if (!isPlaying) return;

        document.body.style.overflow = 'hidden';

        // Reset visibility
        gsap.set(overlayRef.current, { y: '0%', opacity: 1 });
        const slides = [slide0Ref, slide1Ref, slide1MastautinRef, slide1MukimRef, slide1MusafirRef, slide2Ref, slide345Ref, slide7Ref];
        slides.forEach(s => gsap.set(s.current, { opacity: 0, y: 30 }));

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                onComplete();
            },
        });
        tlRef.current = tl;

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
        if (mukHdr) tl.fromTo(mukHdr, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '<');
        if (mukImg) tl.fromTo(mukImg, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '<');
        if (mukDesc) tl.fromTo(mukDesc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.3');
        hideSlide(slide1MukimRef, 13.9); // 13.93s audio

        // --- SLIDE 1C: MUSAFIR CLONE ---
        showSlide(slide1MusafirRef, 0.5);
        const musHdr = slide1MusafirRef.current?.querySelector('.mus-hdr');
        const musDesc = slide1MusafirRef.current?.querySelector('.mus-desc');
        const musImg = slide1MusafirRef.current?.querySelector('.mus-img');
        const musPath = slide1MusafirRef.current?.querySelector('.mus-path');
        tl.add(() => { if (audioMusafirRef.current) audioMusafirRef.current.play().catch(() => { }); }, '<');
        if (musHdr) tl.fromTo(musHdr, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '<');
        if (musImg) tl.fromTo(musImg, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '<');
        if (musDesc) tl.fromTo(musDesc, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<+0.3');
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
        hideSlide(slide2Ref, 2.5);

        // --- SLIDE 3/4/5: SITUASI PERJALANAN CLONE (Automated Scenarios) ---
        showSlide(slide345Ref);
        const sitHdr = slide345Ref.current?.querySelector('.sit-hdr');
        const sitMap = slide345Ref.current?.querySelector('.sit-map');
        if (sitHdr) tl.fromTo(sitHdr, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '<');
        if (sitMap) tl.fromTo(sitMap, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '<+0.2');

        // Make all paths visible but dimmed
        const allPaths = [path1Ref, path2aRef, path2bRef, path3Ref];
        allPaths.forEach((p, i) => {
            if (p.current) tl.fromTo(p.current, { opacity: 0 }, { opacity: 0.2, duration: 0.4 }, `<+${i * 0.1}`);
        });

        const car = carRef.current;
        if (car) {
            const resetTrails = () => {
                const trs = [glowTrail1Ref, glowTrail2Ref, glowTrail3Ref, glow2aRedRef, glow2aGreenRef, glow2bGreenRef, glow2bRedRef, glow3aRedRef, glow3aGreenRef, glow3bGreenRef, glow3bRedRef];
                trs.forEach(t => { if (t.current) { const L = t.current.getTotalLength(); gsap.set(t.current, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); } });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0 });
                gsap.set(chatBubbleRef.current, { opacity: 0, scale: 0, transformOrigin: 'bottom center' });
                // Dim all main paths
                [path1Ref, path2aRef, path2bRef, path3Ref].forEach(p => { if (p.current) gsap.set(p.current, { opacity: 0.2 }); });
            };

            // ==== SCENARIO 1 ====
            tl.add(() => {
                setSitDescText("Mastautin → Mukim: Dari tempat tinggal tetap ke tempat menetap sementara (lebih 3 hari)");
                setSitStatusText("Bertolak dari Mastautin...");
                if (btn1Ref.current) btn1Ref.current.className = btn1Ref.current.className.replace('bg-white text-teal shadow-card', 'bg-teal text-white shadow-glow-teal scale-105');
                const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                if (n1) n1.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n2) n2.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                resetTrails();
                if (path1Ref.current) gsap.to(path1Ref.current, { opacity: 1, duration: 0.3 });
                // Make scenario 1 trails visible
                [glowTrail1Ref, glowTrail2Ref, glowTrail3Ref].forEach(t => { if (t.current) gsap.set(t.current, { opacity: 1 }); });
                gsap.set(car, { opacity: 1, scale: 1, filter: 'none' });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 });
            }, '+=0.5');

            tl.add(() => setSitStatusText("🔴 Dalam kariah Mastautin. Solat penuh."))
                .to(car, { motionPath: { path: path1Ref.current!, align: path1Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.29 }, duration: 1.5, ease: 'power1.inOut' })
                .to(glowTrail1Ref.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                .add(() => { setSitStatusText("🟢 Keluar kariah. Musafir — boleh jamak/qasar."); gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 }); })
                .to(car, { motionPath: { path: path1Ref.current!, align: path1Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.29, end: 0.765 }, duration: 2.5, ease: 'none' })
                .to(glowTrail2Ref.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                .add(() => { setSitStatusText("🔴 Masuk kariah Mukim. Solat penuh semula."); gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 }); })
                .to(car, { motionPath: { path: path1Ref.current!, align: path1Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.765, end: 1 }, duration: 1.5, ease: 'power1.inOut' })
                .to(glowTrail3Ref.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                .add(() => {
                    setSitStatusText("Tiba di Mukim. Solat penuh semula.");
                    gsap.fromTo(mukimNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                    if (btn1Ref.current) btn1Ref.current.className = btn1Ref.current.className.replace('bg-teal text-white shadow-glow-teal scale-105', 'bg-white text-teal shadow-card');
                    const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                    const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                    if (n1) n1.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                    if (n2) n2.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                    if (path1Ref.current) gsap.to(path1Ref.current, { opacity: 0.2, duration: 0.3 });
                    gsap.set(car, { opacity: 0 });
                }, '+=1.0');

            // ==== SCENARIO 2 ====
            tl.add(() => {
                setSitDescText("Mastautin → Musafir → Mukim: Dari mastautin ke musafir (≥81km) kemudian ke mukim");
                setSitStatusText("Bertolak dari Mastautin...");
                if (btn2Ref.current) btn2Ref.current.className = btn2Ref.current.className.replace('bg-white text-teal shadow-card', 'bg-teal text-white shadow-glow-teal scale-105');
                const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                const n3 = musafirNodeRef.current?.children[0] as HTMLElement;
                if (n1) n1.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n2) n2.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                if (n3) n3.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                resetTrails();
                if (path2aRef.current) gsap.to(path2aRef.current, { opacity: 1, duration: 0.3 });
                if (path2bRef.current) gsap.to(path2bRef.current, { opacity: 1, duration: 0.3 });
                // Make scenario 2 trails visible
                [glow2aRedRef, glow2aGreenRef, glow2bGreenRef, glow2bRedRef].forEach(t => { if (t.current) gsap.set(t.current, { opacity: 1 }); });
                gsap.set(car, { opacity: 1, scale: 1 });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 });
            }, '+=0.5');

            tl.add(() => setSitStatusText("🔴 Dalam kariah Mastautin. Solat penuh."))
                .to(car, { motionPath: { path: path2aRef.current!, align: path2aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.35 }, duration: 1.5, ease: 'power1.inOut' })
                .to(glow2aRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                .add(() => { setSitStatusText("🟢 Keluar kariah. Musafir — boleh jamak/qasar."); gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 }); })
                .to(car, { motionPath: { path: path2aRef.current!, align: path2aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.35, end: 1 }, duration: 2.5, ease: 'none' })
                .to(glow2aGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                .add(() => {
                    setSitStatusText("🟢 Singgah di Musafir. Boleh jamak/qasar.");
                    gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                })
                .to(car, { y: 205, rotation: 0, scale: 1.3, duration: 0.4, ease: 'back.out(1.5)' })
                .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
                .to(car, { scale: 1, duration: 1.2 })
                .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
                .to(car, { y: 280, duration: 0.4, ease: 'power2.in' })
                .add(() => { setSitStatusText("🟢 Menyambung perjalanan. Masih musafir."); })
                .to(car, { motionPath: { path: path2bRef.current!, align: path2bRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.65 }, duration: 2.5, ease: 'none' })
                .to(glow2bGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                .add(() => { setSitStatusText("🔴 Masuk kariah Mukim. Solat penuh semula."); gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 }); })
                .to(car, { motionPath: { path: path2bRef.current!, align: path2bRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.65, end: 1 }, duration: 1.5, ease: 'power1.inOut' })
                .to(glow2bRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                .add(() => {
                    setSitStatusText("Tiba di Mukim. Solat penuh semula.");
                    gsap.fromTo(mukimNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                    if (btn2Ref.current) btn2Ref.current.className = btn2Ref.current.className.replace('bg-teal text-white shadow-glow-teal scale-105', 'bg-white text-teal shadow-card');
                    const n1 = mastautinNodeRef.current?.children[0] as HTMLElement;
                    const n2 = mukimNodeRef.current?.children[0] as HTMLElement;
                    const n3 = musafirNodeRef.current?.children[0] as HTMLElement;
                    if (n1) n1.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                    if (n2) n2.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                    if (n3) n3.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                    if (path2aRef.current) gsap.to(path2aRef.current, { opacity: 0.2, duration: 0.3 });
                    if (path2bRef.current) gsap.to(path2bRef.current, { opacity: 0.2, duration: 0.3 });
                    gsap.set(car, { opacity: 0 });
                }, '+=1.0');

            // ==== SCENARIO 3 ====
            tl.add(() => {
                setSitDescText("Musafir → Mastautin: Dalam perjalanan kembali ke tempat tinggal tetap");
                setSitStatusText("Bertolak dari Mastautin ke Musafir...");
                if (btn3Ref.current) btn3Ref.current.className = btn3Ref.current.className.replace('bg-white text-teal shadow-card', 'bg-teal text-white shadow-glow-teal scale-105');
                const n1 = musafirNodeRef.current?.children[0] as HTMLElement;
                if (n1) n1.classList.add('scale-110', 'ring-4', 'ring-teal/20');
                resetTrails();
                if (path2aRef.current) gsap.to(path2aRef.current, { opacity: 1, duration: 0.3 });
                if (path3Ref.current) gsap.to(path3Ref.current, { opacity: 1, duration: 0.3 });
                // Make scenario 3 trails visible
                [glow3aRedRef, glow3aGreenRef, glow3bGreenRef, glow3bRedRef].forEach(t => { if (t.current) gsap.set(t.current, { opacity: 1 }); });
                gsap.set(car, { opacity: 1, scale: 1 });
                gsap.set(carGlowRef.current, { fill: '#ef4444', opacity: 0.5 });
            }, '+=0.5');

            tl.add(() => setSitStatusText("🔴 Dalam kariah Mastautin. Solat penuh."))
                .to(car, { motionPath: { path: path2aRef.current!, align: path2aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.35 }, duration: 1.5, ease: 'power1.inOut' })
                .to(glow3aRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                .add(() => { setSitStatusText("🟢 Keluar kariah. Musafir — boleh jamak/qasar."); gsap.to(carGlowRef.current, { fill: '#22c55e', duration: 0.3 }); })
                .to(car, { motionPath: { path: path2aRef.current!, align: path2aRef.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.35, end: 1 }, duration: 2.5, ease: 'power1.inOut' })
                .to(glow3aGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'power1.inOut' }, '<')
                .add(() => {
                    setSitStatusText("Berehat di Musafir...");
                    gsap.fromTo(musafirNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                })
                .to(car, { y: 205, rotation: 0, duration: 0.5, ease: 'back.out(1.5)' })
                .to(chatBubbleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2")
                .to(car, { duration: 1.5 })
                .to(chatBubbleRef.current, { opacity: 0, scale: 0, duration: 0.3, ease: 'back.in(1.5)' })
                .to(car, { y: 280, duration: 0.4, ease: 'power2.in' })
                .add(() => { setSitStatusText("� Pulang balik ke Mastautin. Solat biasa."); gsap.to(carGlowRef.current, { fill: '#ef4444', duration: 0.3 }); })
                .to(car, { motionPath: { path: path3Ref.current!, align: path3Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 0.65 }, duration: 2.5, ease: 'none' })
                .to(glow3bGreenRef.current, { strokeDashoffset: 0, duration: 2.5, ease: 'none' }, '<')
                .to(car, { motionPath: { path: path3Ref.current!, align: path3Ref.current!, alignOrigin: [0.5, 0.5], autoRotate: true, start: 0.65, end: 1 }, duration: 1.5, ease: 'power1.inOut' })
                .to(glow3bRedRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, '<')
                .add(() => {
                    setSitStatusText("Tiba di Mastautin. Solat biasa.");
                    gsap.fromTo(mastautinNodeRef.current, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out' });
                    if (btn3Ref.current) btn3Ref.current.className = btn3Ref.current.className.replace('bg-teal text-white shadow-glow-teal scale-105', 'bg-white text-teal shadow-card');
                    const n1 = musafirNodeRef.current?.children[0] as HTMLElement;
                    if (n1) n1.classList.remove('scale-110', 'ring-4', 'ring-teal/20');
                    if (path2aRef.current) gsap.to(path2aRef.current, { opacity: 0.2, duration: 0.3 });
                    if (path3Ref.current) gsap.to(path3Ref.current, { opacity: 0.2, duration: 0.3 });
                    gsap.set(car, { opacity: 0 });
                }, '+=1.0');
        }

        hideSlide(slide345Ref, 0.5);

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
            document.body.style.overflow = '';
        };
    }, [isPlaying]);

    const handleSkip = () => {
        tlRef.current?.progress(1);
        [audioMastautinRef, audioMukimRef, audioMusafirRef].forEach(ref => {
            if (ref.current) {
                ref.current.pause();
                ref.current.currentTime = 0;
            }
        });
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
            <div ref={slide1Ref} className="absolute inset-0 flex flex-col items-center justify-center bg-[#f0faf7] p-8 landscape:p-4 text-black opacity-0 pointer-events-none">
                <div className="mim-hdr text-center">
                    <h2 className="text-5xl sm:text-6xl landscape:text-3xl font-display font-bold text-teal mb-4 landscape:mb-2">3 MIM</h2>
                    <p className="text-xl landscape:text-base text-gray-600 font-display">Tiga Kategori Perjalanan</p>
                    <div className="flex justify-center mt-6 landscape:mt-2"><div className="w-16 h-1 bg-gold rounded-full" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 landscape:gap-4 mt-12 landscape:mt-4 w-full max-w-6xl landscape:max-w-4xl" style={{ perspective: '1000px' }}>
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
            <div ref={slide1MastautinRef} className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 landscape:p-3 text-black opacity-0 pointer-events-none" style={{ backgroundColor: '#f0faf7' }}>
                <audio ref={audioMastautinRef} src={`${import.meta.env.BASE_URL}mastautin.mp4`} preload="auto" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="concentric-circle absolute rounded-full border-2 border-teal/20" style={{ width: `${300 + i * 150}px`, height: `${300 + i * 150}px` }} />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 landscape:gap-6 items-center max-w-6xl w-full z-10">
                    <div className="mas-img relative flex justify-center">
                        <div className="relative rounded-3xl landscape:rounded-2xl overflow-hidden shadow-2xl max-w-sm lg:max-w-md landscape:max-h-[45vh]">
                            <img src={`${import.meta.env.BASE_URL}mastautin-illustration.jpg`} alt="Mastautin" className="w-full h-auto landscape:max-h-[40vh] landscape:object-cover" />
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
            <div ref={slide1MukimRef} className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 landscape:p-3 text-black opacity-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0faf7 100%)' }}>
                <audio ref={audioMukimRef} src={`${import.meta.env.BASE_URL}mukim.mp4`} preload="auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 landscape:gap-6 items-center max-w-6xl w-full z-10">
                    <div className="muk-hdr order-2 md:order-1 text-center md:text-left landscape:text-left">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl landscape:text-3xl font-display font-bold text-teal mb-2 lg:mb-4 landscape:mb-1">MUKIM</h2>
                        <p className="text-lg sm:text-xl landscape:text-base text-gold font-display mb-4 lg:mb-8 landscape:mb-2">Tinggal Sementara</p>
                        <div className="muk-desc">
                            <p className="text-base sm:text-lg landscape:text-sm text-gray-700 leading-relaxed mb-6 lg:mb-8 landscape:mb-3">Mukim bermaksud tinggal dan menetap di sesuatu tempat <span className="font-semibold text-teal">lebih dari tiga hari</span>, tetapi tidak berniat untuk menjadikannya tempat tinggal tetap selamanya.</p>
                            <div className="inline-flex items-center gap-4 landscape:gap-3 bg-gradient-to-r from-teal to-teal-light rounded-2xl p-4 sm:p-6 landscape:p-3 shadow-glow-teal text-left">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 landscape:w-12 landscape:h-12 rounded-full bg-white/20 flex items-center justify-center"><span className="text-3xl sm:text-5xl landscape:text-2xl font-display font-bold text-white">3</span></div>
                                <div><p className="text-2xl sm:text-3xl landscape:text-xl font-display font-bold text-white">&gt; 3 Hari</p><p className="text-white/80 text-xs sm:text-sm landscape:text-xs">Tempoh minimum untuk dianggap mukim</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="muk-img order-1 md:order-2 relative flex justify-center">
                        <div className="relative rounded-3xl landscape:rounded-2xl overflow-hidden shadow-2xl max-w-sm lg:max-w-md landscape:max-h-[45vh]">
                            <img src={`${import.meta.env.BASE_URL}mukim-illustration.jpg`} alt="Mukim" className="w-full h-auto landscape:max-h-[40vh] landscape:object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- SLIDE 1C: MUSAFIR EXACT CLONE ---------------- */}
            <div ref={slide1MusafirRef} className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 landscape:p-3 text-black opacity-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)' }}>
                <audio ref={audioMusafirRef} src={`${import.meta.env.BASE_URL}musafir.mp4`} preload="auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 landscape:gap-6 items-center max-w-6xl w-full z-10">
                    <div className="mus-hdr order-2 md:order-1 text-center md:text-left landscape:text-left">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl landscape:text-3xl font-display font-bold text-teal mb-2 lg:mb-4 landscape:mb-1">MUSAFIR</h2>
                        <p className="text-lg sm:text-xl landscape:text-base text-gold font-display mb-4 lg:mb-8 landscape:mb-2">Dalam Perjalanan</p>
                        <div className="mus-desc">
                            <p className="text-base sm:text-lg landscape:text-sm text-gray-700 leading-relaxed mb-6 lg:mb-8 landscape:mb-3">Musafir ialah seseorang yang melakukan perjalanan melebihi <span className="font-semibold text-teal">dua marhalah</span> atau <span className="font-semibold text-teal">81 kilometer</span>.</p>
                            <div className="inline-flex items-center gap-4 sm:gap-6 landscape:gap-3 bg-gradient-to-r from-gold to-gold-light rounded-2xl p-4 sm:p-6 landscape:p-3 shadow-glow-gold mb-8 landscape:mb-3 text-left">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 landscape:w-12 landscape:h-12 rounded-full bg-white/30 flex items-center justify-center"><Navigation className="w-8 h-8 sm:w-12 sm:h-12 landscape:w-6 landscape:h-6 text-white" /></div>
                                <div><div className="flex items-baseline gap-2"><p className="text-3xl sm:text-5xl landscape:text-2xl font-display font-bold text-white">≥ 81</p><p className="text-white/90 text-2xl landscape:text-lg font-bold font-display tracking-wide animate-km-glow">KM</p></div><p className="text-white/70 text-xs sm:text-sm landscape:text-xs mt-1">Jarak minimum untuk menjadi musafir</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="mus-img order-1 md:order-2 relative flex justify-center flex-col">
                        <div className="relative rounded-3xl landscape:rounded-2xl overflow-hidden shadow-2xl max-w-sm lg:max-w-md landscape:max-h-[45vh]">
                            <img src={`${import.meta.env.BASE_URL}musafir-illustration.jpg`} alt="Musafir" className="w-full h-auto landscape:max-h-[40vh] landscape:object-cover" />
                        </div>
                    </div>
                </div>
            </div>\n\n            {/* ---------------- SLIDE 2: TEMPOH EXACT CLONE ---------------- */}
            <div ref={slide2Ref} className="absolute inset-0 flex items-center justify-center bg-[#f0faf7] p-8 landscape:p-4 text-black opacity-0 pointer-events-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 landscape:gap-6 max-w-6xl w-full">
                    {/* Calendar side */}
                    <div className="tempoh-cal bg-white rounded-3xl landscape:rounded-2xl p-6 sm:p-8 landscape:p-3 shadow-card">
                        <div className="flex items-center justify-between mb-6">
                            <button disabled className="p-2 bg-gray-50 rounded-lg"><ArrowLeft className="w-5 h-5 text-gray-400" /></button>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-teal" />
                                <span className="text-lg font-display font-bold text-teal">Januari 2026</span>
                            </div>
                            <button disabled className="p-2 bg-gray-50 rounded-lg"><ArrowRight className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="grid grid-cols-7 gap-4 landscape:gap-1 mb-2">
                            {['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'].map((d) => (
                                <div key={d} className="calendar-day text-center text-xs text-gray-500 font-medium py-2 landscape:py-0.5">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-4 landscape:gap-1">
                            <div className="calendar-day" /><div className="calendar-day" /><div className="calendar-day" />
                            {calDays.map(i => {
                                const isHighlight = i >= 4 && i <= 6;
                                const isTravel = i === 3 || i === 7;
                                return (
                                    <div key={i} className={`calendar-day relative flex items-center justify-center w-10 h-10 landscape:w-7 landscape:h-7 mx-auto rounded-lg text-sm landscape:text-xs font-medium ${isHighlight ? 'day-highlighted bg-teal text-white' : isTravel ? 'bg-teal/10 text-teal font-bold' : 'bg-gray-50 text-gray-700'
                                        }`}>
                                        {i}
                                        {isTravel && <span className="absolute -bottom-4 text-[10px] text-teal font-bold">{i === 3 ? 'Pergi' : 'Balik'}</span>}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-8 flex gap-4 justify-center">
                            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-teal rounded" /><span className="text-sm text-gray-600">3 Hari Qasar & Jamak</span></div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-teal/20 rounded" /><span className="text-sm text-gray-600 font-medium">Pergi & Balik</span></div>
                        </div>
                    </div>
                    {/* Text side */}
                    <div>
                        <div className="tempoh-hdr">
                            <h2 className="text-4xl sm:text-5xl landscape:text-2xl font-display font-bold text-teal mb-4 landscape:mb-2">TEMPOH JAMAK<span className="block text-gold">&amp; QASAR</span></h2>
                            <p className="text-xl landscape:text-base text-gray-600 font-display mb-8 landscape:mb-3">Bilakah Boleh Dilakukan?</p>
                        </div>
                        <div className="tempoh-desc text-lg landscape:text-sm text-gray-700 leading-relaxed mb-8 landscape:mb-3">
                            Tempoh dibolehkan melakukan qasar dan jamak untuk musafir ialah <span className="font-semibold text-teal">tiga hari</span> tidak termasuk perjalanan pergi dan balik.
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------------- SLIDE 3/4/5: SITUASI PERJALANAN EXACT CLONE ---------------- */}
            <div ref={slide345Ref} className="absolute inset-0 flex flex-col items-center justify-start bg-[#f0faf7] pt-4 landscape:pt-1 pb-2 landscape:pb-1 px-4 text-black opacity-0 pointer-events-none overflow-hidden">

                <div className="sit-hdr text-center mb-6 landscape:mb-1 shrink-0 mt-4 landscape:mt-1">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl landscape:text-2xl font-display font-bold text-teal mb-3 landscape:mb-1">SITUASI PERJALANAN</h2>
                    <p className="text-xs sm:text-sm landscape:text-[10px] text-gray-600 font-display max-w-xl mx-auto mb-4 landscape:mb-1">
                        Tiga situasi perjalanan yang memerlukan pemahaman tentang hukum solat
                    </p>
                    <div className="flex justify-center"><div className="w-20 h-1 bg-gold rounded-full" /></div>
                </div>

                {/* Action Buttons Clone */}
                <div className="flex flex-wrap justify-center gap-3 landscape:gap-1.5 mb-6 landscape:mb-2 shrink-0">
                    <button ref={btn1Ref} className="px-5 py-2.5 landscape:px-3 landscape:py-1.5 rounded-full text-xs landscape:text-[10px] font-semibold flex items-center gap-2 landscape:gap-1 bg-white text-teal shadow-card"><Home className="w-4 h-4 landscape:w-3 landscape:h-3" />Mastautin → Mukim</button>
                    <button ref={btn2Ref} className="px-5 py-2.5 landscape:px-3 landscape:py-1.5 rounded-full text-xs landscape:text-[10px] font-semibold flex items-center gap-2 landscape:gap-1 bg-white text-teal shadow-card"><Navigation className="w-4 h-4 landscape:w-3 landscape:h-3" />Mastautin → Musafir → Mukim</button>
                    <button ref={btn3Ref} className="px-5 py-2.5 landscape:px-3 landscape:py-1.5 rounded-full text-xs landscape:text-[10px] font-semibold flex items-center gap-2 landscape:gap-1 bg-white text-teal shadow-card"><MapPin className="w-4 h-4 landscape:w-3 landscape:h-3" />Musafir → Mastautin</button>
                </div>

                {/* Status Indicator */}
                <div className="text-center mb-4 landscape:mb-1 h-6 landscape:h-5 shrink-0">
                    {sitStatusText && <span className="inline-block px-4 py-1 landscape:px-2 landscape:py-0.5 bg-teal/10 text-teal font-semibold rounded-full text-xs landscape:text-[10px]">{sitStatusText}</span>}
                </div>

                {/* Description */}
                <div className="text-center mb-4 landscape:mb-1 shrink-0">
                    <div className="inline-block bg-white rounded-xl px-5 py-3 landscape:px-3 landscape:py-1.5 shadow-card border border-teal/10 max-w-2xl">
                        <p className="text-sm text-gray-700">
                            {sitDescText ? (
                                sitDescText.includes(': ') ? (
                                    <>
                                        <span className="font-semibold text-teal">{sitDescText.split(': ')[0]}:</span>{' '}
                                        {sitDescText.split(': ')[1]}
                                    </>
                                ) : (
                                    sitDescText
                                )
                            ) : null}
                        </p>
                    </div>
                </div>

                {/* The Exact SVG Map */}
                <div className="sit-map relative mx-auto w-full flex-1 min-h-0" style={{ maxHeight: '55vh' }}>
                    <div className="relative w-full h-full max-w-xl landscape:max-w-sm mx-auto" style={{ aspectRatio: '1/1' }}>
                        {/* Main Circle Background */}
                        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-teal/5 to-teal/10 border-2 border-dashed border-teal/20" />

                        {/* SVG Roads and Paths */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                            {/* Definitions */}
                            <defs>
                                <filter id="glowclone"><feGaussianBlur stdDeviation="2.5" result="bz" /><feMerge><feMergeNode in="bz" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                            </defs>

                            {/* Scen 1 path */}
                            <g><path ref={path1Ref} d="M 100 120 L 300 120" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" opacity="0.2" /><path d="M 100 120 L 300 120" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8,6" strokeOpacity="0.9" /></g>

                            {/* Scen 2a path */}
                            <g><path ref={path2aRef} d="M 100 120 Q 150 200, 200 280" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" filter="url(#glowclone)" opacity="0.2" /><path d="M 100 120 Q 150 200, 200 280" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" /></g>

                            {/* Scen 2b path */}
                            <g><path ref={path2bRef} d="M 200 280 Q 250 200, 300 120" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" filter="url(#glowclone)" opacity="0.2" /><path d="M 200 280 Q 250 200, 300 120" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" /></g>

                            {/* Scen 3 path */}
                            <g><path ref={path3Ref} d="M 200 280 Q 150 200, 100 120" fill="none" stroke="#1a1a1a" strokeWidth="10" strokeLinecap="round" filter="url(#glowclone)" opacity="0.2" /><path d="M 200 280 Q 150 200, 100 120" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.5" /></g>

                            {/* Distance Labels */}
                            <text x="200" y="110" textAnchor="middle" className="fill-teal text-sm font-bold" style={{ fontSize: '14px' }}>≥81 KM</text>
                            <text x="130" y="210" textAnchor="middle" className="fill-teal text-sm font-bold" transform="rotate(-55, 130, 210)" style={{ fontSize: '14px' }}>≥81 KM</text>
                            <text x="270" y="210" textAnchor="middle" className="fill-teal text-sm font-bold" transform="rotate(55, 270, 210)" style={{ fontSize: '14px' }}>≥81 KM</text>

                            {/* Glow Trail Segments for Scenario 1 */}
                            {/* Red zone 1: Within Kariah Selepas circle (x=100 to x=158) */}
                            <path ref={glowTrail1Ref} d="M 100 120 L 158 120" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Green zone: Outside kariah circles (x=158 to x=253) */}
                            <path ref={glowTrail2Ref} d="M 158 120 L 253 120" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Red zone 2: Within Kariah Sebelum circle (x=253 to x=300) */}
                            <path ref={glowTrail3Ref} d="M 253 120 L 300 120" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />

                            {/* Glow Trail Segments for Scenario 2 */}
                            {/* Leg 1 Red: Kariah Selepas zone on path2a */}
                            <path ref={glow2aRedRef} d="M 100 120 Q 114 143, 134 172" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Leg 1 Green: Musafir zone on path2a */}
                            <path ref={glow2aGreenRef} d="M 134 172 Q 185 256, 200 280" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Leg 2 Green: Musafir zone on path2b */}
                            <path ref={glow2bGreenRef} d="M 200 280 Q 237 221, 266 172" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Leg 2 Red: Kariah Sebelum zone on path2b */}
                            <path ref={glow2bRedRef} d="M 266 172 Q 287 141, 300 120" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />

                            {/* Glow Trail Segments for Scenario 3 */}
                            {/* Leg 1 Red: Kariah Selepas zone on path2a */}
                            <path ref={glow3aRedRef} d="M 100 120 Q 114 143, 134 172" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Leg 1 Green: Musafir zone to Musafir */}
                            <path ref={glow3aGreenRef} d="M 134 172 Q 185 256, 200 280" fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                            {/* Leg 2: Return journey from Musafir to Mastautin — all red */}
                            <path ref={glow3bGreenRef} d="M 200 280 Q 165 224, 134 172" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="butt" opacity="0" style={{ filter: 'blur(3px)' }} />
                            <path ref={glow3bRedRef} d="M 134 172 Q 114 143, 100 120" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0" style={{ filter: 'blur(3px)' }} />
                        </svg>

                        {/* Mastautin Node (Top Left) */}
                        <div ref={mastautinNodeRef} className="absolute pointer-events-none transition-transform duration-300" style={{ top: '30%', left: '25%' }}>
                            <div className="absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center shadow-glow-teal transition-all duration-300" style={{ top: '-28px', left: '-28px', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                                <span className="text-white text-[10px] sm:text-xs font-bold">MASTAUTIN</span>
                            </div>
                            <div className="absolute z-10 pointer-events-auto" style={{ top: '40px', left: '60px', transform: 'translate(-50%, -50%)' }}>
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-teal rounded-full flex flex-col items-center justify-center">
                                    <span className="text-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight">Sempadan<br />Kariah</span>
                                </div>
                            </div>
                        </div>

                        {/* Mukim Node (Top Right) */}
                        <div ref={mukimNodeRef} className="absolute pointer-events-none transition-transform duration-300" style={{ top: '30%', left: '75%' }}>
                            <div className="absolute w-28 h-16 sm:w-32 sm:h-20 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center shadow-glow-teal transition-all duration-300" style={{ top: '-28px', left: '28px', transform: 'translate(-50%, -50%) rotate(35deg)' }}>
                                <span className="text-white text-[10px] sm:text-xs font-bold">MUKIM</span>
                            </div>
                            <div className="absolute z-10 pointer-events-auto" style={{ top: '40px', left: '-60px', transform: 'translate(-50%, -50%)' }}>
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-transparent border-[3px] border-teal rounded-full flex flex-col items-center justify-center">
                                    <span className="text-teal text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center leading-tight">Sempadan<br />Kariah</span>
                                </div>
                            </div>
                        </div>

                        {/* Musafir Node (Bottom Center) */}
                        <div ref={musafirNodeRef} className="absolute transition-transform duration-300" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <div className="w-32 h-16 sm:w-40 sm:h-20 bg-gradient-to-br from-soft-green to-teal rounded-full flex flex-col items-center justify-center shadow-glow-teal transition-all duration-300">
                                <span className="text-white text-sm sm:text-base font-bold mt-1">MUSAFIR</span>
                                <span className="text-white/90 text-sm sm:text-base font-semibold mt-0.5">1+3+1</span>
                            </div>
                        </div>

                        {/* RNR Icon in the Center */}
                        <div className="absolute flex flex-col items-center" style={{ top: '52%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-teal font-display font-extrabold text-2xl">R</span>
                                <span className="text-teal font-display font-extrabold text-lg my-0.5">&</span>
                                <span className="text-teal font-display font-extrabold text-2xl">R</span>
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
