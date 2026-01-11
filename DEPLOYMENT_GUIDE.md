# 🚀 Production Deployment Guide - Internetga Chiqarish

## 📋 Umumiy Ko'rinish

Bu loyiha 2 qismdan iborat:
1. **Frontend** (Next.js) - Vercel'da deploy qilinadi
2. **Backend** (Node.js/Express) - Alohida hosting'da deploy qilinadi

---

## 🎯 Qadam 1: Backend Serverni Deploy Qilish (AI Chat uchun)

Backend serverni avval deploy qilish kerak, chunki frontend unga bog'lanishi kerak.

### Variant A: Render (Tavsiya etiladi - Bepul va Oson) 🚀

1. **Render Account Yaratish**
   - [render.com](https://render.com) ga kiring
   - GitHub orqali ro'yxatdan o'ting

2. **Yangi Web Service Yaratish**
   - "New +" > "Web Service"
   - GitHub repository ni tanlang
   - Settings:
     - **Name**: `shifo-backend` (ixtiyoriy)
     - **Root Directory**: `server` ✨ (MUHIM!)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free tanlang (bepul)

3. **Environment Variables Qo'shish**
   Render Dashboard > Service > Environment ga kiring:

   ```
   PORT=3002
   OPENAI_API_KEY=your-openai-api-key-here
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   TELEGRAM_ADMIN_ID=your-telegram-admin-id
   ```

4. **Deploy**
   - "Create Web Service" tugmasini bosing
   - Render avtomatik deploy qiladi
   - Deploy bo'lgandan keyin, sizga URL beriladi (masalan: `https://shifo-medical-1.onrender.com`)
   - Bu URL ni eslab qoling - frontend'da ishlatamiz!

### Variant C: VPS (Agar o'zingizning serveringiz bo'lsa) 🖥️

Agar VPS (Virtual Private Server) ishlatsangiz:

```bash
# Serverni tayyorlash
cd /var/www
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/server
npm install

# PM2 orqali ishga tushirish (tavsiya etiladi)
npm install -g pm2
pm2 start index.js --name shifo-backend
pm2 save
pm2 startup

# Nginx reverse proxy sozlash (HTTPS uchun)
# /etc/nginx/sites-available/shifo-backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🎨 Qadam 2: Frontend'ni Deploy Qilish (Next.js)

### Vercel'da Deploy (Tavsiya etiladi) ⚡

1. **Vercel Account Yaratish**
   - [vercel.com](https://vercel.com) ga kiring
   - GitHub orqali ro'yxatdan o'ting

2. **Yangi Project Yaratish**
   - "Add New Project" tugmasini bosing
   - GitHub repository ni tanlang
   - Project Settings:
     - **Framework Preset**: Next.js (avtomatik aniqlanadi)
     - **Root Directory**: `./` (default)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)

3. **Environment Variables Qo'shish**
   Vercel Dashboard > Project > Settings > Environment Variables ga kiring:

   ```
   NEXT_PUBLIC_AI_CHAT_API_URL=https://your-backend-url.onrender.com/ai-chat
   ```

   ⚠️ **MUHIM**: `your-backend-url.onrender.com` o'rniga o'zingizning backend URL'ingizni qo'ying!

   Qo'shimcha environment variables (agar kerak bo'lsa):
   ```
   DATABASE_URL=your-database-url
   NEXTAUTH_URL=https://your-frontend-url.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   NODE_ENV=production
   ```

4. **Deploy**
   - "Deploy" tugmasini bosing
   - 2-3 minutdan so'ng sayt internetda bo'ladi! ✅
   - Vercel sizga URL beradi (masalan: `https://your-project.vercel.app`)

---

## 🔗 Qadam 3: Frontend va Backend'ni Bog'lash

### Frontend'dagi API URL'ni yangilash

Backend deploy bo'lgandan keyin, frontend'dagi `NEXT_PUBLIC_AI_CHAT_API_URL` environment variable'ni yangilash kerak.

**Vercel Dashboard'da:**
1. Project > Settings > Environment Variables
2. `NEXT_PUBLIC_AI_CHAT_API_URL` ni toping
3. Value'ni backend URL'ingizga o'zgartiring (masalan: `https://your-backend.onrender.com/ai-chat`)
4. "Redeploy" tugmasini bosing

---

## ✅ Tekshirish

1. **Frontend'ni Tekshirish**
   - Vercel URL'ini browser'da oching
   - Barcha sahifalar ishlayotganini tekshiring
   - Mobile qurilmalarda ham tekshiring

2. **Backend'ni Tekshirish**
   - Backend URL'ini browser'da oching (masalan: `https://your-backend.onrender.com/`)
   - JSON response ko'rinishi kerak: `{"message": "Shifo AI Chat API", ...}`

3. **AI Chat'ni Tekshirish**
   - Frontend'da AI Chat widget'ini oching
   - Xabar yuborishni sinab ko'ring
   - AI javob berayotganini tekshiring

---

## 🌐 Custom Domain Qo'shish (Ixtiyoriy)

### Frontend Domain (Vercel)

1. Vercel Dashboard > Project > Settings > Domains
2. Domain nomingizni kiriting (masalan: `shifokor.uz`)
3. DNS sozlamalarini to'g'rilang (Vercel ko'rsatmalari bo'yicha):
   - A record yoki CNAME record qo'shing
   - Vercel'ning ko'rsatgan IP yoki CNAME'ini ishlating

### Backend Domain (Render)

1. Render Dashboard > Service > Settings > Custom Domain
2. Custom domain qo'shing
3. DNS sozlamalarini to'g'rilang (masalan: `api.shifokor.uz`)

**Frontend'dagi environment variable'ni yangilash:**
```
NEXT_PUBLIC_AI_CHAT_API_URL=https://api.shifokor.uz/ai-chat
```

---

## 🔄 Yangilanishlar

### Frontend (Vercel)
- GitHub'ga push qilsangiz, Vercel avtomatik deploy qiladi (auto-deploy)
- Yoki manual: Vercel Dashboard > Project > Deployments > "Redeploy"

### Backend (Render)
- GitHub'ga push qilsangiz, Render avtomatik deploy qiladi
- Yoki manual: Dashboard'dan "Manual Deploy" tugmasini bosing

---

## 🔐 Xavfsizlik

### Environment Variables

⚠️ **MUHIM**: Quyidagi ma'lumotlarni hech qachon GitHub'ga commit qilmang!

- `OPENAI_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ADMIN_ID`
- `NEXTAUTH_SECRET`
- `DATABASE_URL` (agar bor bo'lsa)

Bularni faqat hosting platform'larining Environment Variables bo'limiga qo'shing!

### .gitignore Tekshirish

`.gitignore` faylida quyidagilar bo'lishi kerak:
```
.env
.env*.local
.env.development.local
.env.test.local
.env.production.local
server/.env
```

---

## 📱 Mobile da Tekshirish

1. Deploy qilingan URL'ni mobil telefonda oching
2. Barcha funksiyalar ishlayotganini tekshiring
3. AI Chat widget'ini sinab ko'ring
4. Performance ni tekshiring

---

## 🆘 Muammolar va Yechimlar

### Backend xatosi: "Failed to fetch"

**Sabab**: Frontend backend'ga bog'lana olmayapti

**Yechim**:
1. Backend URL'ini tekshiring (browser'da ochib ko'ring)
2. `NEXT_PUBLIC_AI_CHAT_API_URL` ni to'g'ri sozlang
3. CORS sozlamalarini tekshiring (backend'da `cors` package ishlatilgan)
4. Backend serverni qayta deploy qiling

### Build xatosi

**Sabab**: Environment variables to'g'ri sozlanmagan

**Yechim**:
1. Vercel/Render Dashboard'da environment variables ni tekshiring
2. Barcha kerakli variable'lar qo'shilganini tekshiring
3. Build loglarni o'qing va xatolarni tuzating

### AI Chat ishlamayapti

**Sabab**: Backend ishlamayapti yoki API URL noto'g'ri

**Yechim**:
1. Backend URL'ini browser'da ochib ko'ring
2. `OPENAI_API_KEY` to'g'ri ekanligini tekshiring
3. Browser console'da xatolarni ko'ring
4. Backend loglarini tekshiring (Render Dashboard > Service > Logs)

---

## 📊 Monitoring (Ixtiyoriy)

### Render
- Render Dashboard'da avtomatik monitoring mavjud
- Loglar va metrics ko'rish mumkin (Service > Logs)

### Vercel
- Vercel Dashboard'da analytics va monitoring mavjud
- Performance metrics ko'rish mumkin

---

## 🎉 Tugadi!

Agar barcha qadamlarni bajarsangiz, saytingiz endi internetda! 🚀

**Deploy qilingan URL'lar:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.onrender.com`

Savollar bo'lsa, hujjatlarni qayta ko'rib chiqing yoki hosting platform'larning qo'llanmalariga qarang.

