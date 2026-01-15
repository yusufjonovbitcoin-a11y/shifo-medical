import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Railway backend manzilingiz (oxiriga /ai-chat qo'shilgan)
    const RAILWAY_API = "https://shifo-medical-production.up.railway.app/ai-chat";

    const response = await fetch(RAILWAY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body), // Kelgan barcha ma'lumotni Railway-ga uzatamiz
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ulanishda xato:", error);
    return NextResponse.json({ reply: "Backend bilan aloqa uzildi." }, { status: 500 });
  }
}
