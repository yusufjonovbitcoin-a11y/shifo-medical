'use client';

import React, { useState, useEffect } from 'react';
import { Play, Youtube, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from './utils/useIntersectionObserver';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface VideoItem {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
}

const videos: VideoItem[] = [
  {
    title: "Диагностическая гистероскопия в Самарканде. Полип в полости матки",
    description: "Профессиональная диагностика и лечение заболеваний матки",
    youtubeId: "9W58acaBpyE"
  },
  {
    title: "ТУР аденомы ПЖ в SHIFOKOR. Лечение аденомы предстательной железы",
    description: "Современные методы лечения аденомы предстательной железы",
    youtubeId: "Q-P7zBT3ptI"
  },
  {
    title: "Медицинские услуги в SHIFOKOR",
    description: "Ознакомьтесь с нашими медицинскими услугами",
    youtubeId: "2aeOQVKMdjw"
  },
  {
    title: "Гистероскопия в Самарканде. Удаление инородного тела из полости матки ВМС",
    description: "Профессиональное удаление внутриматочной спирали и инородных тел",
    youtubeId: "y9OQP48DW_g"
  },
  {
    title: "Гистероскопия в Самарканде. Удаление лигатуры из полости матки после кесарево сечения",
    description: "Эндоскопическое удаление лигатур после кесарева сечения",
    youtubeId: "Pji6zKZZIbk"
  },
  {
    title: "Дробление камней в мочевом пузыре в Самарканде. Цистолитотрипсия",
    description: "Современный метод дробления камней в мочевом пузыре",
    youtubeId: "AbCQ0mbf7nQ"
  },
  {
    title: "Дробление камней в мочевом пузыре в Самарканде. Цистолитотрипсия",
    description: "Малоинвазивное лечение мочекаменной болезни",
    youtubeId: "vmu_mfJnxb8"
  },
  {
    title: "DALER MED-SERVIS",
    description: "Ознакомьтесь с нашими медицинскими услугами",
    youtubeId: "RSOLIKAKY58"
  },
  {
    title: "Санаторий в Самарканде. Утро в Daler Med-Servis",
    description: "Ознакомьтесь с условиями нашего санатория",
    youtubeId: "N-F7KR_wri8"
  },
  {
    title: "Санаторий в Самарканде. Daler Med-Servis крытый бассейн с джакузи, аэромассажем и гирдромассажем",
    description: "Современный бассейн с джакузи, аэромассажем и гидромассажем",
    youtubeId: "1BvhSZsy6Cg"
  }
];

export function Video() {
  const t = useTranslations();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Lock body scroll when video modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedVideo]);

  return (
    <section id="video" className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={elementRef} className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 md:mb-20 fade-in-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 animate-scale-in">
            <Youtube className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
            <span className="text-emerald-600 uppercase tracking-wide text-xs md:text-sm">{t('video.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mt-4 md:mt-6 mb-4 md:mb-6 px-4">
            {t('video.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            {t('video.description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent fade-in-on-scroll ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-video bg-gradient-to-br from-emerald-500 to-teal-600 cursor-pointer overflow-hidden"
                onClick={() => setSelectedVideo(video.youtubeId)}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal - Similar to ServicesModal */}
      {selectedVideo && (() => {
        const modalContent = (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
              aria-hidden="true"
            />
            
            {/* Modal - Full Screen */}
            <div 
              className="fixed inset-0 z-[9999] bg-white overflow-hidden flex flex-col animate-scale-in"
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-emerald-600 flex-shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Youtube className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h2 id="video-modal-title" className="text-xl md:text-2xl font-bold text-white">{t('video.title')}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
                  aria-label={t('common.close')}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              {/* Video Container */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
                <div className="relative w-full h-full max-w-6xl aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
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
      })()}
    </section>
  );
}
