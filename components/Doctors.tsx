'use client';

import { Award, Clock, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from './utils/useIntersectionObserver';
import { doctorsData } from '@/data/doctors';

export function Doctors() {
  const t = useTranslations();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const formatSchedule = (schedule: typeof doctorsData[0]['schedule']) => {
    if (schedule.daily && schedule.from && schedule.to) {
      return t('common.schedule.daily', { from: schedule.from, to: schedule.to });
    } else if (schedule.from && schedule.to) {
      return t('common.schedule.range', { from: schedule.from, to: schedule.to });
    }
    return '';
  };

  const formatDays = (days?: string[]) => {
    if (!days || days.length === 0) return null;
    return days.map(day => t(`common.days.${day}`)).join(', ');
  };

  return (
    <section id="shifokorlar" className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={elementRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-20 fade-in-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 animate-scale-in">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse-slow" />
            <span className="text-emerald-600 uppercase tracking-wide text-xs md:text-sm">{t('doctors.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mt-4 md:mt-6 mb-4 md:mb-6 px-4 font-bold">
            {t('doctors.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            {t('doctors.description')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {doctorsData.map((doctor, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent relative overflow-hidden hover-lift fade-in-on-scroll ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${doctor.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${doctor.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Doctor Info */}
                <h3 className="text-lg md:text-xl text-gray-900 mb-2 md:mb-3 font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                  {doctor.name}
                </h3>
                
                <p className={`text-sm md:text-base font-medium mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r ${doctor.gradient}`}>
                  {t(`doctors.specialties.${doctor.specialtyKey}`)}
                </p>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Award className={`w-4 h-4 md:w-5 md:h-5 text-transparent bg-clip-text bg-gradient-to-r ${doctor.gradient} flex-shrink-0`} />
                  <span className="text-xs md:text-sm text-gray-600">{t('common.experienceYears', { years: doctor.experienceYears })}</span>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-2 pt-3 md:pt-4 border-t border-gray-100">
                  <Clock className={`w-4 h-4 md:w-5 md:h-5 text-transparent bg-clip-text bg-gradient-to-r ${doctor.gradient} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-gray-600">
                      {formatSchedule(doctor.schedule)}
                    </p>
                    {doctor.schedule.days && formatDays(doctor.schedule.days) && (
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDays(doctor.schedule.days)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}














