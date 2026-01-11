export interface Doctor {
  nameUz: string; // Uzbek (Latin) name
  nameRu: string; // Russian (Cyrillic) name
  specialtyKey: string; // Key for translation instead of hardcoded text
  experienceYears: number;
  schedule: {
    daily?: boolean;
    from?: string;
    to?: string;
    days?: string[]; // Array of day keys
  };
  gradient: string;
  image?: string;
}

export const doctorsData: Doctor[] = [
  {
    nameUz: "Xamdamov Rustam Uktamovich",
    nameRu: "Хамдамов Рустам Уктамович",
    specialtyKey: "urologist",
    experienceYears: 20,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/doctors/xamdamov rustam.jpg"
  },
  {
    nameUz: "Sultanova Roxila Naimovna",
    nameRu: "Султанова Рохиля Наимовна",
    specialtyKey: "gynecologist",
    experienceYears: 30,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-rose-500 to-red-500",
    image: "/images/doctors/sultanova roxila.jpg"
  },
  {
    nameUz: "Azizova Madina Sultonmurodovna",
    nameRu: "Азизова Мадина Султанмурадовна",
    specialtyKey: "gynecologist",
    experienceYears: 10,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-rose-400 to-pink-500",
    image: "/images/doctors/madina.jpg"
  },
  {
    nameUz: "Muhammadiyev Xurshed Lutfillayevich",
    nameRu: "Мухаммадиев Хуршед Лутфиллаевич",
    specialtyKey: "surgeonProctologist",
    experienceYears: 10,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-purple-500 to-pink-500",
    image: "/images/doctors/xurshed.jpg"
  },
  {
    nameUz: "Vafoxodjayeva Iroda Rahmatullayevna",
    nameRu: "Вафаходжаева Ирода Рахматуллаевна",
    specialtyKey: "ultrasoundDoctor",
    experienceYears: 15,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30",
      days: ["monday", "wednesday", "friday"]
    },
    gradient: "from-emerald-500 to-teal-500",
    image: "/images/doctors/iroda.jpg"
  },
  {
    nameUz: "Muminova Firuza Qurbanovna",
    nameRu: "Муминова Фируза Курбановна",
    specialtyKey: "ultrasoundDoctor",
    experienceYears: 8,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30",
      days: ["tuesday", "thursday", "saturday"]
    },
    gradient: "from-teal-500 to-cyan-500",
    image: "/images/doctors/kurbonova firuza.jpg"
  },
  {
    nameUz: "Ergasheva Shoyira Sherovna",
    nameRu: "Эргашева Шоира Шеровна",
    specialtyKey: "labDoctor",
    experienceYears: 10,
    schedule: {
      daily: false,
      from: "08:00",
      to: "16:30"
    },
    gradient: "from-green-500 to-emerald-500",
    image: "/images/doctors/ergasheva shoira.jpg"
  },
  {
    nameUz: "Sayfiyeva Kamola Hayrilloyevna",
    nameRu: "Сайфиева Камола Хайриллоевна",
    specialtyKey: "labDoctor",
    experienceYears: 4,
    schedule: {
      daily: false,
      from: "08:00",
      to: "16:30"
    },
    gradient: "from-green-400 to-emerald-400",
    image: "/images/doctors/kamola.png"
  },
  {
    nameUz: "Tillyayeva Zamira Ziyadullayevna",
    nameRu: "Тилляева Замира Зиядуллаевна",
    specialtyKey: "cardiologistTherapist",
    experienceYears: 15,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-red-500 to-pink-500",
    image: "/images/doctors/tilloeva zamira.jpg"
  },
  {
    nameUz: "Mirmuhammadov Baxrillo Habibullayevich",
    nameRu: "Мирмухаммедов Бахрилло Хабибуллаевич",
    specialtyKey: "entDoctor",
    experienceYears: 15,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-teal-500 to-emerald-500",
    image: "/images/doctors/mirmuxammadov baxrillo.jpg"
  },
  {
    nameUz: "Rafikova Hilola Baxrillayevna",
    nameRu: "Рафикова Хилола Бахриллаевна",
    specialtyKey: "entDoctor",
    experienceYears: 10,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-teal-400 to-cyan-400",
    image: "/images/doctors/xilola.jpg"
  },
  {
    nameUz: "Azizova Madina Sutanmurodovna",
    nameRu: "Азизова Мадина Сутанмурадовна",
    specialtyKey: "mammologist",
    experienceYears: 8,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-pink-500 to-rose-500",
    image: "/images/doctors/madina.jpg"
  },
  {
    nameUz: "Islomov Shaxriyor Shavkattillayevich",
    nameRu: "Исломов Шахриёр Шавкаттиллаевич",
    specialtyKey: "dentist",
    experienceYears: 12,
    schedule: {
      daily: true,
      from: "09:00",
      to: "17:00"
    },
    gradient: "from-orange-500 to-yellow-500",
    image: "/images/doctors/islomov shaxriyoz.jpg"
  },
  {
    nameUz: "Norqulov Bekzod Erkinovich",
    nameRu: "Норкулов Бекзод Эркинович",
    specialtyKey: "neurologist",
    experienceYears: 5,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-indigo-500 to-purple-500",
    image: "/images/doctors/norqulov bekzod.jpg"
  },
  {
    nameUz: "Jumayev Maqsud O'bloqulovich",
    nameRu: "Жумаев Максуд Облокулович",
    specialtyKey: "anesthesiologistReanimatologist",
    experienceYears: 42,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-slate-500 to-gray-600",
    image: "/images/doctors/maksud.jpg"
  }
];















