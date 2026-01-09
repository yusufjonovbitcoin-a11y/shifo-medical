'use client';

import { Phone, Clock, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-60 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" 
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-4 py-4 md:py-6 relative z-10"
      >
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-blue-600 text-xl md:text-2xl">+</span>
            </motion.div>
            <div>
              <span className="text-lg md:text-xl text-white block leading-tight">SHIFOKOR-LDA</span>
              <span className="text-xs text-blue-200 hidden sm:block">Tibbiy Markazi</span>
            </div>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {['Xizmatlar', 'Shifokorlar', 'Uchrashuv', 'Aloqa'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white/90 hover:text-white transition relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#uchrashuv" 
              className="hidden sm:block bg-white text-blue-600 px-4 md:px-6 py-2 md:py-3 rounded-xl hover:shadow-2xl transition-all duration-300 text-sm md:text-base"
            >
              Qabulga yozilish
            </motion.a>
            
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col">
              {['xizmatlar', 'shifokorlar', 'uchrashuv', 'aloqa'].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${item}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 text-gray-700 hover:bg-blue-50 transition border-b border-gray-100 capitalize"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 text-sm md:text-base"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full" 
              />
              <span className="text-white">24/7 Favqulodda yordam</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight"
            >
              Sog'ligingiz - <br />
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-[length:200%_auto]"
              >
                bizning ustuvor vazifamiz
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 leading-relaxed"
            >
              Samarqanddagi zamonaviy tibbiy markaz. 50 dan ortiq operatsiya turlari, yuqori malakali mutaxassislar va ilg'or texnologiyalar.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-10 md:mb-16"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#uchrashuv" 
                className="group bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Onlayn qabulga yozilish
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#xizmatlar" 
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 text-center text-sm md:text-base"
              >
                Xizmatlar
              </motion.a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12"
            >
              {[
                { number: '50+', label: 'Operatsiya turlari' },
                { number: '15+', label: 'Tajribali shifokorlar' },
                { number: '20+', label: 'Yillik tajriba' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                    className="text-2xl md:text-3xl text-white mb-1"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-blue-200 text-xs md:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
            >
              {[
                { icon: Phone, label: 'Telefon', value: '+998 97 611 06 04' },
                { icon: Clock, label: 'Ish vaqti', value: '09:00 - 16:30' },
                { icon: MapPin, label: 'Manzil', value: 'Samarqand' }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-200">{contact.label}</p>
                      <p className="text-white text-xs md:text-sm">{contact.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative order-first lg:order-last"
          >
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop" 
                  alt="Klinika interyeri"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <span className="text-2xl md:text-3xl text-white">✓</span>
                  </motion.div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-2xl md:text-3xl text-gray-900"
                    >
                      98%
                    </motion.p>
                    <p className="text-sm md:text-base text-gray-600">Muvaffaqiyat darajasi</p>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Decorative Elements */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" 
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" 
            />
          </motion.div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
}