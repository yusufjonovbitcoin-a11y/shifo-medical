# Telegram Bot - Bir nechta nomerlarga xabar yuborish

## O'rnatish

### 1. `.env.local` faylini sozlash

Loyihangizning ildiz papkasida `.env.local` faylini yarating va quyidagi ma'lumotlarni kiriting:

```env
# Telegram Bot Token (BotFather dan olingan)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

# Telegram Chat IDs (vergul bilan ajratilgan)
TELEGRAM_CHAT_ID=123456789,987654321,555666777
```

### 2. Bot Token olish

1. Telegram'da [@BotFather](https://t.me/BotFather) botini toping
2. `/newbot` buyrug'ini yuboring
3. Bot nomini va username'ini kiriting
4. BotFather sizga token beradi (masalan: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. Bu tokenni `.env.local` faylining `TELEGRAM_BOT_TOKEN` qatoriga qo'shing

### 3. Chat ID olish

Har bir foydalanuvchi yoki guruh uchun Chat ID olish:

#### Shaxsiy chat uchun:
1. [@userinfobot](https://t.me/userinfobot) botiga `/start` yuboring
2. Bot sizga ID'ingizni ko'rsatadi (masalan: `123456789`)

#### Guruh uchun:
1. Guruhga [@userinfobot](https://t.me/userinfobot) botini qo'shing
2. Bot guruh ID'sini ko'rsatadi (masalan: `-987654321`)
3. Yoki guruhga botingizni qo'shib, xabar yuboring va quyidagi URL'ga kiring:
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```

### 4. Bir nechta nomer qo'shish

`.env.local` faylida `TELEGRAM_CHAT_ID` qatoriga bir nechta chat ID'larni **vergul bilan ajratib** kiriting:

```env
TELEGRAM_CHAT_ID=123456789,987654321,555666777
```

Bu misol uchta chat ID'ga xabar yuboradi:
- `123456789` - Birinchi foydalanuvchi
- `987654321` - Ikkinchi foydalanuvchi
- `555666777` - Uchinchi foydalanuvchi (yoki guruh)

## Test qilish

### Development serverni ishga tushiring:

```bash
npm run dev
```

### Test xabar yuborish:

Brauzeringizda quyidagi URL'ga kiring:

```
http://localhost:3000/api/telegram/test
```

Bu barcha chat ID'larga test xabar yuboradi va natijani ko'rsatadi.

## Ishlatish

Loyihangizdan xabar yuborish uchun:

```typescript
const response = await fetch('/api/telegram/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Javlon Karimov',
    phone: '+998901234567',
    complaint: 'Bosh og\'rig\'i',
    transcript: 'Chat tarixi...',
    sessionId: 'abc123'
  })
});

const result = await response.json();
console.log(result);
// {
//   ok: true,
//   sentCount: 3,
//   failedCount: 0,
//   messageIds: [123, 456, 789]
// }
```

## Xatolarni bartaraf etish

Agar xabar yuborilmasa:

1. `.env.local` faylini tekshiring - to'g'ri joylashdimi?
2. Bot tokenni tekshiring - BotFather'dan to'g'ri olinganmi?
3. Chat ID'larni tekshiring - vergul bilan to'g'ri ajratilganmi?
4. Botingiz guruhga qo'shilganmi va admin huquqlari bormi?
5. Development serverni qayta ishga tushiring: `npm run dev`

## Xususiyatlar

✅ Bir nechta chat ID'larga bir vaqtning o'zida xabar yuborish
✅ Har bir chat uchun alohida xatoliklarni qayta ishlash
✅ Qisman muvaffaqiyat (ba'zi chat ID'larga yuborilsa)
✅ Test endpoint mavjud
✅ To'liq xatolik loglarini chiqarish

## Yangi nomer qo'shish

Yangi nomer qo'shish uchun faqat `.env.local` faylini tahrirlang:

```env
# Eski:
TELEGRAM_CHAT_ID=123456789,987654321

# Yangi nomer qo'shish:
TELEGRAM_CHAT_ID=123456789,987654321,111222333
```

Keyin serverni qayta ishga tushiring!
