'use client';

import { useEffect, useState } from 'react';
import { Youtube, X, Play, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface VideoItem {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
}

const videoKeys = [
  'hysteroscopyPolyp',
  'turAdenoma',
  'medicalServices',
  'hysteroscopyIUD',
  'hysteroscopyLigature',
  'cystolithotripsy1',
  'cystolithotripsy2',
  'dalerMedServis',
  'sanatoriumMorning',
  'sanatoriumPool'
];

const videoIds = [
  '9W58acaBpyE',
  'Q-P7zBT3ptI',
  '2aeOQVKMdjw',
  'y9OQP48DW_g',
  'Pji6zKZZIbk',
  'AbCQ0mbf7nQ',
  'vmu_mfJnxb8',
  'RSOLIKAKY58',
  'N-F7KR_wri8',
  '1BvhSZsy6Cg'
];

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const t = useTranslations();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Get videos with translated titles and descriptions
  const videos: VideoItem[] = videoKeys.map((key, index) => ({
    title: t(`video.videos.${key}.title`),
    description: t(`video.videos.${key}.description`),
    youtubeId: videoIds[index]
  }));

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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedVideo) {
          setSelectedVideo(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, selectedVideo]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={selectedVideo ? () => setSelectedVideo(null) : onClose}
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
            onClick={selectedVideo ? () => setSelectedVideo(null) : onClose}
            className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content - Video List or Player */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 overscroll-contain">
          {selectedVideo ? (
            // Video Player
            <div className="flex items-center justify-center h-full">
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
          ) : (
            <>
              {/* First Video with SHIFOKOR-LDA Header */}
              {videos.length > 0 && (
                <div className="mb-8 md:mb-12">
                  <div className="text-center mb-6 md:mb-8">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                      SHIFOKOR-LDA
                    </h3>
                  </div>
                  <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent max-w-4xl mx-auto">
                    {/* Video Thumbnail */}
                    <div 
                      className="relative aspect-video bg-gradient-to-br from-emerald-500 to-teal-600 cursor-pointer overflow-hidden"
                      onClick={() => setSelectedVideo(videos[0].youtubeId)}
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${videos[0].youtubeId}/maxresdefault.jpg`}
                        alt={videos[0].title}
                        width={640}
                        height={360}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://img.youtube.com/vi/${videos[0].youtubeId}/hqdefault.jpg`;
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
                        {videos[0].title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">
                        {videos[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Videos Grid List */}
              {videos.length > 1 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                  {videos.slice(1).map((video, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
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
              )}

              {/* Contact Info Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-emerald-100">
                <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-4 md:mb-6 text-center">
                  {t('video.contactSection.intro')}
                </p>
                <div className="space-y-3 md:space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-gray-900 font-medium">
                      {t('video.contactSection.address')}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                        <a href="tel:+998976110604" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-medium">
                          +998 97 611 06 04
                        </a>
                        <span className="text-gray-400">;</span>
                        <a href="tel:+998662353344" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-medium">
                          +998 662 35 33 44
                        </a>
                        <span className="text-gray-400">;</span>
                        <a href="tel:+998662350713" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-medium">
                          +998 662 35 07 13
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <a href="mailto:shifokorlda@gmail.com" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-medium">
                      {t('video.contactSection.email')}
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
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
