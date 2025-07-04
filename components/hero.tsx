'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { t, isLoaded } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants for performance
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6 + (i * 0.1),
        ease: "easeOut"
      }
    })
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1.2,
        ease: "easeOut"
      }
    }
  };

  // Show loading state until mounted and translations loaded
  if (!mounted || !isLoaded) {
    return (
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-offset bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="h-16 bg-gray-700/50 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-8 bg-gray-700/50 rounded-lg mb-8 max-w-2xl mx-auto animate-pulse"></div>
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-gray-700/50 rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-700/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-offset"
      suppressHydrationWarning
    >
      {/* Optimized static gradient background for fast LCP */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(15, 23, 42, 0.4) 0%, 
            rgba(30, 58, 138, 0.3) 35%, 
            rgba(67, 56, 202, 0.2) 100%
          )`
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Main H1 Title - Critical for LCP with Animation */}
          <motion.div 
            className="mb-8 relative"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <h1
              id="hero-title"
              className="hero-title text-white font-bold mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            />
          </motion.div>
          
          {/* H2 Subtitle with Animation */}
          <motion.div 
            className="mb-12"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl md:text-2xl text-white font-medium max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </h2>
          </motion.div>

          {/* Enhanced CTA Buttons with Staggered Animation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Button
                onClick={() => smoothScrollTo('contact')}
                size="lg"
                className="group relative bg-gradient-neon text-white px-8 py-4 text-lg font-semibold btn-accessible hover:scale-105 transition-transform duration-200"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Button
                onClick={() => smoothScrollTo('services')}
                size="lg"
                variant="outline"
                className="border-2 border-cyan-400 text-white bg-black/50 hover:bg-cyan-400/20 px-8 py-4 text-lg font-semibold btn-accessible hover:scale-105 transition-all duration-200"
              >
                {t('hero.cta2')}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator with Animation */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          onClick={() => smoothScrollTo('services')}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center bg-black/30 hover:border-white transition-colors duration-300 cursor-pointer btn-accessible"
          aria-label={t('hero.scrollIndicator')}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-1 h-3 bg-gradient-neon rounded-full mt-2 animate-pulse"></div>
        </motion.button>
      </motion.div>
    </section>
  );
}