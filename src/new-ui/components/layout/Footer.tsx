'use client';

import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react';
import { Container } from '../ui/Container';
import { Text } from '../ui/Text';
import { Heading } from '../ui/Heading';

export interface FooterProps {
  companyName?: string;
  description?: string;
  links?: {
    quick?: Array<{ label: string; href: string }>;
    services?: Array<{ label: string; href: string }>;
  };
  contact?: {
    phone?: string[];
    email?: string;
    address?: string;
    hours?: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
  };
}

export const Footer: React.FC<FooterProps> = ({
  companyName = 'SHIFOKOR-LDA',
  description = 'Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.',
  links = {
    quick: [
      { label: 'Услуги', href: '#services' },
      { label: 'Врачи', href: '#doctors' },
      { label: 'О нас', href: '#about' },
      { label: 'Контакты', href: '#contact' },
    ],
    services: [
      { label: 'Урология', href: '#services' },
      { label: 'Гинекология', href: '#services' },
      { label: 'Проктология', href: '#services' },
      { label: 'Неврология', href: '#services' },
    ],
  },
  contact = {
    phone: ['+998 97 611 06 04', '+998 662 35 33 44'],
    email: 'info@shifokor.uz',
    address: 'г. Самарканд, улица Термезская 67А',
    hours: 'Понедельник - Суббота: 09:00 - 16:30',
  },
  social = {
    facebook: '#',
    instagram: '#',
    telegram: '#',
  },
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <Heading as="h3" variant="default" className="text-white text-lg">
                {companyName}
              </Heading>
            </div>
            <Text variant="small" color="muted" className="text-neutral-400 mb-6">
              {description}
            </Text>
            <div className="flex gap-3">
              {social.facebook && (
                <a
                  href={social.facebook}
                  className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
              {social.telegram && (
                <a
                  href={social.telegram}
                  className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Heading as="h4" variant="default" className="text-white mb-4 text-lg">
              Быстрые ссылки
            </Heading>
            <ul className="space-y-2">
              {links.quick?.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <Heading as="h4" variant="default" className="text-white mb-4 text-lg">
              Услуги
            </Heading>
            <ul className="space-y-2">
              {links.services?.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <Heading as="h4" variant="default" className="text-white mb-4 text-lg">
              Контакты
            </Heading>
            <ul className="space-y-4">
              {contact.phone && (
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    {contact.phone.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
              )}
              {contact.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.hours && (
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <Text variant="small" color="muted" className="text-neutral-400 text-sm">
                    {contact.hours}
                  </Text>
                </li>
              )}
              {contact.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <Text variant="small" color="muted" className="text-neutral-400 text-sm">
                    {contact.address}
                  </Text>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 py-6">
          <Text variant="small" color="muted" align="center" className="text-neutral-400">
            &copy; {currentYear} {companyName}. Все права защищены.
          </Text>
        </div>
      </Container>
    </footer>
  );
};


