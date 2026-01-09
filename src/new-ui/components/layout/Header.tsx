'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { cn } from '@/src/new-ui/utils/cn';

export interface HeaderProps {
  logo?: React.ReactNode;
  navigation?: Array<{ label: string; href: string }>;
  ctaText?: string;
  ctaHref?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navigation = [
    { label: 'Услуги', href: '#services' },
    { label: 'Врачи', href: '#doctors' },
    { label: 'О нас', href: '#about' },
    { label: 'Контакты', href: '#contact' },
  ],
  ctaText = 'Записаться',
  ctaHref = '#appointment',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {logo || (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <span className="text-xl font-bold text-neutral-900">SHIFOKOR-LDA</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link href={ctaHref}>
              <Button
                variant="primary"
                size="md"
                className="hidden md:inline-flex"
              >
                {ctaText}
              </Button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <Container padding={false}>
            <nav className="flex flex-col py-4 gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <Link href={ctaHref} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" fullWidth>
                    {ctaText}
                  </Button>
                </Link>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};


