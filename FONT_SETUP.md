# Font Setup Instructions

## Muammo
Agar dizayn buzilgan ko'rinayotgan bo'lsa, bu fontlar yuklanmaganligi sababli bo'lishi mumkin.

## Yechim

### 1. Buildni internet bilan qayta ishga tushiring

Next.js `next/font/google` fontlarni build vaqtida yuklab oladi va mahalliy xost qiladi. Shuning uchun birinchi marta build qilishda internet kerak:

```bash
npm run build
```

### 2. Fontlar avtomatik yuklanadi

Build jarayonida Next.js:
- Google Fonts'dan Inter fontini yuklaydi
- Fontlarni `.next` papkasiga saqlaydi
- Mahalliy xost qiladi (tashqi internet kerak emas)

### 3. Fallback fontlar

Agar fontlar yuklanmasa, quyidagi fallback fontlar ishlatiladi:
- system-ui
- -apple-system
- BlinkMacSystemFont
- 'Segoe UI'
- sans-serif

## Tekshirish

1. `.next` papkasida font fayllari borligini tekshiring
2. Browser DevTools'da Network tabida tashqi CSS yuklanishini tekshiring
3. Agar hali ham muammo bo'lsa, `.next` papkasini o'chirib, qayta build qiling:

```bash
rm -rf .next
npm run build
```

## Eslatma

- Fontlar build vaqtida yuklanadi, runtime'da emas
- Bir marta build qilingandan keyin, internet kerak emas
- Barcha CSS fayllar mahalliy (tashqi CDN yo'q)






