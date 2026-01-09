import { 
  TestTube, 
  Heart, 
  Activity, 
  Droplet, 
  Microscope,
  Stethoscope,
  Shield,
  AlertCircle,
  Zap,
  Pill
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface LaboratoryTest {
  category: string;
  icon: LucideIcon;
  color: string;
  tests: string[];
}

export const laboratoryTests: LaboratoryTest[] = [
  {
    category: 'Экспресс Диагностика',
    icon: Zap,
    color: 'from-red-500 to-pink-500',
    tests: [
      'HBsAG - Гепатит B',
      'HCV - Гепатит С',
      'Тропонин I (Инфаркт Миокарда)',
      'RPR - test (RW)',
      'Хеликобактерная инфекция',
      'Brusellaabortus (Бруцеллёз)',
      'HIV - ВИЧ'
    ]
  },
  {
    category: 'Гормоны',
    icon: Activity,
    color: 'from-purple-500 to-indigo-500',
    tests: [
      'FSH - Фолликулостимулирующий гормон',
      'LH - Лютеинизирующий гормон',
      'HCG - Хорионический гонадотропин человека',
      'Prolactin - Пролактин',
      'Estradiol (E2) - Эстрадиол',
      'Testosterone - Тестостерон',
      '17-OH-P - Прогестерон',
      'Cortisol - Кортизол',
      'Insulin - Инсулин',
      'C-Peptide - С пептид'
    ]
  },
  {
    category: 'Щитовидная железа',
    icon: Shield,
    color: 'from-cyan-500 to-teal-500',
    tests: [
      'TSH - ТТГ',
      'T4',
      'T3',
      'FT3 - T3 свободный',
      'FT4 - T4 свободный',
      'Tg - Тиреоглобулин',
      'Anti-TPO - Антитела к тиреопероксидазе'
    ]
  },
  {
    category: 'Витамины и Минералы',
    icon: Pill,
    color: 'from-green-500 to-emerald-500',
    tests: [
      '25-OH Vitamin - Витамин Д',
      'Vitamin B12 - Витамин B12',
      'Ferritin - Ферритин',
      'Calcium P - Кальций',
      'Iron Ferene - Железо',
      'Phosphorus - Фосфор',
      'Magnesium - Магний',
      'Potassium - Калий',
      'Sodium - Натрий'
    ]
  },
  {
    category: 'Функция печени',
    icon: Activity,
    color: 'from-amber-500 to-orange-500',
    tests: [
      'Bilirubin Auto Direct - Биллирубин Прямой',
      'Bilirubin Auto Total - Биллирубин Общий',
      'ASAT (Aspartate Aminotransferase) - АСТ',
      'ALAT (Alanine Aminotransferase) - АЛТ',
      'Alkaline Phosphatase - Щелочная фосфаза',
      'Gamma-GT - ГГТ',
      'Total protein - Общий белок',
      'Albumin - Альбумин',
      'Alpha-Amylase - Альфа-Амилаза',
      'Тимоловая проба'
    ]
  },
  {
    category: 'Функция почек',
    icon: Droplet,
    color: 'from-blue-500 to-cyan-500',
    tests: [
      'Creatinine - Креатинин',
      'Urea - Мочевина',
      'Uric acid - Мочевая кислота',
      'Клинический анализ мочи'
    ]
  },
  {
    category: 'Коагуляция',
    icon: Heart,
    color: 'from-rose-500 to-red-500',
    tests: [
      'ТТ - Тромбиновое время',
      'Протромбиновый индекс',
      'PT – протромбиновое время',
      'INR - МНО',
      'FIBR - Фибриноген',
      'АPTT - АЧТВ',
      'D-димер'
    ]
  },
  {
    category: 'Общий анализ крови',
    icon: TestTube,
    color: 'from-red-500 to-rose-500',
    tests: [
      'Клинический анализ крови: лейкоцитарная формула + СОЭ'
    ]
  },
  {
    category: 'Липидный спектр',
    icon: Heart,
    color: 'from-purple-500 to-pink-500',
    tests: [
      'HDL-c direct - Липопротеины высокой плотности',
      'LDL-c direct - Липопротеины низкой плотности',
      'Cholesterol - Холестерин',
      'Triglyceride - Триглицериды',
      'Пакет Липидный спектр'
    ]
  },
  {
    category: 'Диабет',
    icon: Activity,
    color: 'from-blue-500 to-indigo-500',
    tests: [
      'Glucose - Уровень глюкозы на тощак',
      'oneHbA1c - Гликированный гемоглобин'
    ]
  },
  {
    category: 'Онкомаркеры',
    icon: AlertCircle,
    color: 'from-orange-500 to-red-500',
    tests: [
      'Psa-Total - ПСА общий',
      'СА-125 (Яичники, матка, родовые пути, плевра, брюшина, печень)',
      'СА 15-3 (Молочная железа, яичники, простата, лёгкие, ЖКТ)'
    ]
  },
  {
    category: 'Инфекции',
    icon: Shield,
    color: 'from-indigo-500 to-purple-500',
    tests: [
      'HBsAg - Гепатит B',
      'Anti HCV - Гепатит С',
      'Toxo IgG - Токсоплазма IgG',
      'CMV IgG - Цитомегаловирус IgG',
      'HSV-1 IgG - Герпес Тип 1 IgG',
      'Antistreptolysin O - АСЛО',
      'CRP - С-Реактивный белок Б',
      'Rheumatoid Factor - Ревматоидный фактор'
    ]
  },
  {
    category: 'Паразиты',
    icon: Microscope,
    color: 'from-amber-500 to-yellow-500',
    tests: [
      'Гельминты(описторхис, трихинелла, токсокар) IgG ИФА',
      'Лямблия антитела ИФА',
      'Аскарида IgG ИФА',
      'Эхинококк IgG ИФА'
    ]
  },
  {
    category: 'Мужское здоровье',
    icon: Stethoscope,
    color: 'from-blue-500 to-cyan-500',
    tests: [
      'Урологический мазок',
      'Спермограмма',
      'Psa-Total - ПСА общий'
    ]
  },
  {
    category: 'Женское здоровье',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    tests: [
      'Гинекологический мазок (мазок на флору)',
      'СА-125 (Яичники, матка, родовые пути, плевра, брюшина, печень)',
      'Аспирационная биопсия из полости матки',
      'Цитологическое исследование ПАП',
      'Гистологическое исследование биоптата'
    ]
  }
];



