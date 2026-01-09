'use client';

import { useState, useRef } from 'react';
import { Calendar, User, Phone, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Appointment() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="uchrashuv" className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            y: [-50, 50, -50]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            x: [50, -50, 50],
            y: [50, -50, 50]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" 
        />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl md:max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-white rounded-full" 
              />
              <span className="text-white uppercase tracking-wide text-xs md:text-sm">{t('appointment.badge')}</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mt-4 md:mt-6 mb-4 md:mb-6 px-4">
              {t('appointment.title')}
            </h2>
            <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-4">
              {t('appointment.description')}
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-16 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl"
              >
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl text-gray-900 mb-3 md:mb-4"
              >
                {t('appointment.success.title')}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-xl text-gray-600 leading-relaxed"
              >
                {t('appointment.success.message')}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl"
            >
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  {[
                    { name: 'name', icon: User, labelKey: 'name', placeholderKey: 'namePlaceholder', color: 'from-blue-500 to-blue-600' },
                    { name: 'phone', icon: Phone, labelKey: 'phone', placeholderKey: 'phonePlaceholder', color: 'from-purple-500 to-purple-600' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="group"
                    >
                      <label className="block text-gray-700 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br ${field.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <field.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </motion.div>
                        {t(`appointment.form.${field.labelKey}`)}
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type={field.name === 'phone' ? 'tel' : 'text'}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 text-sm md:text-base"
                        placeholder={t(`appointment.form.${field.placeholderKey}`)}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  {[
                    { name: 'date', type: 'date', icon: Calendar, labelKey: 'date', color: 'from-pink-500 to-pink-600' },
                    { name: 'time', type: 'select', icon: Calendar, labelKey: 'time', color: 'from-indigo-500 to-indigo-600' }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <label className="block text-gray-700 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br ${field.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <field.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </motion.div>
                        {t(`appointment.form.${field.labelKey}`)}
                      </label>
                      {field.type === 'select' ? (
                        <motion.select
                          whileFocus={{ scale: 1.02 }}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 text-sm md:text-base"
                        >
                          <option value="">{t('appointment.selectTime')}</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                        </motion.select>
                      ) : (
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 text-sm md:text-base"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="mb-4 md:mb-6"
                >
                  <label className="block text-gray-700 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <FileText className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </motion.div>
                    {t('appointment.form.service')}
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 text-sm md:text-base"
                  >
                    <option value="">{t('appointment.selectService')}</option>
                    <option value="urologiya">{t('appointment.services.urology')}</option>
                    <option value="ginekologiya">{t('appointment.services.gynecology')}</option>
                    <option value="xirurgiya">{t('appointment.services.surgery')}/{t('appointment.services.proctology')}</option>
                    <option value="lor">{t('appointment.services.ent')}</option>
                    <option value="kardiologiya">{t('appointment.services.cardiology')}</option>
                    <option value="nevrologiya">{t('appointment.services.neurology')}</option>
                    <option value="uzi">{t('appointment.services.ultrasound')}</option>
                    <option value="tahlil">{t('appointment.services.laboratory')}</option>
                    <option value="fizioterapiya">{t('appointment.services.physiotherapy')}</option>
                  </motion.select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                  className="mb-6 md:mb-8"
                >
                  <label className="block text-gray-700 mb-2 md:mb-3 text-sm md:text-base">{t('appointment.form.message')}</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-all duration-300 resize-none text-sm md:text-base"
                    placeholder={t('appointment.form.messagePlaceholder')}
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 md:py-5 rounded-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg"
                >
                  {t('appointment.form.submit')}
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#111827"/>
        </svg>
      </div>
    </section>
  );
}