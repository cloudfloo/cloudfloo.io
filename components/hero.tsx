'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Dynamically import the visualization component with SSR disabled
const ImmersiveCloudVisualization = dynamic(
  () => import('@/components/immersive-cloud-visualization'),
  { ssr: false, loading: () => null }
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { t, isLoaded } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (showVisualization) return;

    const load = () => setShowVisualization(true);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && entry.intersectionRect.height >= 300) {
        load();
      }
    });
    if (heroRef.current) observer.observe(heroRef.current);

    window.addEventListener('mousemove', load, { once: true });
    window.addEventListener('touchstart', load, { once: true });
    window.addEventListener('keydown', load, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', load);
      window.removeEventListener('touchstart', load);
      window.removeEventListener('keydown', load);
    };
  }, [showVisualization]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
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

  // Unified rendering for SSR and client
  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-offset"
      suppressHydrationWarning
    >
      {/* Immersive Cloud Visualization */}
      {mounted && showVisualization && <ImmersiveCloudVisualization />}
      
      {/* Enhanced overlay for better text readability */}
      <div className="absolute inset-0 z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 50%, 
                rgba(0, 0, 0, 0.4) 0%, 
                rgba(0, 0, 0, 0.6) 50%, 
                rgba(0, 0, 0, 0.8) 100%
              )
            `
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-20">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          
          {/* Main H1 Title */}
          <div className="mb-8 relative">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            />
          </div>
          
          {/* H2 Subtitle */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl text-white font-medium max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </h2>
          </motion.div>

          {/* Enhanced CTA Buttons - Accessible */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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

            <Button
              onClick={() => smoothScrollTo('services')}
              size="lg"
              variant="outline"
              className="border-2 border-cyan-400 text-white bg-black/50 hover:bg-cyan-400/20 px-8 py-4 text-lg font-semibold btn-accessible hover:scale-105 transition-all duration-200"
            >
              {t('hero.cta2')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator - Accessible */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button 
          onClick={() => smoothScrollTo('services')}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center bg-black/30 hover:border-white transition-colors duration-300 cursor-pointer btn-accessible"
          aria-label={t('hero.scrollIndicator')}
        >
          <div className="w-1 h-3 bg-gradient-neon rounded-full mt-2 animate-pulse"></div>
        </button>
      </div>
    </section>
  );
}