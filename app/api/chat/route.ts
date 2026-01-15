import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, locale } = body;

    // Kelajakda bu yerga OpenAI yoki boshqa AI mantiqini qo'shish mumkin
    let botReply = "";
    
    if (locale === 'ru') {
      botReply = `Я получил ваше сообщение: "${message}". Скоро наш оператор свяжется с вами.`;
    } else if (locale === 'en') {
      botReply = `I received your message: "${message}". Our operator will contact you soon.`;
    } else {
      botReply = `Xabaringiz qabul qilindi: "${message}". Tez orada operatorimiz siz bilan bog'lanadi.`;
    }

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}

