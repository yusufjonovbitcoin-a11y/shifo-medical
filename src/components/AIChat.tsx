import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowLeft, Bot, User } from 'lucide-react';
import { properties } from '../data/properties';
import { PropertyCard } from './PropertyCard';

interface AIChatProps {
  onViewDetails: (propertyId: string) => void;
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  properties?: string[];
  timestamp: Date;
}

export function AIChat({ onViewDetails, onNavigate }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Assalomu alaykum! Men sizga uy topishda yordam beraman. Qanday uy qidiryapsiz? 🏡',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    let matchedProperties = properties;
    
    if (input.includes('chilonzor')) {
      matchedProperties = properties.filter(p => p.district === 'Chilonzor');
    } else if (input.includes('yunusobod')) {
      matchedProperties = properties.filter(p => p.district === 'Yunusobod');
    } else if (input.includes('sergeli')) {
      matchedProperties = properties.filter(p => p.district === 'Sergeli');
    } else if (input.includes('3 xonali')) {
      matchedProperties = properties.filter(p => p.rooms === 3);
    } else if (input.includes('2 xonali')) {
      matchedProperties = properties.filter(p => p.rooms === 2);
    } else if (input.includes('arzon') || input.includes('70')) {
      matchedProperties = properties.filter(p => p.price < 70000);
    }

    const propertyIds = matchedProperties.slice(0, 3).map(p => p.id);
    
    let responseText = '';
    if (matchedProperties.length > 0) {
      responseText = `Ajoyib! Men sizga ${matchedProperties.length} ta mos uy topdim. Quyidagi variantlarni ko'rib chiqing: ⭐`;
    } else {
      responseText = 'Kechirasiz, sizning talabingizga mos uy topilmadi. Iltimos, boshqa parametrlar bilan qidirib ko\'ring. 🔍';
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      text: responseText,
      properties: propertyIds,
      timestamp: new Date()
    };
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputText('Yunusobodda 3 xonali kvartira');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="px-5 py-5 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#2A2A2A]"
          >
            <ArrowLeft size={22} className="text-white" />
          </button>
          
          <div className="flex-1">
            <h2 className="text-white">AI Chat</h2>
            <p className="text-sm text-gray-400">Sun'iy intellekt yordamchisi</p>
          </div>
          
          <div className="w-12 h-12 bg-[#C1FF72] rounded-full flex items-center justify-center">
            <Bot size={26} className="text-[#0A0A0A]" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {messages.map((message) => (
          <div key={message.id} className="animate-slide-up">
            <div
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'ai' && (
                <div className="w-10 h-10 bg-[#C1FF72] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={20} className="text-[#0A0A0A]" />
                </div>
              )}
              
              <div
                className={`max-w-[75%] px-5 py-4 rounded-3xl ${
                  message.type === 'user'
                    ? 'bg-[#C1FF72] text-[#0A0A0A] rounded-br-lg'
                    : 'bg-[#1A1A1A] text-white border border-[#2A2A2A] rounded-bl-lg'
                }`}
              >
                <p className="leading-relaxed">{message.text}</p>
              </div>

              {message.type === 'user' && (
                <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0 border border-[#2A2A2A]">
                  <User size={20} className="text-white" />
                </div>
              )}
            </div>

            {message.properties && message.properties.length > 0 && (
              <div className="mt-4 space-y-4 ml-14">
                {message.properties.map(propertyId => {
                  const property = properties.find(p => p.id === propertyId);
                  if (!property) return null;
                  return (
                    <PropertyCard
                      key={propertyId}
                      property={property}
                      onViewDetails={() => onViewDetails(propertyId)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-[#C1FF72] rounded-full flex items-center justify-center">
              <Bot size={20} className="text-[#0A0A0A]" />
            </div>
            <div className="bg-[#1A1A1A] px-6 py-4 rounded-3xl rounded-bl-lg border border-[#2A2A2A]">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="px-5 py-4 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
            }`}
          >
            <Mic size={22} />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Yozing yoki gapiring..."
            className="flex-1 px-5 py-4 bg-[#1A1A1A] rounded-2xl outline-none border border-[#2A2A2A] focus:border-[#C1FF72] transition-colors text-white placeholder-gray-600"
            disabled={isRecording}
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-14 h-14 bg-[#C1FF72] text-[#0A0A0A] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B0EE61] transition-colors"
          >
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}
