import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

export default function LandscapeOrientationBlocker() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Basic mobile detection
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      // simple regex for mobile (phones)
      const isMobileAgent = /android.*mobile|ipod|iphone|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      // we can also check screen size if needed, but this is a good start
      return isMobileAgent || ('ontouchstart' in window && navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
    };

    setIsMobileDevice(checkMobile());

    // Check orientation
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Check scroll
    const checkScroll = () => {
      // Threshold: Hero section is 100vh. If they scroll past halfway, trigger the overlay.
      if (window.scrollY > window.innerHeight * 0.1) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    // Initial checks
    checkOrientation();
    checkScroll();

    // Listeners
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('scroll', checkScroll, { passive: true });
    
    // Fallback for orientation change
    const handleOrientationChange = () => {
      setTimeout(checkOrientation, 100);
    };
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const shouldBlock = isMobileDevice && isPortrait && hasScrolled;

  useEffect(() => {
    if (shouldBlock) {
      document.body.style.overflow = 'hidden';
      // Attempt to natively lock orientation if supported (usually requires fullscreen)
      try {
        if ('orientation' in screen && 'lock' in screen.orientation) {
          (screen.orientation as any).lock('landscape').catch(() => {
            // Silently fail if not allowed (e.g. not in fullscreen mode)
          });
        }
      } catch (e) {
        // Ignore errors
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldBlock]);

  if (!shouldBlock) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-teal flex flex-col items-center justify-center text-white p-6 text-center shadow-2xl">
      <div className="relative mb-8">
        <Smartphone className="w-24 h-24 text-gold" strokeWidth={1} style={{ transform: 'rotate(90deg)' }} />
        {/* Animated arrow illustrating rotation */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'patternRotate 3s infinite linear' }}>
          <svg className="w-28 h-28 text-white/50 absolute" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10C72.0914 10 90 27.9086 90 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 5" />
            <path d="M90 50L85 40M90 50L95 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gold glow-gold">Mod Landskap Diperlukan</h2>
      
      <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto leading-relaxed font-body">
        Sila putarkan telefon anda secara melintang (landskap) untuk melihat kandungan peta muka ini. 
      </p>
      
      <p className="text-sm md:text-base opacity-60 mt-8 max-w-xs mx-auto">
        Kandungan interaktif ini direka khas untuk paparan skrin lebar bagi memastikan pengalaman visual yang terbaik.
      </p>

    </div>
  );
}
