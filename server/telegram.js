import fetch from 'node-fetch';
import 'dotenv/config';

// Telegram sozlamalari - .env faylidan
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TELEGRAM_ADMIN_ID;

// Xavfsizlik tekshiruvi
if (!TOKEN || !ADMIN_ID) {
  console.warn('⚠️ Xavfsizlik ogohlantirishi: TELEGRAM_BOT_TOKEN yoki TELEGRAM_ADMIN_ID .env faylida topilmadi! Telegram xabarlar yuborilmaydi.');
}

export async function sendTelegram(userData) {
  // Token va Admin ID mavjudligini tekshirish
  if (!TOKEN || !ADMIN_ID) {
    console.warn('Telegram sozlamalari to\'liq emas. Xabar yuborilmadi.');
    return;
  }

  try {
    // Kasallik darajasi
    const severity = userData.severity_level || '🟡 O\'rta';
    
    // Yo'nalish (Mutaxassis)
    const specialist = userData.specialist_direction || 'Terapevt';
    
    // Chat tarixi havolasi (agar database ID bo'lsa, keyinroq qo'shish mumkin)
    const chatLink = userData.session_id ? `\n💬 <b>Chat ID:</b> <code>${userData.session_id}</code>` : '';
    
    const text = `🆕 <b>Yangi murojaat!</b>

👤 <b>Ism:</b> ${userData.name || "Noma'lum"}
🤒 <b>Kasallik/Shikoyat:</b> ${userData.complaint || userData.problem || "Ko'rsatilmagan"}
⏳ <b>Davomiyligi:</b> ${userData.duration || "Ko'rsatilmagan"}
👨‍⚕️ <b>AI Tashxisi:</b> ${userData.ai_analysis || "Hali tahlil qilinmadi"}
📊 <b>Kasallik darajasi:</b> ${severity}
🏥 <b>Yo'nalish:</b> ${specialist}
📞 <b>Telefon:</b> ${userData.phone || "Noma'lum"}
⏰ <b>Vaqt:</b> ${userData.time || "Noma'lum"}${chatLink}

━━━━━━━━━━━━━━━━━━━
💬 <i>AI Chat (Laylo) orqali</i>`;
    
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        chat_id: ADMIN_ID, 
        text: text,
        parse_mode: 'HTML' // HTML formatida yuborish
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API xatosi:', errorData);
      throw new Error(`Telegram API xatosi: ${errorData.description || 'Noma\'lum xatolik'}`);
    } else {
      const result = await response.json();
      console.log('✅ Telegram\'ga muvaffaqiyatli yuborildi!');
      return result;
    }
  } catch (error) {
    console.error('Telegram xabar yuborish xatosi:', error.message);
    // Xatolarni console'ga yozish, lekin serverni to'xtatmaslik
    throw error;
  }
}

