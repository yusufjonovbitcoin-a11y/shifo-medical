'use client';

import { useRef } from 'react';
import { laboratoryTests } from '@/data/laboratoryTests';
import { useIntersectionObserver } from './utils/useIntersectionObserver';

export function Laboratory() {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="laboratoriya" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Static Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={elementRef} className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-20 fade-in-on-scroll ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 animate-scale-in">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse-slow" />
            <span className="text-emerald-600 uppercase tracking-wide text-xs md:text-sm font-medium">
              Лабораторные анализы
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mt-4 md:mt-6 mb-4 md:mb-6 px-4 font-bold">
            Широкий спектр лабораторных исследований
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Современное оборудование и точные результаты анализов для диагностики и контроля лечения
          </p>
        </div>

        {/* Laboratory Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {laboratoryTests.map((category, index) => (
            <div
              key={category.category}
              className={`group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent relative overflow-hidden hover-lift fade-in-on-scroll ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${category.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <category.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Category Title */}
                <h3 className="text-xl md:text-2xl text-gray-900 mb-4 md:mb-6 font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                  {category.category}
                </h3>

                {/* Tests List */}
                <ul className="space-y-2 md:space-y-3">
                  {category.tests.map((test, testIndex) => (
                    <li
                      key={testIndex}
                      className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-gray-600"
                    >
                      <span className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-br ${category.color} rounded-full mt-2 flex-shrink-0 transition-transform duration-200 group-hover:scale-125`} />
                      <span className="leading-relaxed">{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-12 md:mt-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center shadow-xl fade-in-on-scroll ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-2xl md:text-3xl text-white mb-4 md:mb-6 font-bold">
            Нужна консультация по анализам?
          </h3>
          <p className="text-base md:text-lg text-emerald-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Наши специалисты помогут подобрать необходимые анализы и интерпретировать результаты
          </p>
          <a
            href="#uchrashuv"
            className="inline-block bg-white text-emerald-600 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 text-sm md:text-base font-medium active:scale-95"
          >
            Записаться на консультацию
          </a>
        </div>
      </div>
    </section>
  );
}
