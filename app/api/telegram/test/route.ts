import { NextResponse } from 'next/server';

// Node.js runtime'ni ishlatish
export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Konfiguratsiyani tekshirish
    const config = {
      hasToken: !!TELEGRAM_BOT_TOKEN,
      hasChatId: !!TELEGRAM_CHAT_ID,
      tokenLength: TELEGRAM_BOT_TOKEN?.length || 0,
      chatIdLength: TELEGRAM_CHAT_ID?.length || 0,
      tokenPreview: TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'Yo\'q',
      chatIdPreview: TELEGRAM_CHAT_ID || 'Yo\'q',
      nodeEnv: process.env.NODE_ENV,
    };

    // Agar konfiguratsiya to'liq bo'lsa, test xabari yuborish
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const testMessage = `🧪 <b>Test xabari</b>\n\nBu test xabari. Agar siz buni ko'rsangiz, Telegram bot to'g'ri sozlangan! ✅\n\nVaqt: ${new Date().toLocaleString('uz-UZ')}`;
        
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const telegramResponse = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: testMessage,
            parse_mode: 'HTML',
          }),
        });

        let telegramResult: any = {};
        try {
          telegramResult = await telegramResponse.json();
        } catch (parseError) {
          const text = await telegramResponse.text();
          return NextResponse.json({
            success: false,
            config,
            error: {
              message: 'Telegram API javobini parse qilishda xatolik',
              status: telegramResponse.status,
              statusText: telegramResponse.statusText,
              responseText: text.substring(0, 500),
            },
          }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          config,
          telegramTest: {
            ok: telegramResponse.ok && telegramResult.ok,
            status: telegramResponse.status,
            result: telegramResult,
            message: telegramResult.ok 
              ? '✅ Test xabari muvaffaqiyatli yuborildi! Telegram\'ni tekshiring.' 
              : `❌ Xatolik: ${telegramResult.description || 'Noma\'lum xatolik'}`,
          },
        });
      } catch (error: any) {
        return NextResponse.json({
          success: false,
          config,
          error: {
            message: error.message,
            type: 'Telegram API xatosi',
          },
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: false,
      config,
      message: '⚠️ Telegram konfiguratsiyasi to\'liq emas. .env.local faylini tekshiring.',
      required: {
        TELEGRAM_BOT_TOKEN: 'Telegram Bot Token (BotFather dan olingan)',
        TELEGRAM_CHAT_ID: 'Telegram Chat ID (shaxsiy chat yoki guruh ID)',
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        type: 'Server xatosi',
      },
    }, { status: 500 });
  }
}

