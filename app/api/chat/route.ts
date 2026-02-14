import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Node.js runtime'ni ishlatish (Edge runtime emas)
export const runtime = 'nodejs';

// OpenAI client yaratish
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
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

    // Chat history formatlash
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...chatHistory.map((msg: any) => ({
        role: msg.isBot ? 'assistant' as const : 'user' as const,
        content: msg.text
      })),
      { role: 'user' as const, content: message }
    ];

    // OpenAI API ga so'rov
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500, // Javoblar uzunroq bo'lishi uchun
    });

    const reply = completion.choices[0]?.message?.content || 
      "Kechirasiz, javob olishda xatolik yuz berdi.";

    // Telefon raqamini aniqlash va Telegram'ga yuborish
    const phoneRegex = /\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g;
    const simplePhoneRegex = /(\d{9,12})/g;
    
    const allText = `${message} ${reply} ${JSON.stringify(chatHistory)}`;
    const phoneMatches = allText.match(phoneRegex) || [];
    const simpleMatches = allText.match(simplePhoneRegex) || [];
    
    let extractedPhone: string | null = null;
    
    if (phoneMatches.length > 0 && phoneMatches[0]) {
      extractedPhone = phoneMatches[0].replace(/\s/g, '');
    } else if (simpleMatches.length > 0 && simpleMatches[0]) {
      const phone = simpleMatches[0].replace(/\s/g, '');
      if (phone.length >= 9) {
        extractedPhone = `+998${phone.slice(-9)}`;
      }
    }

    // Agar telefon raqami topilsa, Telegram'ga yuborish
    if (extractedPhone) {
      try {
        // Ism va shikoyatni extract qilish
        const nameMatch = reply.match(/(?:ism|name|mening ismim)[:：]?\s*([A-Za-zА-Яа-яЁё\s]+)/i) || 
                         message.match(/(?:mening ismim|men|mening nomim)[:：]?\s*([A-Za-zА-Яа-яЁё\s]+)/i);
        const extractedName = nameMatch ? nameMatch[1].trim() : null;
        
        const complaintMatch = reply.match(/(?:shikoyat|muammo|alomat|tashxis)[:：]?\s*(.+?)(?:\.|$)/i) ||
                              message.match(/(?:mening muammom|bezovta qilyapti)[:：]?\s*(.+?)(?:\.|$)/i);
        const extractedComplaint = complaintMatch ? complaintMatch[1].trim() : null;

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
        const transcript = [
          ...chatHistory.map((msg: any) => {
            const sender = msg.isBot ? '🤖 <b>AI (Zilola)</b>' : '👤 <b>Bemor</b>';
            const text = (msg.text || msg.content || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `${sender}:\n${text}`;
          }),
          `👤 <b>Bemor</b>:\n${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`,
          `🤖 <b>AI (Zilola)</b>:\n${reply.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`
        ].join('\n\n');

        // Session ID olish
        const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        console.log('📤 Telegram\'ga yuborilmoqda...', {
          sessionId: currentSessionId,
          phone: extractedPhone,
          name: extractedName
        });

        // Telegram endpoint'ga yuborish (server-side fetch)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'http://localhost:3000';
        
        await fetch(`${baseUrl}/api/telegram/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: extractedPhone,
            transcript: transcript,
            name: extractedName,
            complaint: aiDiagnosis,
            sessionId: currentSessionId
          }),
        }).catch((error) => {
          console.error('Telegram yuborish xatosi:', error);
        });
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

