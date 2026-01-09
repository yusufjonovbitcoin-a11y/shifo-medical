import { useState } from 'react';
import { Home, Mic, MapPin, ChevronRight, Sparkles } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const screens = [
  {
    icon: Sparkles,
    title: 'AI yordamida uy toping',
    text: 'Siz xohlagan uylarni sun\'iy intellekt tez va aniq topib beradi',
  },
  {
    icon: Mic,
    title: 'Ovoz bilan qidiring',
    text: 'Gapiring, AI sizga mos uylarni taklif qiladi',
  },
  {
    icon: MapPin,
    title: 'Xarita orqali tanlang',
    text: 'Uylarni joylashuv bo\'yicha ko\'ring va solishtiring',
  }
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentScreen = screens[currentIndex];
  const Icon = currentScreen.icon;

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex flex-col">
      {/* Animated Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C1FF72]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C1FF72]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-6 py-12">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
          {/* Icon */}
          <div className="relative mb-12 animate-scale-in">
            <div className="w-40 h-40 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#2A2A2A]">
              <Icon size={80} className="text-[#C1FF72]" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-center mb-6 text-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {currentScreen.title}
          </h1>

          <p className="text-center text-gray-400 mb-12 max-w-sm text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {currentScreen.text}
          </p>

          {/* Progress Indicators */}
          <div className="flex gap-2 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {screens.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-12 bg-[#C1FF72]' 
                    : 'w-2 bg-[#2A2A2A]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleNext}
          className="w-full max-w-md bg-[#C1FF72] text-[#0A0A0A] py-5 rounded-2xl flex items-center justify-center gap-2 shadow-2xl hover:bg-[#B0EE61] transition-all duration-300 animate-slide-up font-bold text-lg"
        >
          <span>
            {currentIndex === screens.length - 1 ? 'Boshlash' : 'Keyingisi'}
          </span>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
