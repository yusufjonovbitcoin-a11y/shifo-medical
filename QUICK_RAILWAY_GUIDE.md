# 🚀 Railway'ga Tez Deploy Qilish

## Qisqa yo'riqnoma (5 daqiqa ichida!)

### 1️⃣ Railway hisobini oching
- [railway.app](https://railway.app/) ga kiring
- GitHub bilan ro'yxatdan o'ting

### 2️⃣ Loyihani GitHub'ga yuklang

```bash
# Git init (agar qilmagan bo'lsangiz)
cd C:\Users\Muhammadamin\Desktop\shifo-medical\shifo-medical
git init
git add .
git commit -m "Initial commit for Railway deployment"

# GitHub'da yangi repo yarating va:
git remote add origin https://github.com/USERNAME/shifo-medical.git
git branch -M main
git push -u origin main
```

### 3️⃣ Railway'da deploy qiling

1. Railway dashboard: https://railway.app/dashboard
2. **"New Project"** → **"Deploy from GitHub repo"**
3. `shifo-medical` ni tanlang
4. Railway avtomatik build qiladi!

### 4️⃣ Environment Variables qo'shing (MUHIM!)

Railway dashboard → Variables tab:

```
NODE_ENV=production
TELEGRAM_BOT_TOKEN=sizning_real_tokeningiz
TELEGRAM_CHAT_ID=123456789,987654321
```

**⚠️ Diqqat:** 
- Real bot tokeningizni kiriting (BotFather'dan)
- Real chat ID'laringizni vergul bilan ajratib kiriting
- Har birini alohida **"Add Variable"** orqali qo'shing

### 5️⃣ Domen oling

Railway dashboard → Settings → Domains → **"Generate Domain"**

Sizga URL beriladi: `shifo-medical-xxxx.up.railway.app`

### 6️⃣ Test qiling!

```
https://sizning-domeningiz.up.railway.app/api/telegram/test
```

Bu barcha chat ID'larga test xabar yuboradi!

---

## Avtomatik deployment

Endi har safar GitHub'ga push qilsangiz, Railway avtomatik yangilaydi:

```bash
git add .
git commit -m "Yangi o'zgarishlar"
git push
# Railway avtomatik deploy qiladi! 🎉
```

---

## Tez muammo hal qilish

### ❌ Build xatosi:
- Railway Logs'ni oching va xatolarni o'qing
- Ko'pincha environment variables yo'qligi muammo

### ❌ Telegram ishlamayapti:
1. Variables tab'da `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` borligini tekshiring
2. Chat ID'lar vergul bilan ajratilganini tasdiqlang
3. Bot guruhga qo'shilganligini tekshiring

### ❌ 502 Bad Gateway:
- Build jarayoni tugashini kuting (3-5 daqiqa)
- Logs'da xatolarni tekshiring

---

## Railway CLI (ixtiyoriy)

Agar terminal orqali deploy qilmoqchi bo'lsangiz:

```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

---

Batafsil ma'lumot uchun: `RAILWAY_DEPLOYMENT.md` faylini o'qing

**Muvaffaqiyatli deployment! 🚀🎉**
