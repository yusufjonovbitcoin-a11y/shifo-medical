import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Node.js runtime'ni ishlatish (Edge runtime emas)
export const runtime = 'nodejs';

// OpenAI client yaratish (timeout bilan optimallashtirilgan)
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 30000, // 30 soniya timeout
      maxRetries: 2, // 2 marta qayta urinish
    })
  : null;

// Cache: prompt va JSON ma'lumotlarini bir marta o'qib saqlash
let cachedPrompt: string | null = null;
let cachedClinicData: string | null = null;
let lastPromptModified: number = 0;
let lastDataModified: number = 0;

function getSystemPrompt(): string {
  const promptPath = path.join(process.cwd(), 'prompts', 'ai-chat-prompt.txt');
  const databasePath = path.join(process.cwd(), 'data', 'clinic-database.json');
  
  try {
    // Prompt faylini tekshirish (o'zgargan bo'lsa qayta o'qish)
    const promptStats = fs.statSync(promptPath);
    if (!cachedPrompt || promptStats.mtimeMs !== lastPromptModified) {
      cachedPrompt = fs.readFileSync(promptPath, 'utf-8');
      lastPromptModified = promptStats.mtimeMs;
    }
  } catch (error) {
    console.error('Prompt faylini o\'qishda xatolik:', error);
    cachedPrompt = 'Sen ShifokorLDA klinikasining yordamchisisisan.';
  }

  try {
    // JSON faylini tekshirish (o'zgargan bo'lsa qayta o'qish)
    const dataStats = fs.statSync(databasePath);
    if (!cachedClinicData || dataStats.mtimeMs !== lastDataModified) {
      const clinicDataRaw = fs.readFileSync(databasePath, 'utf-8');
      const clinicDataJson = JSON.parse(clinicDataRaw);
      
      // JSON'ni qisqartirish - faqat muhim qismlar
      const simplifiedData = {
        aloqa: clinicDataJson.tibbiyot_markazi.aloqa_malumotlari,
        mutaxassislar: clinicDataJson.tibbiyot_markazi.mutaxassislar,
        xizmatlar: {
          operatsiyalar: clinicDataJson.tibbiyot_markazi.xizmatlar.operatsiyalar,
          diagnostika: clinicDataJson.tibbiyot_markazi.xizmatlar.diagnostika,
          statsionar: clinicDataJson.tibbiyot_markazi.xizmatlar.statsionar
        },
        laboratoriya: clinicDataJson.tibbiyot_markazi.laboratoriya,
        fizioterapiya: clinicDataJson.tibbiyot_markazi.fizioterapiya,
        massaj: clinicDataJson.tibbiyot_markazi.massaj,
        mashhur_operatsiyalar: clinicDataJson.tibbiyot_markazi.mashhur_operatsiyalar
      };
      
      cachedClinicData = `\n\n## 🏥 KLINIKA TO'LIQ MA'LUMOTLARI\n\n${JSON.stringify(simplifiedData, null, 2)}\n\nMUHIM: Yuqoridagi JSON ma'lumotlaridan foydalanib, bemorlarga to'liq va aniq javob ber.`;
      lastDataModified = dataStats.mtimeMs;
    }
  } catch (error) {
    console.error('Klinika ma\'lumotlarini o\'qishda xatolik:', error);
    cachedClinicData = '\n\nKlinika ma\'lumotlari: Samarqand, Termiz ko\'chasi 67A. Telefon: +998 97 611 06 04';
  }

  return `${cachedPrompt}${cachedClinicData}`;
}

export async function POST(req: Request) {
  try {
    // OpenAI API key tekshirish
    if (!openai) {
      return NextResponse.json(
        { reply: "Uzr, AI xizmati hozircha mavjud emas. Iltimos, telefon orqali bog'laning: +998 97 611 06 04" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { message, chatHistory = [], sessionId, allMessages = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { reply: "Iltimos, to'g'ri xabar yuboring." },
        { status: 400 }
      );
    }

    // System prompt (cache'dan olish - tezroq)
    const systemPrompt = getSystemPrompt();

    // Chat history formatlash (optimallashtirilgan - faqat oxirgi 6 ta xabar)
    const recentHistory = chatHistory.slice(-6); // 10 o'rniga 6 ta
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...recentHistory.map((msg: any) => ({
        role: msg.isBot ? 'assistant' as const : 'user' as const,
        content: msg.text
      })),
      { role: 'user' as const, content: message }
    ];

    // OpenAI API ga so'rov (optimallashtirilgan parametrlar)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.6, // 0.7 o'rniga 0.6 - tezroq va aniqroq
      max_tokens: 300, // 500 o'rniga 300 - tezroq javob
      stream: false, // Streaming o'chirilgan (oddiy so'rov tezroq)
    });

    const reply = completion.choices[0]?.message?.content || 
      "Kechirasiz, javob olishda xatolik yuz berdi.";

    // Telefon raqamini aniqlash (FAQAT mijozning joriy xabarida)
    // Telegram'ga faqat mijoz telefon raqamini berganda yuboriladi
    const phoneRegex = /\+?998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g;
    const simplePhoneRegex = /(?:telefon|raqam|tel|phone|номер|телефон|number|мой номер|мой телефон)[:：]?\s*[+\-]?\s*(\d{9,12})/gi;
    const directPhoneRegex = /\b(\d{9})\b/g; // To'g'ridan-to'g'ri 9 xonali raqam
    
    // FAQAT mijozning joriy xabarida telefon raqamini qidirish
    const userMessageText = message;
    const phoneMatches = userMessageText.match(phoneRegex) || [];
    const simpleMatches = userMessageText.match(simplePhoneRegex) || [];
    const directMatches = userMessageText.match(directPhoneRegex) || [];
    
    let extractedPhone: string | null = null;
    let phoneFoundInCurrentMessage = false;
    
    if (phoneMatches.length > 0 && phoneMatches[0]) {
      extractedPhone = phoneMatches[0].replace(/\s/g, '').replace(/^998/, '+998');
      if (!extractedPhone.startsWith('+')) {
        extractedPhone = `+${extractedPhone}`;
      }
      phoneFoundInCurrentMessage = true;
    } else if (simpleMatches.length > 0 && simpleMatches[1]) {
      const phone = simpleMatches[1].replace(/\s/g, '').replace(/[+\-]/g, '');
      if (phone.length >= 9 && phone.length <= 12) {
        // Agar 12 xonali bo'lsa (998901234567), oxirgi 9 tasini ol
        extractedPhone = `+998${phone.slice(-9)}`;
        phoneFoundInCurrentMessage = true;
      }
    } else if (directMatches.length > 0) {
      // 9 xonali raqam topilsa (masalan: 901234567)
      for (const match of directMatches) {
        const phone = match.replace(/\s/g, '');
        const uzbekPrefixes = ['90', '91', '93', '94', '95', '97', '99', '88', '77', '50', '55', '33', '66'];
        if (phone.length === 9 && uzbekPrefixes.some(prefix => phone.startsWith(prefix))) {
          extractedPhone = `+998${phone}`;
          phoneFoundInCurrentMessage = true;
          break;
        }
      }
    }

    // Debug: telefon raqamini aniqlash natijalarini log qilish
    console.log('🔍 Telefon raqamini aniqlash:', {
      message: message.substring(0, 100),
      phoneMatches: phoneMatches.length,
      simpleMatches: simpleMatches.length,
      directMatches: directMatches.length,
      extractedPhone,
      phoneFoundInCurrentMessage
    });

    // FAQAT mijoz telefon raqamini berganda Telegram'ga yuborish
    if (extractedPhone && phoneFoundInCurrentMessage) {
      console.log('✅ Telefon raqami topildi, Telegram\'ga yuborilmoqda:', extractedPhone);
      try {
        // Ism va shikoyatni extract qilish (o'zbek, rus, ingliz tillarini qo'llab-quvvatlash)
        // O'zbek harflari: o', g', sh, ch, ng
        const namePatterns = [
          /(?:ism|name|mening ismim|mening nomim)[:：]?\s*([A-Za-zА-Яа-яЁёO'G'o'g'ShChshch\s]+)/i,
          /(?:men|mening ismim|mening nomim)\s+([A-Za-zА-Яа-яЁёO'G'o'g'ShChshch\s]{2,30})/i,
          /([A-ZА-Я][a-zа-яO'G'o'g'ShChshch]{2,20})\s+(?:deb|dep|deyish|aytish)/i
        ];
        
        let extractedName: string | null = null;
        for (const pattern of namePatterns) {
          const match = reply.match(pattern) || message.match(pattern);
          if (match && match[1]) {
            extractedName = match[1].trim();
            break;
          }
        }
        
        // Shikoyat/muammo extract qilish
        const complaintPatterns = [
          /(?:shikoyat|muammo|alomat|tashxis|bezovta)[:：]?\s*(.+?)(?:\.|$)/i,
          /(?:mening muammom|bezovta qilyapti|og'riyapti|og'riyotgan)[:：]?\s*(.+?)(?:\.|$)/i,
          /(?:qanday|nima)\s+(?:muammo|shikoyat|bezovta)[:：]?\s*(.+?)(?:\.|$)/i
        ];
        
        let extractedComplaint: string | null = null;
        for (const pattern of complaintPatterns) {
          const match = reply.match(pattern) || message.match(pattern);
          if (match && match[1]) {
            extractedComplaint = match[1].trim();
            break;
          }
        }

        // AI javobidan tashxis/shikoyatni extract qilish
        let aiDiagnosis = extractedComplaint;
        if (!aiDiagnosis) {
          const diagnosisMatch = reply.match(/(?:shikoyat|muammo|alomat|tashxis|bezovta)[:：]?\s*(.+?)(?:\.|$)/i);
          if (diagnosisMatch) {
            aiDiagnosis = diagnosisMatch[1].trim();
          } else {
            aiDiagnosis = reply.split('.')[0].substring(0, 150);
          }
        }

        // To'liq suhbat transcriptini yaratish (HTML formatida)
        // allMessages dan to'liq chat tarixini olish (chatHistory emas!)
        const fullChatMessages = allMessages && allMessages.length > 0 
          ? allMessages 
          : chatHistory;
        
        // Joriy xabar allaqachon allMessages da bo'lishi mumkin, shuning uchun tekshiramiz
        const lastMessage = fullChatMessages.length > 0 ? fullChatMessages[fullChatMessages.length - 1] : null;
        const currentMessageIncluded = lastMessage && !lastMessage.isBot && lastMessage.text === message;
        
        const transcriptParts = fullChatMessages.map((msg: any) => {
          const isBot = msg.isBot;
          const sender = isBot ? '🤖 <b>AI (Zilola)</b>' : '👤 <b>Bemor</b>';
          const text = (msg.text || msg.content || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          // Mijoz xabarlari tagiga chiziq qo'shamiz (ajratib ko'rsatish uchun)
          if (isBot) {
            return `${sender}:\n${text}`;
          } else {
            // Telegram'da yaxshi ko'rinishi uchun chiziq
            return `${sender}:\n${text}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
          }
        });
        
        // Joriy xabar allMessages da bo'lmasa, qo'shamiz
        if (!currentMessageIncluded) {
          const messageText = message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          transcriptParts.push(`👤 <b>Bemor</b>:\n${messageText}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        }
        
        // AI javobini har doim qo'shamiz (chunki u hali allMessages da yo'q)
        transcriptParts.push(`🤖 <b>AI (Zilola)</b>:\n${reply.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`);
        
        const transcript = transcriptParts.join('\n\n');

        // Session ID olish
        const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // To'g'ridan-to'g'ri Telegram API'ga yuborish (server-side)
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_ID;

        if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_IDS) {
          try {
            // Bir nechta chat ID'larni vergul bilan ajratib olish
            const chatIdArray = TELEGRAM_CHAT_IDS.split(',').map(id => id.trim()).filter(id => id);
            
            // Xabar formatlash
            let messageText = `🔔 <b>Yangi mijoz ma'lumotlari</b>\n\n`;
            
            if (extractedName) {
              messageText += `👤 <b>Ism:</b> ${extractedName}\n`;
            }
            
            if (extractedPhone) {
              messageText += `📱 <b>Telefon:</b> ${extractedPhone}\n`;
            }
            
            if (aiDiagnosis) {
              messageText += `\n🏥 <b>Shikoyat/Muammo:</b>\n${aiDiagnosis}\n`;
            }
            
            messageText += `\n🆔 <b>Session ID:</b> <code>${currentSessionId}</code>\n`;
            messageText += `\n━━━━━━━━━━━━━━━━━━━━\n`;
            messageText += `\n💬 <b>To'liq chat tarixi:</b>\n\n`;
            messageText += transcript;

            // Telegram Bot API ga so'rov yuborish
            const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            
            console.log('📤 Telegram\'ga barcha chat ID\'larga yuborilmoqda...', {
              phone: extractedPhone,
              name: extractedName,
              chatIdCount: chatIdArray.length,
              transcriptLength: transcript.length
            });
            
            // Har bir chat ID uchun xabar yuborish
            const sendPromises = chatIdArray.map(async (chatId) => {
              const telegramResponse = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: messageText,
                  parse_mode: 'HTML',
                  disable_web_page_preview: true,
                }),
              });

              return {
                chatId,
                response: telegramResponse,
                result: await telegramResponse.json()
              };
            });

            // Barcha so'rovlar tugashini kutish
            const results = await Promise.all(sendPromises);

            // Xatolarni tekshirish
            const failedResults = results.filter(r => !r.response.ok || !r.result.ok);
            const successfulResults = results.filter(r => r.response.ok && r.result.ok);
            
            if (failedResults.length > 0) {
              console.error('❌ Ba\'zi chat ID\'larga xabar yuborishda xatolik:', failedResults.map(r => ({
                chatId: r.chatId,
                status: r.response.status,
                error: r.result.description
              })));
            }

            if (successfulResults.length > 0) {
              console.log('✅ Telegram xabarlari muvaffaqiyatli yuborildi:', {
                successCount: successfulResults.length,
                failedCount: failedResults.length,
                messageIds: successfulResults.map(r => r.result.result?.message_id),
                phone: extractedPhone,
                name: extractedName,
              });
            }
          } catch (error: any) {
            console.error('❌ Telegram yuborish xatosi (catch):', {
              error: error.message,
              stack: error.stack?.substring(0, 500),
            });
          }
        } else {
          console.warn('⚠️ Telegram konfiguratsiyasi to\'liq emas:', {
            hasToken: !!TELEGRAM_BOT_TOKEN,
            hasChatId: !!TELEGRAM_CHAT_IDS
          });
        }
      } catch (error) {
        console.error('❌ Telegram yuborish xatosi:', error);
      }
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('AI Chat xatosi:', error);
    return NextResponse.json(
      { reply: "Uzr, texnik nosozlik yuz berdi. Iltimos, telefon orqali bog'laning: +998 97 611 06 04" },
      { status: 500 }
    );
  }
}

