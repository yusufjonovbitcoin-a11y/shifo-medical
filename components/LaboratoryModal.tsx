'use client';

import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { 
  TestTube, 
  Heart, 
  Activity, 
  Droplet, 
  Microscope,
  Microscope as MicroscopeIcon,
  Stethoscope,
  Shield,
  AlertCircle,
  Zap,
  Pill,
  X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface LaboratoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LaboratoryTest {
  category: string;
  icon: LucideIcon;
  color: string;
  tests: string[];
}

export function LaboratoryModal({ isOpen, onClose }: LaboratoryModalProps) {
  const t = useTranslations();

  const laboratoryTests: LaboratoryTest[] = useMemo(() => {
    const categories = [
      {
        key: 'expressDiagnostics',
        icon: Zap,
        color: 'from-red-500 to-pink-500'
      },
      {
        key: 'hormones',
        icon: Activity,
        color: 'from-purple-500 to-indigo-500'
      },
      {
        key: 'thyroid',
        icon: Shield,
        color: 'from-cyan-500 to-teal-500'
      },
      {
        key: 'vitaminsMinerals',
        icon: Pill,
        color: 'from-green-500 to-emerald-500'
      },
      {
        key: 'liverFunction',
        icon: Activity,
        color: 'from-amber-500 to-orange-500'
      },
      {
        key: 'kidneyFunction',
        icon: Droplet,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        key: 'coagulation',
        icon: Heart,
        color: 'from-rose-500 to-red-500'
      },
      {
        key: 'completeBloodCount',
        icon: TestTube,
        color: 'from-red-500 to-rose-500'
      },
      {
        key: 'lipidSpectrum',
        icon: Heart,
        color: 'from-purple-500 to-pink-500'
      },
      {
        key: 'diabetes',
        icon: Activity,
        color: 'from-blue-500 to-indigo-500'
      },
      {
        key: 'tumorMarkers',
        icon: AlertCircle,
        color: 'from-orange-500 to-red-500'
      },
      {
        key: 'infections',
        icon: Shield,
        color: 'from-indigo-500 to-purple-500'
      },
      {
        key: 'parasites',
        icon: MicroscopeIcon,
        color: 'from-amber-500 to-yellow-500'
      },
      {
        key: 'mensHealth',
        icon: Stethoscope,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        key: 'womensHealth',
        icon: Heart,
        color: 'from-pink-500 to-rose-500'
      }
    ];

    return categories.map(cat => ({
      category: t(`servicesModal.services.laboratory.categories.${cat.key}.name`),
      icon: cat.icon,
      color: cat.color,
      tests: t.raw(`servicesModal.services.laboratory.categories.${cat.key}.tests`) as string[]
    }));
  }, [t]);

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
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">{t('servicesModal.services.laboratory.title')}</h2>
              <p className="text-xs md:text-sm text-green-200 mt-1">{t('servicesModal.services.laboratory.schedule')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors active:scale-95"
            aria-label={t('common.close')}
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
