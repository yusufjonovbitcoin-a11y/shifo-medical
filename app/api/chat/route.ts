import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sessionId, locale, userInfo } = body;

    // Backend server URL - environment variable yoki default localhost
    const BACKEND_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_AI_CHAT_API_URL || 'http://localhost:3002';
    const API_URL = `${BACKEND_URL}/ai-chat`;

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

    if (!response.ok) {
      throw new Error(`Backend server xatosi: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ reply: data.reply || 'Javob olindi, lekin xabar mavjud emas.' });
  } catch (error) {
    console.error('API route xatosi:', error);
    return NextResponse.json({ 
      error: 'Xatolik yuz berdi',
      reply: 'Uzr, server bilan bog\'lanishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
    }, { status: 500 });
  }
}

