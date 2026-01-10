import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from '@/routing';
import "./globals.css";
import "@/src/new-ui/styles/globals.css";

export const runtime = 'edge'; // Edge Runtime - minimal latency for global users

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  // Ensure fonts are self-hosted and don't require external connections
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shifokor-lda.uz'),
  title: {
    default: "SHIFOKOR-LDA | Медицинский Центр - Самарканд",
    template: "%s | SHIFOKOR-LDA"
  },
  description: "Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.",
  keywords: [
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
  authors: [{ name: "SHIFOKOR-LDA" }],
  creator: "SHIFOKOR-LDA Medical Center",
  publisher: "SHIFOKOR-LDA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU'],
    url: 'https://shifokor-lda.uz',
    siteName: 'SHIFOKOR-LDA Medical Center',
    title: 'SHIFOKOR-LDA | Медицинский Центр - Самарканд',
    description: 'Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.',
    images: [
      {
        url: '/images/lobaratoriya/shifokor-logo.jpg.png',
        width: 1200,
        height: 630,
        alt: 'SHIFOKOR-LDA Medical Center Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHIFOKOR-LDA | Медицинский Центр',
    description: 'Современный медицинский центр в Самарканде',
    images: ['/images/lobaratoriya/shifokor-logo.jpg.png'],
  },
  alternates: {
    canonical: 'https://shifokor-lda.uz',
    languages: {
      'uz': 'https://shifokor-lda.uz/uz',
      'ru': 'https://shifokor-lda.uz/ru',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'Medical',
};

// Root layout - Next.js 15 requires html and body tags
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <head>
        {routing.locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`/${loc}`}
          />
        ))}
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
