'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Header() {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      // ScrollToTop paydo bo'lganda (scroll > 300px) badge-ni yuqoriga ko'tarish
      setScrollToTopVisible(scrollPosition > 300);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="container mx-auto px-4 py-4 md:py-6 relative z-50 animate-fade-in">
      <div className="flex items-center justify-between">
        <Logo size="medium" className="" animate={true} />
        
        {/* Badge - 24/7 AI chat xizmati - Ekran markazida, scroll qilganda yashiriladi, ScrollToTop paydo bo'lganda yuqoriga ko'tariladi */}
        <div 
          className={`fixed left-1/2 -translate-x-1/2 ${scrollToTopVisible ? 'top-16 md:top-20' : 'top-24 md:top-28'} flex items-center justify-center gap-1.5 md:gap-2 bg-red-600 px-4 md:px-[100px] py-1.5 md:py-2 rounded-full text-xs md:text-sm w-[280px] sm:w-[320px] md:w-[350px] h-[36px] md:h-[40px] cursor-pointer hover:bg-red-700 z-50 transition-all duration-300 ${
            isScrolled ? 'opacity-0 pointer-events-none translate-y-[-10px]' : 'opacity-100 pointer-events-auto translate-y-0 animate-fade-in-up'
          }`}
          onClick={() => {
            // Custom event yuborish chat-ni ochish uchun
            window.dispatchEvent(new CustomEvent('openAIChat'));
          }}
        >
          <span className="w-2 h-2 bg-red-700 rounded-full animate-pulse-slow" />
          <span className="text-white whitespace-nowrap">{t('hero.badge')}</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
