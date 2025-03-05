'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// This component creates an enhanced parallax effect for the hero section
const ParallaxFrame = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Transform values for different parallax elements
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const frameScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);
  const frameRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -5, 5, 0]);
  
  // Creative overlay effects
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.7, 0, 0.5, 0.8, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.7, 0.8], [0, 0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4, 0.8], ['50px', '0px', '-50px']);
  
  // Floating elements
  const floatY1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const floatY2 = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  const floatX1 = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '10%', '0%']);
  const floatX2 = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-10%', '0%']);

  // Glow effect
  const glowScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.2, 1.1, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.3, 0.7, 0.5, 0.2]);

  return (
    <div ref={ref} className="h-[200vh] sm:h-[250vh] md:h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">
          {/* Background glow effect */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
          >
            <div className="w-[80%] sm:w-[90%] h-[80%] sm:h-[90%] rounded-full bg-blue-100 filter blur-3xl opacity-30"></div>
          </motion.div>

          {/* Main frame with enhanced effects */}
          <motion.div
            style={{
              y: frameY,
              rotate: frameRotate,
              scale: frameScale,
              opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0]),
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[90%] sm:w-[85%] md:w-[80%] aspect-[4/3] bg-white rounded-xl shadow-2xl relative overflow-hidden">
              {/* Animated border */}
              <motion.div 
                className="absolute inset-0 z-0 border-2 rounded-xl"
                animate={{
                  borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.3)'],
                  boxShadow: [
                    '0 0 15px rgba(59, 130, 246, 0.3)',
                    '0 0 15px rgba(139, 92, 246, 0.3)',
                    '0 0 15px rgba(236, 72, 153, 0.3)'
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              
              {/* The image with subtle zoom effect */}
              <div className="absolute inset-2 sm:inset-4 rounded-lg flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Image
                    src="/images/cover.png"
                    alt="Atelier Frame on white background"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.div>
                
                {/* Color overlay effect that changes with scroll */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 mix-blend-overlay"
                  style={{ opacity: overlayOpacity }}
                />
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -right-16 top-1/4 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-70 z-10"
              style={{
                y: floatY1,
                x: floatX1,
              }}
            />
            <motion.div
              className="absolute -left-12 bottom-1/4 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-70 z-10"
              style={{
                y: floatY2,
                x: floatX2,
              }}
            />
          </motion.div>

          {/* Animated text that appears while scrolling */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            <div className="text-center max-w-lg px-4">
              <motion.h2 
                className="text-3xl font-display font-bold mb-4 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                AI-Generated Art
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Our frame learns your preferences and generates unique artwork that evolves over time
              </motion.p>
            </div>
          </motion.div>

          {/* Feature highlights that appear as you scroll */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 0]),
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-6 max-w-2xl px-4">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-2">Anti-Glare Surface</h3>
                <p className="text-gray-600 text-sm">
                  Our proprietary anti-glare coating ensures perfect visibility from any angle.
                </p>
              </motion.div>
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-2">Premium Materials</h3>
                <p className="text-gray-600 text-sm">
                  Crafted from sustainable materials with precision engineering.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Final view with call to action */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]),
              scale: useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1]),
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold mb-6">Ready to Transform Your Space?</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium shadow-lg"
              >
                Pre-order Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxFrame;
