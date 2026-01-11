# 🚀 Ochiq Tarmoqqa Chiqarish - Eng Sodda Usul

## 📋 Umumiy Ko'rinish

Loyiha 2 qismdan iborat:
1. **Backend** (AI Chat Server) - Render'da
2. **Frontend** (Veb-sayt) - Vercel'da

---

## ⚡ 10 Daqiqada Deploy Qilish

### Qadam 1: Backend Serverni Deploy Qilish (5 daqiqa)

#### Render'da:

1. **Kirish**: [render.com](https://render.com) ga kiring
2. **Ro'yxatdan o'tish**: "Get Started" → GitHub bilan ro'yxatdan o'ting
3. **Yangi Service**: "New +" → "Web Service" tugmasini bosing
4. **Repository tanlash**: GitHub repository'ni tanlang (shifo-medical)
5. **Sozlamalar**:
   - **Name**: `shifo-backend`
   - **Root Directory**: `server` ⚠️ (MUHIM!)
   - **Start Command**: `npm start`
   - **Build Command**: `npm install` ⚠️ (MUHIM! Bo'sh qoldirmang!)
   - **Plan**: Free (bepul)

6. **"Create Web Service" tugmasini bosing**

7. **Kalitlar qo'shish** (Deploy boshlanganidan keyin):
   - Service > "Environment" bo'limiga kiring
   - "Add Environment Variable" tugmasini bosing
   - Quyidagilarni qo'shing:
   
   ```
   Key: PORT
   Value: 3002
   
   Key: OPENAI_API_KEY
   Value: YOUR_OPENAI_API_KEY_HERE (haqiqiy kalitni qo'ying!)
   
   Key: TELEGRAM_BOT_TOKEN
   Value: YOUR_TELEGRAM_BOT_TOKEN_HERE (haqiqiy kalitni qo'ying!)
   
   Key: TELEGRAM_ADMIN_ID
   Value: YOUR_TELEGRAM_ADMIN_ID_HERE (haqiqiy kalitni qo'ying!)
   ```

8. **Kutish**: 2-3 daqiqa → URL olasiz (masalan: `https://shifo-backend.onrender.com`)
   - ✅ Bu URL ni yozib qo'ying!

---

### Qadam 2: Frontend'ni Deploy Qilish (5 daqiqa)

#### Vercel'da:

1. **Kirish**: [vercel.com](https://vercel.com) ga kiring
2. **Ro'yxatdan o'tish**: GitHub bilan ro'yxatdan o'ting
3. **Yangi Project**: "Add New Project" tugmasini bosing
4. **Repository tanlash**: Xuddi shu repository'ni tanlang (shifo-medical)
5. **"Deploy" tugmasini bosing** (hech narsa o'zgartirmasdan)

6. **Deploy bo'lgandan keyin**:
   - Project > Settings > Environment Variables
   - "Add New" tugmasini bosing
   - Qo'shing:
   
   ```
   Key: NEXT_PUBLIC_AI_CHAT_API_URL
   Value: https://shifo-backend.onrender.com/ai-chat
   ```
   
   ⚠️ **`shifo-backend.onrender.com` o'rniga o'zingizning Render URL'ingizni yozing!**

7. **"Redeploy" tugmasini bosing** (Settings > Deployments bo'limida)

8. **Tugadi!** ✅ Saytingiz internetda!

---

## ✅ Tekshirish

1. **Frontend URL'ini oching** (Vercel'dan olgan URL, masalan: `https://shifo-medical.vercel.app`)
2. **AI Chat widget'ni oching**
3. **Xabar yuboring**
4. **AI javob bersa** → ✅ Ishlamoqda! 🎉

---

## 📝 Muhim Eslatmalar

### GitHub'ga Kod Yuborish

Agar hali GitHub'ga yubormagan bo'lsangiz:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Environment Variables

⚠️ **MUHIM**: Haqiqiy API kalitlarni:
- ❌ GitHub'ga yubormang!
- ✅ Faqat Render/Vercel'da Environment Variables sifatida qo'shing!

### Backend URL'ni O'zgartirish

Agar backend URL o'zgarsa:

1. Vercel Dashboard > Project > Settings > Environment Variables
2. `NEXT_PUBLIC_AI_CHAT_API_URL` ni toping
3. Value'ni yangi backend URL'ga o'zgartiring
4. "Redeploy" tugmasini bosing

---

## 🎯 Eng Sodda Variant

Agar backend'ni deploy qilish qiyin bo'lsa:

1. **Faqat frontend'ni deploy qiling** (Vercel)
2. **AI Chat ishlamaydi**, lekin sayt ishlaydi
3. **Keyinroq backend'ni deploy qilish mumkin**

---

## 🆘 Muammo bo'lsa

### Build xatosi?
- Vercel/Render Dashboard > Deployments > Logs'ni ko'ring
- Environment variables to'g'ri qo'shilganini tekshiring

### AI Chat ishlamayapti?
- Backend URL'ini browser'da ochib ko'ring (JSON ko'rinishi kerak)
- `NEXT_PUBLIC_AI_CHAT_API_URL` to'g'ri qo'yilganini tekshiring
- Vercel'da "Redeploy" qiling

### Backend URL ishlamayapti?
- Render Dashboard'da deploy muvaffaqiyatli bo'lganini tekshiring
- Environment variables to'g'ri qo'yilganini tekshiring
- Loglarni ko'ring (Render Dashboard'da)

---

## 📊 Deployment Status

**Tugagandan keyin:**

✅ Frontend: `https://your-project.vercel.app`  
✅ Backend: `https://your-backend.onrender.com`  
✅ AI Chat: Ishlamoqda (agar backend deploy qilingan bo'lsa)

---

## 🎉 Tugadi!

Endi saytingiz internetda! Har kim uni ochib ko'ra oladi! 🚀

**Batafsil qo'llanma**: `DEPLOY_ENG_SODDA.md` yoki `DEPLOYMENT_GUIDE.md` fayllarini o'qing.

