'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Activity, X } from 'lucide-react';

interface PhysiotherapyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const physiotherapyProcedures = [
  'УВЧ (пазухи носа, колленые суставы, раны)',
  'Соленая комната Дети и Взрослые',
  'Электрофорез (лекарственный)',
  'УФО (ультра-фиолетовое облучение носа, носоглотки)',
  'Парафинотерапия',
  'Ультразвуковая терапия',
  'Лимфодренаж ног – прессотерапия',
  'Электромиостимуляция',
  'Компьютерное вытяжение позвоночника',
  'Аутоплазматерапия',
  'Лимфодренажный массаж рук',
  'Инфракрасная терапия',
  'Ультразвуковая ингаляция',
  'Диатермия',
  'Ударно-волновая терапия',
  'Дарсонваль',
  'Квантовая эндовазальная терапия (КЭТ)',
  'Озонотерапия',
];

export function PhysiotherapyModal({ isOpen, onClose }: PhysiotherapyModalProps) {
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
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">Физиотерапевтические процедуры</h2>
              <p className="text-sm md:text-base text-orange-100">Все доступные услуги физиотерапии</p>
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
            {physiotherapyProcedures.map((procedure, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl md:rounded-2xl p-4 md:p-6 border border-orange-200 hover:shadow-lg transition-all hover:border-orange-300 fade-in-on-scroll visible"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-lg font-bold">+</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">{procedure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
              Для подробной информации и записи на приём свяжитесь с нами
            </p>
            <a
              href="#uchrashuv"
              onClick={onClose}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl hover:shadow-lg transition-all text-sm md:text-base font-medium active:scale-95"
            >
              Записаться на приём
            </a>
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

