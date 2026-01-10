'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X } from 'lucide-react';

interface UltrasoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ultrasoundStudies = [
  'Допплерография артерий и вен конечностей',
  'Допплерография сосудов мошонки',
  'Исследование шейного отдела',
  'Сканирование мошонки',
  'УЗИ матки и придатков (фолликулометрия)',
  'УЗИ плевральных полостей',
  'УЗИ комплексное верхний живот – брюшная полость + почки',
  'УЗИ комплексное органов брюшной полости – печень, ЖП, поджелудочная железа, селезенка',
  'УЗИ комплексное органов мочеполовой системы у женщин и мужчин',
  'УЗИ матки и придатков',
  'УЗИ молочных желез',
  'УЗИ щитовидной железы',
  'УЗИ мочевого пузыря',
  'УЗИ печени и желчного пузыря',
  'УЗИ беременности 1 триместр (до 12 недель)',
  'УЗИ беременности 2 триместр ( 13-27 недель)',
  'УЗИ беременности 3 триместр ( 27 и более недель)',
  'УЗИ плода с допплерографией',
  'УЗИ поджелудочной железы',
  'УЗИ почек и надпочечников',
  'УЗИ предстательной железы',
];

export function UltrasoundModal({ isOpen, onClose }: UltrasoundModalProps) {
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
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">УЗИ исследования</h2>
              <p className="text-xs md:text-sm text-blue-200 mt-1">Ежедневно с 09:00 до 16:30</p>
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
            {ultrasoundStudies.map((study, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-200 hover:shadow-lg transition-all hover:border-blue-300 fade-in-on-scroll visible"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-lg font-bold">+</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">{study}</p>
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

