import { NextResponse } from 'next/server';

// Runtime sozlamasi - Node.js runtime ishlatish (Edge runtime fetch bilan muammo bo'lishi mumkin)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId, locale, userInfo } = body;

    // Backend server URL - environment variable yoki default localhost
    // ⚠️ MUHIM: Production'da (Vercel) localhost ishlamaydi!
    // Vercel'da BACKEND_API_URL yoki NEXT_PUBLIC_AI_CHAT_API_URL ni to'g'ri sozlash kerak
    let API_URL: string;
    
    // 1. NEXT_PUBLIC_AI_CHAT_API_URL to'liq URL bo'lsa (masalan: https://shifo-api.vercel.app/ai-chat)
    if (process.env.NEXT_PUBLIC_AI_CHAT_API_URL && process.env.NEXT_PUBLIC_AI_CHAT_API_URL.startsWith('http')) {
      API_URL = process.env.NEXT_PUBLIC_AI_CHAT_API_URL;
    } 
    // 2. BACKEND_API_URL berilgan bo'lsa (masalan: https://shifo-api.vercel.app)
    else if (process.env.BACKEND_API_URL && process.env.BACKEND_API_URL.startsWith('http')) {
      API_URL = `${process.env.BACKEND_API_URL.replace(/\/$/, '')}/ai-chat`;
    }
    // 3. Development uchun localhost (faqat local ishlatishda)
    else if (process.env.NODE_ENV === 'development') {
      API_URL = 'http://localhost:3002/ai-chat';
    }
    // 4. Production'da environment variable bo'lmasa, xatolik
    else {
      throw new Error('Backend server URL sozlanmagan! Vercel da BACKEND_API_URL yoki NEXT_PUBLIC_AI_CHAT_API_URL ni sozlash kerak.');
    }

    console.log('API route - Backend URL:', API_URL);
    console.log('API route - Request body:', { message, sessionId, locale });

    // Backend server'ga so'rov yuborish
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId,
        locale: locale,
        userInfo: userInfo
      })
    });

    console.log('API route - Response status:', response.status);
    console.log('API route - Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API route - Backend error:', errorText);
      throw new Error(`Backend server xatosi: ${response.status} - ${errorText.substring(0, 100)}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('API route - Not JSON response:', text.substring(0, 200));
      throw new Error('Backend server JSON qaytarmadi');
    }

    const data = await response.json();
    console.log('API route - Response data:', data);
    
    return NextResponse.json({ reply: data.reply || 'Javob olindi, lekin xabar mavjud emas.' });
  } catch (error) {
    console.error('API route xatosi:', error);
    return NextResponse.json({ 
      error: 'Xatolik yuz berdi',
      reply: error instanceof Error ? `Uzr, xatolik: ${error.message}` : 'Uzr, server bilan bog\'lanishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
    }, { status: 500 });
  }
}
