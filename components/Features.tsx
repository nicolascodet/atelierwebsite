'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Features data
const features = [
  {
    id: 1,
    title: "AI-Generated Art",
    description: "Create unique artwork with our advanced AI system trained on millions of images",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  },
  {
    id: 2,
    title: "Unlimited Styles",
    description: "Choose from dozens of artistic styles or create your own custom look",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5"></path></svg>,
  },
  {
    id: 3,
    title: "Instant Generation",
    description: "Generate new artwork in seconds and see it instantly on your frame",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg>,
  },
  {
    id: 4,
    title: "Regular Updates",
    description: "New styles and features added regularly through automatic updates",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  },
  {
    id: 5,
    title: "Mobile Control",
    description: "Control your frame from anywhere using our intuitive mobile app",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"></path><path d="M9 5v2m3-2v2"></path></svg>,
  },
  {
    id: 6,
    title: "Energy Efficient",
    description: "Advanced display technology that conserves energy when not being viewed",
    icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
  },
];

// Art styles
const artStyles = [
  { name: "Impressionist", color: "bg-blue-400" },
  { name: "Minimalist", color: "bg-gray-700" },
  { name: "Abstract", color: "bg-red-500" },
  { name: "Watercolor", color: "bg-green-400" },
  { name: "Cubism", color: "bg-yellow-500" },
  { name: "Pop Art", color: "bg-purple-500" },
  { name: "Surrealism", color: "bg-pink-500" },
  { name: "Digital", color: "bg-indigo-500" },
  { name: "Pixel Art", color: "bg-teal-500" },
  { name: "Photorealism", color: "bg-orange-500" },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="px-5 pt-16 pb-8 md:pt-24 md:pb-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-4 md:mb-5">
              Limitless Creative Possibilities
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              The Canvas transforms your space with stunning AI-generated artwork that evolves with your taste and mood.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Cards Section */}
      <div className="px-5 pb-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.id * 0.05 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 px-5 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4">
              Simple, Intuitive Process
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Creating your own artwork has never been easier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                {[
                  {step: 1, title: "Enter your prompt", desc: "Describe what you want to see in natural language"},
                  {step: 2, title: "Select your style", desc: "Choose from our curated collection of artistic styles"},
                  {step: 3, title: "Generate your artwork", desc: "Our AI creates your unique artwork in seconds"},
                  {step: 4, title: "Display instantly", desc: "Your creation appears on your frame immediately"}
                ].map((item) => (
                  <motion.div 
                    key={item.step}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: item.step * 0.1 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <span className="font-medium text-blue-600">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              ref={ref}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <h4 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Museum-Grade Display</h4>
                <p className="text-xs md:text-sm opacity-90 line-clamp-2">
                  Ultra-thin profile with anti-glare coating and ambient light sensing
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Style Library Section */}
      <div className="px-5 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-4">
              Curated Style Library
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Explore our handpicked collection of artistic styles
            </p>
          </motion.div>
          
          {/* Style Gallery */}
          <div className="overflow-hidden">
            <div className="overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
              <div className="flex space-x-4 w-max md:w-full md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-4">
                {artStyles.map((style, index) => (
                  <motion.div
                    key={style.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="aspect-square relative rounded-xl overflow-hidden cursor-pointer min-w-[160px] md:min-w-0 flex-shrink-0"
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className={`absolute inset-0 ${style.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <h4 className="text-white font-medium text-center">{style.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 px-5 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">Ready to Transform Your Space?</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Experience the future of digital art with The Canvas by Atelier Frames
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
