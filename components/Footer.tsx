'use client';

import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations();
  return (
    <footer id="aloqa" className="bg-white text-gray-900 pt-12 md:pt-20 pb-6 md:pb-8 relative overflow-hidden">
      {/* Background Pattern - using CSS instead of inline style */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} aria-hidden="true" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 md:mb-6">
              <Logo size="medium" className="" animate={true} />
              <p className="text-xs text-gray-600 mt-2 opacity-90">{t('footer.subtitle')}</p>
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg" aria-label="Facebook">
                <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg" aria-label="Instagram">
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 shadow-lg" aria-label="Telegram">
                <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block text-gray-900">
              {t('footer.quickLinks')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#xizmatlar" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.links.services')}
                </a>
              </li>
              <li>
                <a href="#laboratoriya" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.links.laboratory')}
                </a>
              </li>
              <li>
                <a href="#shifokorlar" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.links.doctors')}
                </a>
              </li>
              <li>
                <a href="#uchrashuv" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.links.appointment')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block text-gray-900">
              {t('footer.services')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#xizmatlar" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.serviceLinks.urology')}
                </a>
              </li>
              <li>
                <a href="#xizmatlar" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.serviceLinks.gynecology')}
                </a>
              </li>
              <li>
                <a href="#xizmatlar" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.serviceLinks.proctology')}
                </a>
              </li>
              <li>
                <a href="#xizmatlar" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  {t('footer.serviceLinks.neurology')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block text-gray-900">
              {t('footer.contact')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-emerald-600 rounded-full" />
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.phone')}</p>
                  <a href="tel:+998976110604" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 block mb-1">
                    +998 97 611 06 04
                  </a>
                  <a href="tel:+998662353344" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 block mb-1">
                    +998 662 35 33 44
                  </a>
                  <a href="tel:+998662350713" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 block">
                    +998 662 35 07 13
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.email')}</p>
                  <a href="mailto:shifokorlda@gmail.com" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200">
                    shifokorlda@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.hours')}</p>
                  <p className="text-gray-900 mb-1">{t('footer.hours')}</p>
                  <p className="text-gray-700 text-xs">{t('footer.labHours')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-600 text-sm">{t('footer.contactLabels.address')}</p>
                  <p className="text-gray-900 mb-1">{t('footer.address')}</p>
                  <p className="text-gray-700 text-xs">{t('footer.landmark')}</p>
                  <a 
                    href="https://yandex.uz/maps/-/CDRIEJYF" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 text-xs mt-1 inline-block transition-colors underline"
                  >
                    {t('footer.viewMap')}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 md:pt-10 border-t border-gray-200 text-center">
          <p className="text-gray-700 text-sm md:text-base">
            &copy; {new Date().getFullYear()} {t('header.logo')}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
