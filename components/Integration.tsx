'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const scenes = [
  {
    id: 'living-room',
    title: 'Living Room',
    description: 'The Canvas adjusts to match your living room\'s aesthetic.',
    imagePath: '/images/livingroom.JPG',
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    }
  },
  {
    id: 'home-office',
    title: 'Home Office',
    description: 'A beautiful complement to your workspace, providing inspiration throughout your day.',
    imagePath: '/images/homeoffice.JPG',
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    }
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'Subtle, ever-changing art creates a calming atmosphere for your most personal space.',
    imagePath: '/images/bedroom.JPG',
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    }
  },
  {
    id: 'gallery-wall',
    title: 'Gallery Wall',
    description: 'Mix The Canvas with your traditional art pieces for a dynamic gallery wall.',
    imagePath: '/images/gallery.JPG',
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    }
  }
];

const Integration = () => {
  const [activeScene, setActiveScene] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveScene((prev) => (prev + 1) % scenes.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, autoplay]);

  const handleSceneClick = (index: number) => {
    setActiveScene(index);
    setAutoplay(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <motion.h2
          className="text-3xl sm:text-4xl font-display font-semibold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          The Canvas in Every Space
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our frame seamlessly integrates into any environment, enhancing your space with stunning AI-generated artwork.
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-10">
        <motion.div
          className="w-full lg:w-2/3 order-2 lg:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {scenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeScene === index ? 1 : 0,
                  zIndex: activeScene === index ? 10 : 0,
                }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={scene.imagePath}
                  alt={scene.title}
                  width={1200}
                  height={900}
                  className="object-cover w-full h-full"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="w-full lg:w-1/3 order-1 lg:order-2">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {scenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                  activeScene === index 
                    ? 'bg-white shadow-xl' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSceneClick(index)}
              >
                <h3 className="text-xl font-semibold mb-2">{scene.title}</h3>
                <p className="text-gray-600">{scene.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
