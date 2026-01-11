# 📤 GitHub'ga Kod Yuborish - Qo'llanma

## ✅ Holat

Git repository allaqachon initialize qilingan va `main` branch'da ishlayapti.

---

## 🚀 GitHub'ga Yuborish

### Qadam 1: GitHub'da Repository Yaratish

1. [github.com](https://github.com) ga kiring
2. "New repository" yoki "+" tugmasini bosing
3. Repository nomini kiriting (masalan: `shifo-fullstack`)
4. "Public" yoki "Private" tanlang
5. ⚠️ **"Initialize this repository with README" ni BEKOR QILING!** (Kod allaqachon bor)
6. "Create repository" tugmasini bosing

---

### Qadam 2: Remote Qo'shish va Yuborish

Agar remote allaqachon mavjud bo'lsa:

```bash
# Remote'ni ko'rish
git remote -v

# Agar remote mavjud bo'lsa, uni o'zgartirish:
git remote set-url origin https://github.com/YOUR_USERNAME/shifo-fullstack.git

# Agar remote yo'q bo'lsa, qo'shish:
git remote add origin https://github.com/YOUR_USERNAME/shifo-fullstack.git
```

⚠️ **`YOUR_USERNAME` o'rniga o'zingizning GitHub username'ingizni yozing!**

---

### Qadam 3: Kod Yuborish

```bash
# Barcha o'zgarishlarni qo'shish
git add .

# Commit qilish
git commit -m "Initial commit - Medical Center Website"

# GitHub'ga yuborish
git push -u origin main
```

---

## 🔐 GitHub Authentication

Agar parol so'rasa:

### Variant 1: Personal Access Token (Tavsiya etiladi)

1. GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token" tugmasini bosing
3. Scopes: `repo` ni tanlang
4. Token'ni nusxalab oling
5. `git push` buyrug'i ishlatilganda parol o'rniga token'ni yozing

### Variant 2: GitHub CLI

```bash
# GitHub CLI o'rnatish (agar yo'q bo'lsa)
# Windows: winget install --id GitHub.cli

# Login qilish
gh auth login

# Keyin git push ishlaydi
```

---

## ✅ Tekshirish

1. GitHub repository'ni oching
2. Barcha fayllar ko'rinishi kerak
3. `.env` fayllar ko'rinmasligi kerak (`.gitignore` da)

---

## 📝 Eslatmalar

- ✅ `.env` fayllar `.gitignore` da (xavfsizlik uchun)
- ✅ `node_modules` `.gitignore` da (juda katta)
- ✅ `.next` `.gitignore` da (build fayllar)
- ✅ `server/.env` `.gitignore` da (backend kalitlar)

---

## 🆘 Muammo bo'lsa

### "remote origin already exists"

```bash
# Remote'ni o'zgartirish
git remote set-url origin https://github.com/YOUR_USERNAME/shifo-fullstack.git
```

### "authentication failed"

- Personal Access Token ishlating
- Yoki GitHub CLI ishlating

### "nothing to commit"

```bash
# O'zgarishlar borligini tekshirish
git status

# Agar hech narsa yo'q bo'lsa, faqat push qiling
git push -u origin main
```

