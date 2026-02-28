# Railway'ga Deploy qilish

## 1-qadam: Railway hisobini yarating

1. [Railway.app](https://railway.app/) ga kiring
2. GitHub hisobingiz bilan ro'yxatdan o'ting
3. Tasdiqlang va hisobingizga kiring

## 2-qadam: GitHub'ga loyihani yuklash

Agar loyihangiz hali GitHub'da bo'lmasa:

```bash
# Git'ni ishga tushiring (agar ishga tushmagan bo'lsa)
git init

# Fayllarni qo'shing
git add .

# Commit qiling
git commit -m "Initial commit"

# GitHub'da yangi repository yarating va unga push qiling
git remote add origin https://github.com/sizning-username/shifo-medical.git
git branch -M main
git push -u origin main
```

## 3-qadam: Railway'da loyihani yarating

1. Railway dashboard'ga kiring: [railway.app/dashboard](https://railway.app/dashboard)
2. **"New Project"** tugmasini bosing
3. **"Deploy from GitHub repo"** ni tanlang
4. Ro'yxatdan `shifo-medical` loyihangizni toping va tanlang
5. Railway avtomatik ravishda Next.js loyihasini aniqlaydi

## 4-qadam: Environment Variables (muhim!)

Railway dashboard'da:

1. Loyihangizni oching
2. **"Variables"** tab'ini tanlang
3. Quyidagi o'zgaruvchilarni qo'shing:

### Kerakli o'zgaruvchilar:

```env
NODE_ENV=production
TELEGRAM_BOT_TOKEN=sizning_bot_tokeningiz
TELEGRAM_CHAT_ID=123456789,987654321,555666777
```

### Qo'shimcha (agar kerak bo'lsa):

```env
OPENAI_API_KEY=sizning_openai_key
```

**Muhim eslatma:** 
- `TELEGRAM_CHAT_ID` - vergul bilan ajratilgan chat ID'lar
- Har bir o'zgaruvchini alohida qo'shing (Add Variable tugmasi)

## 5-qadam: Deploy!

Railway avtomatik ravishda deploy qiladi. Jarayon:

1. ✅ Building...
2. ✅ Deploying...
3. ✅ Live!

Deploy jarayoni 3-5 daqiqa davom etadi.

## 6-qadam: Domen olish

Railway sizga avtomatik domen beradi:

1. Dashboard'da **"Settings"** tab'ini oching
2. **"Domains"** bo'limida **"Generate Domain"** tugmasini bosing
3. Sizga URL beriladi: `shifo-medical-production-abc123.up.railway.app`

### Custom domen qo'shish (ixtiyoriy):

1. **"Domains"** bo'limida **"Custom Domain"** tugmasini bosing
2. O'z domeningizni kiriting (masalan: `shifomedical.uz`)
3. Railway sizga DNS sozlamalarini beradi
4. Domen provayderingizda CNAME yoki A record qo'shing

## 7-qadam: Test qilish

1. Railway URL'ingizni oching: `https://sizning-loyihangiz.up.railway.app`
2. Telegram test qiling: `https://sizning-loyihangiz.up.railway.app/api/telegram/test`

## Qayta deploy qilish

Railway avtomatik ravishda GitHub'ga har push qilganingizda deploy qiladi:

```bash
# O'zgarishlar qiling
git add .
git commit -m "O'zgarishlar qilindi"
git push

# Railway avtomatik ravishda yangilaydi!
```

## Troubleshooting

### Build muvaffaqiyatsiz bo'lsa:

1. **Logs**'ni tekshiring: Railway dashboard → Deployments → Logs
2. `package.json` faylida `build` scripti borligini tekshiring:
   ```json
   "scripts": {
     "build": "next build",
     "start": "next start"
   }
   ```

### Environment variables ishlamasa:

1. Railway dashboard'da Variables'ni tekshiring
2. Har bir o'zgaruvchi to'g'ri yozilganligini tasdiqlang
3. Deploy'ni qayta boshlang (Redeploy)

### Port muammosi:

Railway avtomatik ravishda Next.js'ning standart portini (3000) aniqlaydi. Agar muammo bo'lsa:

```json
// package.json
"scripts": {
  "start": "next start -p $PORT"
}
```

## Monitoring

Railway'da:
- **Metrics**: CPU, Memory, Network ishlatilishini ko'ring
- **Logs**: Real-time log'larni kuzating
- **Deployments**: Barcha deploy tarixini ko'ring

## Narxlar

Railway bepul plan:
- **$5/oy** kredit (credit)
- Kichik loyihalar uchun etarli
- Keyin esa pay-as-you-go

## Qo'shimcha maslahatlar

1. **.gitignore** faylida `.env.local` borligini tekshiring:
   ```
   .env.local
   .env*.local
   ```

2. **GitHub secrets** ishlatish (ixtiyoriy, xavfsizlik uchun)

3. **Automatic deployments** o'chirib qo'yish mumkin (Settings → Deploy triggers)

---

## Railway CLI (ixtiyoriy)

Railway CLI orqali ham deploy qilish mumkin:

```bash
# Railway CLI o'rnatish
npm install -g @railway/cli

# Login
railway login

# Loyihani bog'lash
railway link

# Deploy qilish
railway up

# Logs ko'rish
railway logs
```

---

Muvaffaqiyatli deploy! 🚀
