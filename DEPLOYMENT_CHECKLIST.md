# ✅ Deployment Checklist - Internetga Chiqarish Ro'yxati

## 📋 Deploy qilishdan oldin tekshirilishi kerak

### 🔐 Xavfsizlik

- [ ] `.env` fayllar `.gitignore` ga qo'shilgan
- [ ] `server/.env` fayl `.gitignore` ga qo'shilgan
- [ ] Environment variables GitHub'ga commit qilinmagan
- [ ] API keys va secret'lar xavfsiz saqlangan

### 📦 Frontend (Next.js)

- [ ] `npm run build` xatosiz ishlaydi
- [ ] Barcha environment variables `.env.example` da ko'rsatilgan
- [ ] `NEXT_PUBLIC_AI_CHAT_API_URL` to'g'ri sozlangan
- [ ] Image'lar to'g'ri yuklangan
- [ ] Mobile responsive ishlaydi
- [ ] Barcha sahifalar ishlaydi

### 🖥️ Backend (Node.js Server)

- [ ] `server/` papkasida `npm install` xatosiz ishlaydi
- [ ] `server/index.js` ishlaydi
- [ ] `server/.env` fayl `.gitignore` ga qo'shilgan
- [ ] Barcha environment variables `server/env.example` da ko'rsatilgan:
  - [ ] `PORT`
  - [ ] `OPENAI_API_KEY`
  - [ ] `TELEGRAM_BOT_TOKEN`
  - [ ] `TELEGRAM_ADMIN_ID`

### 🔗 Bog'lanish

- [ ] Backend URL frontend'ga to'g'ri qo'shilgan
- [ ] CORS sozlamalari to'g'ri
- [ ] API endpoint'lar ishlaydi

---

## 🚀 Deployment Qadamlari

### Qadam 1: Backend Serverni Deploy Qilish

- [ ] Railway/Render/VPS'da account yaratildi
- [ ] Repository GitHub'ga push qilindi
- [ ] Backend service yaratildi (Railway/Render/VPS)
- [ ] Root directory: `server` sozlandi
- [ ] Environment variables qo'shildi:
  - [ ] `PORT=3002`
  - [ ] `OPENAI_API_KEY=...`
  - [ ] `TELEGRAM_BOT_TOKEN=...`
  - [ ] `TELEGRAM_ADMIN_ID=...`
- [ ] Backend deploy qilindi
- [ ] Backend URL olingan (masalan: `https://your-backend.railway.app`)
- [ ] Backend URL browser'da tekshirildi (JSON response ko'rinishi kerak)

### Qadam 2: Frontend'ni Deploy Qilish

- [ ] Vercel'da account yaratildi
- [ ] Repository GitHub'ga push qilindi
- [ ] Vercel'da yangi project yaratildi
- [ ] Framework Preset: Next.js tanlandi
- [ ] Environment variables qo'shildi:
  - [ ] `NEXT_PUBLIC_AI_CHAT_API_URL=https://your-backend.railway.app/ai-chat`
  - [ ] (Agar kerak bo'lsa) `DATABASE_URL=...`
  - [ ] (Agar kerak bo'lsa) `NEXTAUTH_URL=...`
  - [ ] (Agar kerak bo'lsa) `NEXTAUTH_SECRET=...`
- [ ] Frontend deploy qilindi
- [ ] Frontend URL olingan (masalan: `https://your-project.vercel.app`)

### Qadam 3: Bog'lanish va Tekshirish

- [ ] Frontend URL browser'da ochildi
- [ ] Barcha sahifalar ishlaydi
- [ ] AI Chat widget ochildi
- [ ] AI Chat'da xabar yuborildi
- [ ] AI javob berayotganini tekshirildi
- [ ] Mobile qurilmalarda tekshirildi
- [ ] Performance tekshirildi

---

## 🌐 Custom Domain (Ixtiyoriy)

- [ ] Frontend domain qo'shildi (Vercel)
- [ ] Backend domain qo'shildi (Railway/Render)
- [ ] DNS sozlamalari to'g'rilandi
- [ ] SSL sertifikat avtomatik o'rnatildi
- [ ] Domain'lar ishlayotganini tekshirildi

---

## 📝 Environment Variables Ro'yxati

### Backend (Railway/Render/VPS)

```
PORT=3002
OPENAI_API_KEY=sk-proj-...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_ADMIN_ID=...
```

### Frontend (Vercel)

```
NEXT_PUBLIC_AI_CHAT_API_URL=https://your-backend.railway.app/ai-chat
```

(Agar kerak bo'lsa):
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-frontend.vercel.app
NEXTAUTH_SECRET=...
NODE_ENV=production
```

---

## 🆘 Muammolar bo'lsa

- [ ] Build loglarini tekshirish (Vercel Dashboard > Deployments)
- [ ] Backend loglarini tekshirish (Railway/Render Dashboard)
- [ ] Browser console'da xatolarni ko'rish
- [ ] Network tab'da API so'rovlarini tekshirish
- [ ] Environment variables to'g'ri qo'shilganini tekshirish

---

## ✅ Tugadi!

Agar barcha qadamlarni bajarsangiz, saytingiz endi internetda! 🎉

**Deploy qilingan URL'lar:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.railway.app`

Batafsil ko'rsatmalar: `DEPLOYMENT_GUIDE.md` faylini o'qing.

