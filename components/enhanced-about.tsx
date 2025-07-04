'use client';

import { Users, Target, Award, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useCounterAnimation, useParallax } from '@/hooks/use-scroll-animation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Optimized animation variants - minimal framer-motion usage
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return { ref: setRef, isVisible };
};

export default function EnhancedAbout() {
  const [isClient, setIsClient] = useState(false);
  const { t, isLoaded } = useLanguage();
  
  const stats = [
    { number: 5, label: t('about.stats.projects'), icon: Rocket, suffix: '+' },
    { number: 99.99, label: t('about.stats.uptime'), icon: Award, suffix: '%' },
    { number: 3, label: t('about.stats.clients'), icon: Users, suffix: '+' },
    { number: 24, label: t('about.stats.support'), icon: Target, suffix: '/7' },
  ];

  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: statsRef, isVisible: statsVisible } = useIntersectionObserver();
  const { ref: missionRef, isVisible: missionVisible } = useIntersectionObserver();

  // Counter animations for stats - simplified
  const counter1 = useCounterAnimation(500, 2000);
  const counter2 = useCounterAnimation(99.99, 2000);
  const counter3 = useCounterAnimation(50, 2000);
  const counter4 = useCounterAnimation(24, 2000);

  const counters = [counter1, counter2, counter3, counter4];

  // Simplified floating elements - reduce complexity
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
    // Reduce number of floating elements for performance
    const elements = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden scroll-offset">
      {/* Simplified floating background elements with CSS animations */}
      <div className="absolute inset-0 pointer-events-none">
        {isClient && floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-neon/20 rounded-full animate-float-slow"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`
            }}
          />
        ))}
      </div>

      {/* Static parallax background - no motion */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(0,229,255,0.1) 0%, transparent 50%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section with CSS animations */}
        <div 
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 
            id="about-us"
            className="text-4xl md:text-5xl font-bold mb-6 text-white animate-slide-in"
            style={{ animationDelay: '0.1s' }}
            dangerouslySetInnerHTML={{ __html: t('about.title') }}
          />
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 animate-slide-in"
            style={{ animationDelay: '0.3s' }}
          >
            {t('about.subtitle')}
          </p>
        </div>

        {/* Stats Section with staggered CSS animations */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const counter = counters[index];
            
            return (
              <div 
                key={index} 
                className={`transform transition-all duration-700 ease-out ${
                  statsVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer card-3d">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-neon/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-neon/20 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-neon" />
                    </div>
                    
                    <div className="text-3xl font-bold text-neon mb-2 animate-counter">
                      {index === 1 ? counter.count.toFixed(2) : counter.count}{stat.suffix}
                    </div>
                    
                    <div className="text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Mission Statement with CSS animation */}
        <div 
          ref={missionRef}
          className={`text-center transform transition-all duration-1000 ease-out ${
            missionVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 max-w-4xl mx-auto overflow-hidden card-3d">
            <CardContent className="p-8">
              <h3 
                id="our-promise"
                className="text-2xl font-bold text-neon mb-4 animate-slide-in"
                style={{ animationDelay: '0.3s' }}
              >
                {t('about.promise.title')}
              </h3>
              <p 
                className="text-lg text-gray-300 leading-relaxed animate-slide-in"
                style={{ animationDelay: '0.5s' }}
              >
                {t('about.promise.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}