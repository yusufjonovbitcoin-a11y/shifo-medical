import { useState } from 'react';
import { User, Phone, Globe, Bell, LogOut, ChevronRight, Settings } from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export function Profile({ onLogout, onNavigate }: ProfileProps) {
  const [userData] = useState({
    name: 'Foydalanuvchi',
    phone: '+998 90 123 45 67'
  });

  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    if (confirm('Tizimdan chiqmoqchimisiz?')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center border-2 border-[#2A2A2A]">
            <User size={40} className="text-[#C1FF72]" />
          </div>
          <div>
            <h2 className="text-white mb-1">{userData.name}</h2>
            <p className="text-gray-400 text-sm">{userData.phone}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 space-y-3">
        {/* Personal Info */}
        <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2A2A2A]">
          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#252525] transition-colors">
            <div className="w-12 h-12 bg-[#0A0A0A] rounded-2xl flex items-center justify-center border border-[#2A2A2A]">
              <User size={22} className="text-[#C1FF72]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Ism</div>
              <div className="text-sm text-gray-400">{userData.name}</div>
            </div>
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          <div className="border-t border-[#2A2A2A]"></div>

          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#252525] transition-colors">
            <div className="w-12 h-12 bg-[#0A0A0A] rounded-2xl flex items-center justify-center border border-[#2A2A2A]">
              <Phone size={22} className="text-[#C1FF72]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Telefon raqam</div>
              <div className="text-sm text-gray-400">{userData.phone}</div>
            </div>
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Settings */}
        <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2A2A2A]">
          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#252525] transition-colors">
            <div className="w-12 h-12 bg-[#0A0A0A] rounded-2xl flex items-center justify-center border border-[#2A2A2A]">
              <Globe size={22} className="text-[#C1FF72]" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">Til</div>
              <div className="text-sm text-gray-400">O'zbekcha</div>
            </div>
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          <div className="border-t border-[#2A2A2A]"></div>

          <div className="w-full flex items-center gap-4 px-5 py-4">
            <div className="w-12 h-12 bg-[#0A0A0A] rounded-2xl flex items-center justify-center border border-[#2A2A2A]">
              <Bell size={22} className="text-[#C1FF72]" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">Bildirishnomalar</div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                notifications ? 'bg-[#C1FF72]' : 'bg-[#2A2A2A]'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                  notifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl px-5 py-4 flex items-center justify-center gap-3 text-[#FF5757] hover:bg-[#252525] transition-colors"
        >
          <LogOut size={24} />
          <span className="font-medium">Chiqish</span>
        </button>

        {/* App Info */}
        <div className="text-center py-6">
          <p className="text-gray-600 text-sm mb-1">Property Finder</p>
          <p className="text-gray-600 text-xs">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
