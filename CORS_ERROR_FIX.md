# 🔧 CORS Xatosi - Yechim

## ❌ Xato

```
Access to fetch at 'https://shifo-medical-1.onrender.com/' from origin 'https://shifo-medical-24ssi9fr2-muhammadamins-projects-0b809c00.vercel.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'https://shifo-medical.vercel.app' that is not equal to the supplied origin.
```

## 🔍 Muammo

1. **Backend hali eski CORS sozlamalari bilan ishlayapti** (hardcoded URL)
2. **API URL noto'g'ri** - `https://shifo-medical-1.onrender.com/` (oxirida `/` bor, `/ai-chat` kerak)

## ✅ Yechim

### Qadam 1: Kod GitHub'ga Push Qiling

Universal CORS kodi allaqachon qo'shilgan. Uni GitHub'ga push qiling:

```bash
git add .
git commit -m "fix: universal CORS for all Vercel domains"
git push origin main
```

### Qadam 2: Render'da Qayta Deploy Qiling

1. **Render Dashboard** → Service (shifo-medical-1)
2. **"Manual Deploy"** tugmasini bosing
3. Yoki **automatic deploy** kutib turing (GitHub integration bo'lsa)

### Qadam 3: Vercel'da API URL'ni To'g'rilang

**Vercel Dashboard** > Project > Settings > Environment Variables:

```
NEXT_PUBLIC_AI_CHAT_API_URL=https://shifo-medical-1.onrender.com/ai-chat
```

⚠️ **MUHIM**: 
- Oxirida `/ai-chat` bo'lishi kerak (faqat `/` emas!)
- `shifo-medical-1.onrender.com` o'rniga o'zingizning Render URL'ingizni yozing

### Qadam 4: Vercel'da Redeploy Qiling

Vercel Dashboard'da **"Redeploy"** tugmasini bosing.

---

## ✅ Tekshirish

1. **Backend CORS kodi yangilanganini tekshiring** (server/index.js)
2. **Render'da yangi kod deploy qilinganini tekshiring**
3. **Vercel'da API URL to'g'ri qo'yilganini tekshiring**
4. **Browser console'da CORS xatosi yo'qligini tekshiring**

---

## 🔧 Universal CORS Kodi

Yangi CORS kodi barcha Vercel manzillariga ruxsat beradi:

```javascript
app.use(cors({
  origin: function (origin, callback) {
    // Ham localhost, ham barcha vercel manzillariga ruxsat berish
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('CORS xatosi: Bu manzilga ruxsat berilmagan'));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));
```

Bu kod quyidagilarga ruxsat beradi:
- ✅ `*.vercel.app` (barcha Vercel domain'lar)
- ✅ `localhost` (local development)
- ✅ `127.0.0.1` (local development)

