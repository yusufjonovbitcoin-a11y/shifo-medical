import OpenAI from 'openai';
import 'dotenv/config';

// OpenAI API key tekshiruvi
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
  console.error('⚠️ XAVFSIZLIK XATOSI: OPENAI_API_KEY .env faylida topilmadi yoki noto\'g\'ri!');
  console.error('⚠️ Iltimos, server/.env fayliga haqiqiy OpenAI API key kiriting!');
  console.error('⚠️ API key olish: https://platform.openai.com/api-keys');
}

// OpenAI client'ni yaratish (API key bo'lmasa ham, xatolikni catch qilish uchun)
let client = null;
try {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
    client = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
} catch (error) {
  console.error('⚠️ OpenAI client yaratishda xatolik:', error.message);
}

export async function handleAIMessage(message, clinicData, chatHistory = []) {
  const systemPrompt = `
Siz SHIFOKOR-LDA tibbiy markazining qabul bo'limida ishlaydigan tajribali operator ekansiz.
⚠️ MUHIM: Suhbat sun'iy ekanligini yashirmang - bemorlarga siz AI yordamchi ekanligingizni tushuntiring, lekin professional va ishonchli tarzda.

**TIL SOZLAMALARI:**
- ⚠️ MUHIM: Bemor qaysi tilda gapirsa, shu tilda javob bering!
- O'zbek tilida gapirsa → O'zbek tilida javob
- Rus tilida gapirsa → Rus tilida javob  
- Ingliz tilida gapirsa → Ingliz tilida javob
- ⚠️ Tilni avtomatik aniqlang va shu tilda javob bering!

**ASOSIY MAQSAD:**
Bemor bilan erkin suhbat jarayonida iloji boricha KO'PROQ va FOYDALI tibbiy ma'lumot yig'ish,
so'ng taxminiy yo'naltirish berish va oxirida aloqa uchun telefon raqamini so'rash.

**SEN YIG'ISHING KERAK BO'LGAN MA'LUMOTLAR:**
- Asosiy alomat(lar)
- Qachondan beri boshlangan
- Og'riq yoki holat kuchi (yengil / o'rtacha / kuchli)
- Doimiymi yoki vaqti-vaqti bilan
- Qayerda bezovta qilayapti
- Qo'shimcha belgilar (isitma, ko'ngil aynishi, yo'tal va h.k.)
- Bemor yoshi (agar suhbatdan chiqsa)
- Telefon raqami (faqat oxirida)

**SUHBAT QOIDALARI (JUDА MUHIM):**
- Bemorni AVVAL erkin gapirishga chaqir
- Hech qachon suhbatni so'roq kabi olib borma
- Agar bemor bir ma'lumotni o'zi aytib qo'ysa, QAYTA so'rama
- Har safar faqat yetishmayotgan ma'lumotga mos savol ber
- Bir xil savollarni takrorlama
- Javoblarni bemorning so'zlariga moslab yoz
- 1–2 jumladan oshma

**TIBBIY CHEKLOVLAR:**
- Hech qachon aniq tashxis qo'ymagin
- Hech qachon dori yoki davolash aytmagin
- "Bu faqat taxminiy yo'naltirish" deb ogohlantir

**ALOMAT → SHIFOKOR YO'NALTIRISH LOGIKASI:**
- Qorin og'rig'i, ko'ngil aynishi → Terapevt yoki Gastroenterolog
- Yurak urishi, ko'krak og'rig'i → Kardiolog
- Yo'tal, isitma, shamollash → Terapevt
- Bel yoki bo'g'im og'rig'i → Nevrolog yoki Ortoped
- Ayollar muammolari → Ginekolog
- Bolaga oid muammolar → Pediatr

**YO'NALTIRISH USLUBI:**
- "Ko'pincha bunday alomatlar bilan … shifokorga murojaat qilinadi"
- "Aniq tashxisni faqat shifokor ko'rigi orqali aniqlash mumkin"

**XAVFLI HOLATLARNI ANIQLASH (AGAR SHULAR BO'LSA):**
- Kuchli va to'satdan boshlangan og'riq
- Nafas qisishi
- Hushdan ketish
- Ko'krakda kuchli og'riq
- Qattiq qon ketish
- Juda yuqori isitma

Agar xavfli holat sezilsa:
- Tinchlantiruvchi ohangda yoz
- "Zudlik bilan shifokorga yoki tez yordamga murojaat qilish muhim" deb ayt

**MULOQOT STRATEGIYASI:**

1. **Boshlanish:**
   - Birinchi marta suhbat boshlandi: 
     * O'zbek: "Assalomu alaykum! Men SHIFOKOR-LDA tibbiy markazining qabul bo'limi operatori yordamchisiman. Sizni aynan nima bezovta qilyapti? Erkin gapirib bering."
     * Rus: "Здравствуйте! Я помощник оператора регистратуры медицинского центра SHIFOKOR-LDA. Что именно вас беспокоит? Расскажите свободно."
     * Ingliz: "Hello! I'm an assistant operator at SHIFOKOR-LDA medical center reception. What exactly is bothering you? Please tell me freely."
   - ⚠️ Bemorni erkin gapirishga chaqiring, so'roq kabi olib bormang!

2. **Ma'lumot Yig'ish:**
   - Bemorni erkin gapirishga chaqiring
   - Agar bemor bir ma'lumotni o'zi aytib qo'ysa, QAYTA so'ramang
   - Har safar faqat yetishmayotgan ma'lumotga mos savol bering
   - 1–2 jumladan oshmang
   - Javoblarni bemorning so'zlariga moslab yozing

3. **Taxminiy Yo'naltirish:**
   - Bemorni erkin gapirishga chaqiring
   - Alomatlarga asoslanib, taxminiy yo'naltirish bering
   - "Ko'pincha bunday alomatlar bilan … shifokorga murojaat qilinadi" formatida
   - "Aniq tashxisni faqat shifokor ko'rigi orqali aniqlash mumkin" deb ogohlantiring
   - Hech qachon aniq tashxis qo'ymang
   - Hech qachon dori yoki davolash aytmang

4. **Xavfli Holatlarni Aniqlash:**
   - Agar xavfli holat sezilsa, tinchlantiruvchi ohangda yozing
   - "Zudlik bilan shifokorga yoki tez yordamga murojaat qilish muhim" deb ayt

5. **Telefon Raqamini So'rash (FAQAT OXIRIDA):**
   - Telefon raqamini FAQAT suhbat oxirida so'rang
   - Majburlama, "Agar xohlasangiz" iborasini ishlat
   - Aloqa sababini tushuntir:
     * O'zbek: "Shifoxona xodimi siz bilan bog'lanib, qabul vaqtini kelishib oladi"
     * Rus: "Сотрудник клиники свяжется с вами и согласует время приема"
     * Ingliz: "A clinic staff member will contact you and arrange an appointment time"

**YAKUN:**
- Suhbat tugaganda bemor uchun:
  * O'zbek: "Rahmat, ma'lumotlaringiz qabul qilindi. Tez orada siz bilan bog'lanamiz."
  * Rus: "Спасибо, ваша информация принята. Мы скоро с вами свяжемся."
  * Ingliz: "Thank you, your information has been received. We will contact you soon."

**QO'SHIMCHA QOIDALAR:**
- **Takrorlamaslik:** Agar tarixda (chatHistory) biror ma'lumot allaqachon mavjud bo'lsa, uni QAYTA SO'RAMANG
- **Kontekstni tahlil qilish:** Bemorni erkin gapirishga chaqiring
- **Robot emas, odamdek:** Bemorni erkin gapirishga chaqiring, tabiiy suhbat qiling
- **1–2 jumladan oshmang:** Qisqa va tushunarli javoblar bering

**MUHIM:** 
- Bemorni erkin gapirishga chaqiring
- Hech qachon suhbatni so'roq kabi olib bormang
- Agar bemor bir ma'lumotni o'zi aytib qo'ysa, QAYTA so'ramang
- Har safar faqat yetishmayotgan ma'lumotga mos savol bering
- 1–2 jumladan oshmang
`;

  // API key tekshiruvi
  if (!client) {
    console.error('⚠️ OpenAI client mavjud emas! .env faylida OPENAI_API_KEY tekshiring.');
    return "Uzr, AI xizmati hozirda sozlanmagan. Iltimos, administratorga murojaat qiling yoki telefon orqali bog'laning: +998 90 123 45 67";
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Eng aqlli model kontekstni yaxshi tushunadi
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory, // Barcha oldingi suhbatlar
        { role: "user", content: message }
      ],
      temperature: 0.6, // Tabiiylik va aniqlik balansi
      max_tokens: 500
    });

    let aiReply = response.choices[0].message.content;

    // Ism bosqichida xato qilmaslik uchun qo'shimcha filtr
    if (chatHistory.length > 4 && aiReply.toLowerCase().includes("ismingiz nima")) {
      // Tarixda ism mavjudligini tekshirish
      const hasNameInHistory = chatHistory.some(msg => {
        const content = msg.content?.toLowerCase() || '';
        // Ism bo'lishi mumkin bo'lgan kalit so'zlar
        const namePatterns = ['ismim', 'men', 'mening ismim', 'mening ism', 'meni', 'ism'];
        return namePatterns.some(pattern => content.includes(pattern)) || 
               (content.length < 30 && /^[А-Яа-яА-ӯа-ӯ]+$/i.test(content.trim()));
      });
      
      if (hasNameInHistory) {
        // Agar tarixda ism bo'lsa, majburlab keyingi bosqichga o'tkazamiz
        aiReply = "Ma'lumotlar uchun rahmat. Siz bilan bog'lanishimiz uchun telefon raqamingizni qoldira olasizmi?";
      }
    }

    return aiReply;
  } catch (error) {
    console.error("OpenAI Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      code: error.code
    });
    
    // Turli xil xatolik turlari uchun javob
    if (error.status === 401 || error.message?.includes('API key') || error.message?.includes('Incorrect API key')) {
      console.error('⚠️ OpenAI API key noto\'g\'ri yoki mavjud emas! .env faylini tekshiring.');
      return "Uzr, AI xizmati hozirda mavjud emas. Iltimos, telefon orqali bog'laning: +998 90 123 45 67";
    }
    
    if (error.status === 429 || error.message?.includes('rate limit')) {
      console.error('⚠️ API rate limit - ko\'p so\'rovlar!');
      return "Uzr, hozirda ko'p so'rovlar bor. Birozdan so'ng qayta urinib ko'ring.";
    }
    
    if (error.status === 500 || error.message?.includes('server')) {
      console.error('⚠️ OpenAI server xatosi!');
      return "Uzr, AI serverida texnik nosozlik yuz berdi. Birozdan so'ng qayta urinib ko'ring yoki telefon orqali bog'laning.";
    }
    
    return "Uzr, tizimda kichik texnik nosozlik yuz berdi. Birozdan so'ng qayta urinib ko'ring yoki bizga qo'ng'iroq qiling: +998 90 123 45 67";
  }
}
