import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Railway manzilingizni tekshiring (oxiri /ai-chat bilan tugashi shart)
    const RAILWAY_API = "https://shifo-medical-production.up.railway.app/ai-chat";

    const response = await fetch(RAILWAY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Agar Railway xato bersa ham JSON qaytishi kerak
    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(errorData, { status: response.status });
      } catch {
        return NextResponse.json({ reply: `Backend xatosi: ${response.status}` }, { status: response.status });
      }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    // Xato bo'lganda HTML emas, JSON qaytaramiz
    return NextResponse.json({ reply: "Tizimda texnik xatolik (Proxy)." }, { status: 500 });
  }
}

