# Google Analytics API Sozlash Qo'llanmasi

## 1. Google Cloud Console'da Service Account Yaratish

### 1.1. Google Cloud Console'ga Kiring
1. [Google Cloud Console](https://console.cloud.google.com/) ga kiring
2. Loyiha yarating yoki mavjud loyihani tanlang

### 1.2. Google Analytics Data API'ni Yoqing
1. **APIs & Services** > **Library** ga o'ting
2. "Google Analytics Data API" qidiring
3. **Enable** tugmasini bosing

### 1.3. Service Account Yarating
1. **APIs & Services** > **Credentials** ga o'ting
2. **Create Credentials** > **Service account** tugmasini bosing
3. Service account nomi kiriting (masalan: `shifokor-analytics`)
4. **Create and Continue** tugmasini bosing
5. **Done** tugmasini bosing

### 1.4. Service Account Key Yarating
1. Yaratilgan service account'ga kiring
2. **Keys** tabiga o'ting
3. **Add Key** > **Create new key** tugmasini bosing
4. **JSON** formatini tanlang
5. **Create** tugmasini bosing
6. JSON fayl yuklab olinadi - bu faylni saqlang!

## 2. Google Analytics'da Ruxsat Berish

### 2.1. Google Analytics'ga Kiring
1. [Google Analytics](https://analytics.google.com/) ga kiring
2. **Admin** (Sozlamalar) ga o'ting
3. **Property Access Management** ga o'ting

### 2.2. Service Account'ga Ruxsat Bering
1. **+** (Add users) tugmasini bosing
2. Service account email manzilini kiriting (JSON faylda `client_email` maydoni)
   - Format: `shifokor-analytics@project-id.iam.gserviceaccount.com`
3. **Viewer** roli tanlang
4. **Add** tugmasini bosing

## 3. Property ID'ni Olish

1. Google Analytics'da **Admin** > **Property Settings** ga o'ting
2. **Property ID** ni ko'chirib oling (masalan: `123456789`)
3. Yoki URL'dan oling: `https://analytics.google.com/analytics/web/#/p123456789/...`

## 4. Loyihaga Ulash

### 4.1. JSON Faylni Tayyorlash
1. Yuklab olingan JSON faylni oching
2. Butun JSON mazmunini ko'chirib oling (bir qatorda bo'lishi kerak)

### 4.2. .env.local Faylga Qo'shish

`.env.local` fayliga quyidagicha qo'shing:

```env
GOOGLE_ANALYTICS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nXXX\n-----END PRIVATE KEY-----\n","client_email":"shifokor-analytics@project-id.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"xxx"}
```

**MUHIM:** Butun JSON bir qatorda bo'lishi kerak!

### 4.3. Property ID'ni Yangilash

`app/api/analytics/route.ts` faylida Property ID'ni yangilang:

```typescript
const propertyId = '123456789'; // O'zingizning Property ID'ngiz
```

## 5. Ishga Tushirish

1. Dev serverni qayta ishga tushiring:
   ```bash
   npm run dev
   ```

2. Saytga kiring va copyright qismini bosib turing (1 soniya)

3. Modal ochiladi va real Google Analytics ma'lumotlari ko'rsatiladi

## 6. Tekshirish

- Agar modal ochilganda **"Demo ma'lumotlar"** ko'rsatsa - API hali to'g'ri ulanmagan
- Agar hech qanday ogohlantirish bo'lmasa - real ma'lumotlar ko'rsatilmoqda ✅

## Xavfsizlik

⚠️ **MUHIM:**
- `.env.local` faylini hech qachon GitHub'ga yuklmang
- `.gitignore` da `.env.local` bo'lishini tekshiring
- Service account key'ni hech kimga bermang

## Qo'shimcha Yordam

Agar muammo yuzaga kelsa:
1. Service account email to'g'riligini tekshiring
2. Google Analytics'da ruxsat berilganligini tasdiqlang
3. Property ID to'g'riligini tekshiring
4. Terminal'da xatoliklarni o'qing

## Vercel Deploy Uchun

Vercel'ga deploy qilganda:
1. Vercel Dashboard > Settings > Environment Variables ga o'ting
2. `GOOGLE_ANALYTICS_CREDENTIALS` qo'shing (JSON string)
3. Redeploy qiling

---

✅ **Tayyor!** Endi saytga oylik qancha odam kirganini ko'rishingiz mumkin!
