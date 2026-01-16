# 🏥 SHIFOKOR-LDA Tibbiy Markaz - Sayt Strukturasi

## 📁 Umumiy Struktura

```
shifo/
├── app/                    # Next.js App Router (Frontend)
├── components/             # React komponentlar
├── server/                 # Backend API (Node.js/Express)
├── data/                   # Statik ma'lumotlar
├── messages/               # Tarjimalar (i18n)
├── public/                 # Statik fayllar
└── src/                    # Qo'shimcha kodlar (eski)
```

---

## 🎯 1. FRONTEND (Next.js 16)

### 📂 `app/` - Next.js App Router

#### `app/layout.tsx` - Root Layout
- **Vazifasi:** Butun saytning asosiy layout'i
- **Funksiyalar:**
  - SEO metadata (title, description, keywords)
  - OpenGraph va Twitter cards
  - Font loading (Inter)
  - HTML/body struktura
  - Edge Runtime (tez ishlash)

#### `app/[locale]/layout.tsx` - Locale Layout
- **Vazifasi:** Har bir til uchun alohida layout
- **Funksiyalar:**
  - `next-intl` integratsiyasi
  - Tarjimalarni yuklash (uz.json, ru.json)
  - `StructuredData` komponenti (SEO)
  - `AIChatWrapper` komponenti (AI chat)
  - Locale validation

#### `app/[locale]/page.tsx` - Bosh sahifa
- **Vazifasi:** Asosiy sahifa komponentlari
- **Komponentlar:**
  - `Header` - Navigation
  - `Hero` - Hero section
  - `Features` - Xizmatlar (lazy loaded)
  - `FAQ` - Savollar (lazy loaded)
  - `Footer` - Footer
  - `ScrollToTop` - Scroll to top button

#### `app/api/chat/route.ts` - API Proxy
- **Vazifasi:** Frontend va Backend o'rtasida proxy
- **Funksiyalar:**
  - Frontend'dan so'rov olish
  - Railway backend'ga yuborish
  - Javobni qaytarish
  - Error handling

---

## 🧩 2. COMPONENTS - React Komponentlar

### `components/chat/` - AI Chat
- **AIChat.tsx** - Asosiy chat komponenti
  - Floating button (robot ikonka)
  - Chat oynasi (modal)
  - Xabar yuborish/javob olish
  - Typing indicator
  - Multi-language support

- **AIChatWrapper.tsx** - Dynamic import wrapper
  - SSR o'chirilgan
  - Code splitting

- **index.ts** - Export fayli

### `components/` - Boshqa komponentlar
- **Header.tsx** - Navigation header
- **Hero.tsx** - Hero section
- **Features.tsx** - Xizmatlar ro'yxati
- **Doctors.tsx** - Shifokorlar ro'yxati
- **FAQ.tsx** - Savollar va javoblar
- **Footer.tsx** - Footer
- **ServicesModal.tsx** - Xizmatlar modal
- **DoctorsModal.tsx** - Shifokorlar modal
- **StructuredData.tsx** - JSON-LD (SEO)
- **ScrollToTop.tsx** - Scroll to top button

---

## 🔧 3. BACKEND (Node.js/Express)

### `server/` - Backend API

#### `server/index.js` - Asosiy server
- **Vazifasi:** Express server va API endpoints
- **Funksiyalar:**
  - CORS sozlamalari
  - `/ai-chat` POST endpoint
  - Conversation history saqlash
  - Session management
  - Error handling

#### `server/aiService.js` - AI Servis
- **Vazifasi:** OpenAI integratsiyasi
- **Funksiyalar:**
  - System prompt (AI xulq-atvori)
  - OpenAI API chaqiruvi
  - Chat history boshqaruvi
  - Multi-language support
  - Error handling

#### `server/clinic-data.js` - Klinika ma'lumotlari
- **Vazifasi:** Klinika haqida ma'lumotlar
- **Ma'lumotlar:**
  - Manzil, telefon, ish vaqti
  - Xizmatlar ro'yxati
  - Shifokorlar ro'yxati
  - UZI tayyorgarlik
  - Laboratoriya tahlillari
  - Fizioterapiya xizmatlari

---

## 📊 4. DATA - Statik Ma'lumotlar

### `data/doctors.ts`
- Shifokorlar ro'yxati
- Ism (UZ, RU)
- Mutaxassislik
- Tajriba
- Jadval
- Rasm

### `data/services.ts`
- Xizmatlar ro'yxati
- Ikonka
- Sarlavha
- Tavsif
- Narx
- Batafsil ma'lumotlar

### `data/laboratoryTests.ts`
- Laboratoriya tahlillari
- Tahlil nomlari
- Kategoriyalar

---

## 🌍 5. I18N - Ko'p Tillilik

### `messages/uz.json` - O'zbek tarjimalari
### `messages/ru.json` - Rus tarjimalari

### `i18n.ts` - i18n sozlamalari
### `routing.ts` - Routing sozlamalari
### `navigation.ts` - Navigation sozlamalari

---

## 🎨 6. STYLING

### `tailwind.config.ts` - Tailwind CSS sozlamalari
### `postcss.config.js` - PostCSS sozlamalari
### `app/globals.css` - Global stillar
### `app/[locale]/globals.css` - Locale stillar

---

## 🚀 7. ISHGA TUSHIRISH

### Frontend (Next.js)
```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
```

### Backend (Node.js)
```bash
cd server
npm install          # Dependencies o'rnatish
npm start            # Server ishga tushirish
npm run dev          # Development (nodemon)
```

---

## 🔄 8. ISHLASH JARAYONI

### 1. Foydalanuvchi saytga kirsa:
```
Browser → app/[locale]/page.tsx → Komponentlar render qilinadi
```

### 2. AI Chat bosilsa:
```
AIChat.tsx → /api/chat → server/index.js → aiService.js → OpenAI API
```

### 3. Ma'lumotlar oqimi:
```
Frontend (React) → Next.js API Route → Backend (Express) → OpenAI → Javob
```

---

## 📦 9. DEPENDENCIES

### Frontend:
- **next** - Next.js framework
- **react** - React library
- **next-intl** - Internationalization
- **tailwindcss** - CSS framework
- **framer-motion** - Animatsiyalar
- **lucide-react** - Ikonkalar

### Backend:
- **express** - Web server
- **openai** - OpenAI API
- **cors** - CORS support
- **dotenv** - Environment variables
- **node-fetch** - HTTP requests

---

## 🌐 10. DEPLOYMENT

### Frontend: Vercel
- URL: `https://shifokor-lda.uz`
- Automatic deployment (Git push)
- Edge Runtime

### Backend: Railway
- URL: `https://shifo-medical-production.up.railway.app`
- Port: 3002
- Environment variables: `.env`

---

## 🔐 11. ENVIRONMENT VARIABLES

### Frontend (.env.local):
- `NEXT_PUBLIC_*` - Public variables

### Backend (server/.env):
- `OPENAI_API_KEY` - OpenAI API key
- `PORT` - Server port (default: 3002)
- `NODE_ENV` - Environment (development/production)

---

## 📱 12. RESPONSIVE DESIGN

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Tailwind CSS breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

---

## 🎯 13. SEO OPTIMIZATION

- **Metadata API** - Dynamic metadata
- **Structured Data** - JSON-LD
- **OpenGraph** - Social media
- **Twitter Cards** - Twitter sharing
- **Sitemap** - Search engines
- **Robots.txt** - Crawling rules

---

## 🔍 14. PERFORMANCE

- **Code Splitting** - Dynamic imports
- **Image Optimization** - Next.js Image
- **Edge Runtime** - Fast response
- **Lazy Loading** - Components
- **Font Optimization** - Self-hosted fonts

---

## 📝 15. FAYL TURLARI

- **.tsx** - TypeScript React components
- **.ts** - TypeScript files
- **.js** - JavaScript files
- **.json** - JSON data
- **.css** - Stylesheets
- **.md** - Markdown documentation

---

## 🎨 16. UI/UX FEATURES

- **Gradient backgrounds** - Emerald/Teal/Green
- **Smooth animations** - Framer Motion
- **Modal windows** - Services, Doctors
- **Floating chat button** - AI Chat
- **Scroll to top** - Navigation helper
- **Language switcher** - UZ/RU

---

## 🔧 17. DEVELOPMENT TOOLS

- **TypeScript** - Type safety
- **ESLint** - Code quality
- **Tailwind CSS** - Utility-first CSS
- **Next.js DevTools** - Development helpers

---

## 📚 18. QO'SHIMCHA FAYLLAR

- **README.md** - Project documentation
- **vercel.json** - Vercel configuration
- **tsconfig.json** - TypeScript config
- **next.config.js** - Next.js config
- **package.json** - Dependencies

---

## 🎯 XULOSA

Bu loyiha **Next.js 16** (App Router) va **Node.js/Express** dan iborat **full-stack** tibbiy markaz veb-sayti.

**Asosiy funksiyalar:**
- ✅ Multi-language (UZ, RU)
- ✅ AI Chat bot
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Modern UI/UX

**Arxitektura:**
- Frontend: Next.js (Vercel)
- Backend: Node.js/Express (Railway)
- AI: OpenAI GPT-4o-mini
- Database: In-memory (production'da database kerak)

