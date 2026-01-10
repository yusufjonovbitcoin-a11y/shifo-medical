import { doctorsData } from '@/data/doctors';
import { services } from '@/data/services';

interface StructuredDataProps {
  locale: string;
}

export async function StructuredData({ locale }: StructuredDataProps) {
  // Medical Business Schema (LocalBusiness + MedicalBusiness)
  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": "SHIFOKOR-LDA Medical Center",
    "alternateName": locale === 'uz' ? "SHIFOKOR-LDA Tibbiy Markaz" : "Медицинский Центр SHIFOKOR-LDA",
    "description": locale === 'uz' 
      ? "Samarqanddagi zamonaviy tibbiy markaz. 50+ turdagi operatsiyalar, yuqori malakali mutaxassislar va ilg'or texnologiyalar."
      : "Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.",
    "url": "https://shifokor-lda.uz",
    "telephone": ["+998662353344", "+998662350713"],
    "email": "info@shifokor-lda.uz",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locale === 'uz' ? "Termezskaya ko'chasi 67А" : "ул. Термезская 67А",
      "addressLocality": locale === 'uz' ? "Samarqand" : "Самарканд",
      "addressRegion": locale === 'uz' ? "Samarqand viloyati" : "Самаркандская область",
      "addressCountry": "UZ",
      "postalCode": "140100"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.6542",
      "longitude": "66.9597"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "16:30"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Card", "Bank Transfer"],
    "currenciesAccepted": "UZS",
    "medicalSpecialty": [
      "Urology",
      "Gynecology",
      "Proctology",
      "Neurology",
      "ENT",
      "Cardiology",
      "Mammology",
      "Laboratory",
      "Ultrasound",
      "Physiotherapy"
    ],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "12+"
    },
    "founder": {
      "@type": "Person",
      "name": "SHIFOKOR-LDA"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150+",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/shifokor-lda",
      "https://www.instagram.com/shifokor_lda",
      "https://t.me/shifokor_lda"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "SHIFOKOR-LDA Medical Center",
    "alternateName": "SHIFOKOR-LDA",
    "url": "https://shifokor-lda.uz",
    "logo": "https://shifokor-lda.uz/images/lobaratoriya/shifokor-logo.jpg.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998662353344",
      "contactType": "Customer Service",
      "areaServed": "UZ",
      "availableLanguage": ["uz", "ru"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locale === 'uz' ? "Termezskaya ko'chasi 67А" : "ул. Термезская 67А",
      "addressLocality": locale === 'uz' ? "Samarqand" : "Самарканд",
      "addressCountry": "UZ"
    }
  };

  // Service Schema (aggregate)
  const servicesList = services.map((service) => ({
    "@type": "MedicalProcedure",
    "name": service.title,
    "description": service.description,
    "procedureType": service.title,
    "medicalSpecialty": {
      "@type": "MedicalSpecialty",
      "name": service.title
    }
  }));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === 'uz' ? "Tibbiy xizmatlar" : "Медицинские услуги",
    "description": locale === 'uz' 
      ? "SHIFOKOR-LDA tibbiy markazining barcha xizmatlari ro'yxati"
      : "Список всех услуг медицинского центра SHIFOKOR-LDA",
    "numberOfItems": services.length,
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MedicalProcedure",
        "name": service.title,
        "description": service.description
      }
    }))
  };

  // Doctor Schema (aggregate)
  const doctorsList = doctorsData.map((doctor) => ({
    "@type": "Physician",
    "name": doctor.name,
    "medicalSpecialty": {
      "@type": "MedicalSpecialty",
      "name": doctor.specialtyKey
    },
    "experienceYears": doctor.experienceYears
  }));

  const doctorSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": locale === 'uz' ? "Shifokorlar" : "Врачи",
    "description": locale === 'uz' 
      ? "SHIFOKOR-LDA tibbiy markazining shifokorlari ro'yxati"
      : "Список врачей медицинского центра SHIFOKOR-LDA",
    "numberOfItems": doctorsData.length,
    "itemListElement": doctorsData.map((doctor, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Physician",
        "name": doctor.name,
        "medicalSpecialty": {
          "@type": "MedicalSpecialty",
          "name": doctor.specialtyKey
        },
        "yearsOfExperience": doctor.experienceYears,
        "worksFor": {
          "@type": "MedicalBusiness",
          "name": "SHIFOKOR-LDA Medical Center"
        }
      }
    }))
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'uz' ? "Bosh sahifa" : "Главная",
        "item": `https://shifokor-lda.uz/${locale}`
      }
    ]
  };

  const schemas = [
    medicalBusinessSchema,
    organizationSchema,
    serviceSchema,
    doctorSchema,
    breadcrumbSchema
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  );
}

