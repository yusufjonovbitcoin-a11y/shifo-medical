'use client';

import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Header() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <header className="container mx-auto px-4 py-4 md:py-6 relative z-50 animate-fade-in">
      <div className="flex items-center justify-between">
        <Logo size="medium" className="" animate={true} />
        
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
          {/* Language Switcher */}
          <LanguageSwitcher />
          
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
            <div className="flex items-center justify-center p-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 active:scale-95 transition-all shadow-lg"
                aria-label="Profil"
                title="Profil"
              >
                <User size={28} />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
