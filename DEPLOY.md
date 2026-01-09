# 🚀 Internetga Deploy Qilish - Deploy Guide

## 📋 Vercel orqali Deploy (Eng Oson)

### 1. Vercel Account Yaratish
1. [vercel.com](https://vercel.com) ga kiring
2. "Sign Up" tugmasini bosing
3. GitHub, GitLab yoki Email orqali ro'yxatdan o'ting

### 2. GitHub ga Kod Yuborish (Agar GitHub ishlatmoqchi bo'lsangiz)

```bash
# Git ni initialize qiling (agar hali qilmagan bo'lsangiz)
git init

# GitHub da yangi repository yarating, keyin:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Kodlarni qo'shing va commit qiling
git add .
git commit -m "Initial commit - Medical Center Website"

# GitHub ga yuboring
git push -u origin main
```

### 3. Vercel ga Deploy Qilish

#### Variant A: GitHub Repository orqali (Tavsiya etiladi)
1. Vercel dashboard ga kiring
2. "Add New Project" tugmasini bosing
3. GitHub repository ni tanlang
4. Project Settings:
   - **Framework Preset**: Next.js (avtomatik aniqlanadi)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. "Deploy" tugmasini bosing
6. 1-2 minutdan so'ng sayt internetda bo'ladi! ✅

#### Variant B: Vercel CLI orqali (To'g'ridan-to'g'ri kompyuterdan)

```bash
# Vercel CLI ni o'rnating
npm install -g vercel

# Login qiling
vercel login

# Deploy qiling
vercel

# Production deploy uchun
vercel --prod
```

### 4. Custom Domain Qo'shish (Ixtiyoriy)
1. Vercel dashboard > Project > Settings > Domains
2. Domain nomingizni kiriting (masalan: `shifokor.uz`)
3. DNS sozlamalarini to'g'rilang (Vercel ko'rsatmalari bo'yicha)

---

## 🌐 Netlify orqali Deploy (Alternative)

### 1. Netlify Account Yaratish
1. [netlify.com](https://netlify.com) ga kiring
2. "Sign up" tugmasini bosing

### 2. Deploy Qilish

#### Variant A: GitHub Repository orqali
1. "Add new site" > "Import an existing project"
2. GitHub repository ni tanlang
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. "Deploy site" tugmasini bosing

#### Variant B: Netlify CLI
```bash
# Netlify CLI ni o'rnating
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## 🔧 Environment Variables (Agar kerak bo'lsa)

Agar environment variables kerak bo'lsa:
1. Vercel/Netlify dashboard > Project > Settings > Environment Variables
2. Key va Value qo'shing
3. Build ni qayta ishga tushiring

---

## ✅ Tekshirish

Deploy qilinganidan keyin:
1. Vercel/Netlify sizga URL beradi (masalan: `your-project.vercel.app`)
2. Bu URL ni browser da oching
3. Sayt ishlayotganini tekshiring
4. Mobile qurilmalarda ham tekshiring

---

## 🔄 Yangilanishlar

Har safar kodni yangilaganingizda:
- **GitHub orqali**: Automatically deploy bo'ladi (auto-deploy)
- **CLI orqali**: `vercel` yoki `netlify deploy --prod` buyrug'ini ishlating

---

## 📱 Mobile da Tekshirish

1. Deploy qilingan URL ni mobil telefonda oching
2. Barcha funksiyalar ishlayotganini tekshiring
3. Performance ni tekshiring

---

## ⚠️ Muhim Eslatmalar

1. **.env fayllar**: `.env` fayllarni `.gitignore` ga qo'shing va Vercel/Netlify Settings da Environment Variables sifatida qo'shing

2. **Image Optimization**: Unsplash rasmlar ishlaydi, lekin production da o'z rasmlaringizni `public/` papkasiga qo'ying

3. **Custom Domain**: DNS sozlamalarini to'g'ri qiling

4. **SSL Certificate**: Vercel va Netlify avtomatik SSL beradi (HTTPS)

---

## 🆘 Muammolar bo'lsa

1. **Build xatosi**: Build loglarni tekshiring
2. **404 error**: Routing ni tekshiring
3. **Image yuklanmayapti**: Image domain ni `next.config.js` da qo'shing


