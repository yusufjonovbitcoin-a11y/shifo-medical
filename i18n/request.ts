import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is derived from the URL (via middleware)
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    // Set an explicit timezone to avoid extra lookups
    timeZone: 'Asia/Tashkent'
  };
});












