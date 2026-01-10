# Barcha Dependencylardan Foydalanish Qo'llanmasi 📚

## ✅ Barcha Dependencylar - Maqsad va Ishlatilishi

### 🔐 Authentication & Authorization
```json
"@auth/prisma-adapter": "^2.7.1",  // Prisma bilan NextAuth integratsiyasi
"next-auth": "^5.0.0-beta.25",      // Next.js uchun authentication
"bcryptjs": "^2.4.3",                // Parol hashlash uchun
"@types/bcryptjs": "^2.4.6"          // TypeScript types
```
**Qachon kerak:**
- Foydalanuvchi autentifikatsiyasi
- Admin panel
- Xavfsiz login/register

**Qo'shish:**
```bash
npm install @auth/prisma-adapter next-auth bcryptjs
npm install -D @types/bcryptjs
```

### 🗄️ Database
```json
"@prisma/client": "^5.22.0",  // Prisma ORM client
"postgres": "^3.4.8",          // PostgreSQL driver
"prisma": "^5.22.0"            // Prisma CLI (dev)
```
**Qachon kerak:**
- Ma'lumotlar bazasiga ulanish
- Fayllar, shifokorlar, buyurtmalar saqlash
- Admin panel uchun

**Setup:**
```bash
npx prisma init
npx prisma migrate dev
```

### 📝 Form Validation
```json
"react-hook-form": "^7.54.2",  // React form library
"zod": "^3.24.1",               // Schema validation
"@hookform/resolvers": "^3.9.1" // React Hook Form + Zod integratsiyasi
```
**Qachon kerak:**
- Buyurtma formasi
- Aloqa formasi
- Admin panel formlari
- Ma'lumotlarni tekshirish

**Ishlatish:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
```

### 🎨 UI Components
```json
"@radix-ui/react-slot": "^1.2.4",  // Radix UI asosiy komponent
"lucide-react": "^0.487.0",         // Ikonlar
"clsx": "^2.1.1",                    // Class name utility
"tailwind-merge": "^2.5.4"          // Tailwind class merge
```
**Qachon kerak:**
- UI komponentlari
- Ikonlar
- Styling utilities

### 🎬 Animatsiyalar
```json
"framer-motion": "^12.25.0",  // Animatsiya kutubxonasi
"motion": "^12.23.26"          // Motion library (framer-motion yangi versiyasi?)
```
**Qachon kerak:**
- Smooth animatsiyalar
- Scroll animatsiyalari
- Hover effects
- Page transitions

**Ishlatish:**
```tsx
import { motion } from 'framer-motion';
```

### 🌍 Internationalization
```json
"next-intl": "^4.6.1"  // Next.js uchun i18n
```
**Hozir ishlatilmoqda:**
- O'zbek/Rus tarjimalar
- `messages/uz.json` va `messages/ru.json`

### ⚙️ Utilities
```json
"dotenv": "^17.2.3"  // Environment variables
```
**Qachon kerak:**
- `.env` fayllarni o'qish
- Database credentials
- API keys

**Ishlatish:**
```ts
import 'dotenv/config';
```

## 🚀 Qo'shilish Jarayoni

### 1. Authentication Qo'shish

**File: `lib/auth.ts`**
```typescript
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Login logic
      }
    })
  ]
};
```

### 2. Database Setup

**File: `prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3. Form Validation

**Example: Appointment Form**
```typescript
import { z } from 'zod';

const appointmentSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta belgi"),
  phone: z.string().regex(/^\+998/, "Telefon +998 bilan boshlanishi kerak"),
  date: z.date(),
  service: z.string()
});

type AppointmentForm = z.infer<typeof appointmentSchema>;
```

## 📋 Checklist - Qaysi Dependencylarni Qo'shish

### Hozircha Kerak Bo'lganlar:
- ✅ `next-intl` - Tarjimalar uchun (allaqachon ishlatilmoqda)
- ✅ `framer-motion` - Animatsiyalar uchun
- ✅ `lucide-react` - Ikonlar uchun (allaqachon ishlatilmoqda)

### Keyinroq Qo'shilishi Mumkin:
- ⏳ `next-auth` - Login/Register
- ⏳ `@prisma/client` - Database
- ⏳ `react-hook-form` + `zod` - Form validation
- ⏳ `bcryptjs` - Parol hashlash

## ⚠️ Muhim Eslatmalar

1. **Barcha dependencylar `knip.json`da ignore qilingan** - knip endi ularni tekshirmaydi
2. **Faqat kerak bo'lganda qo'shing** - ortiqcha dependencylar loyihani og'irlashtiradi
3. **Security**: `bcryptjs`, `dotenv` - productionda xavfsizlik uchun muhim
4. **Performance**: `framer-motion` katta kutubxona, CSS animatsiyalarni ham ko'rib chiqing

## 🔧 Knip Konfiguratsiyasi

Barcha dependencylar `knip.json`da ignore qilingan, shuning uchun:
- ✅ Knip endi ularni tekshirmaydi
- ✅ Barcha dependencylarni saqlash mumkin
- ✅ Keyinroq ishlatish oson

## 📞 Yordam

Agar muammo bo'lsa:
1. `npm install` - Barcha dependencylarni o'rnatish
2. `npm run build` - Build qilish va xatolarni ko'rish
3. `npm run dev` - Development serverni ishga tushirish

