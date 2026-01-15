# Railway Backend Server Sozlash

## Muammo
Railway → OpenAI ulanishida muammo bor. Railway'da `OPENAI_API_KEY` sozlanmagan yoki noto'g'ri.

## Yechim

### 1. Railway Dashboard'ga kiring
- https://railway.app ga kiring
- Project'ingizni tanlang

### 2. Environment Variables qo'shing
- Project → **Variables** tab'iga o'ting
- Quyidagi environment variable'larni qo'shing:

```
OPENAI_API_KEY=sk-proj-... (OpenAI API key'ingiz)
TELEGRAM_BOT_TOKEN=8580856771:AAHovcQPabenL1f9UOAN6bEpcNcOR95-JKA
TELEGRAM_ADMIN_ID=7716143588
PORT=3002
```

### 3. Server'ni qayta deploy qiling
- Railway avtomatik ravishda qayta deploy qiladi
- Yoki **Deployments** tab'ida **Redeploy** tugmasini bosing

### 4. Tekshirish
- Railway logs'da quyidagi xabarni ko'rish kerak:
  ```
  ✅ OpenAI API key mavjud
  ✅ Server is running on port 3002
  ```

## OpenAI API Key olish
1. https://platform.openai.com/api-keys ga kiring
2. **Create new secret key** tugmasini bosing
3. Key'ni nusxalab, Railway'ga qo'shing

## Eslatma
- `OPENAI_API_KEY` - OpenAI API key (majburiy)
- `TELEGRAM_BOT_TOKEN` - Telegram bot token (ixtiyoriy)
- `TELEGRAM_ADMIN_ID` - Telegram admin ID (ixtiyoriy)
- `PORT` - Server port (default: 3002)

