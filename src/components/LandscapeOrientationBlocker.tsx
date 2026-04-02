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

      <button 
        onClick={async () => {
          try {
            if (document.documentElement.requestFullscreen) {
              await document.documentElement.requestFullscreen();
            }
            // Wait a tiny bit for fullscreen to settle before locking
            setTimeout(async () => {
              if ('orientation' in screen && 'lock' in screen.orientation) {
                await (screen.orientation as any).lock('landscape').catch((err: any) => console.warn('Orientation lock failed:', err));
              }
              
              // Force Auto-Scaling Viewport for Landscape Immersion (Option 2)
              const metaViewport = document.querySelector('meta[name=viewport]');
              if (metaViewport) {
                const sw = window.screen.width;
                const sh = window.screen.height;
                const aspect = Math.max(sw, sh) / Math.min(sw, sh);
                const targetLogicalHeight = 650;
                const logicalWidth = Math.max(1280, Math.round(targetLogicalHeight * aspect));
                metaViewport.setAttribute('content', `width=${logicalWidth}, user-scalable=no`);
              }

              // Trigger animation explicitly
              window.dispatchEvent(new Event('trigger-preloader'));

            }, 100);
          } catch (e) { 
            console.error('Fullscreen failed:', e); 
            window.dispatchEvent(new Event('trigger-preloader')); // Trigger anyway as fallback
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
          marginTop: '2rem'
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
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
        MAINKAN ANIMASI
      </button>

      <button 
        onClick={async () => {
          try {
            // Try to lock orientation to landscape WITHOUT fullscreen
            if ('orientation' in screen && 'lock' in screen.orientation) {
              await (screen.orientation as any).lock('landscape').catch(() => {});
            }
            // Adjust viewport for landscape
            const metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport) {
              const sw = window.screen.width;
              const sh = window.screen.height;
              const aspect = Math.max(sw, sh) / Math.min(sw, sh);
              const targetLogicalHeight = 650;
              const logicalWidth = Math.max(1280, Math.round(targetLogicalHeight * aspect));
              metaViewport.setAttribute('content', `width=${logicalWidth}, user-scalable=no`);
            }
          } catch (e) { 
            // Orientation lock may not be supported without fullscreen on some browsers
            console.warn('Orientation lock failed:', e); 
          }
        }}
        className="mt-4 px-6 py-2 bg-transparent border border-white/20 hover:bg-white/10 text-white/80 font-medium rounded-full transition-colors flex items-center gap-2 text-sm"
      >
        <Smartphone className="w-4 h-4" />
        Putar Skrin
      </button>
    </div>
  );
}
