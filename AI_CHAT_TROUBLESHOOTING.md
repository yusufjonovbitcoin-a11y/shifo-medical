# 🔧 AI Chat Ishlamayapti - Muammoni Hal Qilish

## ✅ Tekshirish Ro'yxati

### 1. Backend Server Ishlamayapti

**Belgilar:**
- AI Chat xabar yuborishda xatolik
- Browser console'da "Failed to fetch" xatosi
- Network tab'da API so'rovi muvaffaqiyatsiz

**Yechim:**

```powershell
# Backend serverni tekshirish
Test-NetConnection -ComputerName localhost -Port 3002

# Agar "TcpTestSucceeded : False" ko'rsatsa, server ishlamayapti
# Server'ni ishga tushiring:
cd server
npm start
```

Yoki script orqali:

```powershell
.\START_SERVER.ps1
```

---

### 2. Backend Server Ishga Tushganini Tekshirish

**Browser'da oching:**
```
http://localhost:3002
```

**Ko'rinishi kerak:**
```json
{
  "message": "Shifo AI Chat API",
  "endpoints": {
    "POST /ai-chat": "Chat xabar yuborish",
    "GET /": "Bu sahifa (API ma'lumotlari)"
  }
}
```

Agar ko'rinmasa → Backend server ishlamayapti

---

### 3. Frontend Server Ishlamayapti

**Belgilar:**
- Sayt ochilmayapti
- `http://localhost:3000` ishlamayapti

**Yechim:**

```powershell
# Frontend serverni ishga tushiring
npm run dev
```

---

### 4. API URL To'g'ri Sozlanmagan

**Tekshirish:**

1. **`.env` fayl** (loyiha root papkasida):
   ```env
   NEXT_PUBLIC_AI_CHAT_API_URL=http://localhost:3002/ai-chat
   ```

2. **Browser console'da tekshirish:**
   ```javascript
   console.log(process.env.NEXT_PUBLIC_AI_CHAT_API_URL)
   ```

3. **Network tab'da API so'rovini ko'ring:**
   - Request URL to'g'ri ekanligini tekshiring
   - Status code 200 bo'lishi kerak

---

### 5. Environment Variables To'g'ri Sozlanmagan

**Backend (`server/.env`):**
```env
PORT=3002
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
TELEGRAM_ADMIN_ID=YOUR_TELEGRAM_ADMIN_ID_HERE
```

⚠️ **MUHIM**: Haqiqiy kalitlarni qo'ying (placeholder'lar emas!)

**Frontend (`.env`):**
```env
NEXT_PUBLIC_AI_CHAT_API_URL=http://localhost:3002/ai-chat
```

---

### 6. Browser Console Xatoliklari

**Chrome/Edge:**
1. `F12` bosing (Developer Tools ochish)
2. "Console" tab'iga kiring
3. Qizil xatolarni ko'ring

**Tez-tez uchraydigan xatolar:**

- `Failed to fetch` → Backend server ishlamayapti
- `404 Not Found` → API URL noto'g'ri
- `CORS error` → Backend'da CORS sozlanmagan (odatda sozlanadi)
- `Network error` → Backend server ishlamayapti

---

### 7. Network Tab'da API So'rovini Tekshirish

1. `F12` → "Network" tab
2. AI Chat'da xabar yuboring
3. `/ai-chat` so'rovini toping
4. Tekshiring:
   - **Status**: 200 OK (muvaffaqiyatli)
   - **Request URL**: `http://localhost:3002/ai-chat`
   - **Response**: JSON ma'lumot

---

## 🔄 To'liq Qayta Boshlash

Agar hali ham ishlamasa:

1. **Barcha serverlarni to'xtatish:**
   ```powershell
   .\STOP_ALL_SERVERS.ps1
   ```

2. **Barcha serverlarni qayta ishga tushirish:**
   ```powershell
   .\START_ALL_SERVERS.ps1
   ```

3. **Browser'ni qayta yuklash:**
   - `Ctrl + F5` (cache tozalash bilan)

---

## 🎯 Tezkor Yechim

### Qadam 1: Backend Serverni Ishga Tushirish

```powershell
cd server
npm start
```

Terminal'da quyidagilar ko'rinishi kerak:
```
✅ Server running on 0.0.0.0:3002
🌐 Open: http://localhost:3002
✅ OpenAI API key mavjud
```

### Qadam 2: Frontend Serverni Ishga Tushirish

Yangi terminal oynasida:

```powershell
npm run dev
```

### Qadam 3: Browser'da Tekshirish

1. `http://localhost:3000` ni oching
2. AI Chat widget'ni oching
3. Xabar yuboring
4. AI javob bersa → ✅ Ishlamoqda!

---

## 🆘 Hali ham Ishlamasa

1. **Browser console'da xatolarni ko'ring**
2. **Network tab'da API so'rovini tekshiring**
3. **Backend server terminal'da xatolarni ko'ring**
4. **`.env` fayllarni tekshiring** (to'g'ri sozlanganini)

---

## 📝 Eslatmalar

- ✅ Backend server **avval** ishga tushirilishi kerak
- ✅ Frontend va Backend **ikkalasi ham** ishga tushirilishi kerak
- ✅ Browser'ni **qayta yuklash** kerak (o'zgarishlardan keyin)
- ✅ Environment variables **to'g'ri** sozlanishi kerak

