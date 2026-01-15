import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { handleAIMessage } from './aiService.js';
import { sendTelegram } from './telegram.js';
import { clinicData } from './clinic-data.js';

const app = express();

// CORS sozlamalari - universal (barcha Vercel manzillariga ruxsat beradi)
app.use(cors({
  origin: function (origin, callback) {
    // Ham localhost, ham barcha vercel manzillariga ruxsat berish
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('CORS xatosi: Bu manzilga ruxsat berilmagan'));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Root GET route - API ma'lumotlari
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Shifo AI Chat API',
    endpoints: {
      'POST /ai-chat': 'Chat xabar yuborish',
      'GET /': 'Bu sahifa (API ma\'lumotlari)'
    },
    usage: 'POST /ai-chat endpoint\'idan foydalaning'
  });
});

// Conversation storage (in production, use database)
const conversations = new Map();
// Session bo'yicha Telegram'ga yuborilganligini saqlash (duplicate'larni oldini olish uchun)
const telegramSent = new Map();

// Session bo'yicha mijoz ma'lumotlarini saqlash (ism, telefon, shikoyat, davomiyligi, AI xulosasi)
const userDataMap = new Map();

app.post('/ai-chat', async (req, res) => {
  const { message, userInfo, sessionId } = req.body; // {name, phone, problem, duration}

  try {
    // Session bo'yicha tarixni olish
    const sessionKey = sessionId || 'default';
    if (!conversations.has(sessionKey)) {
      conversations.set(sessionKey, []);
    }
    const chatHistory = conversations.get(sessionKey);

    // Mijoz ma'lumotlarini saqlash
    if (!userDataMap.has(sessionKey)) {
      userDataMap.set(sessionKey, {});
    }
    const userData = userDataMap.get(sessionKey);
    
    // userInfo dan ma'lumotlarni yangilash
    if (userInfo) {
      if (userInfo.name) userData.name = userInfo.name;
      if (userInfo.phone) userData.phone = userInfo.phone;
      if (userInfo.problem || userInfo.complaint) userData.complaint = userInfo.problem || userInfo.complaint;
      if (userInfo.duration) userData.duration = userInfo.duration;
    }
    
    // Xabardan telefon raqamini aniqlash (AI javobidan oldin, agar mavjud bo'lsa)
    const phonePatterns = [
      /\+?998\d{9}/g,
      /\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g, // +998 90 123 45 67 format
      /998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g,   // 998 90 123 45 67 format
      /90\d{9}/g,
      /\d{9}/g // Faqat 9 ta raqam (90 dan keyin)
    ];
    
    // Xabardan telefon raqamini extract qilish
    let extractedPhone = null;
    for (const pattern of phonePatterns) {
      const match = message.match(pattern);
      if (match && match[0]) {
        let phoneNum = match[0].replace(/\s+/g, ''); // Bo'sh joylarni olib tashlash
        if (phoneNum.length >= 9) {
          if (phoneNum.startsWith('+998')) {
            extractedPhone = phoneNum;
          } else if (phoneNum.startsWith('998') && phoneNum.length === 12) {
            extractedPhone = '+' + phoneNum;
          } else if (phoneNum.startsWith('90') && phoneNum.length === 11) {
            extractedPhone = '+998' + phoneNum.substring(2);
          } else if (phoneNum.length === 9) {
            extractedPhone = '+998' + phoneNum;
          }
          if (extractedPhone && extractedPhone.replace(/[^0-9]/g, '').length >= 12) {
            userData.phone = extractedPhone;
            break;
          }
        }
      }
    }
    
    // Chat history'dan kasallik/shikoyatni yig'ish (agar hali saqlanmagan bo'lsa)
    if (!userData.complaint && chatHistory.length > 0) {
      // Mijozning oldingi xabarlaridan kasallik belgilarini topish
      const diseaseKeywords = ['og\'riq', 'ogriq', 'kasal', 'shikoyat', 'dardi', 'simptom', 'alamat', 'bemor', 'bezovta', 'muammo'];
      for (const msg of chatHistory) {
        if (msg.role === 'user') {
          const hasDisease = diseaseKeywords.some(keyword => msg.content?.toLowerCase().includes(keyword.toLowerCase()));
          if (hasDisease && msg.content.length > 10) {
            userData.complaint = msg.content;
            break;
          }
        }
      }
    }
    
    // Agar hozirgi xabarda kasallik haqida ma'lumot bo'lsa, saqlash
    const diseaseKeywords = ['og\'riq', 'ogriq', 'kasal', 'shikoyat', 'dardi', 'simptom', 'alamat', 'bemor', 'bezovta', 'muammo'];
    const hasDiseaseInMessage = diseaseKeywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()));
    if (hasDiseaseInMessage && message.length > 10 && !phonePatterns.some(p => p.test(message))) {
      userData.complaint = message;
    }

    // AI javobini olish
    const reply = await handleAIMessage(message, chatHistory);

    // Tarixni yangilash
    chatHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    );
    
    // Agar telefon raqami hali extract qilinmagan bo'lsa, AI javobidan keyin qayta urinib ko'rish
    if (!userData.phone && extractedPhone) {
      userData.phone = extractedPhone;
    }
    
    // AI javobidan ham telefon raqamini qidirish (agar mavjud bo'lsa)
    if (!userData.phone) {
      for (const pattern of phonePatterns) {
        const match = reply.match(pattern);
        if (match && match[0]) {
          let phoneNum = match[0].replace(/\s+/g, '');
          if (phoneNum.length >= 9) {
            if (phoneNum.startsWith('+998')) {
              userData.phone = phoneNum;
            } else if (phoneNum.startsWith('998') && phoneNum.length === 12) {
              userData.phone = '+' + phoneNum;
            } else if (phoneNum.startsWith('90') && phoneNum.length === 11) {
              userData.phone = '+998' + phoneNum.substring(2);
            } else if (phoneNum.length === 9) {
              userData.phone = '+998' + phoneNum;
            }
            if (userData.phone && userData.phone.replace(/[^0-9]/g, '').length >= 12) {
              break;
            }
          }
        }
      }
    }

    // AI javobidan davomiylik va tashxisni aniqlash (agar mavjud bo'lsa)
    // Mijozning javobidan davomiylikni aniqlash
    const durationPatterns = [
      /(\d+)\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri/i,
      /(\d+)\s*(?:kun|hafta|oy)\s*davom/i,
      /(\d+)\s*(?:kun|hafta|oy)\s*dan beri/i
    ];
    
    for (const pattern of durationPatterns) {
      const match = message.match(pattern);
      if (match && !userData.duration) {
        userData.duration = match[0];
        break;
      }
    }

    // AI javobidan keyin ismni extract qilish - faqat AI "Ismingizni..." deb so'raganda
    if (!userData.name && !extractedPhone && !userData.phone) {
      // AI oldingi yoki hozirgi javobida "ism" so'zi bo'lishini tekshirish
      // Hozirgi javob yoki chat history'dan oxirgi AI javobini tekshirish
      const allAIResponses = chatHistory
        .filter(msg => msg.role === 'assistant')
        .map(msg => msg.content)
        .concat(reply ? [reply] : []);
      
      const aiAskedForName = allAIResponses.some(aiResp => 
        aiResp && (
          aiResp.toLowerCase().includes('ismingiz') ||
          aiResp.toLowerCase().includes('ismingizni') ||
          aiResp.toLowerCase().includes('kim deb chaqiray') ||
          aiResp.toLowerCase().includes('ismingizni qoldiring') ||
          aiResp.toLowerCase().includes('ismingizni qoldira olasizmi') ||
          aiResp.toLowerCase().includes('ismini') ||
          aiResp.toLowerCase().includes('ismingizni yozing') ||
          aiResp.toLowerCase().includes('ismingizni qoldira olasizmi?')
        )
      );
      
      // Umumiy so'zlarni filtrlash (ism sifatida qabul qilinmaydigan so'zlar)
      const commonWords = [
        'salom', 'assalomu alaykum', 'rahmat', 'yaxshi', 'ha', 'yo\'q', 'yoq', 'yuq',
        'yoqasiz', 'alo', 'qanday', 'nima', 'qayerda', 'qachon', 'qancha',
        'yaxshi', 'yomon', 'qiziq', 'kerak', 'emas', 'bor', 'yo\'q', 'yuq',
        'tushundim', 'bilaman', 'bilmayman', 'bilmadim', 'qilaman', 'qildim',
        'sog\' bo\'ling', 'tashakkur', 'qoldirish', 'qoldiraman', 'beraman', 'berdim',
        'qornim', 'boshim', 'ko\'zim', 'tishim', 'oyoq', 'qo\'l', 'yurak',
        'og\'riyapti', 'og\'riyotgan', 'kasal', 'shikoyat', 'muammo', 'bezovta',
        'qachondan', 'qancha vaqt', 'necha kun', 'necha hafta', 'necha oy',
        'isimsiz', 'ism yo\'q', 'ism yuq', 'ism yozmayman', 'qoldirmayman',
        'aytmayman', 'bermayman', 'ko\'rsatmayman', 'yo\'q', 'yuq', 'yoq'
      ];
      
      if (aiAskedForName) {
        const trimmedMessage = message.trim().toLowerCase();
        
        // "Yo'q", "yuq", "ism yo'q" kabi javoblarni tekshirish (AVVAL tekshirish)
        const isRefusal = ['yo\'q', 'yuq', 'yoq', 'isimsiz', 'ism yo\'q', 'ism yuq', 
                          'qoldirmayman', 'aytmayman', 'bermayman', 'ko\'rsatmayman',
                          'ism yozmayman'].some(refusal => 
          trimmedMessage === refusal || 
          trimmedMessage.includes(refusal)
        );
        
        // Umumiy so'zlarni filtrlash (ism sifatida qabul qilinmaydigan so'zlar)
        const isCommonWord = commonWords.some(word => 
          trimmedMessage === word || 
          trimmedMessage === word.toLowerCase() ||
          trimmedMessage.startsWith(word + ' ') ||
          trimmedMessage === word.replace('\'', '') ||
          trimmedMessage === word.replace('o\'', 'o') ||
          trimmedMessage.includes(' ' + word + ' ') ||
          trimmedMessage.includes(word + ' ') ||
          trimmedMessage.includes(' ' + word)
        );
        
        // AVVAL ismni extract qilishni sinab ko'ramiz
        let nameExtracted = false;
        
        // Ism pattern'larini tekshirish
        const nameMatch = message.match(/^(?:ismim|menim ismim|men|mening ismim|mening ism)\s+(.+)/i);
        if (nameMatch && nameMatch[1].trim().length >= 2) {
          // "Ismim Amin" formatida
          const extractedName = nameMatch[1].trim();
          if (extractedName.length >= 2 && extractedName.length <= 50 && 
              /^[А-Яа-яА-ӯа-ӯA-Za-z\s\-]+$/i.test(extractedName) &&
              !extractedName.toLowerCase().includes('og\'ri') &&
              !extractedName.toLowerCase().includes('kasal') &&
              !extractedName.toLowerCase().includes('shikoyat') &&
              !commonWords.includes(extractedName.toLowerCase())) {
            userData.name = extractedName;
            nameExtracted = true;
            console.log(`✅ Ism extract qilindi (pattern): ${userData.name}`);
          }
        } 
        
        // Raqam bor-yo'qligini tekshirish
        const hasNumber = /\d/.test(message.trim());
        
        // Agar pattern bilan extract qilinmagan bo'lsa, to'g'ridan-to'g'ri ism sifatida tekshiramiz
        if (!nameExtracted && !isCommonWord && !isRefusal && !hasNumber &&
            message.trim().length >= 2 && 
            message.trim().length <= 50 &&
            /^[А-Яа-яА-ӯа-ӯA-Za-z\s\-]+$/i.test(message.trim()) &&
            !/^\d/.test(message.trim()) &&
            !message.trim().toLowerCase().includes('og\'ri') &&
            !message.trim().toLowerCase().includes('ogriyapti') &&
            !message.trim().toLowerCase().includes('kasal') &&
            !message.trim().toLowerCase().includes('shikoyat') &&
            !message.trim().toLowerCase().includes('qornim') &&
            !message.trim().toLowerCase().includes('boshim') &&
            !message.trim().toLowerCase().includes('qachondan') &&
            !message.trim().toLowerCase().includes('qancha vaqt')) {
          // Umumiy so'zlar emas, kasallik haqida emas, ism bo'lishi mumkin
          const potentialName = message.trim();
          // To'g'ri formatda ism (faqat harflar va bo'sh joylar, maksimal 3 so'z)
          if (potentialName.split(/\s+/).length <= 3 && potentialName.length >= 2) {
            userData.name = potentialName;
            nameExtracted = true;
            console.log(`✅ Ism extract qilindi (direct): ${userData.name}`);
          }
        }
        
        // Agar ism extract qilinmagan va "yo'q" kabi javob bo'lsa, "Ko'rsatilmadi" deb belgilash
        if (!nameExtracted && (isRefusal || isCommonWord)) {
          console.log(`⚠️ Ism so'ralganda "yo'q" yoki umumiy so'z javob berildi: "${message}". Ism ko'rsatilmadi deb belgilandi.`);
          userData.name = 'Ko\'rsatilmadi';
        }
      }
    }
    
    // AI javobidan taxminiy tashxisni ajratish (yaxshiroq versiya)
    // AI javobida tashxisga ishora bo'lsa, saqlash
    // MUHIM: "kuzatayapman" va "alomatlarini" so'zlari mavjud bo'lishi kerak
    const diagnosisKeywords = ['kuzatayapman', 'alomatlarini', 'taxminan', 'shunday', 'bo\'lishi mumkin', 'tashxis', 'ehtimol', 'o\'xshaydi', 'yo\'naltirish'];
    const hasDiagnosis = diagnosisKeywords.some(keyword => reply.toLowerCase().includes(keyword.toLowerCase()));
    
    // AI javobidan taxminiy tashxisni ajratish - "kuzatayapman" va "alomatlarini" so'zlarini qidirish
    const kuzatayapmanIndex = reply.toLowerCase().indexOf('kuzatayapman');
    const alomatlariniIndex = reply.toLowerCase().indexOf('alomatlarini');
    
    if (kuzatayapmanIndex !== -1 || alomatlariniIndex !== -1) {
      // "kuzatayapman" yoki "alomatlarini" so'zlaridan boshlab, keyingi 2-3 jumlani olish
      const startIndex = kuzatayapmanIndex !== -1 ? kuzatayapmanIndex : alomatlariniIndex;
      const extractedText = reply.substring(startIndex);
      // Keyingi 200 belgini olish (taxminan 2-3 jumla)
      let tashxis = extractedText.substring(0, 200).trim();
      
      // "Lekin bu aniq tashxis emas" dan oldingi qismni olish
      if (tashxis.includes('Lekin') || tashxis.includes('lekin')) {
        tashxis = tashxis.split(/Lekin|lekin/)[0].trim();
      }
      
      userData.ai_analysis = tashxis;
    } else if (hasDiagnosis) {
      // Agar "kuzatayapman" bo'lmasa, lekin boshqa kalit so'zlar bo'lsa
      const sentences = reply.split(/[.!?]/).filter(s => s.trim().length > 10);
      
      // Tashxis qismini topish
      const diagnosisSentence = sentences.find(s => 
        diagnosisKeywords.some(keyword => s.toLowerCase().includes(keyword.toLowerCase()))
      );
      
      if (diagnosisSentence) {
        let tashxis = diagnosisSentence.trim();
        if (tashxis.includes('Lekin') || tashxis.includes('lekin')) {
          tashxis = tashxis.split(/Lekin|lekin/)[0].trim();
        }
        userData.ai_analysis = tashxis;
      } else {
        // Agar aniq format topilmasa, butun javobning birinchi qismini olish
        userData.ai_analysis = reply.substring(0, 200).trim();
      }
    }

    // Agar tarix juda uzun bo'lsa, qisqartirish (so'nggi 20 xabarni saqlash)
    if (chatHistory.length > 20) {
      conversations.set(sessionKey, chatHistory.slice(-20));
    }

    // Telegramga yuborish - telefon raqami olingandan keyin barcha ma'lumotlarni yuborish
    const phone = userData.phone || userInfo?.phone;
    const problem = userData.complaint || userInfo?.problem || userInfo?.complaint;
    const duration = userData.duration || userInfo?.duration;
    const aiAnalysis = userData.ai_analysis;
    const name = userData.name || userInfo?.name;
    
    // Telefon raqami formatini tekshirish va tozalash
    let phoneStr = phone?.trim() || '';
    // Telefon raqamini tozalash va formatlash
    if (phoneStr) {
      phoneStr = phoneStr.replace(/\s+/g, ''); // Bo'sh joylarni olib tashlash
      if (!phoneStr.startsWith('+')) {
        if (phoneStr.startsWith('998')) {
          phoneStr = '+' + phoneStr;
        } else if (phoneStr.startsWith('90')) {
          phoneStr = '+998' + phoneStr.substring(2);
        } else if (phoneStr.length === 9) {
          phoneStr = '+998' + phoneStr;
        }
      }
    }
    
    const hasValidPhone = phoneStr && 
                          phoneStr !== '' && 
                          phoneStr !== '+998900000000' && 
                          phoneStr !== 'Noma\'lum' && 
                          phoneStr.startsWith('+998') &&
                          phoneStr.replace(/[^0-9]/g, '').length >= 12; // Kamida 12 raqam (+998901234567)
    
    // Agar telefon raqami olingan bo'lsa (raqam olingandan keyin BARCHA ma'lumotlarni yuborish)
    if (hasValidPhone) {
      const sentKey = `${sessionKey}_${phoneStr}`;
      
      // Oldin yuborilmaganligini tekshirish (bir telefon raqami uchun faqat 1 marta yuborish)
      if (!telegramSent.has(sentKey)) {
        // Chat history'dan shikoyatni aniqlash (agar saqlanmagan bo'lsa)
        let complaintText = userData.complaint || problem?.trim() || "Ko'rsatilmagan";
        
        if (complaintText === "Ko'rsatilmagan" || !complaintText || complaintText.length < 5) {
          // Agar maxsus maydon bo'sh bo'lsa, suhbat tarixidan barcha USER xabarlarini yig'amiz
          const allUserWords = chatHistory
            .filter(m => m.role === 'user' && m.content && m.content.length > 3)
            .map(m => {
              // Telefon raqamlarini va ismlarni olib tashlash
              let content = m.content;
              content = content.replace(/\+?998\d{9}/g, ''); // +998XXXXXXXXX format
              content = content.replace(/90\d{9}/g, ''); // 90XXXXXXXXX format
              content = content.replace(/\d{9,}/g, ''); // Har qanday 9+ raqamli son
              content = content.replace(/\s+/g, ' ').trim();
              return content;
            })
            .filter(content => content.length > 3 && !/^\d+$/.test(content)) // Faqat raqamlar emas
            .join(', ');
          
          if (allUserWords.length > 5) {
            complaintText = allUserWords.substring(0, 300); // 300 belgidan oshmasin
          }
        }
        
        // Shikoyatni tozalash - telefon raqamlarini olib tashlash
        if (complaintText && complaintText !== 'Ko\'rsatilmagan') {
          complaintText = complaintText.replace(/\+?998\d{9}/g, ''); // +998XXXXXXXXX format
          complaintText = complaintText.replace(/90\d{9}/g, ''); // 90XXXXXXXXX format
          complaintText = complaintText.replace(/\d{9,}/g, ''); // Har qanday 9+ raqamli son
          complaintText = complaintText.replace(/\s+/g, ' ').trim(); // Ortiqcha bo'shliqlarni olib tashlash
          
          // Agar shikoyat bo'sh bo'lib qolsa yoki faqat raqamlar bo'lsa
          if (!complaintText || complaintText.length < 3 || /^\d+$/.test(complaintText)) {
            complaintText = 'Ko\'rsatilmagan';
          }
          
          // Shikoyat telefon raqamiga o'xshash bo'lsa
          if (complaintText === phoneStr || complaintText.replace(/\+/g, '') === phoneStr.replace(/\+/g, '')) {
            complaintText = 'Ko\'rsatilmagan';
          }
        }
        
        // Yo'nalishni aniqlash (AI tashxisidan yoki shikoyatdan)
        let specialistDirection = 'Terapevt'; // Default
        const specialistMapping = {
          'Kardiolog': ['yurak', 'qon tomir', 'qon bosimi', 'gipertoniya', 'aritmiya', 'yurak xuruji'],
          'Nevrolog': ['bosh og\'riq', 'migren', 'nevrologiya', 'asab', 'paralich', 'epilepsiya', 'bo\'yin', 'orqa'],
          'Xirurg (Jarroh)': ['appenditsit', 'appenditsit shubhasi', 'shubhasi', 'xirurg', 'jarroh', 'o\'tkir', 'urg\'un', 'operatsiya'],
          'Terapevt': ['umumiy', 'terapevt', 'birinchi yordam']
        };
        
        // AI xulosasini olish (agar saqlanmagan bo'lsa, chat history'dan qidirish)
        let aiAnalysis = userData.ai_analysis || '';
        if (!aiAnalysis || aiAnalysis === 'Hali tahlil qilinmadi') {
          // Chat history'dan AI javoblarini qidirish
          const aiMessages = chatHistory
            .filter(msg => msg.role === 'assistant' && msg.content)
            .map(msg => msg.content)
            .reverse(); // Oxirgi javobdan boshlab
          
          for (const aiReply of aiMessages) {
            const kuzatayapmanIndex = aiReply.toLowerCase().indexOf('kuzatayapman');
            const alomatlariniIndex = aiReply.toLowerCase().indexOf('alomatlarini');
            
            if (kuzatayapmanIndex !== -1 || alomatlariniIndex !== -1) {
              const startIndex = kuzatayapmanIndex !== -1 ? kuzatayapmanIndex : alomatlariniIndex;
              const extractedText = aiReply.substring(startIndex);
              aiAnalysis = extractedText.substring(0, 200).trim();
              break;
            }
          }
        }
        
        if (!aiAnalysis || aiAnalysis.length < 10) {
          aiAnalysis = 'Hali tahlil qilinmadi';
        }
        
        const combinedText = (aiAnalysis + ' ' + complaintText).toLowerCase();
        for (const [specialist, keywords] of Object.entries(specialistMapping)) {
          if (keywords.some(keyword => combinedText.includes(keyword))) {
            specialistDirection = specialist;
            break;
          }
        }
        
        // TelegramData tayyorlashdan oldin - userDatani yana bir bor filtrdan o'tkazish
        let finalName = name || 'Ko\'rsatilmagan';
        // Agar ism ichida raqam bo'lsa yoki telefon bilan bir xil bo'lsa
        if (/\d/.test(finalName) || finalName.replace(/\+/g, '') === phoneStr.replace(/\+/g, '')) {
          finalName = "Noma'lum (Faqat raqam qoldirgan)";
        }
        
        // Faqat kerakli ma'lumotlarni tayyorlash (telefon raqami olinganda)
        const telegramData = {
          name: finalName,
          phone: phoneStr,
          complaint: complaintText || 'Ko\'rsatilmagan',
          duration: duration || 'Ko\'rsatilmagan',
          specialist_direction: specialistDirection,
          ai_analysis: aiAnalysis || 'Hali tahlil qilinmadi'
        };
        
        // Telegram'ga yuborish (serverni to'xtatmasligi uchun)
        sendTelegram(telegramData).then(() => {
          console.log(`✅ Telegram'ga yuborildi (telefon raqami olingandan keyin):`);
          console.log(`   👤 Ism: ${telegramData.name}`);
          console.log(`   📞 Telefon: ${phoneStr}`);
          console.log(`   🤒 Shikoyat: ${telegramData.complaint.substring(0, 80)}${telegramData.complaint.length > 80 ? '...' : ''}`);
          console.log(`   ⏳ Davomiyligi: ${telegramData.duration}`);
          console.log(`   🏥 Yo'nalish: ${telegramData.specialist_direction}`);
          console.log(`   👨‍⚕️ AI Tashxisi: ${telegramData.ai_analysis.substring(0, 80)}${telegramData.ai_analysis.length > 80 ? '...' : ''}`);
          // Bir telefon raqami uchun faqat 1 marta yuborish
          telegramSent.set(sentKey, Date.now());
        }).catch(err => {
          console.error('❌ Telegram xabar yuborish xatosi:', err);
        });
      } else {
        console.log(`⏭️  Telegram'ga allaqachon yuborilgan (telefon: ${phoneStr}, bir telefon raqami uchun faqat 1 marta yuboriladi)`);
      }
    } else {
      // Agar telefon raqami hali olinmagan bo'lsa, console'ga yozish
      console.log(`ℹ️  Telefon raqami hali olinmadi. To'plangan ma'lumotlar:`);
      console.log(`   👤 Ism: ${name || 'yo\'q'}`);
      console.log(`   🤒 Shikoyat: ${problem || 'yo\'q'}`);
      console.log(`   ⏳ Davomiyligi: ${duration || 'yo\'q'}`);
      console.log(`   👨‍⚕️ AI Tashxisi: ${aiAnalysis || 'yo\'q'}`);
    }

    res.json({ reply });
  } catch (error) {
    console.error("LOG:", error);
    res.status(200).json({ 
      reply: `Backend xatosi: ${error.message}. 
    Kalit mavjudligi: ${process.env.OPENAI_API_KEY ? 'Bor' : 'Yoq'}` 
    });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  
  // API key tekshiruvi
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
    console.log('');
    console.log('⚠️  UYATLANTIRISH: OPENAI_API_KEY .env faylida to\'g\'ri kiritilmagan!');
    console.log('⚠️  Iltimos, server/.env fayliga haqiqiy OpenAI API key kiriting!');
    console.log('⚠️  API key olish: https://platform.openai.com/api-keys');
    console.log('');
  } else {
    console.log('✅ OpenAI API key mavjud');
  }
});

