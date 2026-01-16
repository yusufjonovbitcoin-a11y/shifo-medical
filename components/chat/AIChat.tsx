'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

interface Message {
  text: string;
  isBot: boolean;
  id: number;
}


const getInitialMessage = (locale: string): string => {
  switch (locale) {
    case 'ru':
      return 'Здравствуйте! Я оператор регистратуры медицинского центра SHIFOKOR-LDA. Что вас беспокоит?';
    case 'en':
      return 'Hello! I\'m a reception operator at SHIFOKOR-LDA medical center. What\'s bothering you?';
    default:
      return 'Assalomu alaykum! Men SHIFOKOR-LDA tibbiy markazining qabul bo\'limi operatorisiman. Sizni nima bezovta qilyapti?';
  }
};

const getChatTitle = (locale: string): string => {
  switch (locale) {
    case 'ru':
      return 'Оператор регистратуры';
    case 'en':
      return 'Reception Operator';
    default:
      return 'Qabul bo\'limi operatori';
  }
};

export function AIChat() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: getInitialMessage(locale),
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    const message = inputText.trim();
    if (!message || isTyping) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: message,
      isBot: false
    }]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          sessionId: sessionIdRef.current
        })
      });

      if (!res.ok) {
        throw new Error(`Server xatosi: ${res.status}`);
      }

      const data = await res.json();
      setIsTyping(false);
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: data.reply || 'Kechirasiz, javob topilmadi.',
        isBot: true
      }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Xatolik yuz berdi. Qayta urinib ko\'ring.',
        isBot: true
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-50 bottom-6 md:bottom-8"
          aria-label="AI Chat ochish"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] animate-fade-in"
            aria-hidden="true"
          />
          
          <div className="fixed inset-0 md:inset-4 lg:inset-8 md:max-w-2xl md:mx-auto bg-white rounded-none md:rounded-3xl shadow-2xl flex flex-col z-[100] overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-green-700 text-white p-4 md:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center relative">
                    <Bot className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold">{getChatTitle(locale)}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1.5 md:p-2 rounded-xl transition-all duration-300 hover:rotate-90"
                  aria-label="Yopish"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 md:px-5 py-2.5 md:py-3 shadow-lg ${
                      message.isBot
                        ? 'bg-white text-gray-900 rounded-bl-sm border border-gray-100'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-sm'
                    }`}
                  >
                    <p className="leading-relaxed text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 md:px-5 py-3 md:py-4 shadow-lg">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Savol yozing..."
                  className="flex-1 px-4 md:px-5 py-2.5 md:py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 transition-all duration-300 text-sm md:text-base"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white rounded-2xl hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center flex-shrink-0"
                  aria-label="Yuborish"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
