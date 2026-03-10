import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, MapPin, Car } from 'lucide-react';
import MastautinSection from './MastautinSection';
import MukimSection from './MukimSection';
import MusafirSection from './MusafirSection';

gsap.registerPlugin(ScrollTrigger);

interface MimCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
  isActive: boolean;
  onClick: () => void;
}

function MimCard({ id, icon, title, subtitle, description, delay, isActive, onClick }: MimCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#tiga-mim-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      id={`tab-${id}`}
      onClick={onClick}
      className={`tab-card relative bg-white rounded-2xl shadow-card transition-all duration-400 cursor-pointer overflow-hidden ${isActive ? 'ring-2 ring-teal shadow-glow-teal' : 'hover:-translate-y-2 hover:shadow-card-hover'
        }`}
    >
      <div className="tab-card-content p-8 sm:p-10 landscape:p-5 flex flex-col items-center justify-center h-full">
        {/* Icon */}
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? 'scale-110' : ''}`}>
          {icon}
        </div>

        {/* Text Content */}
        <div className="text-center w-full">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2">
            {title}
          </h3>
          <p className="text-gold font-medium italic mb-4 text-sm sm:text-base">{subtitle}</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Active Indicator Layer */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-teal transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
}

export default function TigaMimSection() {
  const [activeTab, setActiveTab] = useState<number>(-1);

  const cards = [
    {
      id: 'mastautin',
      icon: <Home className="w-7 h-7 sm:w-8 sm:h-8 text-white" />,
      title: 'MASTAUTIN',
      subtitle: 'Tempat Tinggal Tetap',
      description: 'Kediaman kekal seseorang yang menjadi pusat kehidupan seharian.',
      delay: 0.2,
    },
    {
      id: 'mukim',
      icon: <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-white" />,
      title: 'MUKIM',
      subtitle: 'Menetap Sementara',
      description: 'Tinggal di sesuatu tempat lebih dari tiga hari tanpa niat menetap kekal.',
      delay: 0.35,
    },
    {
      id: 'musafir',
      icon: <Car className="w-7 h-7 sm:w-8 sm:h-8 text-white" />,
      title: 'MUSAFIR',
      subtitle: 'Dalam Perjalanan',
      description: 'Seseorang yang melakukan perjalanan melebihi 81 kilometer.',
      delay: 0.5,
    },
  ];

  // Optional: Update activeTab based on standard vertical scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-mastautin', 'section-mukim', 'section-musafir'];
      let currentIdx = -1;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentIdx = i;
            break;
          }
        }
      }
      setActiveTab(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const sectionIds = ['section-mastautin', 'section-mukim', 'section-musafir'];
    const element = document.getElementById(sectionIds[index]);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="tiga-mim-container" className="relative w-full bg-[#f0faf7]">
      <div className="relative w-full min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 landscape:py-8">
        {/* Header Title */}
        <div className="w-full text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-teal mb-4">
            3 MIM
          </h2>
          <p className="text-xl text-gray-600 font-display">
            Tiga Kategori Perjalanan
          </p>
          <div className="flex justify-center mt-6">
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>
        </div>

        {/* Cards Container */}
        <div className="mt-16 landscape:mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 landscape:gap-4 perspective-1000" style={{ perspective: '1000px' }}>
          {cards.map((card, index) => (
            <MimCard
              key={card.id}
              {...card}
              isActive={activeTab === index}
              onClick={() => handleTabClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Vertical Sections */}
      <div className="flex flex-col w-full">
        <div id="section-mastautin" className="w-full relative">
          <MastautinSection />
        </div>
        <div id="section-mukim" className="w-full relative">
          <MukimSection />
        </div>
        <div id="section-musafir" className="w-full relative">
          <MusafirSection />
        </div>
      </div>
    </div>
  );
}
