export interface Doctor {
  name: string;
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
    name: "Хамдамов Рустам Уктамович",
    specialtyKey: "urologist",
    experienceYears: 20,
    schedule: {
      daily: true,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/doctors/DSC00274-1.jpg"
  },
  {
    name: "Султанова Рохиля Наимовна",
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
    name: "Азизова Мадина Султанмурадовна",
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
    name: "Мухаммадиев Хуршед Лутфиллаевич",
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
    name: "Вафаходжаева Ирода Рахматуллаевна",
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
    name: "Муминова Фируза Курбановна",
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
    name: "Эргашева Шоира Шеровна",
    specialtyKey: "labDoctor",
    experienceYears: 10,
    schedule: {
      daily: false,
      from: "08:00",
      to: "16:30"
    },
    gradient: "from-green-500 to-emerald-500",
    image: "/images/doctors/shoira.jpg"
  },
  {
    name: "Сайфиева Камола Хайриллоевна",
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
    name: "Тилляева Замира Зиядуллаевна",
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
    name: "Мирмухаммедов Бахрилло Хабибуллаевич",
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
    name: "Рафикова Хилола Бахриллаевна",
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
    name: "Азизова Мадина Сутанмурадовна",
    specialtyKey: "mammologist",
    experienceYears: 8,
    schedule: {
      daily: false,
      from: "09:00",
      to: "16:30"
    },
    gradient: "from-pink-500 to-rose-500",
    image: "/images/doctors/DSC00312-1.jpg"
  }
];














