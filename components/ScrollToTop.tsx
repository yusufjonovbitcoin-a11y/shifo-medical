'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[100] w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
          aria-label="Наверх"
          style={{
            animation: 'fadeInUp 0.4s ease-out forwards'
          }}
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform duration-300" />
          
          {/* Pulse animation ring - only on hover */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-50 group-hover:animate-ping transition-opacity duration-300" aria-hidden="true" />
        </button>
      )}
    </>
  );
}

