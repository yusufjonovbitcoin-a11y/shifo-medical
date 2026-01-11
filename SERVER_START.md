# 🖥️ Server'ni Ishga Tushirish - Qo'llanma

## 🚀 Local'da Ishga Tushirish (Development)

### Windows (CMD/PowerShell)

```cmd
# Server papkasiga kiring
cd server

# Dependencies o'rnatish (bir marta)
npm install

# Server'ni ishga tushirish
npm start
```

Yoki development mode'da (avtomatik qayta ishga tushadi):

```cmd
npm run dev
```

### Mac/Linux (Terminal)

```bash
cd server
npm install
npm start
```

---

## ✅ Tekshirish

Server ishga tushganidan keyin:

1. Browser'da oching: `http://localhost:3002`
2. JSON response ko'rinishi kerak:
   ```json
   {
     "message": "Shifo AI Chat API",
     "endpoints": {...}
   }
   ```

---

## 🌐 Internetda Ishlatish (Production)

Server'ni internetda ishlatish uchun hosting platform'da deploy qilish kerak.

### Eng Sodda Usul: Render

1. **GitHub'ga kod yuboring** (agar hali yubormagan bo'lsangiz)
2. **Render.com** ga kiring → "New +" → "Web Service"
3. Repository tanlang
4. **Sozlamalar**:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. **Environment Variables** qo'shing:
   ```
   PORT=3002
   OPENAI_API_KEY=your-openai-api-key-here
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   TELEGRAM_ADMIN_ID=your-telegram-admin-id
   ```
6. **Deploy** → URL olasiz (masalan: `https://shifo-backend.onrender.com`)

---

## 📝 Environment Variables (.env fayl)

`server/.env` faylini yarating (`.env.example` dan nusxa oling):

```env
PORT=3002
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN_HERE
TELEGRAM_ADMIN_ID=YOUR_TELEGRAM_ADMIN_ID_HERE
```

⚠️ **MUHIM**: `.env` fayl `.gitignore` da - GitHub'ga yubormang!

---

## 🔧 Server Sozlamalari

Server quyidagicha ishlaydi:

- **Port**: `process.env.PORT || 3000` (production'da hosting platform o'rnatadi)
- **Host**: `0.0.0.0` (network access uchun)
- **CORS**: Barcha domain'lar uchun ochiq (production'da cheklash mumkin)

---

## 🆘 Muammo bo'lsa

### "Port already in use"

```cmd
# Port'ni o'zgartirish (.env faylda)
PORT=3002

# Yoki boshqa port ishlating
PORT=3003
```

### "OPENAI_API_KEY not found"

- `server/.env` faylini tekshiring
- API key to'g'ri qo'yilganini tekshiring
- Server'ni qayta ishga tushiring

### "Cannot find module"

```cmd
cd server
npm install
```

---

## 📊 Server Logs

Server ishga tushganida quyidagilar ko'rinadi:

```
✅ Server running on 0.0.0.0:3002
🌐 Open: http://localhost:3002
✅ OpenAI API key mavjud
```

---

## 🔗 Frontend'ga Bog'lash

Server deploy qilingandan keyin, frontend'dagi `.env` faylga qo'shing:

```env
NEXT_PUBLIC_AI_CHAT_API_URL=https://your-backend-url.onrender.com/ai-chat
```

⚠️ **`your-backend-url.onrender.com`** o'rniga o'zingizning server URL'ingizni yozing!

