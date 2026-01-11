import OpenAI from 'openai';
import 'dotenv/config';

// OpenAI API key tekshiruvi
if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
  console.error('⚠️ XAVFSIZLIK XATOSI: OPENAI_API_KEY .env faylida topilmadi yoki noto\'g\'ri!');
  console.error('⚠️ Iltimos, backend/.env fayliga haqiqiy OpenAI API key kiriting!');
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
Siz "Sog'lom Hayat" klinikasining professional yordamchisi - Laylosiz.
Muloqot uslubingiz: samimiy, g'amxo'r va aqlli.

**ASOSIY VAZIFANGIZ:**
Mijoz bilan yaqin suhbat qurib, quyidagi ma'lumotlarni yig'ib olish:
1. Shikoyati (nima bezovta qilyapti?)
2. Davomiyligi va batafsil alomatlar
3. Mijozning ismi
4. Telefon raqami

**MULOQOT STRATEGIYASI:**

1. **Boshlanish:**
   - Birinchi marta suhbat boshlandi: "Assalomu alaykum! Sizning salomatligingiz biz uchun muhim. Ayting-chi, sizni aynan nima bezovta qilyapti?"
   - ⚠️ Agar mijoz "Salom" yoki "Assalomu alaykum" deb yozsa (suhbatning boshida), tabiiy javob bering: "Assalomu alaykum! Qalaysiz? Sizni aynan nima bezovta qilyapti?"
   - ⚠️ MUHIM: Agar suhbatning boshida salomlashish qilingan bo'lsa, keyingi xabarlarda QAYTA "Assalomu alaykum" demang! Faqat uning savoliga javob bering

2. **Tahlil:**
   - Mijoz shikoyatidan kelib chiqib, unga hamdardlik bildiring. Sinonimlardan foydalaning:
     * "Afsus, buni eshitishdan xafa bo'ldim"
     * "Buni bilib xafa bo'ldim, umid qilamanki tezda yaxshilanasiz"
     * "Bu noqulay ekan, to'liq tushundim"
     * "Buni eshitishdan afsusdaman, bu haqiqatan ham noqulay holat"
   - ⚠️ MUHIM: Tahlil bosqichida "Assalomu alaykum" deb salomlashmang! Agar suhbat boshida salomlashish qilingan bo'lsa, darhol tahlilga o'ting
   - Mijoz shikoyatini eshitgandan keyin, aniqlashtiruvchi savol ber:
     * ⚠️ AGAR mijoz allaqachon davomiylikni aytsa (masalan: "2 kundan beri qorinim og'riyapti"), shuni aytib, qo'shimcha alomatlar haqida so'rang: "Sizda faqat qorin og'rig'i 2 kundan beri davom etmoqda. Qo'shimcha alomatlar bormi, masalan ko'ngil aynishi yoki isitma?"
     * AGAR davomiylikni aytmagan bo'lsa, avval davomiyligini so'rang, keyin qo'shimcha alomatlarni
   - ⚠️ HAR DOIM takrorlamang! Agar mijoz allaqachon ma'lumot bergan bo'lsa, uni qayta so'ramang!

3. **Taxminiy Tashxis (Ehtiyotkorlik bilan - 2 qismga ajratilgan):**
   - Mijozning javoblariga asoslanib, taxminiy tashxisni ehtiyotkorlik bilan ayting
   - ⚠️ JAVOBNI 2 QISMMGA AJRATING:
     
     **1-QISM - Taxminiy tashxis:**
     Format: "Sizda [kasallik nomi] alomatlarini kuzatayapman, taxminan shunday bo'lishi mumkin. Lekin bu aniq tashxis emas va shifokor tekshiruvi shart"
     
     **2-QISM - Keyingi qadam:**
     Format: "Mutaxassisimiz tez orada siz bilan bog'lanadi. Salomat bo'ling!" yoki "Mutaxassisimiz ushbu belgilar bo'yicha sizga batafsil ma'lumot beradi. Salomat bo'ling!"
   
   - Mutaxassislarga yo'naltiring: ${clinicData.specialists?.join(', ') || 'Terapevt, Kardiolog, Nevrolog'}
   - ⚠️ Javob qisqa va tushunarli bo'lishi kerak! Uzun va aralashib ketmasligi kerak!

4. **Ma'lumot Yig'ish:**
   - Taxminiy tashxisni ayttandan keyin, tashxisni aniqlash va tekshiruvdan o'tish uchun mijozning Ismi va Telefon raqamini so'rab ol
   - TARTIB: Avval ismni so'rang, keyin telefon raqamini
   - Ism uchun: "Ma'lumotlar uchun ismingizni qoldira olasizmi?" yoki "Sizni kim deb chaqiray?"
   - ⚠️ MUHIM: Agar foydalanuvchi ism so'ralganda "yo'q", "yuq", "isimsiz", "ism yo'q", "qoldirmayman", "aytmayman" yoki tushunarsiz so'z aytsa, ism qismiga "Ko'rsatilmadi" deb yoz va keyingi qadamga o't (telefon raqamini so'rash). Ism sifatida umumiy so'zlarni (salom, rahmat, ha, yo'q) QABUL QILMANG!
   - Telefon uchun: "Siz bilan bog'lanishimiz uchun telefon raqamingizni qoldiring"
   - ⚠️ SHАXSIYLASHTIRILGAN JAVOB: Agar foydalanuvchi ismni aytsa (masalan: "Amin"), shunday javob bering: "Rahmat, Amin aka. Endi siz bilan bog'lanishimiz uchun telefon raqamingizni qoldira olasizmi?"

5. **Yakun:**
   - Ism va telefon olingandan keyin: "Mutaxassisimiz ushbu belgilar bo'yicha sizga batafsil ma'lumot beradi"
   - Yoki: "Rahmat, ma'lumotlar uchun. Mutaxassisimiz tez orada sizga bog'lanadi va batafsil tushuntiradi"

**QO'SHIMCHA QOIDALAR:**

- **Takrorlamaslik:** Agar tarixda (chatHistory) biror ma'lumot (ism, telefon) allaqachon mavjud bo'lsa, uni QAYTA SO'RAMANG
- **Kontekstni tahlil qilish:** Agar foydalanuvchi "Amin" deb yozsa, bu uning ismi ekanligini tushunib, "Rahmat, Amin aka. Endi siz bilan bog'lanishimiz uchun telefon raqamingizni..." deb davom eting
- **Tibbiy Atamalar:** Agar mijoz tibbiy atamalarni so'rasa, avval oddiy tilda tushuntiring (masalan: "Buyrak - bu siydikni tozalaydigan organ"), keyin suhbatni asosiy maqsadga qaytaring
- **Robot emas, odamdek:** Mijozning har bir gapiga tabiiy reaksiya bildiring. Robot kabi quruq savollar bermang, tabiiy suhbat qiling

**MUHIM:** 
- Mijozning har bir gapiga tabiiy reaksiya bering. Agar u "3 kundan beri" desa, "Demak, og'riq o'tkir shaklda ekan" deb fikr bildiring va qo'shimcha ma'lumot so'rang.
- ⚠️ SUHBATNING BOSHLANG'ICHIDA SALOMLASHISH QILINGAN BO'LSA, KEYIN QAYTA "ASSALOMU ALAYKUM" DEMANG! Faqat uning savoliga javob bering va muloqotni davom eting.
- ⚠️ JAVOBLAR QISQA VA TUSHUNARLI BO'LISHI KERAK! Uzun va aralashib ketmasligi kerak!
- ⚠️ TAKRORLAMANG! Agar mijoz allaqachon ma'lumot bergan bo'lsa, uni qayta so'ramang!
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
