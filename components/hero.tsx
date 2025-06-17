'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Dynamically import the visualization component with SSR disabled
const ImmersiveCloudVisualization = dynamic(
  () => import('@/components/immersive-cloud-visualization'),
  { ssr: false }
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Apply dynamic styles via refs after mounting
  useEffect(() => {
    if (!mounted) return;

    // Apply title transform
    if (titleRef.current) {
      titleRef.current.style.transform = `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`;
    }

    // Apply description transform
    if (descriptionRef.current) {
      descriptionRef.current.style.transform = `translateZ(${mousePosition.y * 20}px)`;
    }

    // Apply orb transforms
    if (orb1Ref.current) {
      orb1Ref.current.style.left = `${20 + mousePosition.x * 30}%`;
      orb1Ref.current.style.top = `${10 + mousePosition.y * 20}%`;
      orb1Ref.current.style.transform = `scale(${1 + mousePosition.y * 0.3})`;
    }

    if (orb2Ref.current) {
      orb2Ref.current.style.right = `${15 + mousePosition.x * 25}%`;
      orb2Ref.current.style.bottom = `${20 + mousePosition.y * 30}%`;
      orb2Ref.current.style.transform = `scale(${1.2 - mousePosition.x * 0.2})`;
    }
  }, [mounted, mousePosition]);

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
    >
      {/* Immersive Cloud Visualization */}
      <ImmersiveCloudVisualization />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-10">
        {/* Primary overlay - radial gradient from center */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%, 
                rgba(0, 0, 0, 0.3) 0%, 
                rgba(0, 0, 0, 0.5) 40%, 
                rgba(0, 0, 0, 0.7) 80%, 
                rgba(0, 0, 0, 0.8) 100%
              )
            `
          }}
        />
        
        {/* Secondary overlay - subtle vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                transparent 0%, 
                transparent 30%, 
                rgba(0, 0, 0, 0.2) 70%, 
                rgba(0, 0, 0, 0.4) 100%
              )
            `
          }}
        />

        {/* Text area specific overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 50%, 
                rgba(0, 0, 0, 0.4) 0%, 
                transparent 70%
              )
            `
          }}
        />
      </div>

      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 overflow-hidden z-15">
        {/* Dynamic Gradient Orbs */}
        <div 
          ref={orb1Ref}
          className="absolute w-[800px] h-[800px] opacity-10 blur-3xl rounded-full transition-all duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, rgba(255,0,224,0.1) 50%, transparent 70%)',
          }}
        ></div>
        
        <div 
          ref={orb2Ref}
          className="absolute w-[600px] h-[600px] opacity-8 blur-2xl rounded-full transition-all duration-500 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,224,0.15) 0%, rgba(0,229,255,0.08) 60%, transparent 80%)',
          }}
        ></div>

        {/* Particle System Simulation */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Chromatic Aberration Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/2 via-transparent to-pink-500/2 mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-20">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          
          {/* Enhanced Hero Title */}
          <div className="mb-8 relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight relative">
              <span 
                className="block text-white drop-shadow-2xl"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.9)',
                  filter: 'contrast(1.1)'
                }}
              >
                Your Trusted Partner in
              </span>
              <span 
                ref={titleRef}
                className="block text-transparent bg-clip-text bg-gradient-neon relative"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.6)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))',
                  transition: 'transform 0.3s ease-out',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
                }}
              >
                Cloud Excellence
              </span>
            </h1>
            
            {/* Enhanced Bloom Effect */}
            <div 
              className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black leading-tight opacity-15 blur-md pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #FF00E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <span className="block invisible">Your Trusted Partner in</span>
              <span className="block">Cloud Excellence</span>
            </div>
          </div>
          
          {/* Enhanced Description */}
          <motion.div 
            ref={descriptionRef}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p 
              className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed"
              style={{
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 1)',
                filter: 'contrast(1.1)',
                color: '#f8fafc' // Ensuring high contrast white
              }}
            >
              We transform businesses through strategic cloud partnerships, combining deep technical expertise with personalized guidance to accelerate your digital journey.
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button onClick={() => smoothScrollTo('contact')}>
              <Button 
                size="lg" 
                className="group relative bg-gradient-neon text-white px-8 py-4 text-lg overflow-hidden transform transition-all duration-300 hover:scale-105 font-semibold"
                style={{
                  boxShadow: '0 0 30px rgba(0,229,255,0.4), 0 0 60px rgba(255,0,224,0.3), 0 4px 20px rgba(0, 0, 0, 0.6)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                }}
              >
                <span className="relative z-10 flex items-center">
                  Start Your Partnership
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </button>
            
            <button onClick={() => smoothScrollTo('services')}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-cyan-400 text-white px-8 py-4 text-lg backdrop-blur-sm bg-black/30 hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-105 font-semibold"
                style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  borderColor: '#22d3ee'
                }}
              >
                Explore Our Expertise
              </Button>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button 
          onClick={() => smoothScrollTo('services')}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center backdrop-blur-sm hover:border-white transition-colors duration-300 cursor-pointer"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
          }}
          aria-label="Scroll to next section"
        >
          <div className="w-1 h-3 bg-gradient-neon rounded-full mt-2 animate-pulse"></div>
        </button>
      </div>
    </section>
  );
}