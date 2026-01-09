import { useState } from 'react';
import { Phone, Send, ArrowLeft, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('code');
      }, 1000);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C1FF72]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C1FF72]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          {step === 'code' && (
            <button
              onClick={() => setStep('phone')}
              className="mb-6 px-4 py-2 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center gap-2 text-white hover:bg-[#252525] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Orqaga</span>
            </button>
          )}

          {/* Logo/Icon */}
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#2A2A2A]">
              {step === 'phone' ? (
                <Phone size={48} className="text-[#C1FF72]" />
              ) : (
                <Shield size={48} className="text-[#C1FF72]" />
              )}
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#2A2A2A] animate-slide-up">
            <h1 className="text-center mb-3 text-white">
              {step === 'phone' ? 'Tizimga kirish' : 'Tasdiqlash'}
            </h1>

            {step === 'phone' ? (
              <>
                <p className="text-center text-gray-400 mb-8">
                  Telefon raqamingizni kiriting
                </p>

                <form onSubmit={handleSendCode} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 ml-1">
                      Telefon raqam
                    </label>
                    <div className="flex items-center gap-3 px-5 py-4 bg-[#0A0A0A] rounded-2xl border border-[#2A2A2A] focus-within:border-[#C1FF72] transition-all">
                      <span className="text-gray-400 font-medium">+998</span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                        placeholder="90 123 45 67"
                        className="flex-1 outline-none bg-transparent text-white placeholder-gray-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phoneNumber.length < 9 || isLoading}
                    className="w-full bg-[#C1FF72] text-[#0A0A0A] py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B0EE61] transition-all duration-300 shadow-xl font-bold"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
                        Yuborilmoqda...
                      </>
                    ) : (
                      <>
                        SMS kod olish
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                  Hisobingiz yo'qmi?{' '}
                  <button className="text-[#C1FF72] font-semibold">
                    Ro'yxatdan o'ting
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className="text-center text-gray-400 mb-8">
                  +998 {phoneNumber} raqamiga yuborilgan kodni kiriting
                </p>

                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 ml-1">
                      SMS kod
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="w-full px-5 py-4 bg-[#0A0A0A] rounded-2xl text-center tracking-[0.5em] outline-none border border-[#2A2A2A] focus:border-[#C1FF72] transition-all text-white placeholder-gray-600 text-2xl"
                      maxLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={code.length !== 6 || isLoading}
                    className="w-full bg-[#C1FF72] text-[#0A0A0A] py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B0EE61] transition-all duration-300 shadow-xl font-bold"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
                        Tekshirilmoqda...
                      </div>
                    ) : (
                      'Tasdiqlash'
                    )}
                  </button>
                </form>

                <button 
                  onClick={() => setStep('phone')}
                  className="mt-6 text-gray-400 text-sm w-full hover:text-white transition-colors"
                >
                  Kodni qayta yuborish
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
