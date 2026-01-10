'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useIntersectionObserver } from './utils/useIntersectionObserver';

// FAQ data will be loaded from translations

export function FAQ() {
  const t = useTranslations();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Get FAQ data from translations
  const faqData = t.raw('faq.questions') as Array<{ question: string; answer: string }>;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="tavsiyalar" className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={elementRef} className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 md:mb-20 fade-in-on-scroll ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 md:mb-6 px-4">
            {t('faq.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            {t('faq.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl md:rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden fade-in-on-scroll ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left p-4 md:p-6 flex items-center justify-between gap-4 hover:bg-emerald-50/50 transition-colors group"
                  >
                    <span className="text-base md:text-lg font-semibold text-gray-900 pr-4 group-hover:text-emerald-600 transition-colors">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-emerald-600 rotate-180' : 'group-hover:bg-emerald-200'}`}>
                      <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isOpen ? 'text-white' : 'text-emerald-600'}`} />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                      {faq.answer.includes('\n') ? (
                        <ul className="text-sm md:text-base text-gray-600 leading-relaxed space-y-2 list-none">
                          {faq.answer.split('\n').map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 mt-1.5 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

