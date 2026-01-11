# 🔧 Favicon 404 Xatosi - Yechim

## ❌ Xato

Browser console'da:
```
Failed to load resource: favicon.ico (404)
```

## ✅ Yechim

### Variant 1: Favicon faylini yaratish (Tavsiya etiladi)

`public/favicon.ico` faylini yarating:

1. Har qanday rasmni `.ico` formatiga o'tkazing
2. `public/favicon.ico` nomi bilan saqlang
3. Yoki oddiy SVG yarating (Next.js avtomatik o'zgartirishi mumkin)

### Variant 2: Metadata orqali (Next.js 13+)

`app/[locale]/layout.tsx` yoki `app/layout.tsx` da `icons` qo'shing:

```typescript
export const metadata: Metadata = {
  // ... boshqa metadata
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};
```

Yoki SVG favicon uchun:

```typescript
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
},
```

---

## 🎨 Eng Oson Yo'l

1. `public/` papkasiga `favicon.ico` faylini qo'ying
2. Next.js avtomatik topadi va ishlatadi

---

## 📝 Eslatmalar

- ✅ Next.js avtomatik `public/favicon.ico` ni topadi
- ✅ Agar fayl bo'lmasa, favicon.ico qidiriladi va 404 xatosi chiqadi
- ✅ Favicon fayli `public/` papkasida bo'lishi kerak

