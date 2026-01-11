# 🔧 Render Deploy Xatosi - "Missing script: build" - Yechim

## ❌ Xato

```
npm error Missing script: "build"
```

## ✅ Yechim

Server papkasida `build` script kerak emas (oddiy Express server). Render sozlamalarini o'zgartiring:

---

## 📝 Render Sozlamalarini To'g'rilash

### Render Dashboard'da:

1. **Service'ga kiring** (shifo-backend)
2. **Settings** bo'limiga kiring
3. **Build & Deploy** bo'limini toping
4. **Build Command** ni o'zgartiring:

**❌ Oldin (xato):**
```
npm run build
```

**✅ Keyin (to'g'ri):**
```
npm install
```

Yoki **bo'sh qoldiring** (hech narsa yozmang)

---

## ✅ To'liq Sozlamalar

**Render Dashboard > Settings > Build & Deploy:**

- **Root Directory**: `server` ✅
- **Build Command**: `npm install` yoki **bo'sh qoldiring** ✅
- **Start Command**: `npm start` ✅
- **Plan**: Free ✅

---

## 🔄 Qayta Deploy

Sozlamalarni o'zgartirgandan keyin:

1. **"Manual Deploy"** tugmasini bosing
2. Yoki **"Save Changes"** tugmasini bosing (avtomatik qayta deploy qiladi)

---

## 📝 Alternative: package.json ga Build Script Qo'shish

Agar Render Build Command'ni bo'sh qoldirmay bo'lsa, `server/package.json` ga build script qo'shing:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "echo 'No build needed'"
  }
}
```

**Lekin bu kerak emas** - Build Command ni `npm install` ga o'zgartirish yoki bo'sh qoldirish yaxshiroq.

---

## ✅ Tekshirish

Deploy muvaffaqiyatli bo'lgandan keyin:

1. **Render Dashboard'da** "Logs" bo'limini ko'ring
2. **"Live"** bo'limida server ishlayotganini ko'ring
3. **URL'ni** browser'da oching (JSON response ko'rinishi kerak)

---

## 🎯 Eng Oson Yo'l

1. **Settings > Build & Deploy**
2. **Build Command**: `npm install` yozing
3. **Save Changes**
4. **Kutish** → Deploy muvaffaqiyatli bo'ladi! ✅

