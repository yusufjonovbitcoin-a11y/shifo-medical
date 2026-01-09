import { Phone, Mail, MapPin, Facebook, Instagram, Send, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer id="aloqa" className="bg-gray-900 text-white pt-12 md:pt-20 pb-6 md:pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl md:text-2xl">+</span>
              </div>
              <div>
                <span className="text-lg md:text-xl block">SHIFOKOR-LDA</span>
                <span className="text-xs text-gray-400">Tibbiy Markazi</span>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
              50+ operatsiya turlari, zamonaviy uskunalar va yuqori malakali mutaxassislar bilan xizmatdamiz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block">
              Tezkor havolalar
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#xizmatlar" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Xizmatlar
                </a>
              </li>
              <li>
                <a href="#shifokorlar" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Shifokorlar
                </a>
              </li>
              <li>
                <a href="#uchrashuv" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Qabulga yozilish
                </a>
              </li>
              <li>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Biz haqimizda
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block">
              Xizmatlar
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Urologiya
                </a>
              </li>
              <li>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Ginekologiya
                </a>
              </li>
              <li>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  Xirurgiya
                </a>
              </li>
              <li>
                <a href="#" className="text-sm md:text-base text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all" />
                  LOR
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 relative inline-block">
              Bog'lanish
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" />
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="group">
                <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
                    Samarqand, Termezskaya ko'chasi 67A
                  </span>
                </div>
              </li>
              <li className="group">
                <a href="tel:+998662353344" className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
                    +998 66 235 33 44
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="mailto:info@medicare.uz" className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors">
                    info@medicare.uz
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl md:rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center">
            <div>
              <h3 className="text-xl md:text-2xl text-white mb-2">Yangiliklardan xabardor bo'ling</h3>
              <p className="text-sm md:text-base text-blue-100">Tibbiy maslahatlar va maxsus takliflarni birinchi bo'lib oling</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <input 
                type="email" 
                placeholder="Email manzilingiz"
                className="flex-1 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-blue-200 border border-white/30 focus:outline-none focus:border-white text-sm md:text-base"
              />
              <button className="bg-white text-blue-600 px-5 md:px-6 py-2.5 md:py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm md:text-base whitespace-nowrap">
                Obuna
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 md:pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-gray-400 flex items-center gap-2 text-center md:text-left">
              © 2024 SHIFOKOR-LDA. Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-red-500" /> in Samarqand
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition">Maxfiylik siyosati</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}