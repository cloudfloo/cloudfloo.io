'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-offset"
      suppressHydrationWarning
    >
      {/* Light, modern background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, 
            rgba(249, 250, 251, 1) 0%, 
            rgba(243, 244, 246, 1) 35%, 
            rgba(239, 246, 255, 0.8) 100%
          )`
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Main H1 Title - Critical for LCP with CSS Animation */}
          <div className="mb-8 relative animate-hero-title">
            <h1
              id="hero-title"
              className="hero-title text-gray-900 font-bold mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            />
          </div>
          
          {/* H2 Subtitle with CSS Animation */}
          <div className="mb-12 animate-hero-subtitle">
            <h2 className="text-xl md:text-2xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </h2>
          </div>

          {/* Enhanced CTA Buttons with Staggered CSS Animations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => smoothScrollTo('services')}
              className="bg-gradient-primary hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden min-w-[200px] animate-hero-button-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.cta.primary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-blue-700/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            </Button>
            
              <Button
              variant="outline"
              size="lg"
                onClick={() => smoothScrollTo('contact')}
              className="border-primary text-primary hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group min-w-[200px] animate-hero-button-2"
              >
              <span className="flex items-center gap-2">
                {t('hero.cta.secondary')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
          </div>

          {/* Scroll Indicator with CSS Animation */}
          <div className="animate-hero-scroll">
            <button
                onClick={() => smoothScrollTo('services')}
              className="text-gray-400 hover:text-primary transition-colors duration-300 flex flex-col items-center gap-2 mx-auto group"
              aria-label="Scroll to services section"
            >
              <span className="text-sm font-medium">{t('hero.scroll')}</span>
              <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-primary rounded-full flex items-start justify-center p-2 transition-colors duration-300">
                <div className="w-1 h-3 bg-gray-400 group-hover:bg-primary rounded-full animate-scroll-bounce transition-colors duration-300"></div>
              </div>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}