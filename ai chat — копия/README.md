# Shifo AI Chat

Shifo Tibbiy Markazi uchun AI asosidagi chat bot tizimi. Bu loyiha foydalanuvchilarga shifoxona xizmatlari, qabulga yozilish va boshqa savollar bo'yicha yordam berish uchun mo'ljallangan.

## 📋 Loyiha Strukturasi

```
shifo-ai-chat/
│
├─ backend/
│   ├─ index.js          ← Node.js + Express сервер
│   ├─ aiService.js      ← AI логикаси (OpenAI)
│   ├─ telegram.js       ← Telegram юбориш
│   ├─ clinic-data.json  ← Шифохона маълумоти
│   └─ package.json
│
├─ frontend/
│   ├─ ai-chat.js        ← Floating chat widget (sahifaga ulanadi)
│   └─ example.html      ← Widget'ni ko'rsatuvchi misol sahifa
│
├─ test.html             ← To'liq chat test sahifasi
└─ README.md
```

## 🚀 O'rnatish va Ishlatish

### 1️⃣ Windows CMD (Command Prompt) orqali Backend O'rnatish

1. **Loyiha papkasiga kirish:**
   ```cmd
   cd "C:\Users\Intel\ai chat"
   ```

2. **Backend papkasiga o'tish:**
   ```cmd
   cd backend
   ```

3. **Dependencies (kutubxonalar) o'rnatish:**
   ```cmd
   npm install
   ```
   ⏳ Bu 1-2 minut davom etadi...

4. **`.env` faylini yaratish (Windows uchun):**
   
   **Variant 1: Copy buyrug'i bilan:**
   ```cmd
   copy env.example .env
   ```
   
   **Variant 2: Qo'lda yaratish:**
   - `backend` papkasida `env.example` faylini oching
   - Ctrl+A (barcha matnni tanlang)
   - Ctrl+C (nusxalash)
   - `.env` nomi bilan yangi fayl yarating (Notepad'da)
   - Ctrl+V (qo'yish)
   - Saqlang

5. **`.env` faylini tahrirlash:**
   ```cmd
   notepad .env
   ```
   
   Yoki `backend\.env` faylini ochib, quyidagilarni kiriting:
   ```env
   PORT=3000
   OPENAI_API_KEY=sk-... # OpenAI API keyingizni kiriting
   TELEGRAM_BOT_TOKEN=1234567890:ABC... # Telegram Bot Token
   TELEGRAM_ADMIN_ID=123456789 # Telegram Chat ID
   ```
   
   **⚠️ MUHIM:** Haqiqiy API key va tokenlarni kiriting!

6. **Serverni ishga tushirish:**
   
   ⚠️ **MUHIM:** `backend` papkasida turganingizga ishonch hosil qiling!
   
   **Production uchun:**
   ```cmd
   npm start
   ```
   
   Yoki agar boshqa papkada bo'lsangiz:
   ```cmd
   cd backend
   npm start
   ```
   
   **Development uchun (avtomatik qayta ishga tushirish):**
   ```cmd
   npm run dev
   ```
   
   ✅ **Muaffaqiyatli ishga tushirilganda quyidagi xabarni ko'rasiz:**
   ```
   Server running on port 3000
   ```
   
   ✅ Agar hamma narsa to'g'ri bo'lsa, quyidagi xabarni ko'rasiz:
   ```
   Server running on port 3000
   ```
   
   🎉 Server `http://localhost:3000` da ishlaydi!

### 2️⃣ Web (Frontend) orqali Ishlatish

#### Variant A: HTML fayl yaratish

1. **HTML fayl yaratish** (masalan: `test.html`):
   ```html
   <!DOCTYPE html>
   <html lang="uz">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Shifo AI Chat</title>
       <style>
           #ai-chat {
               max-width: 600px;
               margin: 50px auto;
               padding: 20px;
               border: 1px solid #ddd;
               border-radius: 10px;
               font-family: Arial, sans-serif;
           }
           #messages {
               height: 400px;
               overflow-y: auto;
               border: 1px solid #ddd;
               padding: 10px;
               margin-bottom: 10px;
               background: #f9f9f9;
           }
           #messages div {
               margin: 5px 0;
               padding: 8px;
               border-radius: 5px;
           }
           #user-msg {
               width: 70%;
               padding: 10px;
               border: 1px solid #ddd;
               border-radius: 5px;
           }
           #send-btn {
               width: 25%;
               padding: 10px;
               background: #667eea;
               color: white;
               border: none;
               border-radius: 5px;
               cursor: pointer;
           }
           #send-btn:hover {
               background: #5568d3;
           }
       </style>
   </head>
   <body>
       <h1 style="text-align: center;">Shifo AI Chat</h1>
       
       <div id="ai-chat">
           <div id="messages"></div>
           <div style="display: flex; gap: 10px;">
               <input id="user-msg" type="text" placeholder="Savol yozing..." />
               <button id="send-btn">Yuborish</button>
           </div>
       </div>

       <script>
       const messages = document.getElementById('messages');
       const input = document.getElementById('user-msg');

       document.getElementById('send-btn').onclick = async () => {
           const msg = input.value.trim();
           if (!msg) return;

           // Foydalanuvchi xabarini ko'rsatish
           const userDiv = document.createElement('div');
           userDiv.style.background = '#667eea';
           userDiv.style.color = 'white';
           userDiv.style.textAlign = 'right';
           userDiv.textContent = "Siz: " + msg;
           messages.appendChild(userDiv);
           input.value = '';
           
           // Scroll pastga
           messages.scrollTop = messages.scrollHeight;

           try {
               // AI ga so'rov yuborish
               const res = await fetch("http://localhost:3000/ai-chat", {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({
                       message: msg,
                       userInfo: { 
                           name: "Foydalanuvchi", 
                           phone: "+998900000000", 
                           problem: msg 
                       }
                   })
               });
               
               const data = await res.json();

               // AI javobini ko'rsatish
               const aiDiv = document.createElement('div');
               aiDiv.style.background = '#e0e0e0';
               aiDiv.style.textAlign = 'left';
               aiDiv.textContent = "Laylo: " + data.reply;
               messages.appendChild(aiDiv);
               
               // Scroll pastga
               messages.scrollTop = messages.scrollHeight;
           } catch (error) {
               const errorDiv = document.createElement('div');
               errorDiv.style.background = '#ffcccc';
               errorDiv.style.color = 'red';
               errorDiv.textContent = "Xatolik: Serverga ulanib bo'lmadi. Serverni ishga tushirganingizga ishonch hosil qiling!";
               messages.appendChild(errorDiv);
           }
       }

       // Enter bosganda yuborish
       input.addEventListener('keypress', (e) => {
           if (e.key === 'Enter') {
               document.getElementById('send-btn').click();
           }
       });
       </script>
   </body>
   </html>
   ```

2. **HTML faylni ochish:**
   - `test.html` faylini ikki marta bosib oching (brauzerda)
   - Yoki brauzerda: File → Open → `test.html` ni tanlang

#### Variant B: Mavjud veb-saytga qo'shish

1. `frontend/ai-chat.js` faylini veb-saytingizning papkasiga ko'chiring

2. HTML sahifangizga qo'shing:
   ```html
   <div id="ai-chat">
       <div id="messages"></div>
       <input id="user-msg" placeholder="Savol yozing..."/>
       <button id="send-btn">Yuborish</button>
   </div>

   <script src="ai-chat.js"></script>
   ```

3. **Backend URL ni o'zgartiring** (`ai-chat.js` ichida):
   ```javascript
   // Agar backend boshqa serverda bo'lsa:
   const res = await fetch("http://your-server-ip:3000/ai-chat", {
       // ...
   });
   ```

### 3️⃣ Tekshirish

1. **Backend ishlayotganligini tekshirish:**
   - Brauzerda oching: `http://localhost:3000`
   - Yoki terminalda: `curl http://localhost:3000`

2. **Frontend ishlayotganligini tekshirish:**
   - HTML faylni ochib, chat'ga xabar yuborishni sinab ko'ring
   - Browser Console (F12) da xatolarni tekshiring

## 🔧 API Endpoints

### `POST /api/chat`
AI chat so'rovi uchun.

**Request:**
```json
{
  "message": "Qabulga qanday yozilaman?",
  "sessionId": "session_123",
  "userInfo": {
    "name": "Ali Valiyev",
    "phone": "+998901234567"
  }
}
```

**Response:**
```json
{
  "success": true,
  "response": "Qabulga yozilish uchun telefon orqali bog'laning...",
  "sessionId": "session_123"
}
```

### `POST /api/appointment`
Qabulga yozilish uchun.

**Request:**
```json
{
  "name": "Ali Valiyev",
  "phone": "+998901234567",
  "service": "Umumiy tekshiruv",
  "datetime": "2024-01-15 10:00",
  "note": "Qo'shimcha izoh"
}
```

### `GET /api/clinic`
Shifoxona ma'lumotlari.

### `GET /api/services`
Xizmatlar ro'yxati.

### `GET /api/doctors`
Shifokorlar ro'yxati.

## 📦 Asosiy Xususiyatlar

- ✅ AI asosidagi javob berish (OpenAI GPT-3.5)
- ✅ FAQ avtomatik tekshiruvi
- ✅ Conversation history saqlash
- ✅ Telegram bildirishlari
- ✅ Qabulga yozilish funksiyasi
- ✅ Responsive chat widget
- ✅ O'zbek tilida qo'llab-quvvatlash

## 🎨 Frontend Xususiyatlar

- **Floating Chat Widget** - Sahifaning o'ng pastki burchagida joylashgan
- **Responsive Design** - Barcha qurilmalarda ishlaydi
- **Real-time Chat** - Xabarlarni tezda yuborish va qabul qilish
- **Session Management** - Har bir foydalanuvchi uchun alohida sessiya

## ⚙️ Sozlamalar

### `backend/clinic-data.json`
Shifoxona ma'lumotlarini o'zgartirish:
- Shifoxona nomi va manzili
- Xizmatlar ro'yxati
- Shifokorlar ro'yxati
- FAQ savollar va javoblar

### Telegram Bot Sozlash

1. [@BotFather](https://t.me/botfather) dan yangi bot yarating
2. Token ni `.env` fayliga qo'shing
3. Chat ID ni olish uchun [@userinfobot](https://t.me/userinfobot) dan foydalaning

## 🔒 Xavfsizlik

### API Key va Token Xavfsizligi

**⚠️ MUHIM:** Barcha maxfiy ma'lumotlar `.env` faylida saqlanishi kerak!

1. **`.env` fayli yaratish:**
   ```bash
   cd backend
   cp env.example .env
   ```

2. **`.env` fayliga haqiqiy qiymatlarni kiriting:**
   ```env
   OPENAI_API_KEY=sk-... # OpenAI API key
   TELEGRAM_BOT_TOKEN=1234567890:ABC... # Telegram Bot Token
   TELEGRAM_ADMIN_ID=123456789 # Telegram Chat ID
   ```

3. **`.env` fayli hech qachon Git'ga commit qilinmasligi kerak!**
   - `.env` fayli `.gitignore` da ro'yxatga olingan ✅
   - Faqat `env.example` fayli repository'da bo'lishi kerak

4. **Kodda hardcoded qiymatlar:**
   - ✅ Barcha API key'lar `process.env` orqali olinadi
   - ✅ Hardcoded qiymatlar yo'q
   - ✅ Xatolik paytida ogohlantirishlar ko'rsatiladi

### Production Xavfsizlik

- HTTPS ishlating (SSL sertifikat)
- Rate limiting qo'shing (DDoS himoya)
- CORS sozlamalarini tekshiring
- API endpoint'larni himoya qiling
- Xatoliklarda maxfiy ma'lumotlarni ko'rsatmang

## 🛠️ Rivojlantirish

### Yangi xususiyatlar qo'shish

1. **Yangi FAQ qo'shish:** `backend/clinic-data.json` fayliga qo'shing
2. **AI prompt o'zgartirish:** `backend/aiService.js` ichidagi `systemPrompt` ni tahrirlang
3. **Chat dizayni o'zgartirish:** `frontend/ai-chat.js` ichidagi CSS ni tahrirlang

## 📝 Lisensiya

ISC License

## 🤝 Yordam

Muammo bo'lsa yoki savol bo'lsa, GitHub Issues orqali yozing.

---

**Yaratilgan:** 2024  
**Versiya:** 1.0.0

