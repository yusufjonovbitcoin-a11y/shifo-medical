'use client';

import { Microscope, Building2, Pill, Sparkles, Shield, Hand, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from './utils/useIntersectionObserver';

// Lazy load modals - only load when needed (reduces initial bundle size)
const LaboratoryModal = dynamic(() => import('./LaboratoryModal').then(mod => ({ default: mod.LaboratoryModal })), { ssr: false });
const PhysiotherapyModal = dynamic(() => import('./PhysiotherapyModal').then(mod => ({ default: mod.PhysiotherapyModal })), { ssr: false });
const UltrasoundModal = dynamic(() => import('./UltrasoundModal').then(mod => ({ default: mod.UltrasoundModal })), { ssr: false });
const MassageModal = dynamic(() => import('./MassageModal').then(mod => ({ default: mod.MassageModal })), { ssr: false });

// Type for feature items
type FeatureItem = {
  icon: LucideIcon | 'injection';
  color: string;
  titleKey: string;
  subtitleKey: string;
  onClick?: () => void; // Optional onClick handler
};

export function Features() {
  const t = useTranslations();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [isPhysioModalOpen, setIsPhysioModalOpen] = useState(false);
  const [isUltrasoundModalOpen, setIsUltrasoundModalOpen] = useState(false);
  const [isMassageModalOpen, setIsMassageModalOpen] = useState(false);

  // Trust cards data with optional onClick
  const trustCards: FeatureItem[] = [
    { icon: 'injection' as const, color: 'from-emerald-500 to-teal-600', titleKey: 'ultrasound', subtitleKey: 'ultrasoundSubtitle', onClick: () => setIsUltrasoundModalOpen(true) },
    { icon: Hand, color: 'from-purple-500 to-pink-600', titleKey: 'massage', subtitleKey: 'massageSubtitle', onClick: () => setIsMassageModalOpen(true) },
    { icon: Microscope, color: 'from-green-500 to-green-600', titleKey: 'laboratory', subtitleKey: 'laboratorySubtitle', onClick: () => setIsLabModalOpen(true) },
    { icon: Pill, color: 'from-orange-500 to-orange-600', titleKey: 'physiotherapy', subtitleKey: 'physiotherapySubtitle', onClick: () => setIsPhysioModalOpen(true) }
  ];

  return (
    <section id="xizmatlar" className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50 to-white relative overflow-hidden">
      {/* Static Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={elementRef} className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-12 md:mb-16 fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 md:px-5 py-2 md:py-2.5 rounded-full mb-4 md:mb-6">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse-slow" />
            <span className="text-emerald-700 uppercase tracking-wide text-xs md:text-sm font-semibold">
              {t('features.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold mb-4 md:mb-6 leading-tight">
            {t('features.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8">
            {t('features.mainDescription')}
          </p>
        </div>

        {/* Key Features - Text Only */}
        <div className={`mb-12 md:mb-16 space-y-6 md:space-y-8 fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className={`text-center max-w-4xl mx-auto fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '250ms' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {t('features.keyFeatures.diagnosis')}
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {t('features.keyFeatures.diagnosisDesc')}
            </p>
          </div>

          <div className={`text-center max-w-4xl mx-auto fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '350ms' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {t('features.keyFeatures.specialists')}
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {t('features.keyFeatures.specialistsDesc')}
            </p>
          </div>

          <div className={`text-center max-w-4xl mx-auto fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '450ms' }}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {t('features.keyFeatures.care')}
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {t('features.keyFeatures.careDesc')}
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className={`mb-12 md:mb-16 text-center fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl md:rounded-3xl p-8 md:p-12 border border-emerald-100">
            <Shield className="w-12 h-12 md:w-16 md:h-16 text-emerald-600 mx-auto mb-4 md:mb-6" strokeWidth="2" />
            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-4xl mx-auto font-medium">
              {t('features.closingStatement')}
            </p>
          </div>
        </div>

        {/* Trust Cards Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '700ms' }}>
          {trustCards.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className="text-center cursor-pointer transition-transform duration-300 hover-scale active:scale-95"
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg transition-transform duration-300 hover:rotate-12`}>
                {item.titleKey === 'ultrasound' ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    {/* Ultratovush sensor (probe) */}
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 2.5 1.2 4.7 3.1 6.1L8 18c0 1.1 0.9 2 2 2h4c1.1 0 2-0.9 2-2v-2.9c1.9-1.4 3.1-3.6 3.1-6.1 0-3.87-3.13-7-7-7zm0 10c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                    {/* Ultratovush to'lqinlari (ultrasound waves) */}
                    <path
                      d="M3 12C3 12 5 14 7 14C9 14 11 12 12 12C13 12 15 14 17 14C19 14 21 12 21 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M4 15C4 15 5.5 16.5 7 16.5C8.5 16.5 10 15 11.5 15C13 15 14.5 16.5 16 16.5C17.5 16.5 19 15 20 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    <path
                      d="M5 18C5 18 6 19 7 19C8 19 9 18 10 18C11 18 12 19 13 19C14 19 15 18 19 18"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity="0.6"
                    />
                    {/* Markazda nuqta (sensor markazi) */}
                    <circle cx="12" cy="9" r="1.5" fill="currentColor" opacity="0.9" />
                  </svg>
                ) : item.icon !== 'injection' ? (
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                ) : null}
              </div>
              <p className="text-sm md:text-base text-gray-900 mb-1 font-semibold">{t(`features.trust.${item.titleKey}`)}</p>
              <p className="text-xs md:text-sm text-gray-600">{t(`features.trust.${item.subtitleKey}`)}</p>
            </div>
          ))}
        </div>

        {/* Laboratory Modal */}
        <LaboratoryModal isOpen={isLabModalOpen} onClose={() => setIsLabModalOpen(false)} />
        
        {/* Physiotherapy Modal */}
        <PhysiotherapyModal isOpen={isPhysioModalOpen} onClose={() => setIsPhysioModalOpen(false)} />
        
        {/* Ultrasound Modal */}
        <UltrasoundModal isOpen={isUltrasoundModalOpen} onClose={() => setIsUltrasoundModalOpen(false)} />
        
        {/* Massage Modal */}
        <MassageModal isOpen={isMassageModalOpen} onClose={() => setIsMassageModalOpen(false)} />
      </div>
    </section>
  );
}
