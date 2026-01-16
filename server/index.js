import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handleAIMessage } from './aiService.js';
import { createInitialState, updateStateFromMessage } from './stateManager.js';
import { sendTelegram } from './telegram.js';

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('CORS xatosi'));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Shifo AI Chat API',
    endpoints: {
      'POST /ai-chat': 'Chat xabar yuborish',
      'GET /': 'Bu sahifa (API ma\'lumotlari)'
    }
  });
});

const conversations = new Map();
const sessionStates = new Map();
const telegramSent = new Map();

app.post('/ai-chat', async (req, res) => {
  const { message, sessionId } = req.body;

  try {
    const sessionKey = sessionId || 'default';
    
    if (!conversations.has(sessionKey)) {
      conversations.set(sessionKey, []);
    }
    if (!sessionStates.has(sessionKey)) {
      sessionStates.set(sessionKey, createInitialState());
    }
    
    const chatHistory = conversations.get(sessionKey);
    const state = sessionStates.get(sessionKey);

    const aiResponse = await handleAIMessage(message, chatHistory, state);
    const reply = aiResponse.cleanText;
    const extractedData = aiResponse.extractedData;

    // AI'dan kelgan extractedData'ni state'ga qo'shish
    const stateWithExtractedData = { ...state };
    if (extractedData.name && extractedData.name !== 'null' && !stateWithExtractedData.name) {
      stateWithExtractedData.name = extractedData.name;
    }
    if (extractedData.phone && extractedData.phone !== 'null' && !stateWithExtractedData.phone) {
      stateWithExtractedData.phone = extractedData.phone;
    }
    // Complaint faqat davomiylik yoki raqam bo'lmasa qo'shiladi
    if (extractedData.complaint && 
        extractedData.complaint !== 'null' && 
        !extractedData.complaint.match(/^\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy|beri|davom)/i) &&
        !extractedData.complaint.match(/^\d+$/)) {
      if (!stateWithExtractedData.symptoms.length) {
        stateWithExtractedData.symptoms.push(extractedData.complaint);
      } else {
        // Agar allaqachon shikoyat bo'lsa va yangi shikoyat boshqacha bo'lsa
        const existingComplaint = stateWithExtractedData.symptoms[0].toLowerCase();
        if (!existingComplaint.includes(extractedData.complaint.toLowerCase()) &&
            !extractedData.complaint.toLowerCase().includes(existingComplaint)) {
          stateWithExtractedData.symptoms.push(extractedData.complaint);
        }
      }
    }
    if (extractedData.duration && extractedData.duration !== 'null') {
      if (!stateWithExtractedData.duration) {
        stateWithExtractedData.duration = extractedData.duration;
      }
      if (!stateWithExtractedData.startedAt) {
        stateWithExtractedData.startedAt = extractedData.duration;
      }
    }
    if (extractedData.specialist && extractedData.specialist !== 'null' && !stateWithExtractedData.suggestedDoctor) {
      stateWithExtractedData.suggestedDoctor = extractedData.specialist;
    }

    const updatedState = updateStateFromMessage(stateWithExtractedData, message, reply);
    sessionStates.set(sessionKey, updatedState);

    chatHistory.push(
      { role: 'user', content: message },
      { role: 'assistant', content: reply }
    );

    if (chatHistory.length > 20) {
      conversations.set(sessionKey, chatHistory.slice(-20));
    }

    const hadPhoneBefore = state.phone !== null;
    const hasPhoneNow = updatedState.phone !== null;

    if (hasPhoneNow && !hadPhoneBefore && !telegramSent.has(sessionKey)) {
      try {
        await sendTelegram(updatedState);
        telegramSent.set(sessionKey, true);
        console.log(`✅ Telegram'ga yuborildi (telefon raqami olingandan keyin)`);
        console.log(`   📞 Telefon: ${updatedState.phone}`);
        console.log(`   🤒 Alomatlar: ${updatedState.symptoms.join(', ') || 'Ko\'rsatilmagan'}`);
        console.log(`   👨‍⚕️ Shifokor: ${updatedState.suggestedDoctor || 'Ko\'rsatilmagan'}`);
      } catch (error) {
        console.error('❌ Telegram xatosi:', error);
      }
    }

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      reply: `Xatolik: ${error.message}` 
    });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
    console.log('');
    console.log('⚠️  UYATLANTIRISH: OPENAI_API_KEY .env faylida to\'g\'ri kiritilmagan!');
    console.log('⚠️  Iltimos, server/.env fayliga haqiqiy OpenAI API key kiriting!');
    console.log('');
  } else {
    console.log('✅ OpenAI API key mavjud');
  }
});

