'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface MassageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const massageTypes = [
  'Массаж лица (30 мин)',
  'Коррекция фигуры ( Комплекс )',
  'Точечный позвоночный массаж (30 минут)',
  'Вытиралка',
  'Общий массаж (Релакс ) (45 мин)',
  'Шейная воротниковая зона + голова (30 мин)',
  'Огненный массаж (60 минут)',
  'Классический массаж (60 мин)',
  'Точечный лечебный массаж (60 мин)',
  'Массаж ног (30 мин)',
  'Массаж рук (30 мин)',
];

export function MassageModal({ isOpen, onClose }: MassageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-4 md:inset-12 lg:inset-20 z-[9999] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-600 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                {/* Массаж SVG - руки */}
                <path
                  d="M12 2C10.34 2 9 3.34 9 5C9 6.66 10.34 8 12 8C13.66 8 15 6.66 15 5C15 3.34 13.66 2 12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M7 10C5.9 10 5 10.9 5 12V18C5 19.1 5.9 20 7 20H9V12H7V10Z"
                  fill="currentColor"
                />
                <path
                  d="M17 10C15.9 10 15 10.9 15 12V18C15 19.1 15.9 20 17 20H19V12H17V10Z"
                  fill="currentColor"
                />
                <path
                  d="M12 10C10.9 10 10 10.9 10 12V18C10 19.1 10.9 20 12 20H14V12H12V10Z"
                  fill="currentColor"
                />
                <circle cx="7" cy="7" r="2" fill="currentColor" opacity="0.6" />
                <circle cx="17" cy="7" r="2" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
            <div>
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">Массаж</h2>
              <p className="text-sm md:text-base text-purple-100">Все виды массажа</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 overscroll-contain">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {massageTypes.map((massage, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl md:rounded-2xl p-4 md:p-6 border border-purple-200 hover:shadow-lg transition-all hover:border-purple-300 fade-in-on-scroll visible"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-lg font-bold">+</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">{massage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // Render modal using portal to document.body
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}

