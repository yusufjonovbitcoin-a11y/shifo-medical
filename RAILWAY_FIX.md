# 🔧 Railway Deploy Muammosini Hal Qilish

## ❌ Muammo: "Could not find root directory: /ai chat — копия/backend"

Bu xatolik Railway loyihangizning noto'g'ri papkasini build qilmoqchi bo'layotganini ko'rsatadi.

---

## ✅ YECHIM 1: Railway Settings'da Root Directory'ni o'zgartirish

### Qadamlar:

1. **Railway Dashboard'ga kiring:**
   - https://railway.app/project/your-project-id

2. **Service'ni tanlang:**
   - `shifo-medical` service'ni bosing

3. **Settings tab'ini oching:**
   - Yuqoridagi "Settings" tugmasini bosing

4. **Root Directory'ni o'zgartiring:**
   - **"Service"** bo'limida **"Root Directory"** qismini toping
   - Agar qiymat `/ai chat — копия/backend` bo'lsa, uni o'chiring
   - Bo'sh qoldiring (/) yoki `.` (nuqta) qo'ying
   - **Yoki** agar loyihangiz subdirectory'da bo'lsa: `/` 

5. **Saqlang va Redeploy qiling:**
   - **"Deploy"** tugmasini bosing yoki
   - GitHub'ga yangi commit qiling (avtomatik deploy bo'ladi)

---

## ✅ YECHIM 2: Railway.json konfiguratsiyasi (TAYYOR!)

Men sizga `railway.json` faylini yaratib berdim. Endi faqat GitHub'ga push qiling:

```bash
git add .
git commit -m "Railway konfiguratsiyasi qo'shildi"
git push
```

Railway avtomatik ravishda yangi konfiguratsiya bilan deploy qiladi.

---

## ✅ YECHIM 3: Keraksiz papkalarni o'chirish (TAYYOR!)

Men `.gitignore` faylini yangiladim va `ai chat - копия` papkasini ignore qildim.

---

## 🚀 To'liq qadamlar:

### 1. GitHub'ga o'zgarishlarni yuklang:

```bash
cd C:\Users\Muhammadamin\Desktop\shifo-medical\shifo-medical

# O'zgarishlarni ko'rish
git status

# Hamma o'zgarishlarni qo'shish
git add .

# Commit qilish
git commit -m "Railway deploy muammosi hal qilindi: railway.json va .gitignore yangilandi"

# Push qilish
git push
```

### 2. Railway Dashboard'da tekshiring:

1. Railway'ga kiring: https://railway.app/dashboard
2. `shifo-medical` loyihangizni oching
3. Yangi deploy boshlangani ko'rinishi kerak
4. Build Logs'ni kuzating

### 3. Agar yana xatolik bo'lsa:

**Railway Settings'da Root Directory'ni tekshiring:**

1. Service → Settings → Root Directory
2. Bo'sh qoldiring yoki `.` qo'ying
3. Save qiling
4. Redeploy qiling

---

## 📋 Tekshirish ro'yxati:

- ✅ `railway.json` yaratildi
- ✅ `.gitignore` yangilandi (`ai chat - копия` ignore qilindi)
- ⏳ GitHub'ga push qilish kerak
- ⏳ Railway'da Root Directory sozlamalarini tekshirish
- ⏳ Environment Variables qo'shilganini tasdiqlash

---

## 🔍 Environment Variables (unutmang!)

Railway dashboard → Variables:

```
NODE_ENV=production
TELEGRAM_BOT_TOKEN=sizning_real_tokeningiz
TELEGRAM_CHAT_ID=123456789,987654321
```

---

## 💡 Railway CLI orqali (ixtiyoriy):

```bash
# Railway CLI o'rnatish
npm install -g @railway/cli

# Login
railway login

# Loyihani link qilish
railway link

# Deploy qilish
railway up

# Logs ko'rish
railway logs
```

---

## ❓ Agar yana muammo bo'lsa:

1. **Railway Logs'ni o'qing:**
   - Build Logs
   - Deploy Logs
   - Application Logs

2. **Root Directory'ni to'g'ri sozlang:**
   - Settings → Root Directory → bo'sh qoldiring

3. **package.json scriptlarini tekshiring:**
   ```json
   "scripts": {
     "build": "next build",
     "start": "next start"
   }
   ```

4. **Environment Variables borligini tasdiqlang**

---

## 🎯 Keyingi qadam:

```bash
# GitHub'ga push qiling:
git add .
git commit -m "Railway konfiguratsiyasi sozlandi"
git push

# Railway avtomatik deploy qiladi! ✅
```

**Muvaffaqiyatli deployment! 🚀**
