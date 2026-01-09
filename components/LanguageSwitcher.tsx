'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/routing';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all"
        aria-label="Tilni o'zgartirish"
        title="Tilni o'zgartirish"
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden min-w-[150px] animate-fade-in">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={pathname}
                locale={lang.code}
                onClick={() => setIsOpen(false)}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-neutral-50 transition-colors block ${
                  locale === lang.code ? 'bg-primary-50 text-primary-600 font-medium' : 'text-neutral-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.label}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-primary-600">✓</span>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
