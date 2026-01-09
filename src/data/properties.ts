export interface Property {
  id: string;
  title: string;
  price: number;
  rooms: number;
  area: number;
  district: string;
  address: string;
  description: string;
  type: 'apartment' | 'house' | 'studio';
  images: string[];
  latitude: number;
  longitude: number;
  features: string[];
  contact: {
    phone: string;
    name: string;
  };
}

export const properties: Property[] = [
  {
    id: '1',
    title: '2 xonali kvartira Chilonzorda',
    price: 68000,
    rooms: 2,
    area: 65,
    district: 'Chilonzor',
    address: 'Chilonzor tumani, 12-kvartal',
    description: 'Yaxshi remont, qulay joylashuv, metro yaqin. Barcha qulayliklar mavjud.',
    type: 'apartment',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
    ],
    latitude: 41.2856,
    longitude: 69.2034,
    features: ['Remont', 'Metro yaqin', 'Avtomobil joyi', 'Maktab yaqin'],
    contact: {
      phone: '+998901234567',
      name: 'Sardor'
    }
  },
  {
    id: '2',
    title: '3 xonali kvartira Yunusobodda',
    price: 95000,
    rooms: 3,
    area: 85,
    district: 'Yunusobod',
    address: 'Yunusobod tumani, 4-mavze',
    description: 'Yangi bino, evroremont, ajoyib manzara. Barcha infrastruktura yaqin.',
    type: 'apartment',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'
    ],
    latitude: 41.3439,
    longitude: 69.2892,
    features: ['Yangi bino', 'Evroremont', 'Ajoyib manzara', 'Lift'],
    contact: {
      phone: '+998901234568',
      name: 'Aziz'
    }
  },
  {
    id: '3',
    title: '2 xonali kvartira Sergelida',
    price: 72000,
    rooms: 2,
    area: 58,
    district: 'Sergeli',
    address: 'Sergeli tumani, 5-mavze',
    description: 'Yaxshi remont, qulay joylashuv, maktab yaqin. Tinch muhit.',
    type: 'apartment',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
    ],
    latitude: 41.2156,
    longitude: 69.2264,
    features: ['Remont', 'Maktab yaqin', 'Bog\'cha', 'Avtoturargoh'],
    contact: {
      phone: '+998901234569',
      name: 'Jasur'
    }
  },
  {
    id: '4',
    title: '1 xonali kvartira Mirobodda',
    price: 55000,
    rooms: 1,
    area: 45,
    district: 'Mirobod',
    address: 'Mirobod tumani, Furqat ko\'chasi',
    description: 'Markaz, barcha qulayliklar yaqin. Metro yonida.',
    type: 'studio',
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80'
    ],
    latitude: 41.3111,
    longitude: 69.2797,
    features: ['Metro yaqin', 'Markaz', 'Remont', 'Xavfsizlik'],
    contact: {
      phone: '+998901234570',
      name: 'Dilshod'
    }
  },
  {
    id: '5',
    title: '4 xonali uy Qibrayda',
    price: 120000,
    rooms: 4,
    area: 150,
    district: 'Qibray',
    address: 'Qibray tumani, Navbahor MFY',
    description: 'Keng hovli, yashil zona, tinch muhit. Oilalar uchun ideal.',
    type: 'house',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    ],
    latitude: 41.3836,
    longitude: 69.4747,
    features: ['Hovli', 'Yashil zona', 'Garaj', 'Bog\''],
    contact: {
      phone: '+998901234571',
      name: 'Otabek'
    }
  },
  {
    id: '6',
    title: '3 xonali kvartira Yakkasaroyda',
    price: 88000,
    rooms: 3,
    area: 78,
    district: 'Yakkasaroy',
    address: 'Yakkasaroy tumani, Xamza ko\'chasi',
    description: 'Zamonaviy remont, barcha jihozlar mavjud. Parklar yaqin.',
    type: 'apartment',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800&q=80'
    ],
    latitude: 41.2995,
    longitude: 69.2401,
    features: ['Zamonaviy remont', 'Parklar yaqin', 'Jihozlangan', 'Konditsioner'],
    contact: {
      phone: '+998901234572',
      name: 'Bekzod'
    }
  }
];
