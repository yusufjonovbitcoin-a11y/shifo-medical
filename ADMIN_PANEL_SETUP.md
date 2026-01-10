# Admin Panel Setup Guide

## 🎯 Loyiha Arxitekturasi

Bu loyiha **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **NextAuth.js** va **PostgreSQL** texnologiyalari bilan qurilgan.

## 📦 Kerakli Dependencies

### 1. O'rnatish

```bash
npm install
```

### 2. Database Setup

#### PostgreSQL Database yaratish:

```sql
CREATE DATABASE shifokor_lda;
```

#### Environment Variables (.env faylini yarating):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/shifokor_lda?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"

# Environment
NODE_ENV="development"
```

#### NEXTAUTH_SECRET yaratish:

```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 3. Prisma Setup

```bash
# Prisma Client generatsiya qilish
npm run db:generate

# Database'ga schema push qilish (development)
npm run db:push

# Migration yaratish va bajarish (production)
npm run db:migrate

# Prisma Studio'ni ochish (database GUI)
npm run db:studio
```

## 🗄️ Database Schema

### Modellar:

1. **User** - Admin foydalanuvchilar
2. **Service** - Xizmatlar (uz/ru tillarida)
3. **ServiceTranslation** - Xizmatlar tarjimalari
4. **ServiceListItem** - Xizmatlar ro'yxati
5. **ServiceListItemTranslation** - Xizmatlar ro'yxati tarjimalari
6. **Doctor** - Shifokorlar (uz/ru tillarida)
7. **DoctorTranslation** - Shifokorlar tarjimalari
8. **Translation** - Umumiy matnlar (uz/ru)
9. **Appointment** - Uchrashuvlar (admin panelda ko'rish uchun)

### Relatsiyalar:

- `Service` ↔ `ServiceTranslation` (One-to-Many)
- `Service` ↔ `ServiceListItem` (One-to-Many)
- `ServiceListItem` ↔ `ServiceListItemTranslation` (One-to-Many)
- `Doctor` ↔ `DoctorTranslation` (One-to-Many)

## 🔧 Texnik Detallar

### Prisma Client Singleton

`lib/prisma.ts` fayli Prisma Client'ning singleton patternini implement qiladi:

```typescript
import { prisma } from '@/lib/prisma';

// Use in Server Components or API Routes
const users = await prisma.user.findMany();
```

### Type Safety

Barcha model interfeyslari Prisma Client tomonidan avtomatik generatsiya qilinadi:

```typescript
import { User, Service, Doctor } from '@prisma/client';
```

## 🚀 Keyingi Qadamlar

1. ✅ Prisma Schema yaratildi
2. ✅ Prisma Client Singleton yaratildi
3. ⏭️ NextAuth.js konfiguratsiyasi (auth.ts)
4. ⏭️ Admin panel UI komponentlari (shadcn/ui)
5. ⏭️ Validation schemalar (Zod)
6. ⏭️ API routes yaratish

## 📝 Database Seed (Ixtiyoriy)

```bash
# Seed script yaratish
touch prisma/seed.ts

# Seed bajarish
npm run db:seed
```

## 🔒 Xavfsizlik

- ✅ Password hashing (bcryptjs)
- ✅ Role-based access control (UserRole enum)
- ✅ Environment variables (.env)
- ✅ Prisma connection pooling


