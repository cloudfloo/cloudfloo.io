'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoaded: boolean;
  getLanguageAwarePath: (path: string) => string;
  getHomeUrl: () => string;
}

// Enhanced default translations to prevent console warnings during loading
const defaultTranslations = {
  // Hero section
  'hero.title': 'Cloud-Native Software House from Poland',
  'hero.subtitle': 'We deliver scalable micro-services, DevOps and frontend excellence.',
  'hero.cta.primary': 'Start Your Partnership',
  'hero.cta.secondary': 'Explore Our Expertise',
  'hero.scroll': 'Scroll to next section',
  
  // Team member keys
  'team.member.viewFullProfile': 'View Full Profile',
  'team.member.viewProfile': 'View Profile',
  'team.member.expertise': 'Expertise',
  
  // Legal/Cookies section
  'legal.cookies.title': 'Cookie Policy',
  'legal.cookies.breadcrumb': 'Cookie Policy',
  'legal.cookies.subtitle': 'Learn about how we use cookies and similar technologies to improve your experience.',
  'legal.cookies.manageCookiePreferences': 'Manage Cookie Preferences',
  'legal.cookies.sections.whatAreCookies': 'What Are Cookies?',
  'legal.cookies.sections.howWeUse': 'How We Use Cookies',
  'legal.cookies.sections.typesOfCookies': 'Types of Cookies',
  'legal.cookies.sections.thirdParty': 'Third-Party Cookies',
  'legal.cookies.sections.managingCookies': 'Managing Cookies',
  'legal.cookies.sections.updates': 'Policy Updates',
  'legal.cookies.sections.contact': 'Contact Information',
  'legal.cookies.types.essential.title': 'Essential Cookies',
  'legal.cookies.types.analytics.title': 'Analytics Cookies',
  'legal.cookies.types.functional.title': 'Functional Cookies',
  'legal.cookies.types.marketing.title': 'Marketing Cookies',
  'legal.cookies.labels.required': 'Required',
  'legal.cookies.labels.optional': 'Optional',
  'legal.cookies.labels.examples': 'Examples',
  // Add default values for commonly used keys to prevent hydration errors
  navigation: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    team: 'Our Team',
    projects: 'Projects',
    contact: 'Contact',
    getStarted: 'Get Started',
    toggleMenu: 'Toggle menu',
    backToHome: 'Back to Home'
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
      submit: 'Send Message',
      success: 'Message sent successfully!'
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
    title: 'Our Services',
    subtitle: 'Comprehensive technology solutions',
    learnMore: 'Learn More',
    cloudSolutions: {
      title: 'Strategic Cloud Consulting',
      description: 'Expert guidance tailored to your business goals.',
      features: {
        aws: 'AWS Solutions',
        azure: 'Microsoft Azure', 
        gcp: 'Google Cloud Platform',
        architecture: 'Cloud Architecture'
      }
    },
    aiMl: {
      title: 'AI & Machine Learning',
      description: 'Intelligent automation and ML operations.',
      features: {
        models: 'Custom ML Models',
        automation: 'Intelligent Automation',
        analytics: 'Predictive Analytics',
        deployment: 'MLOps Pipeline'
      }
    },
    devops: {
      title: 'DevOps Excellence',
      description: 'Comprehensive DevOps practices that accelerate delivery.',
      features: {
        kubernetes: 'Kubernetes',
        cicd: 'CI/CD Pipelines',
        infrastructure: 'Infrastructure as Code',
        monitoring: 'Monitoring & Alerting'
      }
    },
    dataEngineering: {
      title: 'Data Engineering Solutions',
      description: 'Transform raw data into actionable insights.',
      features: {
        pipelines: 'Data Pipeline Design',
        analytics: 'Real-time Processing',
        streaming: 'Analytics Platforms',
        governance: 'Data Governance'
      }
    },
    appDevelopment: {
      title: 'Custom Application Development',
      description: 'Scalable, modern applications built with your specific requirements.'
    },
    edgeComputing: {
      title: 'Edge Computing',
      description: 'Ultra-fast, globally distributed solutions.'
    },
    techStack: {
      title: 'Technology Stack',
      subtitle: 'Modern technologies we specialize in',
      backend: 'Backend Technologies',
      frontend: 'Frontend Technologies',
      cloud: 'Cloud Platforms'
    }
  },
  team: {
    member: {
      viewFullProfile: 'View Full Profile',
      viewProfile: 'View Profile',
      expertise: 'Expertise'
    },
    members: {
      'michal-wiatr': {
        title: 'CEO & CTO',
        shortBio: 'Tech leader with extensive experience'
      },
      'sebastian-debicki': {
        title: 'Head of Frontend',
        shortBio: 'React specialist and performance expert'
      },
      'damian-ogrodnik': {
        title: 'Head of Backend',
        shortBio: 'Node.js engineer and architecture specialist'
      }
    }
  },
  footer: {
    selectLanguage: 'Select language'
  },
  languages: {
    en: 'English',
    pl: 'Polish'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Helper function to detect language from pathname
function detectLanguageFromPath(pathname: string | null): Language {
  if (!pathname) return 'pl'; // Default to Polish if pathname is null
  if (pathname.startsWith('/en')) {
    return 'en';
  }
  return 'pl'; // Default to Polish for root paths
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const pathname = usePathname();
  
  // Initialize with URL-based language for consistent SSR/CSR
  const [language, setLanguageState] = useState<Language>(() => {
    return detectLanguageFromPath(pathname);
  });
  
  const [translations, setTranslations] = useState<Record<string, any>>(defaultTranslations);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Set hydration flag after mount
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync language with URL pathname after hydration
  useEffect(() => {
    if (!isHydrated) return;
    
    const urlLanguage = detectLanguageFromPath(pathname);
    if (urlLanguage !== language) {
      setLanguageState(urlLanguage);
    }
  }, [pathname, language, isHydrated]);

  // Load translations after hydration
  useEffect(() => {
    if (!isHydrated) return;
    
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
  }, [language, isHydrated]);

  // Load saved language preference only after hydration and for non-English URLs
  useEffect(() => {
    if (!isHydrated || !pathname) return;
    
    try {
      const savedLanguage = localStorage.getItem('cloudfloo-language') as Language;
      // Only use saved preference if we're not on a language-specific URL
      const urlLanguage = detectLanguageFromPath(pathname);
      
      if (!pathname.startsWith('/en') && savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pl')) {
        setLanguageState(savedLanguage);
      } else if (!pathname.startsWith('/en') && !savedLanguage) {
        // Detect browser language only for root paths
        const browserLanguage = navigator.language.toLowerCase();
        if (browserLanguage.startsWith('pl')) {
          setLanguageState('pl');
        }
      }
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  }, [isHydrated, pathname]);

  const setLanguage = (lang: Language) => {
    if (!isHydrated) return;
    
    setLanguageState(lang);
    try {
      localStorage.setItem('cloudfloo-language', lang);
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
  };

  // Helper function to build language-aware URLs
  const getLanguageAwarePath = (path: string): string => {
    // Don't modify external URLs, mailto links, tel links, or hash links
    if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
      return path;
    }

    // If we're in English context, prefix with /en
    if (language === 'en') {
      // Don't double-prefix if already starts with /en
      if (path.startsWith('/en')) {
        return path;
      }
      return path === '/' ? '/en' : `/en${path}`;
    }

    // For Polish (default), remove /en prefix if present
    if (path.startsWith('/en')) {
      const withoutEn = path.substring(3);
      return withoutEn === '' ? '/' : withoutEn;
    }

    return path;
  };

  // Helper function to get the correct home URL
  const getHomeUrl = (): string => {
    return language === 'en' ? '/en' : '/';
  };

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Only show warnings when translations are loaded and hydrated
        if (isHydrated && isLoaded) console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation is not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isLoaded: isLoaded || !isHydrated, // Consider loaded during SSR
      getLanguageAwarePath, 
      getHomeUrl 
    }}>
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