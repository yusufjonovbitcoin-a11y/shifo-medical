'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useLocale } from 'next-intl';

interface Message {
  text: string;
  isBot: boolean;
  id: number;
  read: boolean;
}

interface UserData {
  name: string;
  phone: string;
  complaint: string;
  duration: string;
}

// Function to get initial bot message based on locale
const getInitialBotMessage = (locale: string): string => {
  switch (locale) {
    case 'ru':
      return 'Здравствуйте! Я помощник оператора регистратуры медицинского центра SHIFOKOR-LDA. Что именно вас беспокоит? Расскажите свободно.';
    case 'en':
      return 'Hello! I\'m an assistant operator at SHIFOKOR-LDA medical center reception. What exactly is bothering you? Please tell me freely.';
    case 'uz':
    default:
      return 'Assalomu alaykum! Men SHIFOKOR-LDA tibbiy markazining qabul bo\'limi operatori yordamchisiman. Sizni aynan nima bezovta qilyapti? Erkin gapirib bering.';
  }
};

// Function to get chat title based on locale
const getChatTitle = (locale: string): string => {
  switch (locale) {
    case 'ru':
      return 'Оператор регистратуры';
    case 'en':
      return 'Reception Operator';
    case 'uz':
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
      text: getInitialBotMessage(locale),
      isBot: true,
      read: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(
    typeof window !== 'undefined'
      ? localStorage.getItem('shifo_chat_sessionId') || 
        'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      : 'session_default'
  );
  const userDataRef = useRef<UserData>({
    name: '',
    phone: '',
    complaint: '',
    duration: ''
  });

  // Initialize session ID in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('shifo_chat_sessionId')) {
      localStorage.setItem('shifo_chat_sessionId', sessionIdRef.current);
    }
  }, []);

  // Reset chat when locale changes (only if chat was closed or just opened)
  useEffect(() => {
    // Only reset if chat is closed, to avoid interrupting ongoing conversations
    if (!isOpen) {
      setMessages([
        {
          id: Date.now(),
          text: getInitialBotMessage(locale),
          isBot: true,
          read: false
        }
      ]);
      // Reset user data when locale changes
      userDataRef.current = {
        name: '',
        phone: '',
        complaint: '',
        duration: ''
      };
    }
  }, [locale]); // Only depend on locale, not isOpen

  // Prevent body scroll when chat is open
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

  // Track ScrollToTop button visibility
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkScrollPosition = () => {
      setScrollToTopVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Initial check

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const updateUserData = (message: string) => {
    // Extract phone
    const phoneMatch = message.match(/(\+?998\d{9}|90\d{9})/);
    if (phoneMatch) {
      let phone = phoneMatch[0];
      if (!phone.startsWith('+')) {
        phone = phone.startsWith('998') ? '+' + phone : '+998' + phone;
      }
      userDataRef.current.phone = phone;
    }

    // Extract name (short text, only letters)
    if (message.length < 30 && /^[А-Яа-яА-ӯа-ӯA-Za-z\s]+$/i.test(message) && !message.match(/\d/)) {
      const nameMatch = message.match(/(?:ismim|menim ismim|men|mening ismim)\s+(.+)/i);
      if (nameMatch) {
        userDataRef.current.name = nameMatch[1].trim();
      } else if (!phoneMatch) {
        userDataRef.current.name = message.trim();
      }
    }

    // Extract complaint
    const diseaseKeywords = ['og\'riq', 'ogriq', 'kasal', 'shikoyat', 'dardi', 'simptom', 'alamat', 'bemor', 'bezovta', 'muammo'];
    if (diseaseKeywords.some(kw => message.toLowerCase().includes(kw))) {
      userDataRef.current.complaint = message;
    }

    // Extract duration
    const durationMatch = message.match(/(\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri|\d+\s*(?:kun|hafta|oy)\s*davom)/i);
    if (durationMatch) {
      userDataRef.current.duration = durationMatch[0];
    }
  };

  const handleSendMessage = async () => {
    const message = inputText.trim();
    if (!message || isTyping) return;

    // User xabarini qo'shish
    const userMessage: Message = {
      id: Date.now(),
      text: message,
      isBot: false,
      read: true
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Update user data
    updateUserData(message);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Real-time typing delay - 2 soniya kutish (haqiqiy suhbatga o'xshash)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Vercel-dagi o'zgaruvchini olish, agar u bo'lmasa localhost-ga murojaat qilish
      const API_URL = process.env.NEXT_PUBLIC_AI_CHAT_API_URL || 'http://localhost:3002/ai-chat';
      
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          sessionId: sessionIdRef.current,
          locale: locale,
          userInfo: {
            name: userDataRef.current.name || undefined,
            phone: userDataRef.current.phone || undefined,
            problem: userDataRef.current.complaint || message,
            complaint: userDataRef.current.complaint || message,
            duration: userDataRef.current.duration || undefined
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Server xatosi: ${res.status}`);
      }

      const data = await res.json();
      setIsTyping(false);
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: data.reply || (locale === 'uz' ? 'Kechirasiz, javob topilmadi.' : locale === 'ru' ? 'Извините, ответ не найден.' : 'Sorry, no response.'),
        isBot: true,
        read: !isOpen
      }]);

    } catch (error) {
      setIsTyping(false);
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: locale === 'uz' ? 'Xatolik yuz berdi. Qayta urinib ko\'ring.' : locale === 'ru' ? 'Произошла ошибка. Пожалуйста, попробуйте снова.' : 'Error occurred. Please try again.',
        isBot: true,
        read: !isOpen
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => {
      const newState = !prev;
      // Mark messages as read when opening
      if (newState) {
        setMessages(prevMessages => 
          prevMessages.map(msg => ({ ...msg, read: true }))
        );
      }
      // Update body class and sessionStorage for ScrollToTop component
      if (typeof window !== 'undefined') {
        if (newState) {
          document.body.classList.add('chat-open');
          sessionStorage.setItem('chat-open', 'true');
        } else {
          document.body.classList.remove('chat-open');
          sessionStorage.removeItem('chat-open');
        }
      }
      return newState;
    });
  };

  const unreadCount = messages.filter(m => m.isBot && !m.read).length;

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`fixed right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-50 ${
            scrollToTopVisible ? 'bottom-24 md:bottom-28' : 'bottom-6 md:bottom-8'
          }`}
          aria-label="AI Chat ochish"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window - Full Screen Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={toggleChat}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] animate-fade-in"
            aria-hidden="true"
          />
          
          {/* Chat Panel */}
          <div className="fixed inset-0 md:inset-4 lg:inset-8 md:max-w-2xl md:mx-auto bg-white rounded-none md:rounded-3xl shadow-2xl flex flex-col z-[100] overflow-hidden animate-scale-in">
          {/* Header */}
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
                onClick={toggleChat}
                className="hover:bg-white/20 p-1.5 md:p-2 rounded-xl transition-all duration-300 hover:rotate-90"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
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

          {/* Input Area */}
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

