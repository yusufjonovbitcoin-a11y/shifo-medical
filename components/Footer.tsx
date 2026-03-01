'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ServicesModal = dynamic(() => import('./ServicesModal').then(mod => ({ default: mod.ServicesModal })), { ssr: false });

// Stats Modal Component
function StatsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);

  // Load stats when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      
      // Fetch real data from API
      fetch('/api/analytics')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setVisitors(data.data.currentMonthVisitors);
            setIsSimulated(data.data.isSimulated || false);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to load analytics:', error);
          // Fallback to simulated data
          setVisitors(Math.floor(Math.random() * 5000) + 1000);
          setIsSimulated(true);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">📊 Sayt Statistikasi</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
          <p className="text-sm text-gray-600 mb-2">Bu oy tashrif buyurganlar</p>
          <p className="text-2xl font-bold text-blue-600">
            1 Aprelda ma'lumot yangilanadi
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Statistika tez orada taqdim etiladi
          </p>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          * Ma'lumotlar Google Analytics dan olinadi
        </p>
      </div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const openServiceModal = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsServicesModalOpen(true);
  };

  const handleCopyrightMouseDown = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowStatsModal(true);
    }, 1000); // 1 second long press
  };

  const handleCopyrightMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleCopyrightTouchStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      setShowStatsModal(true);
    }, 1000); // 1 second long press
  };

  const handleCopyrightTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };
  
  return (
    <footer id="aloqa" className="bg-white text-gray-900 pt-12 md:pt-20 pb-6 md:pb-8 relative overflow-hidden">
      {/* Background Pattern - using CSS instead of inline style */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} aria-hidden="true" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 xl:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12 mb-10 md:mb-16">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 md:mb-6">
              <Logo size="medium" className="" animate={true} />
              <p className="text-xs text-gray-600 mt-2 opacity-90">{t('footer.subtitle')}</p>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg" aria-label="Facebook">
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg" aria-label="Instagram">
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg" aria-label="Telegram">
                <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block text-gray-900">
              {t('footer.services')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <button onClick={() => openServiceModal('urology')} className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left">
                  {t('footer.serviceLinks.urology')}
                </button>
              </li>
              <li>
                <button onClick={() => openServiceModal('gynecology')} className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left">
                  {t('footer.serviceLinks.gynecology')}
                </button>
              </li>
              <li>
                <button onClick={() => openServiceModal('proctology')} className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left">
                  {t('footer.serviceLinks.proctology')}
                </button>
              </li>
              <li>
                <button onClick={() => openServiceModal('neurology')} className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-left">
                  {t('footer.serviceLinks.neurology')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block text-gray-900">
              {t('footer.contact')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" />
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.phone')}</p>
                  <a href="tel:+998976110604" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 block mb-1">
                    +998 97 611 06 04
                  </a>
                  <a href="tel:+998662353344" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 block mb-1">
                    +998 662 35 33 44
                  </a>
                  <a href="tel:+998662350713" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 block">
                    +998 662 35 07 13
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.email')}</p>
                  <a href="mailto:shifokorlda@gmail.com" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200">
                    shifokorlda@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.hours')}</p>
                  <p className="text-gray-900 mb-1">{t('footer.hours')}</p>
                  <p className="text-gray-700 text-xs">{t('footer.labHours')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.address')}</p>
                  <p className="text-gray-900 mb-1">{t('footer.address')}</p>
                  <p className="text-gray-700 text-xs">{t('footer.landmark')}</p>
                  <a 
                    href="https://yandex.uz/maps/-/CDRIEJYF" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 text-xs mt-1 inline-block transition-colors underline"
                  >
                    {t('footer.viewMap')}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 md:pt-10 border-t border-gray-200 text-center">
          <p 
            className="text-gray-700 text-sm md:text-base cursor-pointer select-none transition-colors hover:text-emerald-600 mb-2"
            onMouseDown={handleCopyrightMouseDown}
            onMouseUp={handleCopyrightMouseUp}
            onMouseLeave={handleCopyrightMouseUp}
            onTouchStart={handleCopyrightTouchStart}
            onTouchEnd={handleCopyrightTouchEnd}
            onTouchCancel={handleCopyrightTouchEnd}
            title="Bosib turing..."
          >
            &copy; {new Date().getFullYear()} {t('header.logo')}. {t('footer.copyright')}
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-1">
            Website developed by{' '}
            <a 
              href="https://t.me/RegistanMG" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 transition-colors underline"
            >
              @RegistanMG
            </a>
          </p>
        </div>
      </div>

      {/* Services Modal */}
      {isServicesModalOpen && (
        <ServicesModal 
          isOpen={isServicesModalOpen} 
          onClose={() => {
            setIsServicesModalOpen(false);
            setSelectedServiceId(undefined);
          }} 
          initialServiceId={selectedServiceId}
        />
      )}

      {/* Stats Modal */}
      <StatsModal isOpen={showStatsModal} onClose={() => setShowStatsModal(false)} />
    </footer>
  );
}
