import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || process.env.TELEGRAM_ADMIN_ID;

function chunkText(text: string, max: number = 4000): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + max));
    i += max;
  }
  return chunks;
}

async function tg(method: string, body: any) {
  if (!BOT_TOKEN) throw new Error('BOT_TOKEN sozlanmagan');
  
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || 'Telegram error');
  return data.result;
}

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
      return NextResponse.json(
        { ok: false, error: 'TELEGRAM_BOT_TOKEN va TELEGRAM_ADMIN_CHAT_ID sozlanmagan' },
        { status: 500 }
      );
    }

    const { phone, transcript, name, complaint, sessionId } = await req.json();

    if (!phone || !transcript) {
      return NextResponse.json(
        { ok: false, error: 'phone va transcript kerak' },
        { status: 400 }
      );
    }

    // Vaqtni formatlash
    const now = new Date();
    const dateStr = now.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const timeStr = now.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const dateTime = `${dateStr}, ${timeStr}`;

    // To'liq xabar (preview + transcript)
    const fullMessage =
      `🆕 <b>Yangi murojaat!</b>\n\n` +
      `👤 <b>Ism:</b> ${name || 'Ko\'rsatilmagan'}\n` +
      `👨‍⚕️ <b>AI Tashxisi:</b> ${complaint || 'Ko\'rsatilmagan'}\n` +
      `📞 <b>Telefon:</b> <code>${phone}</code>\n` +
      `⏰ <b>Vaqt:</b> ${dateTime}\n` +
      `💬 <b>Chat ID:</b> ${sessionId || 'Noma\'lum'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `💬 <b>TO'LIQ SUHBAT:</b>\n\n` +
      `${transcript}`;

    // Transcriptni sahifalarga bo'lish (Telegram limiti 4096)
    const pages = chunkText(fullMessage, 4000);

    // Har bir sahifani yuborish
    for (let i = 0; i < pages.length; i++) {
      await tg('sendMessage', {
        chat_id: ADMIN_CHAT_ID,
        text: pages[i],
        parse_mode: 'HTML',
      });
    }

    console.log('✅ Telegram xabari yuborildi:', { phone, pages: pages.length });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('❌ Telegram yuborish xatosi:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Noma\'lum xatolik' },
      { status: 500 }
    );
  }
}

