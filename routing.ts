import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['uz', 'ru'],
  defaultLocale: 'uz',
  localePrefix: 'always' // Always show locale prefix in URL: /uz, /ru
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

