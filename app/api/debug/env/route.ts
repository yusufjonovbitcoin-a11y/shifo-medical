import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  // Barcha environment variable'larni tekshirish
  const envVars = {
    // Telegram
    TELEGRAM_BOT_TOKEN: {
      exists: !!process.env.TELEGRAM_BOT_TOKEN,
      value: process.env.TELEGRAM_BOT_TOKEN ? `${process.env.TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'Yo\'q',
      length: process.env.TELEGRAM_BOT_TOKEN?.length || 0,
    },
    TELEGRAM_CHAT_ID: {
      exists: !!process.env.TELEGRAM_CHAT_ID,
      value: process.env.TELEGRAM_CHAT_ID || 'Yo\'q',
      length: process.env.TELEGRAM_CHAT_ID?.length || 0,
    },
    // Boshqa variantlar (ehtimol noto'g'ri nom bilan)
    TELEGRAM_ADMIN_CHAT_ID: {
      exists: !!process.env.TELEGRAM_ADMIN_CHAT_ID,
      value: process.env.TELEGRAM_ADMIN_CHAT_ID || 'Yo\'q',
      length: process.env.TELEGRAM_ADMIN_CHAT_ID?.length || 0,
    },
    // OpenAI
    OPENAI_API_KEY: {
      exists: !!process.env.OPENAI_API_KEY,
      value: process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'Yo\'q',
      length: process.env.OPENAI_API_KEY?.length || 0,
    },
  };

  // Barcha environment variable'larni ko'rsatish (xavfsizlik uchun faqat nomlar)
  const allEnvKeys = Object.keys(process.env)
    .filter(key => key.includes('TELEGRAM') || key.includes('OPENAI'))
    .sort();

  return NextResponse.json({
    message: 'Environment variable\'lar holati',
    envVars,
    allTelegramKeys: allEnvKeys,
    recommendation: !envVars.TELEGRAM_CHAT_ID.exists 
      ? '⚠️ TELEGRAM_CHAT_ID topilmadi! .env.local faylida quyidagicha bo\'lishi kerak:\nTELEGRAM_CHAT_ID=7716143588\n(Comment qilingan bo\'lmasligi kerak va qo\'shtirnoqsiz)'
      : '✅ Barcha variable\'lar to\'g\'ri sozlangan',
  });
}

