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
    // 1. Ma'lumotlarni tekshirish va filtrlash
    const phone = userData.phone || "Noma'lum";
    
    // Agar ism raqam bilan bir xil bo'lib qolsa, uni "Noma'lum"ga o'zgartiramiz
    let name = userData.name || "Noma'lum";
    if (name === phone || name.replace(/\+/g, '') === phone.replace(/\+/g, '')) {
      name = "Noma'lum (Faqat raqam qoldirgan)";
    }

    // Shikoyatni tozalash - telefon raqamlarini olib tashlash
    let complaint = userData.complaint || userData.problem || "Ko'rsatilmagan";
    
    // Telefon raqamlarini shikoyatdan olib tashlash
    complaint = complaint.replace(/\+?998\d{9}/g, ''); // +998XXXXXXXXX format
    complaint = complaint.replace(/90\d{9}/g, ''); // 90XXXXXXXXX format
    complaint = complaint.replace(/\d{9,}/g, ''); // Har qanday 9+ raqamli son
    complaint = complaint.replace(/\s+/g, ' ').trim(); // Ortiqcha bo'shliqlarni olib tashlash
    
    // Agar shikoyat bo'sh bo'lib qolsa yoki faqat raqamlar bo'lsa
    if (!complaint || complaint.length < 3 || /^\d+$/.test(complaint)) {
      complaint = "Ko'rsatilmagan";
    }
    
    // Shikoyat telefon raqamiga o'xshash bo'lsa, uni "Ko'rsatilmagan"ga o'zgartiramiz
    if (complaint === phone || complaint.replace(/\+/g, '') === phone.replace(/\+/g, '')) {
      complaint = "Ko'rsatilmagan";
    }

    const severity = userData.severity_level || '🟡 O\'rta';
    const specialist = userData.specialist_direction || 'Terapevt';
    
    // 2. Chiroyli formatlash
    const text = `🆕 <b>Yangi murojaat!</b>

👤 <b>Ism:</b> ${name}
🤒 <b>Shikoyat:</b> ${complaint}
⏳ <b>Davomiyligi:</b> ${userData.duration || "Ko'rsatilmagan"}
👨‍⚕️ <b>AI Xulosasi:</b> <i>${userData.ai_analysis || "Hali tahlil qilinmadi"}</i>
📊 <b>Daraja:</b> ${severity}
🏥 <b>Yo'nalish:</b> <b>${specialist}</b>
📞 <b>Telefon:</b> <code>${phone}</code>

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

