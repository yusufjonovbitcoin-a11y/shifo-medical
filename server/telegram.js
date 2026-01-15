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
    // Ma'lumotlarni tozalash va formatlash
    const name = (userData.name && userData.name.trim() && userData.name !== 'Ko\'rsatilmagan' && userData.name !== 'Noma\'lum') 
      ? userData.name.trim() 
      : "Ko'rsatilmagan";
    
    const complaint = (userData.complaint && userData.complaint.trim() && userData.complaint !== 'Ko\'rsatilmagan') 
      ? (userData.complaint || userData.problem || '').trim() 
      : (userData.problem && userData.problem.trim() && userData.problem !== 'Ko\'rsatilmagan') 
        ? userData.problem.trim() 
        : "Ko'rsatilmagan";
    
    const duration = (userData.duration && userData.duration.trim() && userData.duration !== 'Ko\'rsatilmagan') 
      ? userData.duration.trim() 
      : "Ko'rsatilmagan";
    
    const direction = (userData.specialist_direction && userData.specialist_direction.trim() && userData.specialist_direction !== 'Ko\'rsatilmagan') 
      ? userData.specialist_direction.trim() 
      : "Ko'rsatilmagan";
    
    const phone = (userData.phone && userData.phone.trim() && userData.phone !== 'Ko\'rsatilmagan' && userData.phone !== 'Noma\'lum') 
      ? userData.phone.trim() 
      : "Ko'rsatilmagan";
    
    const aiAnalysis = (userData.ai_analysis && userData.ai_analysis.trim() && userData.ai_analysis !== 'Hali tahlil qilinmadi' && userData.ai_analysis !== 'Ko\'rsatilmagan') 
      ? userData.ai_analysis.trim() 
      : "Hali tahlil qilinmadi";
    
    // Faqat kerakli ma'lumotlar
    const text = `🆕 <b>Yangi murojaat!</b>

👤 <b>Ism:</b> ${name}
🤒 <b>Shikoyat:</b> ${complaint}
⏳ <b>Davomiyligi:</b> ${duration}
🏥 <b>Yo'nalish:</b> ${direction}
📞 <b>Telefon:</b> ${phone}
👨‍⚕️ <b>AI Tashxisi:</b> ${aiAnalysis}

━━━━━━━━━━━━━━━━━━━
💬 <i>AI Chat orqali</i>`;
    
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

