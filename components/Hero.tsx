'use client';

import { Phone, Clock, MapPin, Home, Users, Building2, Video, Images, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { services } from '@/data/services';

// Lazy load modal - only load when user clicks
const ServicesModal = dynamic(() => import('./ServicesModal').then(mod => ({ default: mod.ServicesModal })), { ssr: false });

export function Hero() {
  const t = useTranslations();
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  return (
    <section className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 overflow-hidden">
      {/* Static Background Elements - replaced animated ones with CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-60 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 text-sm md:text-base animate-fade-in-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
              <span className="text-white">{t('hero.badge')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t('hero.title')} - <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-200 animate-gradient">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-100 mb-8 md:mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-10 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => setIsServicesModalOpen(true)}
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 text-center text-sm md:text-base font-medium active:scale-95"
              >
                {t('hero.services')}
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {[
                { number: '50+', key: 'operations' },
                { number: '15+', key: 'doctors' },
                { number: '20+', key: 'experience' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center hover-scale transition-transform"
                >
                  <div className="text-2xl md:text-3xl text-white mb-1 font-bold">
                    {stat.number}
                  </div>
                  <div className="text-emerald-100 text-xs md:text-sm">{t(`hero.stats.${stat.key}`)}</div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {[
                { icon: Phone, key: 'phone' },
                { icon: Clock, key: 'hours' },
                { icon: MapPin, key: 'address' }
              ].map((contact, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 transition-all duration-300 hover:bg-white/20 active:scale-95"
                >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <contact.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                    <div>
                        <p className="text-xs text-emerald-100">{t(`hero.contact.${contact.key}`)}</p>
                        <p className="text-white text-xs md:text-sm font-medium">{t(`hero.${contact.key}`)}</p>
                    </div>
                  </div>
                  </div>
              ))}
            </div>
          </div>
          
          <div className="relative order-first lg:order-last animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Russian Menu Items - Above Image */}
            <div className="mb-3 md:mb-4">
              <nav className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4 flex-wrap">
                  {[
                  { key: 'home', icon: Home, href: '/', onClick: null },
                  { key: 'doctors', icon: Users, href: '#shifokorlar', onClick: null },
                  { key: 'departments', icon: Building2, href: '#xizmatlar', onClick: () => setIsServicesModalOpen(true) },
                  { key: 'video', icon: Video, href: '#video', onClick: null },
                  { key: 'gallery', icon: Images, href: '#galereya', onClick: null },
                  { key: 'reviews', icon: Star, href: '#tavsiyalar', onClick: null },
                  { key: 'contact', icon: Phone, href: '#aloqa', onClick: null }
                ].map((item) => (
                  item.onClick ? (
                    <button
                      key={item.key}
                      onClick={item.onClick}
                      className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-900 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 md:gap-2 shadow-lg group/item"
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 group-hover/item:scale-110 transition-transform" />
                      <span className="text-xs md:text-sm font-medium whitespace-nowrap">{t(`hero.menu.${item.key}`)}</span>
                    </button>
                  ) : (
                    <a
                      key={item.key}
                      href={item.href}
                      className="bg-white/95 backdrop-blur-sm hover:bg-white text-gray-900 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 md:gap-2 shadow-lg group/item"
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 group-hover/item:scale-110 transition-transform" />
                      <span className="text-xs md:text-sm font-medium whitespace-nowrap">{t(`hero.menu.${item.key}`)}</span>
                    </a>
                  )
                ))}
              </nav>
            </div>
            
            <div className="relative z-10">
              <div className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover-scale transition-transform gpu-accelerate relative group">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
                  alt="Klinika interyeri"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl animate-float">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl md:text-3xl text-white">✓</span>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl text-gray-900 font-bold">
                      98%
                    </p>
                    <p className="text-sm md:text-base text-gray-600">{t('hero.stats.successRate')}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-30" />
            <div className="absolute -bottom-10 right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
          <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
        </svg>
      </div>

      {/* Services Modal - conditionally rendered for better performance */}
      {isServicesModalOpen && (
        <ServicesModal isOpen={isServicesModalOpen} onClose={() => setIsServicesModalOpen(false)} />
      )}
    </section>
  );
}
