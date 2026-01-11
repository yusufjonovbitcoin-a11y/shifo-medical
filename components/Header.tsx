'use client';

import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export function Header() {
  const t = useTranslations();

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
        </div>
      </div>
    </header>
  );
}
