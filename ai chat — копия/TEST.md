# 🌐 Webda Test Qilish - Qisqa Yo'riqnoma

## 🚀 Tezkor Boshlash

### 1️⃣ Serverni Ishga Tushirish

**PowerShell yoki CMD'da:**

```powershell
cd "C:\Users\Intel\ai chat\backend"
npm start
```

✅ **Muaffaqiyatli ishga tushganda quyidagi xabarni ko'rasiz:**
```
Server running on port 3000
```

### 2️⃣ Brauzerda Ochish

Serverni ishga tushirgandan keyin, quyidagi manzillarni brauzerda oching:

#### 🎯 Asosiy Test Sahifa:
```
http://localhost:3000
```
Yoki:
```
http://127.0.0.1:3000
```

#### 🎯 To'liq Test Sahifa (test.html):
```
http://localhost:3000/test.html
```

### 3️⃣ Test Qilish

1. **Brauzerni oching** (Chrome, Edge, Firefox, va boshqalar)
2. **Manzil satriga kiriting:** `http://localhost:3000`
3. **Chat'da test qiling:**
   - "Salom" deb yozing → Tabiiy javobni ko'rasiz
   - Shikoyatingizni yozing (masalan: "Qorinim og'riyapti")
   - Ismingizni kiriting
   - Telefon raqamingizni kiriting
   - Typing delay (1 soniya) ishlayotganini tekshiring

### 4️⃣ Mukammalashtirishlar

✅ **Salomlashish:**
- "Salom" deb yozsangiz: "Assalomu alaykum! Qalaysiz? Sizni aynan nima bezovta qilyapti?"

✅ **Shikoyat tahlili:**
- Tabiiy sinonimlar ishlatiladi
- Takroriy savollar yo'q
- Kontekstga mos javoblar

✅ **Taxminiy tashxis:**
- 2 qismga ajratilgan javoblar
- Qisqa va tushunarli

✅ **Ism va telefon:**
- Shaxsiylashtirilgan javoblar
- "Rahmat, Amin aka. Endi telefon raqamingizni..."

✅ **Typing delay:**
- 1 soniyalik tabiiy typing ko'rsatkichi

### 5️⃣ Muammolarni Hal Qilish

#### ❌ Server ishga tushmadi:
- `.env` faylini tekshiring (backend papkasida)
- `OPENAI_API_KEY` to'g'ri kirilganligini tekshiring
- Port 3000 band bo'lishi mumkin (boshqa port ishlatish mumkin)

#### ❌ "Cannot GET" xatosi:
- Serverni to'g'ri ishga tushirganingizni tekshiring
- `http://localhost:3000` manzilini to'g'ri kiriting

#### ❌ Chat ishlamayapti:
- Browser Console'ni oching (F12)
- Xatoliklarni tekshiring
- `http://localhost:3000/ai-chat` API endpoint ishlayotganini tekshiring

### 6️⃣ Serverni To'xtatish

Server ishlab turgan terminal'da:
- `Ctrl + C` bosing
- Yoki terminal oynasini yoping

---

## 📝 Qo'shimcha Eslatmalar

- Server ishga tushgan holatda terminal oynasini yopmang
- `.env` faylida API keylar to'g'ri bo'lishi kerak
- Port 3000'da boshqa dastur ishlamasin
- Browser cache'ni tozalash: `Ctrl + Shift + R` (hard refresh)

---

**Muvaffaqiyatlar! 🎉**

