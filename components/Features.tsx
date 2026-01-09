'use client';

import { Microscope, Building2, Pill, Sparkles } from 'lucide-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { services } from '@/data/services';
import { useIntersectionObserver } from './utils/useIntersectionObserver';

// Lazy load modals - only load when needed (reduces initial bundle size)
const LaboratoryModal = dynamic(() => import('./LaboratoryModal').then(mod => ({ default: mod.LaboratoryModal })), { ssr: false });
const PhysiotherapyModal = dynamic(() => import('./PhysiotherapyModal').then(mod => ({ default: mod.PhysiotherapyModal })), { ssr: false });
const UltrasoundModal = dynamic(() => import('./UltrasoundModal').then(mod => ({ default: mod.UltrasoundModal })), { ssr: false });

export function Features() {
  const t = useTranslations();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);
  const [isPhysioModalOpen, setIsPhysioModalOpen] = useState(false);
  const [isUltrasoundModalOpen, setIsUltrasoundModalOpen] = useState(false);

  return (
    <section id="xizmatlar" className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50 to-white relative overflow-hidden">
      {/* Static Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={elementRef} className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 md:mb-20 fade-in-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 animate-scale-in">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse-slow" />
            <span className="text-emerald-600 uppercase tracking-wide text-xs md:text-sm">{t('features.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mt-4 md:mt-6 mb-4 md:mb-6 px-4">
            {t('features.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            {t('features.description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent relative overflow-hidden hover-lift fade-in-on-scroll ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${service.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <service.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl text-gray-900 mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100">
                  <span className={`text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                    {service.price}
                  </span>
                  <button className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 transition-all flex items-center gap-2 group/btn active:scale-95">
                    {t('features.more')}
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className={`mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          {[
            { icon: Sparkles, color: 'from-emerald-500 to-teal-600', titleKey: 'ultrasound', subtitleKey: 'ultrasoundSubtitle', onClick: () => setIsUltrasoundModalOpen(true) },
            { icon: Building2, color: 'from-teal-500 to-teal-600', titleKey: 'hospital', subtitleKey: 'hospitalSubtitle', onClick: null },
            { icon: Microscope, color: 'from-green-500 to-green-600', titleKey: 'laboratory', subtitleKey: 'laboratorySubtitle', onClick: () => setIsLabModalOpen(true) },
            { icon: Pill, color: 'from-orange-500 to-orange-600', titleKey: 'physiotherapy', subtitleKey: 'physiotherapySubtitle', onClick: () => setIsPhysioModalOpen(true) }
          ].map((item, index) => (
            <div
              key={index}
              onClick={item.onClick || undefined}
              className={`text-center transition-transform duration-300 hover-scale active:scale-95 ${item.onClick ? 'cursor-pointer' : ''}`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg transition-transform duration-300 hover:rotate-12`}>
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-sm md:text-base text-gray-900 mb-1">{t(`features.trust.${item.titleKey}`)}</p>
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
      </div>
    </section>
  );
}
