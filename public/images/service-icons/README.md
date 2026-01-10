# Service Icons - Bo'limlar Ikon Rasmlari

Bu papka bo'limlar (xizmatlar) uchun ikon rasmlarini saqlash uchun ishlatiladi.

## Qo'shish

Har bir bo'lim uchun mos ikon rasmini ushbu papkaga qo'shing. Fayl nomlari quyidagicha bo'lishi kerak:

- `urologiya.png` - Урология bo'limi uchun
- `ginekologiya.png` - Гинекология bo'limi uchun
- `nevrologiya.png` - Неврология bo'limi uchun
- `proktologiya.png` - Проктология bo'limi uchun
- `otorinolaringologiya.png` - Оториноларингология bo'limi uchun
- `vyzov-vracha.png` - Вызов врача на дому uchun
- `laboratoriya.png` - Лаборатория uchun
- `mammologiya.png` - Маммология uchun
- `stomatologiya.png` - Стоматология uchun
- `uzi.png` - УЗИ Исследования uchun
- `ekg.png` - Электрокардиография uchun

## Format

- **Format**: PNG yoki SVG (PNG tavsiya qilinadi)
- **O'lchami**: 512x512 piksel yoki undan katta (yuklanish vaqtida avtomatik o'lchamlanadi)
- **Fon**: Shaffof (transparent background)
- **Ranglar**: Oq rang yoki gradient fon ustida ko'rinadigan ranglar (chunki ikonlar gradient fon ustida ko'rsatiladi)

## Qo'llash

Ikon rasmlar `data/services.ts` faylida har bir xizmat uchun `iconImage` maydoni orqali belgilanadi:

```typescript
{
  icon: Droplets,
  title: "Урология",
  description: "...",
  price: "Консультация",
  gradient: "from-blue-500 to-cyan-500",
  iconImage: "/images/service-icons/urologiya.png", // Ikon rasmi yo'li
  // ...
}
```

Agar `iconImage` maydoni ko'rsatilsa, komponent avtomatik ravishda rasmni ko'rsatadi. Aks holda, SVG ikon yoki Lucide ikonidan foydalaniladi.

## Fallback

Agar rasm yuklanmasa yoki topilmasa, komponent avtomatik ravishda SVG ikon yoki Lucide ikoniga qaytadi (fallback).

## Eslatmalar

- Rasmlar `public/images/service-icons/` papkasida bo'lishi kerak
- Fayl yo'li `/images/service-icons/` dan boshlanadi (Next.js public papkasi)
- Barcha rasmlar avtomatik optimizatsiya qilinmaydi (`unoptimized` flag ishlatiladi)

