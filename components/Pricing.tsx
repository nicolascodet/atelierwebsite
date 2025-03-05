'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-semibold mb-4">
            Reserve Your Canvas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            The Canvas (32" with premium walnut frame) is now available for pre-order through our Kickstarter campaign. Back our project today to be among the first to experience this revolutionary art display.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#product-specifications"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white border-blue-200 hover:bg-blue-50 shadow-sm"
            >
              Learn More
            </motion.a>
          </div>
          
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="overflow-hidden rounded-2xl shadow-xl max-w-3xl border border-gray-100"
            >
              <a 
                href="https://www.kickstarter.com/projects/nicolascodet/the-canvas-by-atelier-frames" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video bg-gray-100">
                  {/* Placeholder for Kickstarter image */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                    <svg width="120" height="120" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                      <path d="M33.0755 19C36.4671 19 39.4755 21.9037 39.4755 25.625C39.4755 29.5875 35.9005 32.2812 32.4032 35.2162C31.1532 36.2275 29.9594 37.1825 28.8869 38.0812C28.4983 38.4112 27.9785 38.4112 27.5961 38.0812C26.5236 37.1825 25.3297 36.2275 24.0797 35.2162C20.5824 32.2812 17.0074 29.5875 17.0074 25.625C17.0074 21.9037 20.0158 19 23.4074 19C25.2571 19 26.7971 19.8062 27.718 20.8462C27.8758 21.0225 28.1268 21.0225 28.2846 20.8462C29.2058 19.8062 30.7458 19 33.0755 19Z" fill="currentColor"/>
                      <path d="M28 5C15.2975 5 5 15.2975 5 28C5 40.7025 15.2975 51 28 51C40.7025 51 51 40.7025 51 28C51 15.2975 40.7025 5 28 5ZM28 9.25C38.355 9.25 46.75 17.645 46.75 28C46.75 38.355 38.355 46.75 28 46.75C17.645 46.75 9.25 38.355 9.25 28C9.25 17.645 17.645 9.25 28 9.25Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-8 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-semibold block">Back Our Project on Kickstarter</span>
                    <span className="text-blue-100 text-sm">Early Bird Pricing Available Now</span>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    whileTap={{ x: -2 }}
                    className="flex items-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </motion.div>
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            id="product-specifications"
          >
            <h3 className="text-2xl font-semibold mb-6">Product Specifications</h3>
            <ul className="space-y-5">
              {[
                { label: 'Size', value: '32 inches diagonal display' },
                { label: 'Frame', value: 'Premium walnut wood, handcrafted' },
                { label: 'Display', value: 'Anti-glare high-resolution screen with ambient light sensor' },
                { label: 'Connectivity', value: 'Wi-Fi 6 & Bluetooth 5.0' },
                { label: 'App Control', value: 'iOS & Android compatible' },
                { label: 'Power', value: 'Standard wall outlet, energy efficient' },
                { label: 'AI Features', value: 'Dynamic art generation and style adaptation' }
              ].map((spec, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <div>
                    <span className="font-medium">{spec.label}: </span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h4 className="text-xl font-semibold mb-2">Limited Time Offer</h4>
              <p className="text-gray-600 mb-5">Early supporters receive exclusive benefits:</p>
              
              <div className="space-y-4">
                {[
                  { title: 'Early Bird Discount', desc: 'Save up to 40% off future retail price' },
                  { title: 'One Year of Premium Access', desc: 'Includes exclusive artwork collections' },
                  { title: 'Lifetime Software Updates', desc: 'Stay current with all new features' }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{benefit.title}</h5>
                      <p className="text-sm text-gray-500">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h4 className="text-xl font-semibold mb-3">Watch Our Demo</h4>
              <p className="text-gray-600 mb-4">See The Canvas in action with our product demonstration</p>
              
              <motion.a 
                href="https://www.youtube.com/watch?v=YsnrgDo_wUY&t=1s" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Video
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
