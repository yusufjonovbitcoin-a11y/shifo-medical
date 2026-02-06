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
    const name = state.name || 'Ko\'rsatilmagan';
    const symptoms = state.symptoms.join(', ') || 'Ko\'rsatilmagan';
    const duration = state.duration || state.startedAt || 'Ko\'rsatilmagan';
    const extraSymptoms = state.extraSymptoms.join(', ') || 'Yo\'q';
    const aiDiagnosis = state.suggestedDoctor || 'Ko\'rsatilmagan';
    const phone = state.phone || 'Ko\'rsatilmagan';

    const text = `🧑‍⚕️ <b>Yangi bemor (AI chat)</b>

👤 <b>Ism:</b> ${name}

🔹 <b>Shikoyat:</b>
${symptoms}

⏱ <b>Davomiyligi:</b>
${duration}

➕ <b>Qo'shimcha belgilar:</b>
${extraSymptoms}

🤖 <b>AI tashxis:</b>
${aiDiagnosis}

📞 <b>Telefon:</b>
<code>${phone}</code>`;

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

