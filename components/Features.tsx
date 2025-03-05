'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    id: 'ai-creation',
    title: 'The Frame That Creates',
    description:
      'Unlike traditional digital frames that simply display static images, The Canvas lets you create custom artwork in real-time using our elegantly simple interface, generating art that perfectly matches your space and style.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
  {
    id: 'display-quality',
    title: 'Museum-Grade Display',
    description:
      'Our museum-grade display features anti-glare coating, ensuring your art looks sophisticated from every angle and is virtually indistinguishable from traditional framed art.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    ),
  },
  {
    id: 'ios-app',
    title: 'Intuitive iOS App',
    description:
      'Our iOS app transforms how you interact with your Canvas. Simply enter your creative vision, choose from curated artistic styles, and watch as your concept transforms into stunning artwork in moments.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
  },
];

const artStyles = [
  { name: 'Black & White Photography', color: 'bg-gray-900' },
  { name: 'Classical Baroque', color: 'bg-amber-700' },
  { name: 'Art Nouveau', color: 'bg-emerald-700' },
  { name: 'Contemporary Watercolor', color: 'bg-blue-600' },
  { name: 'Classical Oil Painting', color: 'bg-red-700' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-6 tracking-tight">
            Art That Evolves With You
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Art has always evolved—now it can evolve with you. The Canvas by Atelier Frames brings endless 
            creative possibilities to your space with built-in styles and the ability to create your own art, 
            right from the frame. No rules, no limits—just infinite ways to make your walls come alive.
          </p>
        </motion.div>

        {/* Main features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-x-8 gap-y-12 mb-24"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={item}
              className="flex flex-col items-start"
            >
              <div className="text-blue-600 mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Creation process section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-5 tracking-tight">How It Works</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Enter your prompt</h4>
                  <p className="text-gray-600">Describe what you want to see through our simple app</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Select your style</h4>
                  <p className="text-gray-600">Choose from our curated collection of artistic styles</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Generate your artwork</h4>
                  <p className="text-gray-600">Watch as AI generates your unique artwork in moments</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="font-medium text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Display instantly</h4>
                  <p className="text-gray-600">See your creation appear on your frame immediately</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div
            ref={ref}
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/test.jpg"
              alt="Museum-grade display technology"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h4 className="text-xl font-semibold mb-2">Museum-Grade Technology</h4>
              <p className="text-sm opacity-90">
                Ultra-thin profile with anti-glare coating and ambient light sensing for the perfect viewing experience
              </p>
            </div>
          </motion.div>
        </div>

        {/* Style library section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-6 tracking-tight">Our Style Library</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            We've handpicked and refined a sophisticated collection of artistic styles to ensure 
            every creation meets museum-grade standards.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {artStyles.map((style, index) => (
              <motion.div
                key={style.name}
                className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 ${style.color} opacity-90`}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h4 className="text-white font-medium text-center px-2">{style.name}</h4>
                </div>
              </motion.div>
            ))}
  
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
