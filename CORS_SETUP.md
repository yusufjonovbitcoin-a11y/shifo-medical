# 🔧 CORS Sozlamalari - Render va Vercel Bir-biri bilan Gaplashishi uchun

## ✅ O'zgartirishlar

Backend kod (`server/index.js`) yangilandi:

1. **CORS sozlamalari** - Vercel frontend'iga ruxsat berish
2. **PORT** - 3002 ga o'zgartirildi
3. **HOST** - 0.0.0.0 da ishlaydi

---

## 📝 Environment Variables

### Render Dashboard'da qo'shing:

```
FRONTEND_URL=https://shifo-medical.vercel.app
```

⚠️ **`shifo-medical.vercel.app` o'rniga o'zingizning Vercel URL'ingizni yozing!**

---

## 🔄 Local Development

Local'da ishlatish uchun `server/.env` faylga qo'shing:

```env
FRONTEND_URL=http://localhost:3000
```

Yoki environment variable bo'sh qoldiring (default: `https://shifo-medical.vercel.app`)

---

## ✅ Tekshirish

1. **Backend deploy qilinganini tekshiring**
2. **Frontend'ni deploy qiling**
3. **AI Chat widget'ni sinab ko'ring**
4. **Browser console'da CORS xatosi bo'lmaganini tekshiring**

---

## 🆘 Muammo bo'lsa

### CORS xatosi hali ham bor?

1. **FRONTEND_URL to'g'ri qo'yilganini tekshiring** (Render Dashboard'da)
2. **Vercel URL'ini to'g'ri kiritganingizni tekshiring**
3. **Backend'ni qayta deploy qiling** (Render'da)

### Local'da ishlamayapti?

`server/.env` faylga qo'shing:
```env
FRONTEND_URL=http://localhost:3000
```

