import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { handleAIMessage } from './aiService.js';
import { sendTelegram } from './telegram.js';

// JSON faylni o'qish (barcha Node.js versiyalarida ishlaydi)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const clinicData = JSON.parse(readFileSync(join(__dirname, 'clinic-data.json'), 'utf-8'));

const app = express();

// CORS sozlamalari - production uchun
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://shifo-medical.vercel.app", // Saytingizning asosiy manzili
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
    const reply = await handleAIMessage(message, clinicData, chatHistory);

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
        
        // Agar pattern bilan extract qilinmagan bo'lsa, to'g'ridan-to'g'ri ism sifatida tekshiramiz
        if (!nameExtracted && !isCommonWord && !isRefusal &&
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
    const diagnosisKeywords = ['kuzatayapman', 'alomatlarini', 'taxminan', 'shunday', 'bo\'lishi mumkin', 'tashxis', 'ehtimol', 'o\'xshaydi', 'yo\'naltirish'];
    const hasDiagnosis = diagnosisKeywords.some(keyword => reply.toLowerCase().includes(keyword.toLowerCase()));
    
    if (hasDiagnosis) {
      // AI javobidan tashxis qismini ajratish - "Sizda ... alomatlarini kuzatayapman" formatini topish
      const sentences = reply.split(/[.!?]/).filter(s => s.trim().length > 10);
      
      // Tashxis qismini topish
      const diagnosisSentence = sentences.find(s => 
        s.toLowerCase().includes('kuzatayapman') || 
        s.toLowerCase().includes('alomatlarini') ||
        (s.toLowerCase().includes('taxminan') && s.toLowerCase().includes('bo\'lishi'))
      );
      
      if (diagnosisSentence) {
        // Faqat tashxis qismini olish, "Lekin bu aniq tashxis emas" dan oldingi qism
        let tashxis = diagnosisSentence.trim();
        if (tashxis.includes('Lekin') || tashxis.includes('lekin')) {
          tashxis = tashxis.split(/Lekin|lekin/)[0].trim();
        }
        userData.ai_analysis = tashxis;
      } else {
        // Agar aniq format topilmasa, tashxisga o'xshash qismni olish
        const tashxisParts = sentences.filter(s => 
          diagnosisKeywords.some(keyword => s.toLowerCase().includes(keyword.toLowerCase()))
        );
        if (tashxisParts.length > 0) {
          userData.ai_analysis = tashxisParts[0].trim().split(/Lekin|lekin/)[0].trim();
        }
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
        let complaintText = problem?.trim();
        if (!complaintText || complaintText === 'Ko\'rsatilmagan' || complaintText.length < 5) {
          // Chat history'dan birinchi uzun mijoz xabarini olish (shikoyat bo'lishi mumkin)
          const firstLongUserMessage = chatHistory.find(msg => 
            msg.role === 'user' && 
            msg.content?.length > 10 && 
            !msg.content.match(/\d{9,}/) && // Telefon raqami emas
            !msg.content.toLowerCase().includes('ismim') && // Ism emas
            !msg.content.toLowerCase().includes('men') && msg.content.length < 20 // Qisqa ism emas
          );
          if (firstLongUserMessage) {
            complaintText = firstLongUserMessage.content.substring(0, 300); // 300 belgidan oshmasin
          } else {
            // Agar hali ham topilmagan bo'lsa, barcha mijoz xabarlarini birgalikda olish
            const allUserMessages = chatHistory
              .filter(msg => msg.role === 'user' && msg.content?.length > 5)
              .map(msg => msg.content)
              .join('. ');
            if (allUserMessages.length > 10) {
              complaintText = allUserMessages.substring(0, 300);
            }
          }
        }
        
        // Kasallik darajasini aniqlash (AI tashxisidan)
        let severityLevel = 'O\'rta'; // Default
        const severityKeywords = {
          'Yuqori': ['appenditsit', 'appenditsit shubhasi', 'shubhasi', 'shubha', 'o\'tkir', 'urg\'un', 'tezkor', 'qon ketish', 'qon', 'infarkt', 'stroke', 'yurak xuruji', 'xirurg', 'jarroh'],
          'O\'rta': ['og\'riq', 'ogriyapti', 'bezovta', 'noqulay', 'xiralik', 'tushkunlik'],
          'Past': ['kichik', 'mild', 'yengil', 'oddiy', 'tavsiya']
        };
        
        if (aiAnalysis) {
          const aiAnalysisLower = aiAnalysis.toLowerCase();
          if (severityKeywords['Yuqori'].some(keyword => aiAnalysisLower.includes(keyword))) {
            severityLevel = '🔴 Yuqori';
          } else if (severityKeywords['Past'].some(keyword => aiAnalysisLower.includes(keyword))) {
            severityLevel = '🟢 Past';
          } else {
            severityLevel = '🟡 O\'rta';
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
        
        const combinedText = (aiAnalysis + ' ' + complaintText).toLowerCase();
        for (const [specialist, keywords] of Object.entries(specialistMapping)) {
          if (keywords.some(keyword => combinedText.includes(keyword))) {
            specialistDirection = specialist;
            break;
          }
        }
        
        // Barcha to'plangan ma'lumotlarni tayyorlash (telefon raqami olinganda)
        const telegramData = {
          name: name || 'Noma\'lum',
          phone: phoneStr,
          complaint: complaintText || 'Ko\'rsatilmagan',
          duration: duration || 'Ko\'rsatilmagan',
          ai_analysis: aiAnalysis || 'Hali tahlil qilinmadi',
          severity_level: severityLevel,
          specialist_direction: specialistDirection,
          session_id: sessionKey, // Chat tarixi havolasi uchun (keyinchalik database ID bo'lishi mumkin)
          time: new Date().toLocaleString('uz-UZ', { 
            timeZone: 'Asia/Tashkent',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        
        // Telegram'ga yuborish (serverni to'xtatmasligi uchun)
        sendTelegram(telegramData).then(() => {
          console.log(`✅ Telegram'ga yuborildi (telefon raqami olingandan keyin - BARCHA ma'lumotlar bilan):`);
          console.log(`   👤 Ism: ${telegramData.name}`);
          console.log(`   📞 Telefon: ${phoneStr}`);
          console.log(`   🤒 Kasallik/Shikoyat: ${telegramData.complaint.substring(0, 80)}${telegramData.complaint.length > 80 ? '...' : ''}`);
          console.log(`   ⏳ Davomiyligi: ${telegramData.duration}`);
          console.log(`   👨‍⚕️ AI Tashxisi: ${telegramData.ai_analysis.substring(0, 80)}${telegramData.ai_analysis.length > 80 ? '...' : ''}`);
          console.log(`   📊 Kasallik darajasi: ${telegramData.severity_level}`);
          console.log(`   🏥 Yo'nalish: ${telegramData.specialist_direction}`);
          console.log(`   💬 Chat ID: ${telegramData.session_id}`);
          // Bir telefon raqami uchun faqat 1 marta yuborish (butunlay faqat bir marta)
          telegramSent.set(sentKey, Date.now());
          // Faqat 1 marta yuborish - setTimeout olib tashlandi
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
    console.error('Chat xatosi:', error);
    res.status(500).json({ 
      reply: 'Uzr, tizimda kichik texnik nosozlik yuz berdi. Birozdan so\'ng qayta urinib ko\'ring yoki bizga qo\'ng\'iroq qiling.' 
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

