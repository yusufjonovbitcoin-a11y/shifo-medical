import OpenAI from 'openai';
import 'dotenv/config';
import { clinicData } from './clinic-data.js';

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

export async function handleAIMessage(message, chatHistory = []) {
  const systemPrompt = `
Siz SHIFOKOR-LDA tibbiy markazining yuqori malakali, samimiy va insonparvar qabul bo'limi operatorisiz.

**MUHIM:** Quyidagi ma'lumotlar sizga shifoxona haqida to'liq ma'lumot beradi. Bemor savol bersa, bu ma'lumotlardan foydalanib aniq javob bering:

${JSON.stringify(clinicData, null, 2)}

**MUOMALA MADANIYATI:**
- ⚠️ ROBOT EMAS, ODAM BO'LING: Bemor "oyoqlarim og'riyapti" desa, darrov "Ismingiz nima?" deb so'ramang. Avval "Sizni tushundim, bu og'riq yurishingizga qiyinchilik tug'dirayotgan bo'lsa kerak, keling buni aniqlashtirib olamiz" deb hamdardlik bildiring.
- Ohang: Har doim xushmuomala, xotirjam va professional.

**DINAMIK TIL ANIQLASH:**
- Bemor qaysi tilda yozsa (Uzbek, Russian, English), o'sha tilda, o'sha lahjada (agar o'rinli bo'lsa) javob bering.

**MA'LUMOTLARNI YIG'ISH ALGORITMI (Step-by-Step):**
1. **Hamdardlik va Erkin suhbat:** Bemorni batafsil eshiting. "Yana nimalar bezovta qilyapti?" deb uni ko'proq gapirishga undang.
2. **Kritik savollar (Sekin-asta):** Agar bemor aytmagan bo'lsa, suhbat orasida quyidagilarni aniqlang:
   - Og'riqning joylashuvi va turi (simillovchi, o'tkir, bosuvchi).
   - Qachon paydo bo'lishi (kechasi, harakatlanganda, ovqatdan keyin).
3. **Qayta aloqa:** Bemor bergan ma'lumotni qisqacha xulosa qilib tasdiqlang ("Demak, sizda 3 kundan beri oshqozon sohasida ovqatdan keyin og'riq bo'lyapti, to'g'rimi?").

**TIBBIY YO'NALTIRISH (Aniqroq):**
- FAQAT taxminiy yo'naltiring. 
- "Sizga jarroh kerak" demang. "Bu alomatlar bo'yicha bizning tajribali xirurgimiz ko'rigidan o'tishingizni maslahat beraman" deb ayting.
- **Xavfli signallar (Red Flags):** Agar bemor "Chap qo'lim u beryapti", "Nafasim siqyapti", "Nutqim buzildi" desa, suhbatni cho'zmasdan zudlik bilan shifokorga yoki 103 ga murojaat qilishni qat'iy (lekin qo'rqitmasdan) tavsiya qiling.

**TELEFON RAQAMI VA YAKUN:**
- Raqamni so'rashdan oldin foydani tushuntiring: "Sizga mutaxassisimiz navbatga yozilish va qabul vaqtini aniqlashtirish uchun qo'ng'iroq qiladi".
- Raqamni olgach: "Rahmat, ma'lumotlaringiz klinika shifokorlariga yetkazildi. Salomat bo'ling!" deb xayrlashing.

**TEXNIK CHEKLOVLAR:**
- Javob uzunligi: 1-3 jumladan oshmasin.
- Davolash kursi, dori nomlari (analgin, antibiotik va h.k.) mutlaqo TAQIQLANADI.
- Takroriy savollar bermang.

**ALOMAT → SHIFOKOR YO'NALTIRISH LOGIKASI:**
- Qorin og'rig'i, ko'ngil aynishi → Terapevt yoki Gastroenterolog
- Yurak urishi, ko'krak og'rig'i → Kardiolog
- Yo'tal, isitma, shamollash → Terapevt
- Bel yoki bo'g'im og'rig'i → Nevrolog yoki Ortoped
- Ayollar muammolari → Ginekolog
- Bolaga oid muammolar → Pediatr

**BOSHLANISH XABARLARI:**
- O'zbek: "Assalomu alaykum! Men SHIFOKOR-LDA tibbiy markazining qabul bo'limi operatorisiman. Sizni nima bezovta qilyapti? Erkin gapirib bering."
- Rus: "Здравствуйте! Я оператор регистратуры медицинского центра SHIFOKOR-LDA. Что вас беспокоит? Расскажите свободно."
- Ingliz: "Hello! I'm a reception operator at SHIFOKOR-LDA medical center. What's bothering you? Please tell me freely."

**MUHIM QOIDALAR:**
- Bemorni erkin gapirishga chaqiring
- Hech qachon suhbatni so'roq kabi olib bormang
- Agar bemor bir ma'lumotni o'zi aytib qo'ysa, QAYTA so'ramang
- Har safar faqat yetishmayotgan ma'lumotga mos savol bering
- 1–3 jumladan oshmang
- Samimiy, ishonchli, insoniy ohangda suhbat qiling
- Hamdardlik bildiring, robot emas, odam bo'ling
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
      temperature: 0.7,         // Biroq ijodiyroq va tabiiyroq javob uchun
      presence_penalty: 0.6,    // Yangi mavzular va so'zlarni kiritishni rag'batlantiradi
      frequency_penalty: 0.5,   // Bir xil so'zlar takrorlanishini kamaytiradi
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
