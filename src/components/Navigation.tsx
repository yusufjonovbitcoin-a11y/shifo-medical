import { Home, Search, Heart, User, MessageSquare } from 'lucide-react';

type Screen = 'home' | 'ai-chat' | 'search' | 'favorites' | 'profile';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { id: 'home' as Screen, icon: Home },
  { id: 'search' as Screen, icon: Search },
  { id: 'ai-chat' as Screen, icon: MessageSquare },
  { id: 'favorites' as Screen, icon: Heart },
  { id: 'profile' as Screen, icon: User }
];

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#2A2A2A] px-2 py-3 safe-area-inset-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                isActive 
                  ? 'bg-[#C1FF72] text-[#0A0A0A]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
