'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Integration from '../components/Integration';
import Pricing from '../components/Pricing';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import AIArtDemo from '../components/AIArtDemo';

export default function Home() {
  // Fix scroll issue - ensure page loads at top
  useEffect(() => {
    // Clear any hash from the URL to prevent automatic scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Additional approach to ensure scrolling to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section id="hero" className="pt-20">
        <Hero />
      </section>
      
      <section id="features" className="py-20">
        <Features />
      </section>
      
      <section id="ai-art-demo" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AIArtDemo />
        </div>
      </section>
      
      <section id="integration" className="py-32 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <Integration />
      </section>
      
      <section id="pricing" className="bg-gray-50 py-24">
        <Pricing />
      </section>
      
      <section id="newsletter" className="py-24">
        <Newsletter />
      </section>
      
      <Footer />
    </main>
  );
}
