import fetch from 'node-fetch';
import 'dotenv/config';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

if (!TOKEN || !ADMIN_ID) {
  console.warn('⚠️ TELEGRAM_BOT_TOKEN yoki TELEGRAM_ADMIN_ID .env faylida topilmadi!');
}

export async function sendTelegram(state) {
  if (!TOKEN || !ADMIN_ID) {
    console.warn('Telegram sozlamalari to\'liq emas. Xabar yuborilmadi.');
    return;
  }

  try {
    const symptoms = state.symptoms.join(', ') || 'Ko\'rsatilmagan';
    const startedAt = state.startedAt || 'Ko\'rsatilmagan';
    const location = state.location || 'Ko\'rsatilmagan';
    const severity = state.severity || 'Ko\'rsatilmagan';
    const extraSymptoms = state.extraSymptoms.join(', ') || 'Yo\'q';
    const suggestedDoctor = state.suggestedDoctor || 'Terapevt';
    const phone = state.phone || 'Ko\'rsatilmagan';

    let text;

    if (state.redFlag) {
      text = `🚨 <b>SHOSHILINCH HOLAT</b>

Alomatlar:
${symptoms}

⚠️ <b>XAVFLI BELGILAR ANIQLANDI</b>
Bemor zudlik bilan shifokorga murojaat qilishi kerak.

📞 <b>Telefon:</b> <code>${phone}</code>`;
    } else {
      text = `🧑‍⚕️ <b>Yangi bemor (AI chat)</b>

🔹 <b>Alomatlar:</b>
${symptoms}

⏱ <b>Qachondan beri:</b>
${startedAt}

📍 <b>Joyi:</b>
${location}

🔥 <b>Og'riq darajasi:</b>
${severity}

➕ <b>Qo'shimcha belgilar:</b>
${extraSymptoms}

👨‍⚕️ <b>Tavsiya etilgan shifokor:</b>
${suggestedDoctor}

📞 <b>Telefon:</b>
<code>${phone}</code>

📝 <b>Izoh:</b>
Bu AI orqali dastlabki yo'naltirish`;
    }

    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        chat_id: ADMIN_ID, 
        text: text,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API xatosi:', errorData);
      throw new Error(`Telegram API xatosi: ${errorData.description || 'Noma\'lum xatolik'}`);
    }

    console.log('✅ Telegram\'ga muvaffaqiyatli yuborildi!');
    return await response.json();
  } catch (error) {
    console.error('Telegram xabar yuborish xatosi:', error.message);
    throw error;
  }
}

