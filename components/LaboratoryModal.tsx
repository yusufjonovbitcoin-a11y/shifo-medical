'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Microscope, X } from 'lucide-react';
import { laboratoryTests } from '@/data/laboratoryTests';

interface LaboratoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LaboratoryModal({ isOpen, onClose }: LaboratoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
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
      {/* Backdrop - high z-index to ensure it's above all content */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        aria-hidden="true"
      />
      
      {/* Modal - highest z-index to be above backdrop and all content */}
      <div 
        className="fixed inset-4 md:inset-12 lg:inset-20 z-[9999] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-emerald-600 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Microscope className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">Лабораторные анализы</h2>
              <p className="text-xs md:text-sm text-green-200 mt-1">Время работы: 07:30 - 16:30</p>
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
            {laboratoryTests.map((category, index) => (
              <div
                key={category.category}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 hover:shadow-lg transition-shadow fade-in-on-scroll visible"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">{category.category}</h3>
                <ul className="space-y-1.5 md:space-y-2">
                  {category.tests.map((test, testIndex) => (
                    <li key={testIndex} className="flex items-start gap-2 text-xs md:text-sm text-gray-600 leading-relaxed">
                      <span className={`w-1 h-1 md:w-1.5 md:h-1.5 bg-gradient-to-br ${category.color} rounded-full mt-1.5 md:mt-2 flex-shrink-0`} />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // Render modal using portal to document.body to avoid z-index issues
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}
