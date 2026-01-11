'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Check if chat is open
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkChatState = () => {
      const chatOpen = sessionStorage.getItem('chat-open') === 'true' || document.body.classList.contains('chat-open');
      setIsChatOpen(chatOpen);
    };

    // Initial check
    checkChatState();

    // Watch for body class changes
    const observer = new MutationObserver(checkChatState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Watch for storage changes (when chat is opened/closed in another component)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chat-open') {
        checkChatState();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Show button when page is scrolled down 300px and chat is not open
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300 && !isChatOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Initial check

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [isChatOpen]);

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

