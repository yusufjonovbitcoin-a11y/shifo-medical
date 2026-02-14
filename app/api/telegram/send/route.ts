import { NextResponse } from 'next/server';

// Node.js runtime'ni ishlatish (Edge runtime emas)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, transcript, name, complaint, sessionId } = body;

    // Telegram Bot Token va Chat ID ni environment variables dan olish
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Telegram konfiguratsiyasini tekshirish
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram konfiguratsiyasi to\'liq emas:', {
        hasToken: !!TELEGRAM_BOT_TOKEN,
        hasChatId: !!TELEGRAM_CHAT_ID
      });
      return NextResponse.json(
        { ok: false, error: 'Telegram konfiguratsiyasi to\'liq emas' },
        { status: 500 }
      );
    }

    // Xabar formatlash
    let messageText = `🔔 <b>Yangi mijoz ma'lumotlari</b>\n\n`;
    
    if (name) {
      messageText += `👤 <b>Ism:</b> ${name}\n`;
    }
    
    if (phone) {
      messageText += `📱 <b>Telefon:</b> ${phone}\n`;
    }
    
    if (complaint) {
      messageText += `\n🏥 <b>Shikoyat/Muammo:</b>\n${complaint}\n`;
    }
    
    if (sessionId) {
      messageText += `\n🆔 <b>Session ID:</b> <code>${sessionId}</code>\n`;
    }
    
    messageText += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    messageText += `\n💬 <b>To'liq chat tarixi:</b>\n\n`;
    messageText += transcript;

    // Telegram Bot API ga so'rov yuborish
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error('❌ Telegram xabar yuborish xatosi:', {
        status: telegramResponse.status,
        result: telegramResult,
      });
      return NextResponse.json(
        { ok: false, error: 'Telegram xabar yuborishda xatolik', details: telegramResult },
        { status: 500 }
      );
    }

    console.log('✅ Telegram xabari muvaffaqiyatli yuborildi:', {
      messageId: telegramResult.result?.message_id,
      phone,
      name,
    });

    return NextResponse.json({ 
      ok: true, 
      messageId: telegramResult.result?.message_id 
    });
  } catch (error: any) {
    console.error('❌ Telegram endpoint xatosi:', {
      error: error.message,
      stack: error.stack?.substring(0, 500),
    });
    return NextResponse.json(
      { ok: false, error: 'Server xatosi', details: error.message },
      { status: 500 }
    );
  }
}

