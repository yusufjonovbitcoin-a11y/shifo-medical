# Database Setup Guide

## 1. PostgreSQL Database yaratish

### Windows uchun:

1. **PostgreSQL o'rnatilganligini tekshiring:**
   ```powershell
   psql --version
   ```

2. **PostgreSQL'ga ulaning va database yarating:**
   ```powershell
   psql -U postgres
   ```
   
   Keyin PostgreSQL terminalida:
   ```sql
   CREATE DATABASE shifokor_lda;
   \q
   ```

3. **Yoki pgAdmin orqali:**
   - pgAdmin'ni oching
   - Databases > Create > Database
   - Name: `shifokor_lda`
   - Save

### Linux/Mac uchun:

```bash
# PostgreSQL'ga ulaning
sudo -u postgres psql

# Database yarating
CREATE DATABASE shifokor_lda;

# Chiqish
\q
```

## 2. .env Faylini Yangilash

`.env` faylida `DATABASE_URL` ni o'z PostgreSQL ma'lumotlaringizga moslashtiring:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/shifokor_lda?schema=public"
```

### Misollar:

**Local PostgreSQL (default):**
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/shifokor_lda?schema=public"
```

**Remote PostgreSQL:**
```env
DATABASE_URL="postgresql://username:password@host:5432/shifokor_lda?schema=public"
```

**Supabase (Cloud):**
```env
DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public"
```

## 3. Prisma Schema'ni Database'ga Push Qilish

Database yaratilgandan va `.env` fayli to'g'ri sozlangandan keyin:

```powershell
# Prisma Client generatsiya
npm run db:generate

# Schema'ni database'ga push qilish
npm run db:push

# Yoki migration yaratish (production uchun tavsiya etiladi)
npm run db:migrate
```

## 4. Database'ni Tekshirish

Prisma Studio orqali database'ni ko'rish:

```powershell
npm run db:studio
```

Bu http://localhost:5555 da Prisma Studio'ni ochadi.

## 5. Admin User Yaratish

Database yaratilgandan keyin, admin user yaratish uchun seed script yaratish mumkin yoki Prisma Studio orqali qo'shish mumkin.

## Troubleshooting

### Xatolik: "Connection refused"
- PostgreSQL serverni ishga tushirganingizni tekshiring
- Windows: Services > postgresql-x64-XX > Start

### Xatolik: "Authentication failed"
- `.env` faylida username va password to'g'ri ekanligini tekshiring
- PostgreSQL'da user yaratilganligini tekshiring

### Xatolik: "Database does not exist"
- Database yaratilganligini tekshiring:
  ```sql
  \l
  ```
- Agar yo'q bo'lsa, yarating:
  ```sql
  CREATE DATABASE shifokor_lda;
  ```

## Production Deployment

Production'da environment variables'ni platform'ingiz (Vercel, Railway, Heroku) orqali sozlang:

- `DATABASE_URL` - Production database URL
- `NEXTAUTH_SECRET` - Random secret key (32+ characters)
- `NEXTAUTH_URL` - Production URL (https://yourdomain.com)


