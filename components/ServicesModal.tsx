'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Sparkles, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { services } from '@/data/services';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// KidneyIcon component for Urologiya service
const KidneyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left Kidney - White color for gradient background */}
    <path
      d="M25 30c-6 0-10 5-10 12c0 4 1 8 3 11.5c1.5 3 3.5 5.5 5.5 7.5c2.5 2.5 5 4 8 5c1.5.5 3 .6 4.5.6c3 0 5.5-.8 7.5-2.5c1.5-1.2 2.8-3 3.5-5c.8-2 1.2-4.5 1.2-7v-10c0-1.6-.4-3-1.2-4.5c-.8-1.4-2-2.6-3.5-3.5c-2-1.2-4.5-2-7-3c-4-1.2-8-1.8-11.5-1.8z"
      fill="white"
      stroke="white"
      strokeWidth="1"
      opacity="0.95"
    />
    
    {/* Right Kidney - White color for gradient background */}
    <path
      d="M75 30c6 0 10 5 10 12c0 4-1 8-3 11.5c-1.5 3-3.5 5.5-5.5 7.5c-2.5 2.5-5 4-8 5c-1.5.5-3 .6-4.5.6c-3 0-5.5-.8-7.5-2.5c-1.5-1.2-2.8-3-3.5-5c-.8-2-1.2-4.5-1.2-7v-10c0-1.6.4-3 1.2-4.5c.8-1.4 2-2.6 3.5-3.5c2-1.2 4.5-2 7-3c4-1.2 8-1.8 11.5-1.8z"
      fill="white"
      stroke="white"
      strokeWidth="1"
      opacity="0.95"
    />
    
    {/* Left Ureter - White color */}
    <rect 
      x="42" 
      y="44" 
      width="6" 
      height="22" 
      rx="1" 
      fill="white"
      stroke="white"
      strokeWidth="0.5"
      opacity="0.9"
    />
    
    {/* Right Ureter - White color */}
    <rect 
      x="52" 
      y="44" 
      width="6" 
      height="22" 
      rx="1" 
      fill="white"
      stroke="white"
      strokeWidth="0.5"
      opacity="0.9"
    />
    
    {/* Left Kidney Inner Shadow - Lighter white for depth */}
    <ellipse
      cx="35"
      cy="45"
      rx="8"
      ry="10"
      fill="white"
      opacity="0.3"
    />
    
    {/* Right Kidney Inner Shadow - Lighter white for depth */}
    <ellipse
      cx="65"
      cy="45"
      rx="8"
      ry="10"
      fill="white"
      opacity="0.3"
    />
    
    {/* Left Kidney Highlight - Brighter white */}
    <ellipse
      cx="28"
      cy="38"
      rx="4"
      ry="6"
      fill="white"
      opacity="0.6"
    />
    
    {/* Right Kidney Highlight - Brighter white */}
    <ellipse
      cx="72"
      cy="38"
      rx="4"
      ry="6"
      fill="white"
      opacity="0.6"
    />
  </svg>
);

export function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const t = useTranslations();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        aria-hidden="true"
      />
      
      {/* Modal - Full Screen */}
      <div 
        className="fixed inset-0 z-[9999] bg-white overflow-hidden flex flex-col animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">{t('servicesModal.title')}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 overscroll-contain">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => {
              const isExpanded = expandedCard === index;
              const hasServices = service.servicesList && service.servicesList.length > 0;
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl md:rounded-2xl border transition-all fade-in-on-scroll visible ${
                    isExpanded 
                      ? 'border-blue-300 shadow-xl col-span-full' 
                      : 'border-gray-100 hover:shadow-lg hover:border-transparent'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Header - Clickable */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : index)}
                    className="w-full text-left p-4 md:p-6"
                    disabled={!hasServices}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                          {service.title === "Урология" ? (
                            <KidneyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.title === "Гинекология" ? (
                            <svg 
                              className="w-7 h-7 md:w-8 md:h-8 text-white" 
                              viewBox="0 0 100 100" 
                              fill="white" 
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ display: 'block' }}
                            >
                              {/* Uterus body */}
                              <path d="M50 15 L38 25 L38 60 C38 72, 44 78, 50 78 C56 78, 62 72, 62 60 L62 25 Z" 
                                    fill="white"/>
                              {/* Fallopian tubes (left) */}
                              <line x1="38" y1="38" x2="20" y2="45" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                              {/* Fallopian tubes (right) */}
                              <line x1="62" y1="38" x2="80" y2="45" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                              {/* Ovaries (left) */}
                              <circle cx="20" cy="48" r="6" fill="white"/>
                              {/* Ovaries (right) */}
                              <circle cx="80" cy="48" r="6" fill="white"/>
                              {/* Cervix */}
                              <rect x="45" y="78" width="10" height="12" rx="2" fill="white"/>
                            </svg>
                          ) : (
                            <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">{service.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 leading-relaxed">{service.description}</p>
                          {!isExpanded && hasServices && (
                            <div className="flex items-center justify-end pt-3 md:pt-4 border-t border-gray-100">
                                <span className="text-xs text-gray-500">{t('servicesModal.more')} →</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {hasServices && (
                        <div className="flex-shrink-0">
                          <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      )}
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && hasServices && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100 pt-4 md:pt-6">
                      <div className="mb-4">
                        <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3">{t('servicesModal.servicesList')}</h4>
                        <ul className="space-y-2 md:space-y-2.5">
                          {service.servicesList!.map((serviceItem, idx) => {
                            const hasDetails = service.details && service.details[serviceItem];
                            const isServiceExpanded = expandedService === serviceItem;
                            
                            return (
                              <li key={idx} className="border border-gray-200 rounded-lg md:rounded-xl overflow-hidden">
                                {hasDetails ? (
                                  <>
                                    <button
                                      onClick={() => setExpandedService(isServiceExpanded ? null : serviceItem)}
                                      className="w-full text-left flex items-start gap-2.5 md:gap-3 p-3 md:p-4 hover:bg-gray-50 transition-colors"
                                    >
                                      <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0 transition-transform ${isServiceExpanded ? 'rotate-90' : ''}`} />
                                      <span className={`w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-br ${service.gradient} rounded-full mt-1.5 md:mt-2 flex-shrink-0`} />
                                      <span className="flex-1 text-xs md:text-sm text-gray-900 font-medium">{serviceItem}</span>
                                    </button>
                                    {isServiceExpanded && (
                                      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0 bg-gray-50 border-t border-gray-200">
                                        {typeof service.details![serviceItem] === 'string' ? (
                                          <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                            {service.details![serviceItem] as string}
                                          </p>
                                        ) : (
                                          <>
                                            {/* Images at the top */}
                                            {(service.details![serviceItem] as { text: string; images?: string[] }).images && 
                                             (service.details![serviceItem] as { text: string; images?: string[] }).images!.length > 0 && (
                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                                                {(service.details![serviceItem] as { text: string; images?: string[] }).images!.map((img, imgIdx) => (
                                                  <div key={imgIdx} className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                                                    <Image
                                                      src={img}
                                                      alt={`${serviceItem} - ${imgIdx + 1}`}
                                                      fill
                                                      className="object-cover"
                                                      sizes="(max-width: 640px) 100vw, 50vw"
                                                      unoptimized
                                                      onError={(e) => {
                                                        console.error('Image load error:', img);
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        const parent = target.parentElement;
                                                        if (parent) {
                                                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs p-4 text-center">Surat topilmadi<br/>Path: ${img}<br/>Fayl nomini tekshiring</div>`;
                                                        }
                                                      }}
                                                      onLoad={() => {
                                                        console.log('Image loaded successfully:', img);
                                                      }}
                                                    />
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                            {/* Text below images */}
                                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                              {(service.details![serviceItem] as { text: string; images?: string[]; video?: string }).text}
                                            </p>
                                            {/* Video below text */}
                                            {(service.details![serviceItem] as { text: string; images?: string[]; video?: string }).video && (
                                              <div className="mt-4">
                                                <div className="relative aspect-video rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                                                  <iframe
                                                    src={`https://www.youtube.com/embed/${(service.details![serviceItem] as { text: string; images?: string[]; video?: string }).video!.split('/').pop()?.split('?')[0]}`}
                                                    title={`${serviceItem} video`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="absolute inset-0 w-full h-full"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div className="flex items-start gap-2.5 md:gap-3 p-3 md:p-4">
                                    <span className={`w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-br ${service.gradient} rounded-full mt-1.5 md:mt-2 flex-shrink-0`} />
                                    <span className="flex-1 text-xs md:text-sm text-gray-700 leading-relaxed">{serviceItem}</span>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="flex items-center justify-end pt-3 md:pt-4 border-t border-gray-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {t('common.close')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  // Render modal using portal to document.body
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}

