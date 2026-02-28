import { NextResponse } from 'next/server';

// Node.js runtime'ni ishlatish (Edge runtime emas)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, transcript, name, complaint, sessionId } = body;

    // Telegram Bot Token va Chat ID ni environment variables dan olish
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_ID;

    // Telegram konfiguratsiyasini tekshirish
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_IDS) {
      console.error('❌ Telegram konfiguratsiyasi to\'liq emas:', {
        hasToken: !!TELEGRAM_BOT_TOKEN,
        hasChatId: !!TELEGRAM_CHAT_IDS
      });
      return NextResponse.json(
        { ok: false, error: 'Telegram konfiguratsiyasi to\'liq emas' },
        { status: 500 }
      );
    }

    // Bir nechta chat ID'larni vergul bilan ajratib olish
    const chatIdArray = TELEGRAM_CHAT_IDS.split(',').map(id => id.trim()).filter(id => id);

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

    // Telegram Bot API ga barcha chat ID'larga so'rov yuborish
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
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
    
    if (failedResults.length > 0) {
      console.error('❌ Ba\'zi chat ID\'larga xabar yuborishda xatolik:', failedResults);
      
      // Agar hammasi xato bo'lsa
      if (failedResults.length === results.length) {
        return NextResponse.json(
          { ok: false, error: 'Hech bir chat ID\'ga xabar yuborib bo\'lmadi', details: failedResults },
          { status: 500 }
        );
      }
      
      // Qisman muvaffaqiyat
      const successCount = results.length - failedResults.length;
      console.log(`⚠️ ${successCount}/${results.length} chat ID\'ga xabar yuborildi`);
    }

    const successfulResults = results.filter(r => r.response.ok && r.result.ok);
    const messageIds = successfulResults.map(r => r.result.result?.message_id);

    console.log('✅ Telegram xabarlari muvaffaqiyatli yuborildi:', {
      messageIds,
      totalSent: successfulResults.length,
      totalFailed: failedResults.length,
      phone,
      name,
    });

    return NextResponse.json({ 
      ok: true, 
      messageIds,
      sentCount: successfulResults.length,
      failedCount: failedResults.length
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

