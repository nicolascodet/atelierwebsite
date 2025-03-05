'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  // Parallax effects for different elements
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const frameY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const taglineY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  
  const featureOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const featureY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Feature highlights for The Canvas
  const features = [
    {
      id: 'adaptive-display',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Museum-Grade Display',
      description: 'Anti-glare, high-contrast display that rivals traditional frames',
    },
    {
      id: 'smart-frame',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
      title: 'AI Art Generation',
      description: 'Create beautiful art with just a few words using our AI',
    },
    {
      id: 'customizable',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
        </svg>
      ),
      title: 'Seamless Integration',
      description: 'Blends perfectly with any interior design style',
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-white">
      {/* Background graphics - abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[35%] h-[45%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-[5%] right-[20%] w-[25%] h-[30%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Copy */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-tight">
                Art that evolves with you
              </h1>
            </motion.div>

            <motion.div
              style={{ y: taglineY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xl text-gray-600 leading-relaxed">
                The Canvas by Atelier Frames combines the elegance of traditional frames with cutting-edge display technology and AI art generation.
              </p>
            </motion.div>

            {/* Logo Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-50 rounded-full opacity-20"></div>
                <Image 
                  src="/images/logo.jpg" 
                  alt="Atelier Frames Logo" 
                  width={120} 
                  height={120} 
                  className="relative z-10"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a 
                  href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-apple inline-flex items-center"
                >
                  Back on Kickstarter
                </a>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#how-it-works" className="btn-secondary inline-flex items-center">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Feature highlights */}
            <motion.div 
              style={{ y: featureY, opacity: featureOpacity }}
              className="mt-12 space-y-4"
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Highlights</h3>
              <div className="space-y-4">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + features.indexOf(feature) * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-100 text-blue-600">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">{feature.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Product Image */}
          <motion.div 
            style={{ scale: frameScale, y: frameY, opacity: frameOpacity }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-video w-full mx-auto max-w-md md:max-w-lg lg:max-w-xl rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/m6GNAmyvLVc" 
                title="The Canvas by Atelier Frames" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
              
              {/* Decorative elements */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -right-10 top-1/4 w-24 h-24 bg-blue-50 rounded-full blur-xl z-0"
              />
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -left-8 -bottom-6 w-20 h-20 bg-blue-50 rounded-full blur-xl z-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <p className="text-sm font-medium text-gray-600 mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
