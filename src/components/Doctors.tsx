'use client';

import { Award, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const doctors = [
  {
    name: "Xamdamov Rustam Uktamovich",
    specialty: "Urolog",
    experience: "20+ yillik tajriba",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    rating: 5.0,
    patients: 3000,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Sultanova Rohilya Naimovna",
    specialty: "Ginekolog",
    experience: "30+ yillik tajriba",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 5.0,
    patients: 4000,
    gradient: "from-rose-500 to-red-500"
  },
  {
    name: "Muxammadiev Xurshed Lutfillaevich",
    specialty: "Xirurg-Proktolog",
    experience: "10+ yillik tajriba",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    rating: 4.9,
    patients: 2500,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Tillyaeva Zamira Ziyadullaevna",
    specialty: "Kardiolog-Terapevt",
    experience: "15+ yillik tajriba",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    rating: 4.9,
    patients: 2800,
    gradient: "from-red-500 to-pink-500"
  }
];

export function Doctors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="shifokorlar" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
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
            className="inline-flex items-center gap-2 bg-purple-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-purple-600 rounded-full" 
            />
            <span className="text-purple-600 uppercase tracking-wide text-xs md:text-sm">Bizning jamoa</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mt-4 md:mt-6 mb-4 md:mb-6 px-4">
            Tajribali shifokorlar
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Yuqori malakali mutaxassislar sizning sog'ligingiz uchun g'amxo'rlik qiladi
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden h-64 md:h-80">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${doctor.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Rating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-sm px-2 md:px-3 py-1.5 md:py-2 rounded-full flex items-center gap-1 md:gap-2 shadow-lg"
                >
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm md:text-base text-gray-900">{doctor.rating}</span>
                </motion.div>

                {/* Specialty Badge */}
                <motion.div
                  initial={{ y: 100 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 bg-gradient-to-r ${doctor.gradient} p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-sm`}
                >
                  <p className="text-sm md:text-base text-white text-center">{doctor.specialty}</p>
                </motion.div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl text-gray-900 mb-3 md:mb-4">{doctor.name}</h3>
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 md:gap-3 text-gray-600"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br ${doctor.gradient} rounded-lg flex items-center justify-center`}
                    >
                      <Award className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </motion.div>
                    <span className="text-xs md:text-sm">{doctor.experience}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 md:gap-3 text-gray-600"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br ${doctor.gradient} rounded-lg flex items-center justify-center`}
                    >
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </motion.div>
                    <span className="text-xs md:text-sm">{doctor.patients}+ bemor</span>
                  </motion.div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r ${doctor.gradient} text-white py-2.5 md:py-3 rounded-xl hover:shadow-xl transition-all duration-300 text-sm md:text-base`}
                >
                  Qabulga yozilish
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}