'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Sparkles, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { services } from '@/data/services';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// SVG Icon Components for each service
const KidneyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" fill="white">
    <path d="M25 30c-6 0-10 5-10 12c0 4 1 8 3 11.5c1.5 3 3.5 5.5 5.5 7.5c2.5 2.5 5 4 8 5c1.5.5 3 .6 4.5.6c3 0 5.5-.8 7.5-2.5c1.5-1.2 2.8-3 3.5-5c.8-2 1.2-4.5 1.2-7v-10c0-1.6-.4-3-1.2-4.5c-.8-1.4-2-2.6-3.5-3.5c-2-1.2-4.5-2-7-3c-4-1.2-8-1.8-11.5-1.8z" fill="white" opacity="0.95"/>
    <path d="M75 30c6 0 10 5 10 12c0 4-1 8-3 11.5c-1.5 3-3.5 5.5-5.5 7.5c-2.5 2.5-5 4-8 5c-1.5.5-3 .6-4.5.6c-3 0-5.5-.8-7.5-2.5c-1.5-1.2-2.8-3-3.5-5c-.8-2-1.2-4.5-1.2-7v-10c0-1.6.4-3 1.2-4.5c.8-1.4 2-2.6 3.5-3.5c2-1.2 4.5-2 7-3c4-1.2 8-1.8 11.5-1.8z" fill="white" opacity="0.95"/>
    <rect x="42" y="44" width="6" height="22" rx="1" fill="white" opacity="0.9"/>
    <rect x="52" y="44" width="6" height="22" rx="1" fill="white" opacity="0.9"/>
  </svg>
);

const GynecologyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15 L38 25 L38 60 C38 72, 44 78, 50 78 C56 78, 62 72, 62 60 L62 25 Z" fill="white"/>
    <line x1="38" y1="38" x2="20" y2="45" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <line x1="62" y1="38" x2="80" y2="45" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="20" cy="48" r="6" fill="white"/>
    <circle cx="80" cy="48" r="6" fill="white"/>
    <rect x="45" y="78" width="10" height="12" rx="2" fill="white"/>
  </svg>
);

const NeurologyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 65H15V25H60V73H38C38 68 34 64 29 64C24 64 20 68 20 73H10V65Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M60 25C75 25 90 40 90 65V73H80C80 68 76 64 71 64C66 64 62 68 62 73H60V25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M65 30H80C83 30 85 45 85 55H65V30Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="29" cy="73" r="6" stroke="white" strokeWidth="2"/>
    <circle cx="29" cy="73" r="2" fill="white"/>
    <circle cx="71" cy="73" r="6" stroke="white" strokeWidth="2"/>
    <circle cx="71" cy="73" r="2" fill="white"/>
    <path d="M35 40H45V50H55V60H45V70H35V60H25V50H35V40Z" fill="white" opacity="0.8" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M59 25V20C59 18 61 17 63 17C65 17 67 18 67 20V25H59Z" fill="none" stroke="white" strokeWidth="2"/>
  </svg>
);

const ProctologyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="60" rx="20" ry="30" fill="white"/>
    <path d="M50 30 L45 50 L50 60 L55 50 Z" fill="white"/>
    <circle cx="50" cy="45" r="8" fill="white" opacity="0.3"/>
    <rect x="48" y="75" width="4" height="15" rx="2" fill="white"/>
  </svg>
);

const OtolaryngologyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 20 C40 20, 32 28, 32 38 L32 50 C32 60, 40 68, 50 68 C60 68, 68 60, 68 50 L68 38 C68 28, 60 20, 50 20 Z" fill="white"/>
    <path d="M50 68 L50 85" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <path d="M40 75 L50 85 L60 75" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="45" cy="45" r="3" fill="white" opacity="0.5"/>
    <circle cx="55" cy="45" r="3" fill="white" opacity="0.5"/>
  </svg>
);

const HomeVisitIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15 L20 35 L20 80 L35 80 L35 55 L65 55 L65 80 L80 80 L80 35 Z" fill="white"/>
    <rect x="45" y="45" width="10" height="15" fill="white" opacity="0.3"/>
    <circle cx="50" cy="25" r="3" fill="white"/>
  </svg>
);

const LaboratoryIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="20" width="40" height="60" rx="3" fill="white"/>
    <path d="M40 30 L40 70" stroke="white" strokeWidth="2" opacity="0.5"/>
    <path d="M50 30 L50 70" stroke="white" strokeWidth="2" opacity="0.5"/>
    <path d="M60 30 L60 70" stroke="white" strokeWidth="2" opacity="0.5"/>
    <circle cx="50" cy="75" r="5" fill="white" opacity="0.3"/>
  </svg>
);

const MammologyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="50" r="18" fill="white"/>
    <circle cx="65" cy="50" r="18" fill="white"/>
    <circle cx="35" cy="50" r="8" fill="white" opacity="0.3"/>
    <circle cx="65" cy="50" r="8" fill="white" opacity="0.3"/>
    <path d="M50 35 L50 65" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const DentistryIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 40 L70 40 L65 70 L35 70 Z" fill="white"/>
    <path d="M35 40 L40 30 L45 40" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M50 40 L52 30 L54 40" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M60 40 L62 30 L64 40" stroke="white" strokeWidth="2" fill="none"/>
    <rect x="48" y="70" width="4" height="10" rx="1" fill="white"/>
  </svg>
);

const UltrasoundIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="35" ry="25" fill="white" opacity="0.3"/>
    <ellipse cx="50" cy="50" rx="25" ry="18" fill="white" opacity="0.5"/>
    <ellipse cx="50" cy="50" rx="15" ry="10" fill="white"/>
    <path d="M30 50 L20 50" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M80 50 L90 50" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 30 L50 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 70 L50 80" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ElectrocardiographyIcon = ({ className = "w-7 h-7 md:w-8 md:h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 50 L30 50 L35 40 L40 60 L45 30 L50 50 L60 50" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="50" r="3" fill="white"/>
    <circle cx="60" cy="50" r="3" fill="white"/>
    <rect x="15" y="20" width="50" height="60" rx="2" fill="white" opacity="0.1" stroke="white" strokeWidth="1"/>
  </svg>
);

export function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const t = useTranslations();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
      
      {/* Modal - Full Screen */}
      <div 
        className="fixed inset-0 z-[9999] bg-white overflow-hidden flex flex-col animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-emerald-600 flex-shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-white">{t('servicesModal.title')}</h2>
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
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 overscroll-contain">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => {
              const isExpanded = expandedCard === index;
              const hasServices = service.servicesList && service.servicesList.length > 0;
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl md:rounded-2xl border transition-all fade-in-on-scroll visible ${
                    isExpanded 
                      ? 'border-blue-300 shadow-xl col-span-full' 
                      : 'border-gray-100 hover:shadow-lg hover:border-transparent'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Header - Clickable */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : index)}
                    className="w-full text-left p-4 md:p-6"
                    disabled={!hasServices}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                          {service.serviceKey === "urology" ? (
                            <KidneyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "gynecology" ? (
                            <GynecologyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "neurology" ? (
                            <NeurologyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "proctology" ? (
                            <ProctologyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "otolaryngology" ? (
                            <OtolaryngologyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "homeVisit" ? (
                            <HomeVisitIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "laboratory" ? (
                            <LaboratoryIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "mammology" ? (
                            <MammologyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "dentistry" ? (
                            <DentistryIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "ultrasound" ? (
                            <UltrasoundIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : service.serviceKey === "electrocardiography" ? (
                            <ElectrocardiographyIcon className="w-7 h-7 md:w-8 md:h-8" />
                          ) : (
                            <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">
                            {service.serviceKey ? t(`servicesModal.services.${service.serviceKey}.title`) : service.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 leading-relaxed">
                            {service.serviceKey ? t(`servicesModal.services.${service.serviceKey}.description`) : service.description}
                          </p>
                          {!isExpanded && hasServices && (
                            <div className="flex items-center justify-end pt-3 md:pt-4 border-t border-gray-100">
                                <span className="text-xs text-gray-500">{t('servicesModal.more')} →</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {hasServices && (
                        <div className="flex-shrink-0">
                          <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      )}
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && hasServices && (
                    <div className="px-2 md:px-3 pb-4 md:pb-6 border-t border-gray-100 pt-4 md:pt-6">
                      <div className="mb-4">
                        <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3">{t('servicesModal.servicesList')}</h4>
                        <ul className="space-y-2 md:space-y-2.5 -mx-2 md:-mx-3 px-2 md:px-3">
                          {service.servicesList!.map((serviceItem, idx) => {
                            // serviceItem is Russian text from services.ts
                            // Map Russian servicesList and details keys to translation keys per service
                            const getServiceListKeyMap = (serviceKey?: string): Record<string, string> => {
                              if (serviceKey === "urology") {
                                return {
                                  "Лечение стрессового недержания мочи у женщин методом TVT": "tvtTreatment",
                                  "Трансуретральная резекция предстательной железы (ТУР)": "tur",
                                  "Биопсия мочевого пузыря": "bladderBiopsy",
                                  "Варикацеле": "varicocele",
                                  "Водянка": "hydrocele",
                                  "Лейкоплакия мочевого пузыря": "leukoplakia",
                                  "Обрезание": "circumcision",
                                  "Паховая грыжа": "inguinalHernia",
                                  "Удаление опухоли мочевого пузыря": "bladderTumorRemoval",
                                  "Цистолитотрипсия": "cystolithotripsy",
                                  "Цистоскопия": "cystoscopy",
                                  "Капельницы и внутривенные вливания": "infusions"
                                };
                              }
                              if (serviceKey === "gynecology") {
                                return {
                                  "Аспирационная биопсия эндометрия матки": "endometrialBiopsy",
                                  "Внутри маточная спираль": "iud",
                                  "Вскрытие абсцесса бартолиновой железы": "bartholinAbscess",
                                  "Гинекологический массаж": "gynecologicalMassage",
                                  "Гистерорезектоскопия миомы": "hysteroresectoscopy",
                                  "Гистероскопия": "hysteroscopy",
                                  "Кольпоскопия": "colposcopy",
                                  "Лечение бесплодия": "infertilityTreatment",
                                  "Удаление ВМС из полости матки": "iudRemoval",
                                  "Удаление лигатуры после кесарево сечения": "ligatureRemoval",
                                  "Гистерэктомия (Удаление матки с придатками)": "hysterectomy",
                                  "Фотокоагуляция эрозии шейки матки": "erosionPhotocoagulation"
                                };
                              }
                              if (serviceKey === "neurology") {
                                return {
                                  "Иглатерапия": "acupuncture",
                                  "Инверсионный стол": "inversionTable",
                                  "Кровать Nugabest": "nugabestBed",
                                  "Лечебный Массаж": "therapeuticMassage",
                                  "Мануальная терапия": "manualTherapy",
                                  "Петля Глиссона": "glissonLoop",
                                  "Ультравысокочастотная терапия": "uhfTherapy",
                                  "Электрофорез": "electrophoresis",
                                  "Эхоэнцефалоскопия": "echoencephaloscopy"
                                };
                              }
                              if (serviceKey === "proctology") {
                                return {
                                  "Лазерная фотокоагуляция анальной трещины": "analFissureLaserCoagulation",
                                  "Лазерная фотокоагуляция геморроидальных узлов": "hemorrhoidLaserCoagulation",
                                  "Иссечение параректального свища": "pararectalFistulaExcision",
                                  "Хирургическое лечение сложных свищей прямой кишки": "complexRectalFistulaSurgery"
                                };
                              }
                              if (serviceKey === "otolaryngology") {
                                return {
                                  "Аденоиды": "adenoids",
                                  "Видеоэндоскопия ЛОР органов": "lorVideoEndoscopy",
                                  "Вскрытие верхней челюстной пазухи": "maxillarySinusOpening",
                                  "Пункция верхнечелюстной пазухи": "maxillarySinusPuncture",
                                  "Септопластика": "septoplasty",
                                  "Тонзиллэктомия": "tonsillectomy",
                                  "Удаление полипа в носу": "nasalPolypRemoval",
                                  "Подслизистая резекция перегородки носа": "submucousNasalSeptumResection",
                                  "Вскрытие паратонзилярных абсцесов": "paratonsillarAbscessOpening",
                                  "Трепанапункция лобной пазухи": "frontalSinusTrepanation",
                                  "Пункция верхнечелюстной пазухи (1 сторонняя)": "maxillarySinusPunctureOneSide",
                                  "Пункция верхнечелюстной пазухи (2х сторонняя)": "maxillarySinusPunctureTwoSided",
                                  "Конхотомия": "conchotomy",
                                  "Репозиция носа": "nasalReposition",
                                  "Лечение ЛОР органов": "lorOrgansTreatment",
                                  "Эндоскопический осмотр ЛОР органов": "lorOrgansEndoscopicExamination"
                                };
                              }
                              if (serviceKey === "homeVisit") {
                                return {
                                  "Ультразвуковая диагностика": "ultrasoundDiagnostics",
                                  "ЭКГ / ЭХО": "ecgEcho",
                                  "Забор анализов на дому": "homeBloodCollection",
                                  "Консультация узких специалистов": "specialistConsultation"
                                };
                              }
                              if (serviceKey === "laboratory") {
                                return {
                                  "Цитологическое исследование выделений из соска": "cytologyNippleDischarge",
                                  "TORCH инфекции": "torchInfections",
                                  "ПАП ТЕСТ": "papTest",
                                  "Гистологическое исследование (биопсия)": "histologyBiopsy",
                                  "Иммуногистохимия": "immunohistochemistry"
                                };
                              }
                              if (serviceKey === "mammology") {
                                return {
                                  "Мастэктомия": "mastectomy",
                                  "Фиброаденома": "fibroadenoma"
                                };
                              }
                              if (serviceKey === "ultrasound") {
                                return {
                                  "Допплерография артерий и вен конечностей": "limbDopplerography",
                                  "Допплерография сосудов мошонки": "scrotumVesselDopplerography",
                                  "Исследование шейного отдела": "cervicalExamination",
                                  "Сканирование мошонки": "scrotumScanning",
                                  "УЗИ матки и придатков (фолликулометрия)": "uterusAppendagesFolliculometry",
                                  "УЗИ плевральных полостей": "pleuralCavitiesUltrasound",
                                  "УЗИ комплексное верхний живот – брюшная полость + почки": "upperAbdomenKidneysUltrasound",
                                  "УЗИ комплексное органов брюшной полости – печень, ЖП, поджелудочная железа, селезенка": "abdominalOrgansComplexUltrasound",
                                  "УЗИ комплексное органов мочеполовой системы у женщин и мужчин": "urogenitalSystemComplexUltrasound",
                                  "УЗИ матки и придатков": "uterusAppendagesUltrasound",
                                  "УЗИ молочных желез": "mammaryGlandsUltrasound",
                                  "УЗИ щитовидной железы": "thyroidGlandUltrasound",
                                  "УЗИ мочевого пузыря": "bladderUltrasound",
                                  "УЗИ печени и желчного пузыря": "liverGallbladderUltrasound",
                                  "УЗИ беременности 1 триместр (до 12 недель)": "pregnancyUltrasoundFirstTrimester",
                                  "УЗИ беременности 2 триместр ( 13-27 недель)": "pregnancyUltrasoundSecondTrimester",
                                  "УЗИ беременности 3 триместр ( 27 и более недель)": "pregnancyUltrasoundThirdTrimester",
                                  "УЗИ плода с допплерографией": "fetusDopplerographyUltrasound",
                                  "УЗИ поджелудочной железы": "pancreasUltrasound",
                                  "УЗИ почек и надпочечников": "kidneysAdrenalsUltrasound",
                                  "УЗИ предстательной железы": "prostateGlandUltrasound"
                                };
                              }
                              return {};
                            };
                            
                            const servicesListKeyMap = getServiceListKeyMap(service.serviceKey);
                            const translationKey = servicesListKeyMap[serviceItem] || serviceItem;
                            const hasDetails = service.details && service.details[serviceItem];
                            const isServiceExpanded = expandedServices.has(serviceItem);
                            
                            // Get translated text for serviceItem (servicesList)
                            const serviceItemText = service.serviceKey 
                              ? t(`servicesModal.services.${service.serviceKey}.servicesList.${translationKey}`, { defaultValue: serviceItem })
                              : serviceItem;
                            
                            return (
                              <li key={idx} className="border border-gray-200 rounded-lg md:rounded-xl overflow-hidden h-fit">
                                {hasDetails ? (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        const wasExpanded = isServiceExpanded;
                                        setExpandedServices(prev => {
                                          const next = new Set(prev);
                                          if (wasExpanded) {
                                            next.delete(serviceItem);
                                          } else {
                                            next.add(serviceItem);
                                          }
                                          return next;
                                        });
                                        // Scroll button into view when expanding (only if expanding, not collapsing)
                                        if (!wasExpanded && scrollContainerRef.current) {
                                          setTimeout(() => {
                                            const buttonElement = e.currentTarget as HTMLElement;
                                            if (buttonElement) {
                                              buttonElement.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'nearest',
                                                inline: 'nearest'
                                              });
                                            }
                                          }, 50);
                                        }
                                      }}
                                      className="w-full text-left flex items-start gap-2.5 md:gap-3 p-3 md:p-4 hover:bg-gray-50 transition-colors"
                                    >
                                      <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0 transition-transform ${isServiceExpanded ? 'rotate-90' : ''}`} />
                                      <span className={`w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-br ${service.gradient} rounded-full mt-1.5 md:mt-2 flex-shrink-0`} />
                                      <span className="flex-1 text-xs md:text-sm text-gray-900 font-medium">{serviceItemText}</span>
                                    </button>
                                    {isServiceExpanded && (
                                      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-0 bg-gray-50 border-t border-gray-200">
                                        {/* Try to get details from translation first, fallback to services.ts */}
                                        {(() => {
                                          // Try to get from translation first
                                          if (service.serviceKey && servicesListKeyMap[serviceItem]) {
                                            // For laboratory service, details are inside categories.details
                                            // For other services, details are directly under service
                                            const detailTextKey = service.serviceKey === "laboratory"
                                              ? `servicesModal.services.${service.serviceKey}.categories.details.${translationKey}.text`
                                              : `servicesModal.services.${service.serviceKey}.details.${translationKey}.text`;
                                            
                                            // Get translation - next-intl returns the key if not found
                                            const translatedText = t(detailTextKey);
                                            
                                            // Check if translation exists (result is different from key and not empty)
                                            const hasTranslation = translatedText && 
                                                                   translatedText !== detailTextKey && 
                                                                   typeof translatedText === 'string' && 
                                                                   translatedText.length > 0;
                                            
                                            // If translation exists, use it
                                            if (hasTranslation) {
                                              // Get images and video from services.ts (they are same for both languages)
                                              const detailData = (service.details![serviceItem] && typeof service.details![serviceItem] === 'object') 
                                                ? (service.details![serviceItem] as { text: string; images?: string[]; video?: string })
                                                : null;
                                              const detailImages = detailData?.images || [];
                                              const detailVideo = detailData?.video || null;
                                              
                                              return (
                                                <>
                                                  {/* Images at the top */}
                                                  {detailImages.length > 0 && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                                                      {detailImages.map((img: string, imgIdx: number) => (
                                                        <div key={imgIdx} className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                                                          <Image
                                                            src={img}
                                                            alt={`${serviceItemText} - ${imgIdx + 1}`}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 640px) 100vw, 50vw"
                                                            unoptimized
                                                            onError={(e) => {
                                                              console.error('Image load error:', img);
                                                              const target = e.target as HTMLImageElement;
                                                              const parent = target.parentElement;
                                                              if (parent) {
                                                                parent.style.display = 'none';
                                                              }
                                                            }}
                                                            onLoad={() => {
                                                              console.log('Image loaded successfully:', img);
                                                            }}
                                                          />
                                                        </div>
                                                      ))}
                                                    </div>
                                                  )}
                                                  {/* Text below images */}
                                                  <div className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                    {translatedText}
                                                  </div>
                                                  {/* Video below text */}
                                                  {detailVideo && (
                                                    <div className="mt-4">
                                                      <div className="relative aspect-video rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                                                        <iframe
                                                          src={`https://www.youtube.com/embed/${detailVideo.split('/').pop()?.split('?')[0]}`}
                                                          title={`${serviceItemText} video`}
                                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                          allowFullScreen
                                                          className="absolute inset-0 w-full h-full"
                                                        />
                                                      </div>
                                                    </div>
                                                  )}
                                                </>
                                              );
                                            }
                                          }
                                          
                                          // Fallback to services.ts
                                          if (typeof service.details![serviceItem] === 'string') {
                                            return (
                                              <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                {service.details![serviceItem] as string}
                                              </p>
                                            );
                                          } else {
                                            return (
                                              <>
                                                {/* Images at the top */}
                                                {(service.details![serviceItem] as { text: string; images?: string[] }).images && 
                                                 (service.details![serviceItem] as { text: string; images?: string[] }).images!.length > 0 && (
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                                                    {(service.details![serviceItem] as { text: string; images?: string[] }).images!.map((img, imgIdx) => (
                                                      <div key={imgIdx} className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                                                        <Image
                                                          src={img}
                                                          alt={`${serviceItemText} - ${imgIdx + 1}`}
                                                          fill
                                                          className="object-cover"
                                                          sizes="(max-width: 640px) 100vw, 50vw"
                                                          unoptimized
                                                          onError={(e) => {
                                                            console.error('Image load error:', img);
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs p-4 text-center">Surat topilmadi<br/>Path: ${img}<br/>Fayl nomini tekshiring</div>`;
                                                            }
                                                          }}
                                                          onLoad={() => {
                                                            console.log('Image loaded successfully:', img);
                                                          }}
                                                        />
                                                      </div>
                                                    ))}
                                                  </div>
                                                )}
                                                {/* Text below images */}
                                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                  {(service.details![serviceItem] as { text: string; images?: string[]; video?: string }).text}
                                                </p>
                                                {/* Video below text */}
                                                {(service.details![serviceItem] as { text: string; images?: string[]; video?: string }).video && (
                                                  <div className="mt-4">
                                                    <div className="relative aspect-video rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                                                      <iframe
                                                        src={`https://www.youtube.com/embed/${(service.details![serviceItem] as { text: string; images?: string[]; video?: string }).video!.split('/').pop()?.split('?')[0]}`}
                                                        title={`${serviceItemText} video`}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="absolute inset-0 w-full h-full"
                                                      />
                                                    </div>
                                                  </div>
                                                )}
                                              </>
                                            );
                                          }
                                        })()}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="flex items-start gap-2.5 md:gap-3 p-3 md:p-4">
                                      <span className={`w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-br ${service.gradient} rounded-full mt-1.5 md:mt-2 flex-shrink-0`} />
                                      <span className="flex-1 text-xs md:text-sm text-gray-700 leading-relaxed">{serviceItemText}</span>
                                    </div>
                                  )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="flex items-center justify-end pt-3 md:pt-4 border-t border-gray-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {t('common.close')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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

