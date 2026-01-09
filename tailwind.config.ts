import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Brand colors - Full scale for new UI
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#22c55e', // primary-500
          light: '#4ade80', // primary-400
          dark: '#15803d', // primary-700
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          DEFAULT: '#0ea5e9', // secondary-500
          light: '#38bdf8', // secondary-400
          dark: '#0369a1', // secondary-700
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Keep existing Tailwind colors for gradients and utilities
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        // Mobile-first font sizes
        xs: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }], // 14px
        base: ['1rem', { lineHeight: '1.5' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.75' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // 16px on mobile
          sm: '1.5rem', // 24px on small screens
          md: '2rem', // 32px on medium screens
          lg: '4rem', // 64px on large screens
          xl: '5rem', // 80px on extra large screens
          '2xl': '6rem', // 96px on 2xl screens
        },
      },
      keyframes: {
        'slide-down': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, 0)',
          },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
