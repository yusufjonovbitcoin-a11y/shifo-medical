# 🚀 Internetga Chiqarish - Sodda Qo'llanma

## 📝 Nima qilish kerak?

Loyiha 2 qismdan iborat:
1. **Frontend** (Veb-sayt) - Vercel'da
2. **Backend** (AI Chat serverni) - Render'da

---

## ⚡ Tezkor Qadamlar

### 1️⃣ Backend Serverni Chiqarish (Avval bu!)

#### Render'da (5 daqiqa)

1. **Kirish**: [render.com](https://render.com) → GitHub bilan ro'yxatdan o'ting

2. **Yangi Service**: "New +" → "Web Service" → Repository tanlang

3. **Server sozlash**:
   - **Name**: `shifo-backend` (ixtiyoriy)
   - **Root Directory**: `server` ni tanlang ✨
   - **Start Command**: `npm start`
   - **Build Command**: `npm install`
   - **Plan**: Free tanlang

4. **Kalitlar qo'shish** (Settings > Environment):
   ```
   PORT=3002
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
   TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
   TELEGRAM_ADMIN_ID=YOUR_TELEGRAM_ADMIN_ID_HERE
   ```

5. **Kutish**: 2-3 daqiqa → URL olasiz (masalan: `https://shifo-medical-1.onrender.com`)
   - ✅ Bu URL ni yozib qo'ying!

---

### 2️⃣ Veb-saytni Chiqarish (Keyin bu!)

#### Vercel'da (3 daqiqa)

1. **Kirish**: [vercel.com](https://vercel.com) → GitHub bilan ro'yxatdan o'ting

2. **Yangi loyiha**: "Add New Project" → Repository tanlang → "Deploy"

3. **Kalit qo'shish** (Settings > Environment Variables):
   ```
   NEXT_PUBLIC_AI_CHAT_API_URL=https://shifo-medical-1.onrender.com/ai-chat
   ```
   ⚠️ **`shifo-medical-1.onrender.com` o'rniga o'zingizning Render URL'ingizni yozing!**

4. **Kutish**: 2 daqiqa → URL olasiz (masalan: `https://shifo-medical.vercel.app`)
   - ✅ Tugadi! Saytingiz internetda!

---

## ✅ Tekshirish

1. **Veb-saytni oching**: Vercel URL'ini browser'da oching
2. **AI Chat'ni sinab ko'ring**: Chat widget'ni ochib, xabar yuboring
3. **Ishlayaptimi?**: AI javob bersa - hammasi yaxshi! ✅

---

## 🔧 Muammo bo'lsa

### AI Chat ishlamayapti?
- ✅ Backend URL'ini browser'da ochib ko'ring (JSON ko'rinishi kerak)
- ✅ `NEXT_PUBLIC_AI_CHAT_API_URL` to'g'ri ekanligini tekshiring
- ✅ Vercel'da "Redeploy" qiling

### Build xatosi?
- ✅ Vercel Dashboard > Deployments > Logs'ni ko'ring
- ✅ Environment variables to'g'ri qo'shilganini tekshiring

---

## 📱 Domain qo'shish (Ixtiyoriy)

Agar o'z domainingiz bo'lsa (masalan: `shifokor.uz`):

1. **Vercel'da**: Settings > Domains → Domain qo'shing
2. **DNS sozlash**: Vercel'ning ko'rsatgan IP yoki CNAME'ni domain provider'ingizda sozlang
3. **Kutish**: 5-10 daqiqa → SSL avtomatik o'rnatiladi

---

## 🎉 Tugadi!

Endi saytingiz internetda! 🚀

**URL'lar:**
- Veb-sayt: `https://your-project.vercel.app`
- Backend: `https://your-backend.onrender.com`

---

## 💡 Eslatmalar

- ✅ GitHub'ga kod yuborish kerak (deploy qilishdan oldin)
- ✅ Backend'ni avval deploy qiling (frontend unga bog'lanadi)
- ✅ Kalitlarni GitHub'ga yubormang (faqat Render/Vercel'da qo'shing)

