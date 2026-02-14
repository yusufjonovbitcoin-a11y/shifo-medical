'use client';

import { Microscope, Building2, Pill, Sparkles, Shield, Hand, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
    <section id="xizmatlar" className="pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-emerald-50 to-white relative overflow-hidden">
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
              <div className={`${item.titleKey === 'ultrasound' ? 'w-16 h-16 md:w-20 md:h-[75px]' : 'w-12 h-12 md:w-16 md:h-16'} ${item.titleKey === 'ultrasound' ? 'bg-transparent' : `bg-gradient-to-br ${item.color}`} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 ${item.titleKey === 'ultrasound' ? '' : 'shadow-lg'} transition-transform duration-300 hover:rotate-12 overflow-hidden`}>
                {item.titleKey === 'ultrasound' ? (
                  <Image src="/icon/uzi1.png.png" alt="UZI" width={96} height={96} className="w-16 h-16 md:w-20 md:h-[75px] object-contain" />
                ) : item.icon !== 'injection' ? (
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                ) : null}
              </div>
              <p className={`text-sm md:text-base text-gray-900 mb-1 font-semibold ${item.titleKey === 'massage' ? 'mt-3 md:mt-4' : 'mt-2 md:mt-3'}`}>{t(`features.trust.${item.titleKey}`)}</p>
              <p className={`text-xs md:text-sm text-gray-600 ${item.titleKey !== 'ultrasound' ? 'mt-0' : ''}`}>{t(`features.trust.${item.subtitleKey}`)}</p>
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
