'use client';

import { Heart, Activity, Stethoscope, Brain, Eye, Baby } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: Heart,
    title: "Urologiya",
    description: "TUR operatsiyalar, laparoskopik amaliyotlar, zamonaviy laser texnologiyasi",
    price: "Konsultatsiya",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Baby,
    title: "Ginekologiya",
    description: "Gisterosk opiya, laparoskopiya, ayollar kasalliklari davolash",
    price: "Konsultatsiya",
    gradient: "from-rose-500 to-red-500"
  },
  {
    icon: Activity,
    title: "Xirurgiya",
    description: "Laparoskopik operatsiyalar, proktologiya, laser texnologiyasi",
    price: "Konsultatsiya",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Stethoscope,
    title: "LOR",
    description: "Burun, quloq, tomoq kasalliklari, endoskopik operatsiyalar",
    price: "Konsultatsiya",
    gradient: "from-teal-500 to-emerald-500"
  },
  {
    icon: Brain,
    title: "Nevrologiya",
    description: "Asab tizimi kasalliklari, EEG, manualnaya terapiya",
    price: "Konsultatsiya",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Heart,
    title: "Kardiologiya",
    description: "Yurak-tomir tizimi, EKG, to'liq diagnostika",
    price: "Konsultatsiya",
    gradient: "from-red-500 to-pink-500"
  }
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="xizmatlar" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" 
        />
        <motion.div
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" 
        />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-blue-600 rounded-full" 
            />
            <span className="text-blue-600 uppercase tracking-wide text-xs md:text-sm">Bizning xizmatlar</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mt-4 md:mt-6 mb-4 md:mb-6 px-4">
            Keng ko'lamli tibbiy xizmatlar
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Zamonaviy uskunalar va yuqori malakali mutaxassislar yordamida sog'ligingizni saqlang
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${service.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg`}
                >
                  <service.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>
                <h3 className="text-xl md:text-2xl text-gray-900 mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100">
                  <span className={`text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                    {service.price}
                  </span>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sm md:text-base text-blue-600 hover:text-blue-700 transition flex items-center gap-2"
                  >
                    Batafsil
                    <span className="transition-all">→</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl"
        >
          {[
            { icon: '⚕️', color: 'from-blue-500 to-blue-600', title: '50+ operatsiya', subtitle: 'Zamonaviy usullar' },
            { icon: '🏥', color: 'from-purple-500 to-purple-600', title: 'Statsionar', subtitle: '24/7 xizmat' },
            { icon: '🔬', color: 'from-green-500 to-green-600', title: 'Laboratoriya', subtitle: 'To\'liq tahlillar' },
            { icon: '💊', color: 'from-orange-500 to-orange-600', title: 'Fizioterapiya', subtitle: '15+ protsedura' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg`}
              >
                <span className="text-2xl md:text-3xl text-white">{item.icon}</span>
              </motion.div>
              <p className="text-sm md:text-base text-gray-900 mb-1">{item.title}</p>
              <p className="text-xs md:text-sm text-gray-600">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}