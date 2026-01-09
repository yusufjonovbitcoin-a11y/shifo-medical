'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: { [key: string]: string } = {
  'salom': 'Assalomu alaykum! SHIFOKOR-LDA tibbiy markazining AI yordamchisiman. Sizga qanday yordam bera olaman?',
  'xizmatlar': 'Bizda 50+ operatsiya turlari mavjud: Urologiya, Ginekologiya, Xirurgiya, LOR, Kardiologiya, Nevrologiya. Laparoskopik, endoskopik va laser texnologiyalari.',
  'narx': 'Operatsiya narxlari murakkabligiga bog\'liq. Batafsil ma\'lumot uchun: +998 97 611 06 04',
  'vaqt': 'Dushanba-Shanba: 09:00-16:30. Laboratoriya: 07:30-16:30. Statsionar 24/7 ishlaydi.',
  'manzil': 'Samarqand shahar, Termezskaya ko\'chasi 67A. Mo\'ljal: Limonadka. https://yandex.uz/maps/-/CDRIEJYF',
  'telefon': 'Telefon: +998 97 611 06 04 / +998 66 235 33 44',
  'statsionar': 'Ha, bizda 24/7 statsionar va kunduzgi statsionar mavjud. Kunlik narx: 450,000 so\'m (ovqat va dori kiradi).',
  'uzi': 'Har kuni 09:00-16:30 da barcha turdagi UZI tekshiruvlari, shu jumladan Doppler va homiladorlik UZI.',
  'tahlil': 'To\'liq laboratoriya xizmatlari: qon, siydik, gormonlar, infeksiyalar, onkomarkerlar va boshqalar.',
  'operatsiya': '50+ operatsiya: TUR, laparoskopiya, gisterosk opiya, gemorroy, varikotsele, adenoidlar va boshqalar.',
  'shifokor': 'Mutaxassislar: Urolog, Ginekolog, Xirurg, LOR, Kardiolog, Nevrolog. 10-30 yillik tajriba.',
  'tayyorgarlik': 'Operatsiya oldidan: qon va siydik tahlillari, EKG, rentgen, UZI, kardiolog va anesteziolog ko\'rigi kerak.',
  'default': 'Savollaringiz bo\'yicha: +998 97 611 06 04. Yoki "xizmatlar", "vaqt", "manzil", "shifokor" so\'zlarini yozing.'
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Assalomu alaykum! Men SHIFOKOR-LDA tibbiy markazining AI yordamchisiman. Sizga qanday yordam bera olaman?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('salom') || lowerMessage.includes('assalom')) {
      return botResponses['salom'];
    } else if (lowerMessage.includes('xizmat') || lowerMessage.includes('xidmat') || lowerMessage.includes('operatsiya')) {
      return botResponses['xizmatlar'];
    } else if (lowerMessage.includes('narx') || lowerMessage.includes('qancha') || lowerMessage.includes('to\'lov')) {
      return botResponses['narx'];
    } else if (lowerMessage.includes('vaqt') || lowerMessage.includes('soat') || lowerMessage.includes('ochiq') || lowerMessage.includes('ish')) {
      return botResponses['vaqt'];
    } else if (lowerMessage.includes('manzil') || lowerMessage.includes('qayer') || lowerMessage.includes('joylash')) {
      return botResponses['manzil'];
    } else if (lowerMessage.includes('telefon') || lowerMessage.includes('raqam') || lowerMessage.includes('aloqa')) {
      return botResponses['telefon'];
    } else if (lowerMessage.includes('statsionar') || lowerMessage.includes('yotish')) {
      return botResponses['statsionar'];
    } else if (lowerMessage.includes('uzi') || lowerMessage.includes('ultrazvuk')) {
      return botResponses['uzi'];
    } else if (lowerMessage.includes('tahlil') || lowerMessage.includes('analiz') || lowerMessage.includes('laboratoriya')) {
      return botResponses['tahlil'];
    } else if (lowerMessage.includes('shifokor') || lowerMessage.includes('vrach') || lowerMessage.includes('doktor')) {
      return botResponses['shifokor'];
    } else if (lowerMessage.includes('tayyorgarlik') || lowerMessage.includes('tayyorlanish')) {
      return botResponses['tayyorgarlik'];
    } else {
      return botResponses['default'];
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse flex items-center justify-center">
            <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 md:bottom-8 md:right-8 md:left-auto md:w-[420px] h-[calc(100vh-2rem)] md:h-[650px] bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 md:p-6 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center relative">
                  <Bot className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg flex items-center gap-1 md:gap-2">
                    AI Yordamchi
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  </h3>
                  <p className="text-xs md:text-sm text-blue-100">Har doim onlayn</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1.5 md:p-2 rounded-xl transition-all duration-300 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 md:px-5 py-2.5 md:py-3 shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-bl-sm border border-gray-100'
                  }`}
                >
                  <p className="leading-relaxed text-sm md:text-base">{message.text}</p>
                  <span
                    className={`text-xs mt-1.5 md:mt-2 block ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('uz-UZ', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 md:px-5 py-3 md:py-4 shadow-lg">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 md:px-6 pb-2 md:pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {['Xizmatlar', 'Shifokor', 'Vaqt', 'Manzil'].map((quick) => (
              <button
                key={quick}
                onClick={() => {
                  setInputText(quick);
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-xl text-xs md:text-sm hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 whitespace-nowrap border border-blue-100 hover:scale-105"
              >
                {quick}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Xabar yozing..."
                className="flex-1 px-4 md:px-5 py-2.5 md:py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600 transition-all duration-300 text-sm md:text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}