import { Metadata } from 'next';

export interface BilingualMetadata {
  pl: {
    title: string;
    description: string;
  };
  en: {
    title: string;
    description: string;
  };
  keywords?: string;
  canonicalUrl?: string;
}

export function generateMetadata(bilingualMeta: BilingualMetadata, preferLang: 'pl' | 'en' = 'pl'): Metadata {
  const meta = bilingualMeta[preferLang];
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: bilingualMeta.keywords,
    alternates: {
      canonical: bilingualMeta.canonicalUrl,
      languages: {
        'pl': bilingualMeta.canonicalUrl || 'https://cloudfloo.io',
        'en': `${bilingualMeta.canonicalUrl || 'https://cloudfloo.io'}/en`,
        'x-default': bilingualMeta.canonicalUrl || 'https://cloudfloo.io',
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: preferLang === 'pl' ? 'pl_PL' : 'en_US',
      alternateLocale: preferLang === 'pl' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    }
  };
}

// Detect user's preferred language from headers or localStorage
export function detectLanguage(acceptLanguage?: string): 'pl' | 'en' {
  if (typeof window !== 'undefined') {
    // Client-side detection
    const stored = localStorage.getItem('preferred-language');
    if (stored === 'en' || stored === 'pl') return stored;
    
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'pl' ? 'pl' : 'en';
  }
  
  // Server-side detection from Accept-Language header
  if (acceptLanguage) {
    return acceptLanguage.includes('pl') ? 'pl' : 'en';
  }
  
  return 'pl'; // Default to Polish
} 