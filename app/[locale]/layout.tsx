import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { StructuredData } from '@/components/StructuredData';

export const runtime = 'edge'; // Edge Runtime for minimal latency

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
  switch (locale) {
    case 'ru':
      return (await import('../../messages/ru.json')).default;
    case 'uz':
    default:
      return (await import('../../messages/uz.json')).default;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isUz = locale === 'uz';
  
  return {
    title: isUz 
      ? "SHIFOKOR-LDA | Tibbiy Markaz - Samarqand"
      : "SHIFOKOR-LDA | Медицинский Центр - Самарканд",
    description: isUz
      ? "Samarqanddagi zamonaviy tibbiy markaz. 50+ turdagi operatsiyalar, yuqori malakali mutaxassislar va ilg'or texnologiyalar."
      : "Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.",
    keywords: isUz
      ? [
          "tibbiy markaz",
          "shifokor",
          "Samarqand",
          "klinika",
          "operatsiya",
          "urologiya",
          "ginekologiya",
          "proktologiya",
          "LOR",
          "nevrologiya",
          "mammologiya",
          "lazerli jarrohlik",
          "laparoskopiya",
          "laboratoriya",
          "UZI",
          "fizioterapiya"
        ]
      : [
          "медицинский центр",
          "врач",
          "Самарканд",
          "клиника",
          "операция",
          "урология",
          "гинекология",
          "проктология",
          "ЛОР",
          "неврология",
          "маммология",
          "лазерная хирургия",
          "лапароскопия",
          "лаборатория",
          "УЗИ",
          "физиотерапия"
        ],
    alternates: {
      canonical: `https://shifokor-lda.uz/${locale}`,
      languages: {
        'uz': 'https://shifokor-lda.uz/uz',
        'ru': 'https://shifokor-lda.uz/ru',
      },
    },
    openGraph: {
      title: isUz
        ? "SHIFOKOR-LDA | Tibbiy Markaz - Samarqand"
        : "SHIFOKOR-LDA | Медицинский Центр - Самарканд",
      description: isUz
        ? "Samarqanddagi zamonaviy tibbiy markaz. 50+ turdagi operatsiyalar, yuqori malakali mutaxassislar va ilg'or texnologiyalar."
        : "Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.",
      url: `https://shifokor-lda.uz/${locale}`,
      siteName: 'SHIFOKOR-LDA Medical Center',
      locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU',
      alternateLocale: locale === 'uz' ? 'ru_RU' : 'uz_UZ',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Next.js 15: params must be awaited
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering for next-intl APIs in Server Components
  setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
