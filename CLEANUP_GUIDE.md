# Loyiha Tozalash Qo'llanmasi 🧹

## Knip Natijalari Tahlili

### 📊 Umumiy Statistika
- **Ishlatilmayotgan fayllar**: 71 ta
- **Ishlatilmayotgan dependencylar**: 9 ta
- **Ro'yxatda bo'lmagan dependencylar**: 4 ta (`framer-motion`)

## 🔧 Tozalash Variantlari

### Variant 1: Minimal Tozalash (Xavfsiz) ✅

Faqat eski koddan xalos bo'ling:

```bash
# Eski Vite kodlarini o'chirish
rm -rf src/
rm -rf index.html
rm vite.config.ts

# Eski konfiguratsiyalarni o'chirish
rm i18n.ts
rm navigation.ts  
rm routing.ts

# Bo'sh admin papkasini o'chirish
rm -rf app/admin
```

### Variant 2: To'liq Tozalash (Ehtiyotkorlik bilan) ⚠️

Agar authentication/database hozircha kerak bo'lmasa:

```bash
# Eski kodlarni o'chirish (Variant 1)
rm -rf src/
rm index.html vite.config.ts i18n.ts navigation.ts routing.ts
rm -rf app/admin

# Dependencylarni o'chirish (agar keyinroq kerak bo'lsa, qayta o'rnatish oson)
npm uninstall @auth/prisma-adapter @prisma/client @radix-ui/react-slot
npm uninstall bcryptjs dotenv next-auth postgres react-hook-form zod
npm uninstall -D @hookform/resolvers @types/bcryptjs
```

### Variant 3: Faqat E'lon Qilish (Hozircha o'chirmaslik) ✅✅✅

`knip.json` konfiguratsiyasida ignore qilish (allaqachon qilindi):

```json
{
  "ignore": [
    "src/**",
    "components/icons/**",
    "app/[locale]/globals.css",
    "i18n.ts",
    "navigation.ts",
    "vite.config.ts",
    "routing.ts"
  ]
}
```

## 📁 Fayl Strukturasi - Hozirgi Holat

### ✅ Ishlayotgan (Asosiy):
```
app/
├── [locale]/
│   ├── page.tsx        # Asosiy sahifa
│   ├── layout.tsx      # Layout
│   └── globals.css     # Stililar
components/
├── Hero.tsx            # Hero section
├── Services.tsx        # Xizmatlar
├── Doctors.tsx         # Shifokorlar
├── Footer.tsx          # Footer
└── ...
messages/
├── uz.json             # O'zbek tarjima
└── ru.json             # Rus tarjima
```

### ❌ Ishlatilmayotgan (Eski):
```
src/                    # Vite + React (eski)
index.html              # Vite HTML
vite.config.ts          # Vite konfiguratsiyasi
i18n.ts                 # Eski i18n
navigation.ts           # Eski navigatsiya
routing.ts              # Eski routing
```

## 🎯 Tavsiyalar

### Darhol Qilish Kerak:
1. ✅ `knip.json` yaratildi va konfiguratsiya qilindi
2. 🔄 `knip`ni qayta ishga tushiring: `knip`
3. 🤔 Qaror qiling: Variant 1, 2 yoki 3?

### Keyinroq:
- Agar authentication kerak bo'lsa, `next-auth` va `@auth/prisma-adapter`ni saqlang
- Agar database kerak bo'lsa, `@prisma/client` va `postgres`ni saqlang
- Agar form validation kerak bo'lsa, `react-hook-form` va `zod`ni saqlang

## ⚠️ Ehtiyotkorlik

**O'chirishdan oldin:**
- Backup qiling: `git commit -am "Before cleanup"`
- Dependencylarni o'chirishdan oldin, ularning kerakligini tekshiring
- Agar shubhangiz bo'lsa, faqat `knip.json`da ignore qiling

## 📝 Keyingi Qadamlar

1. `knip`ni qayta ishga tushiring va natijalarni ko'ring
2. Kerakli fayllarni saqlashni hal qiling
3. O'chirishni boshlashdan oldin backup qiling
4. Qadma-baqadam o'chiring va test qiling

