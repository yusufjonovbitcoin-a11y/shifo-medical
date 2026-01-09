import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { routing } from '@/routing';
import "./globals.css";
import "@/src/new-ui/styles/globals.css";

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
  title: "SHIFOKOR-LDA | Медицинский Центр - Самарканд",
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
    "маммология"
  ],
  authors: [{ name: "SHIFOKOR-LDA" }],
  robots: {
    index: true,
    follow: true,
  },
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
