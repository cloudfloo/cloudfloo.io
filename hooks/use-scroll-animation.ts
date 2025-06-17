'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -100px 0px',
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }, delay);

      return () => clearTimeout(timer);
    } else if (!inView && !triggerOnce) {
      setIsVisible(false);
    }
  }, [inView, hasAnimated, triggerOnce, delay]);

  return { ref, isVisible, inView };
}

export function useStaggeredAnimation(itemCount: number, staggerDelay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      const timers: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timer = setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, i * staggerDelay);
        
        timers.push(timer);
      }

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isVisible, itemCount, staggerDelay]);

  return { ref, visibleItems, isVisible };
}

export function useCounterAnimation(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * endValue);
        
        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isVisible, endValue, duration]);

  return { ref, count };
}

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref: elementRef, offset };
}