'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animate?: boolean;
}

export function Logo({ size = 'medium', className = '', animate = true }: LogoProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  const sizeClasses = {
    small: 'h-10',
    medium: 'h-14',
    large: 'h-20'
  };

  const containerClasses = {
    small: 'h-10 w-[120px]',
    medium: 'h-14 w-[168px]',
    large: 'h-20 w-[240px]'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left - width / 2) / width;
    const y = (e.clientY - rect.top - height / 2) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const segments = 20;
  const particles = 30;
  const logoImage = '/images/lobaratoriya/shifokor-logo.jpg.png';

  return (
    <motion.div
      className={`inline-block relative ${containerClasses[size]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <Link href={`/${locale}`} className="block">
        {/* Ambient light background layers */}
        {animate && (
          <>
            {/* Layer 1 - Outer glow pulse */}
            <motion.div
              className="absolute -inset-6 rounded-3xl opacity-0"
              style={{
                background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, rgba(16, 185, 129, 0.3) 40%, transparent 70%)',
                filter: 'blur(20px)'
              }}
              animate={{
                opacity: [0, 0.6, 0.3, 0.7, 0.4],
                scale: [0.9, 1.1, 1, 1.15, 1.05]
              }}
              transition={{
                duration: 3,
                delay: 0.5,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: "easeInOut"
              }}
            />
            
            {/* Layer 2 - Middle glow with rotation */}
            <motion.div
              className="absolute -inset-4 rounded-3xl opacity-0"
              style={{
                background: 'conic-gradient(from 0deg, rgba(20, 184, 166, 0.5), rgba(6, 182, 212, 0.5), rgba(16, 185, 129, 0.5), rgba(20, 184, 166, 0.5))',
                filter: 'blur(15px)'
              }}
              animate={{
                opacity: [0, 0.8, 0.8],
                rotate: [0, 180, 360]
              }}
              transition={{
                opacity: { duration: 1, delay: 0.8 },
                rotate: { duration: 8, delay: 1, repeat: Infinity, ease: "linear" }
              }}
            />

            {/* Layer 3 - Inner sharp glow */}
            <motion.div
              className="absolute -inset-2 rounded-2xl opacity-0"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.6), rgba(16, 185, 129, 0.6), rgba(6, 182, 212, 0.6))',
                filter: 'blur(8px)'
              }}
              animate={{
                opacity: [0, 1, 0.7]
              }}
              transition={{
                duration: 1.2,
                delay: 1
              }}
            />
          </>
        )}

        {/* Orbiting rings */}
        {animate && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-teal-400/30 rounded-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-emerald-400/20 rounded-2xl"
              animate={{
                rotate: [360, 0],
                scale: [1, 0.95, 1]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
            />
          </>
        )}

        {/* 3D Container for logo */}
        <motion.div
          className="relative z-10"
          style={{
            rotateX: animate ? rotateX : 0,
            rotateY: animate ? rotateY : 0,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Multiple depth layers for 3D effect */}
          {animate && [0, 1, 2, 3].map((depth) => (
            <motion.div
              key={depth}
              className="absolute inset-0 rounded-lg"
              style={{
                translateZ: -depth * 5,
                opacity: 0.1 - depth * 0.02
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + depth * 0.1, duration: 0.8 }}
            >
              <img
                src={logoImage}
                alt=""
                className={`${sizeClasses[size]} w-auto object-contain blur-sm`}
                draggable={false}
              />
            </motion.div>
          ))}

          {/* Main logo with complex reveal */}
          <div className="relative overflow-hidden rounded-lg" style={{ transformStyle: 'preserve-3d' }}>
            {animate ? (
              <>
                {/* Diagonal wave reveal */}
                {Array.from({ length: segments }).map((_, index) => {
                  const delay = 0.4 + (index * 0.04);
                  
                  return (
                    <motion.div
                      key={`segment-${index}`}
                      className="absolute inset-0"
                      style={{
                        clipPath: `polygon(${index * (100/segments)}% 0%, ${(index + 1) * (100/segments)}% 0%, ${(index + 1) * (100/segments)}% 100%, ${index * (100/segments)}% 100%)`
                      }}
                    >
                      <motion.img
                        src={logoImage}
                        alt={index === Math.floor(segments / 2) ? t('logoImage.alt') : ""}
                        className={`${sizeClasses[size]} w-auto object-contain drop-shadow-2xl`}
                        draggable={false}
                        initial={{
                          opacity: 0,
                          y: 50 + (index % 3) * 20,
                          rotateX: -90,
                          scale: 0.5,
                          filter: 'blur(10px)'
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          scale: 1,
                          filter: 'blur(0px)'
                        }}
                        transition={{
                          duration: 0.8,
                          delay: delay,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Placeholder for consistent sizing */}
                <img
                  src={logoImage}
                  alt=""
                  className={`${sizeClasses[size]} w-auto object-contain invisible`}
                  draggable={false}
                  aria-hidden="true"
                />
              </>
            ) : (
              <img
                src={logoImage}
                alt={t('logoImage.alt')}
                className={`${sizeClasses[size]} w-auto object-contain drop-shadow-2xl`}
                draggable={false}
              />
            )}
          </div>

          {/* Light rays emanating from logo */}
          {animate && (
            <div className="absolute inset-0 pointer-events-none">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.div
                  key={`ray-${angle}`}
                  className="absolute top-1/2 left-1/2 w-1 origin-left"
                  style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.8), transparent)',
                    rotate: angle,
                    transformOrigin: 'left center'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 20, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5 + (angle / 360),
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Premium shimmer sweeps */}
          {animate && (
            <>
              {/* First sweep - diagonal */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
                  style={{
                    background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%)',
                    filter: 'blur(10px)'
                  }}
                  initial={{ x: '-100%', y: '-100%' }}
                  animate={{ x: '100%', y: '100%' }}
                  transition={{
                    duration: 1.5,
                    delay: 1.3,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
              </motion.div>

              {/* Second sweep - horizontal with color */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                <motion.div
                  className="absolute inset-y-0 w-20 h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.6), rgba(255, 255, 255, 0.9), rgba(6, 182, 212, 0.6), transparent)',
                    filter: 'blur(8px)',
                    boxShadow: '0 0 30px rgba(20, 184, 166, 0.5)'
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 1.2,
                    delay: 2.3,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Third sweep - reverse with ripple */}
              <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
              >
                <motion.div
                  className="absolute inset-y-0 w-32 h-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.8) 0%, rgba(20, 184, 166, 0.4) 30%, transparent 70%)',
                    filter: 'blur(15px)'
                  }}
                  initial={{ x: '200%' }}
                  animate={{ x: '-100%' }}
                  transition={{
                    duration: 1.8,
                    delay: 3.3,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
              </motion.div>
            </>
          )}

          {/* Advanced particle system */}
          {animate && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: particles }).map((_, i) => {
                const angle = (i / particles) * 360;
                const distance = 30 + (i % 3) * 20;
                const duration = 2 + (i % 5) * 0.3;
                const delay = 1.8 + (i * 0.03);
                
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
                    style={{
                      background: i % 3 === 0 
                        ? 'rgba(20, 184, 166, 0.8)' 
                        : i % 3 === 1 
                        ? 'rgba(16, 185, 129, 0.8)' 
                        : 'rgba(6, 182, 212, 0.8)',
                      boxShadow: `0 0 ${4 + (i % 3) * 2}px currentColor`
                    }}
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 0, 
                      scale: 0 
                    }}
                    animate={{
                      x: Math.cos(angle * Math.PI / 180) * distance,
                      y: Math.sin(angle * Math.PI / 180) * distance,
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1.5, 1, 0]
                    }}
                    transition={{
                      duration: duration,
                      delay: delay,
                      ease: "easeOut"
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Energy waves */}
          {animate && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute inset-0 border-2 rounded-lg"
                  style={{
                    borderColor: i === 0 ? 'rgba(20, 184, 166, 0.6)' : i === 1 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(6, 182, 212, 0.3)'
                  }}
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: 2 + (i * 0.3),
                    ease: "easeOut"
                  }}
                />
              ))}
            </>
          )}

          {/* Hover magnetic effect particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * 360;
                return (
                  <motion.div
                    key={`hover-particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-teal-400"
                    style={{
                      boxShadow: '0 0 10px rgba(20, 184, 166, 0.8)'
                    }}
                    animate={{
                      x: [0, Math.cos(angle * Math.PI / 180) * 15, 0],
                      y: [0, Math.sin(angle * Math.PI / 180) * 15, 0],
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
