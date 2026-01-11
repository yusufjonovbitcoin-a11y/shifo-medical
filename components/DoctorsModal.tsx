'use client';

import { X, Award, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { doctorsData } from '@/data/doctors';

interface DoctorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DoctorsModal({ isOpen, onClose }: DoctorsModalProps) {
  const t = useTranslations();
  const locale = useLocale();
  // Lock body scroll when modal is open
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

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] bg-white overflow-hidden flex flex-col animate-scale-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-teal-600 flex-shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">{t('modals.doctors.title')}</h2>
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
          {doctorsData.map((doctor, index) => {
            // Format schedule text
            let scheduleText = '';
            if (doctor.schedule.daily) {
              scheduleText = t('common.schedule.daily', {
                from: doctor.schedule.from || '',
                to: doctor.schedule.to || ''
              });
            } else {
              scheduleText = t('common.schedule.range', {
                from: doctor.schedule.from || '',
                to: doctor.schedule.to || ''
              });
            }
            
            // Format days text
            let daysText = '';
            if (doctor.schedule.days && doctor.schedule.days.length > 0) {
              daysText = doctor.schedule.days.map(dayKey => t(`common.days.${dayKey}` as any)).join(', ');
            }

            // Get specialty translation
            const specialty = t(`doctors.specialties.${doctor.specialtyKey}` as any);
            
            // Format experience text
            const experienceText = t('common.experienceYears', { years: doctor.experienceYears });

            // Get doctor name based on locale
            const doctorName = locale === 'ru' ? doctor.nameRu : doctor.nameUz;

            return (
              <div
                key={index}
                className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-all hover:border-transparent relative overflow-hidden fade-in-on-scroll visible"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${doctor.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Photo or Icon */}
                  {doctor.image ? (
                    <div className="w-56 h-56 md:w-64 md:h-64 rounded-xl md:rounded-2xl overflow-hidden mb-4 shadow-md transition-transform duration-300 group-hover:scale-110 relative border-2 border-transparent group-hover:border-emerald-400 mx-auto">
                      <Image
                        src={doctor.image}
                        alt={doctorName}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 224px, 256px"
                      />
                    </div>
                  ) : (
                    <div className={`w-56 h-56 md:w-64 md:h-64 bg-gradient-to-br ${doctor.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110 mx-auto`}>
                      <Award className="w-24 h-24 md:w-28 md:h-28 text-white" />
                    </div>
                  )}

                  {/* Doctor Info */}
                  <h3 className="text-base md:text-lg text-gray-900 mb-2 font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                    {doctorName}
                  </h3>
                  
                  <p className="text-sm md:text-base font-medium mb-3 text-emerald-600">
                    {specialty}
                  </p>

                  {/* Experience */}
                  <div className="flex items-center gap-2 mb-3">
                    <Award className={`w-4 h-4 md:w-5 md:h-5 text-transparent bg-clip-text bg-gradient-to-r ${doctor.gradient} flex-shrink-0`} />
                    <span className="text-xs md:text-sm text-gray-600">{experienceText}</span>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-2 pt-3 border-t border-gray-100">
                    <Clock className={`w-4 h-4 md:w-5 md:h-5 text-transparent bg-clip-text bg-gradient-to-r ${doctor.gradient} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-gray-600">
                        {scheduleText}
                      </p>
                      {daysText && (
                        <p className="text-xs text-gray-500 mt-1">
                          {daysText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
