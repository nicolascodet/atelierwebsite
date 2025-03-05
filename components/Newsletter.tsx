'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter signup
    // For now, we'll just simulate a successful submission
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section id="newsletter" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 md:p-16 shadow-sm border border-gray-100"
          >
            <div className="text-center mb-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-semibold mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Stay in the Loop
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Subscribe to our newsletter to receive updates on new features, AI-generated art styles, 
                and exclusive offers for Atelier Frames supporters.
              </motion.p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-50 border border-blue-100 text-blue-800 rounded-lg p-6 text-center max-w-md mx-auto"
              >
                <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>Your subscription has been confirmed. You'll be the first to know about new updates and features.</p>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-5 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-base shadow-sm"
                  >
                    Subscribe
                  </motion.button>
                </div>
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-sm text-gray-500">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                </div>
              </motion.form>
            )}

            <motion.div 
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                {
                  title: 'Product Updates',
                  description: 'Be the first to know about new features and improvements'
                },
                {
                  title: 'Exclusive Content',
                  description: 'Get access to curated art collections and digital assets'
                },
                {
                  title: 'Special Offers',
                  description: 'Receive early access and special discounts on products'
                }
              ].map((item, index) => (
                <div key={index} className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
