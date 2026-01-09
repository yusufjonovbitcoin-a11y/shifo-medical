'use client';

import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <header className="container mx-auto px-4 py-4 md:py-6 relative z-50 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 hover-scale">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg animate-rotate-slow">
            <span className="text-emerald-600 text-xl md:text-2xl">+</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl text-white block leading-tight">{t('header.logo')}</span>
            <span className="text-xs text-emerald-100 hidden sm:block">{t('header.subtitle')}</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { key: 'services', href: '#xizmatlar' },
            { key: 'doctors', href: '#shifokorlar' },
            { key: 'appointment', href: '#uchrashuv' },
            { key: 'contact', href: '#aloqa' },
          ].map((item) => (
              <a
              key={item.key}
              href={item.href}
                className="text-white/90 hover:text-white transition-colors duration-200 relative group"
              >
              {t(`header.nav.${item.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#uchrashuv" 
            className="hidden sm:block bg-white text-emerald-600 px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl transition-all duration-300 text-sm md:text-base font-medium active:scale-95"
          >
            {t('header.appointment')}
          </a>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Questions/FAQ Button */}
          <a
            href="#uchrashuv"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all"
            aria-label={t('header.faq')}
            title={t('header.faq')}
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Fixed position to overlay content */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-fade-in"
            aria-hidden="true"
          />
          
          {/* Mobile Menu */}
          <div className="lg:hidden fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-optimized shadow-2xl rounded-2xl overflow-hidden z-[70] animate-fade-in" style={{ contain: 'layout style paint' }}>
            <nav className="flex flex-col">
              {[
                { key: 'services', href: '#xizmatlar' },
                { key: 'doctors', href: '#shifokorlar' },
                { key: 'appointment', href: '#uchrashuv' },
                { key: 'contact', href: '#aloqa' },
              ].map((item) => (
                  <a
                  key={item.key}
                  href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 py-4 text-gray-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors border-b border-gray-100 capitalize"
                  >
                  {t(`header.nav.${item.key}`)}
                  </a>
              ))}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setFaqOpen(!faqOpen)}
                  className="w-full px-6 py-4 text-gray-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors flex items-center justify-between"
                >
                  <span className="capitalize">{t('header.faq')}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${faqOpen ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen && (
                  <div className="px-6 py-4 bg-emerald-50 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 mb-2">{t('faq.questions.0.question')}</p>
                    <p className="text-sm text-gray-600">{t('faq.questions.0.answer')}</p>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
