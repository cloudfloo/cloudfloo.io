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
  const baseUrl = 'https://cloudfloo.io';
  
  return {
    metadataBase: new URL(baseUrl),
    title: meta.title,
    description: meta.description,
    keywords: bilingualMeta.keywords,
    alternates: {
      canonical: bilingualMeta.canonicalUrl || baseUrl,
      languages: {
        'pl': bilingualMeta.canonicalUrl || baseUrl,
        'en': `${bilingualMeta.canonicalUrl || baseUrl}/en`,
        'x-default': bilingualMeta.canonicalUrl || baseUrl,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: bilingualMeta.canonicalUrl || baseUrl,
      siteName: 'CloudFloo',
      locale: preferLang === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-cover.jpg',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-cover.jpg'],
    },
  };
}

/**
 * Generate metadata with canonical URL and hreflang for a specific page
 * Updated to handle the URL structure: Polish at root, English at /en prefix
 */
export function generatePageMetadata(
  path: string,
  title: string,
  description: string,
  hasEnTranslation = true
): Metadata {
  const baseUrl = 'https://cloudfloo.io';
  
  // Determine if this is an English page
  const isEnglishPage = path.startsWith('/en');
  const basePath = isEnglishPage ? path.substring(3) : path; // Remove /en prefix if present
  
  // Set canonical URLs properly
  const polishUrl = `${baseUrl}${basePath}`;
  const englishUrl = `${baseUrl}/en${basePath}`;
  const canonicalUrl = isEnglishPage ? englishUrl : polishUrl;
  
  const alternateLanguages: Record<string, string> = {
    'pl': polishUrl,
    'x-default': polishUrl, // Default to Polish
  };
  
  if (hasEnTranslation) {
    alternateLanguages['en'] = englishUrl;
  }
  
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'CloudFloo',
      locale: isEnglishPage ? 'en_US' : 'pl_PL',
      type: 'website',
      images: [
        {
          url: '/og-cover.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-cover.jpg'],
    },
  };
}

// Detect language from request (for future use)
export function detectLanguage(acceptLanguage?: string): 'pl' | 'en' {
  if (!acceptLanguage) return 'pl';
  return acceptLanguage.includes('en') && !acceptLanguage.includes('pl') ? 'en' : 'pl';
}

/**
 * Detect language from pathname
 */
export function detectLanguageFromPath(pathname: string): 'pl' | 'en' {
  return pathname.startsWith('/en') ? 'en' : 'pl';
} 