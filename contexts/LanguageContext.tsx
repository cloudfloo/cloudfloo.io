'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoaded: boolean;
}

// Default translations to prevent hydration mismatches
const defaultTranslations = {
  // Add default values for commonly used keys to prevent hydration errors
  navigation: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    team: 'Our Team',
    projects: 'Projects',
    contact: 'Contact',
    getStarted: 'Get Started',
    toggleMenu: 'Toggle menu'
  },
  hero: {
    title: 'Cloud-Native Software House from Poland',
    subtitle: 'We deliver scalable micro-services, DevOps and frontend excellence.',
    cta1: 'Start Your Partnership',
    cta2: 'Explore Our Expertise',
    scrollIndicator: 'Scroll to next section'
  },
  about: {
    title: 'Why Partner with CloudFloo',
    subtitle: "We're more than a service provider—we're your strategic technology partner.",
    stats: {
      projects: 'Projects Delivered',
      uptime: 'Uptime Guarantee',
      clients: 'Enterprise Clients',
      support: 'Support Available'
    },
    promise: {
      title: 'Our Partnership Promise',
      description: 'We believe every business deserves a trusted technology partner.'
    }
  },
  projects: {
    title: 'Featured Project',
    subtitle: 'Enterprise-grade solution showcasing advanced software engineering principles',
    viewDetails: 'View Full Project Details',
    viewSource: 'View Source Code',
    clickDetails: 'Click anywhere to view full details'
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Ready to transform your business? Let\'s discuss your project and explore the possibilities.',
    form: {
      title: 'Send us a message',
      nameRequired: 'Name *',
      namePlaceholder: 'Your name',
      emailRequired: 'Email *',
      emailPlaceholder: 'your@email.com',
      company: 'Company',
      companyPlaceholder: 'Your company',
      messageRequired: 'Message *',
      messagePlaceholder: 'Tell us about your project...',
      submit: 'Send Message'
    },
    info: {
      title: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      office: 'Office',
      liveChat: 'Live Chat',
      available247: 'Available 24/7',
      mapComing: 'Interactive map coming soon',
      location: 'Krakow, Poland'
    }
  },
  services: {
    cloudSolutions: {
      title: 'Strategic Cloud Consulting',
      description: 'Expert guidance tailored to your business goals.'
    },
    aiAutomation: {
      title: 'Intelligent Automation',
      description: 'AI-powered solutions that streamline operations.'
    },
    devops: {
      title: 'DevOps Excellence',
      description: 'Comprehensive DevOps practices that accelerate delivery.'
    },
    dataEngineering: {
      title: 'Data Engineering Solutions',
      description: 'Transform raw data into actionable insights.'
    },
    appDevelopment: {
      title: 'Custom Application Development',
      description: 'Scalable, modern applications built with your specific requirements.'
    },
    edgeComputing: {
      title: 'Edge Computing',
      description: 'Ultra-fast, globally distributed solutions.'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, any>>(defaultTranslations);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on mount to detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load translations
  useEffect(() => {
    if (!isClient) return;
    
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/translations/${language}.json`);
        const data = await response.json();
        setTranslations({ ...defaultTranslations, ...data });
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English if loading fails
        if (language !== 'en') {
          try {
            const fallbackResponse = await fetch('/translations/en.json');
            const fallbackData = await fallbackResponse.json();
            setTranslations({ ...defaultTranslations, ...fallbackData });
            setIsLoaded(true);
          } catch (fallbackError) {
            console.error('Failed to load fallback translations:', fallbackError);
            // Still use default translations
            setIsLoaded(true);
          }
        } else {
          // Use default translations
          setIsLoaded(true);
        }
      }
    };

    loadTranslations();
  }, [language, isClient]);

  // Load saved language preference on mount
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const savedLanguage = localStorage.getItem('cloudfloo-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pl')) {
        setLanguageState(savedLanguage);
      } else {
        // Detect browser language
        const browserLanguage = navigator.language.toLowerCase();
        if (browserLanguage.startsWith('pl')) {
          setLanguageState('pl');
        }
      }
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, [isClient]);

  const setLanguage = (lang: Language) => {
    if (!isClient) return;
    
    setLanguageState(lang);
    try {
      localStorage.setItem('cloudfloo-language', lang);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  };

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        if (isClient) console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation is not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}