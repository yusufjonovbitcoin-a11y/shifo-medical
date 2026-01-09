import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
