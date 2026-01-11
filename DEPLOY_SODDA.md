# 🚀 Internetga Chiqarish - Sodda Qo'llanma

## 📝 Nima qilish kerak?

Loyiha 2 qismdan iborat:
1. **Frontend** (Veb-sayt) - Vercel'da
2. **Backend** (AI Chat serverni) - Railway'da

---

## ⚡ Tezkor Qadamlar

### 1️⃣ Backend Serverni Chiqarish (Avval bu!)

#### Railway'da (5 daqiqa)

1. **Kirish**: [railway.app](https://railway.app) → GitHub bilan ro'yxatdan o'ting

2. **Yangi loyiha**: "New Project" → "Deploy from GitHub repo" → Repository tanlang

3. **Server sozlash**:
   - "Add Service" → "GitHub Repo"
   - **Root Directory**: `server` ni tanlang
   - **Start Command**: `npm start`

4. **Kalitlar qo'shish** (Settings > Variables):
   ```
   PORT=3002
   OPENAI_API_KEY=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
   TELEGRAM_BOT_TOKEN=8580856771:AAHovcQPabenL1f9UOAN6bEpcNcOR95-JKA
   TELEGRAM_ADMIN_ID=7716143588
   ```

5. **Kutish**: 2-3 daqiqa → URL olasiz (masalan: `https://shifo-backend.railway.app`)
   - ✅ Bu URL ni yozib qo'ying!

---

### 2️⃣ Veb-saytni Chiqarish (Keyin bu!)

#### Vercel'da (3 daqiqa)

1. **Kirish**: [vercel.com](https://vercel.com) → GitHub bilan ro'yxatdan o'ting

2. **Yangi loyiha**: "Add New Project" → Repository tanlang → "Deploy"

3. **Kalit qo'shish** (Settings > Environment Variables):
   ```
   NEXT_PUBLIC_AI_CHAT_API_URL=https://shifo-backend.railway.app/ai-chat
   ```
   ⚠️ **`shifo-backend.railway.app` o'rniga o'zingizning Railway URL'ingizni yozing!**

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
- Backend: `https://your-backend.railway.app`

---

## 💡 Eslatmalar

- ✅ GitHub'ga kod yuborish kerak (deploy qilishdan oldin)
- ✅ Backend'ni avval deploy qiling (frontend unga bog'lanadi)
- ✅ Kalitlarni GitHub'ga yubormang (faqat Railway/Vercel'da qo'shing)

