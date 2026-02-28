import { NextResponse } from 'next/server';

// Node.js runtime'ni ishlatish
export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_ID;

    // Bir nechta chat ID'larni vergul bilan ajratib olish
    const chatIdArray = TELEGRAM_CHAT_IDS ? TELEGRAM_CHAT_IDS.split(',').map(id => id.trim()).filter(id => id) : [];

    // Konfiguratsiyani tekshirish
    const config = {
      hasToken: !!TELEGRAM_BOT_TOKEN,
      hasChatId: !!TELEGRAM_CHAT_IDS,
      chatIdCount: chatIdArray.length,
      tokenLength: TELEGRAM_BOT_TOKEN?.length || 0,
      chatIdsLength: TELEGRAM_CHAT_IDS?.length || 0,
      tokenPreview: TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'Yo\'q',
      chatIdsPreview: chatIdArray.length > 0 ? chatIdArray.map(id => `${id.substring(0, 5)}...`) : ['Yo\'q'],
      nodeEnv: process.env.NODE_ENV,
    };

    // Agar konfiguratsiya to'liq bo'lsa, test xabari yuborish
    if (TELEGRAM_BOT_TOKEN && chatIdArray.length > 0) {
      try {
        const testMessage = `🧪 <b>Test xabari</b>\n\nBu test xabari. Agar siz buni ko'rsangiz, Telegram bot to'g'ri sozlangan! ✅\n\nVaqt: ${new Date().toLocaleString('uz-UZ')}`;
        
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        // Har bir chat ID uchun test xabar yuborish
        const sendPromises = chatIdArray.map(async (chatId) => {
          const telegramResponse = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: testMessage,
              parse_mode: 'HTML',
            }),
          });

          let telegramResult: any = {};
          try {
            telegramResult = await telegramResponse.json();
          } catch (parseError) {
            const text = await telegramResponse.text();
            return {
              chatId,
              success: false,
              error: {
                message: 'Telegram API javobini parse qilishda xatolik',
                status: telegramResponse.status,
                statusText: telegramResponse.statusText,
                responseText: text.substring(0, 500),
              }
            };
          }

          return {
            chatId,
            success: telegramResponse.ok && telegramResult.ok,
            status: telegramResponse.status,
            result: telegramResult,
            message: telegramResult.ok 
              ? '✅ Test xabari muvaffaqiyatli yuborildi!' 
              : `❌ Xatolik: ${telegramResult.description || 'Noma\'lum xatolik'}`,
          };
        });

        const results = await Promise.all(sendPromises);
        const successCount = results.filter(r => r.success).length;

        return NextResponse.json({
          success: successCount > 0,
          config,
          telegramTest: {
            totalChatIds: chatIdArray.length,
            successCount,
            failedCount: chatIdArray.length - successCount,
            results,
            overallMessage: successCount === chatIdArray.length
              ? '✅ Barcha chat ID\'larga test xabari yuborildi!'
              : successCount > 0
              ? `⚠️ ${successCount}/${chatIdArray.length} chat ID\'ga test xabari yuborildi`
              : '❌ Hech bir chat ID\'ga xabar yuborib bo\'lmadi',
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

