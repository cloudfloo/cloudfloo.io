// Google Analytics utilities with Consent Mode v2 support
// Analytics functionality respects user consent preferences

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-D5F48XPHZJ';

// Check if analytics consent has been granted
export const hasAnalyticsConsent = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    const parsedConsent = JSON.parse(consent);
    return parsedConsent.analytics === true;
  } catch {
    return false;
  }
};

// Check if analytics is enabled and consent granted
export const isAnalyticsEnabled = () => {
  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function' &&
         hasAnalyticsConsent() &&
         (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' ||
          process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || 
          process.env.NODE_ENV === 'production' ||
          window.location.hostname !== 'localhost');
};

// Track page views - respects consent mode
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Page view will be automatically handled by Google Analytics
    // with respect to consent mode settings
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      anonymize_ip: true,
    });
    
    if (hasAnalyticsConsent()) {
      console.log('Page view tracked with consent:', url);
    } else {
      console.log('Page view tracked without personal data (consent mode):', url);
    }
  }
};

// Track custom events - respects consent mode  
export const trackEvent = (
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventData: any = {
      event_category: category,
      anonymize_ip: true,
    };
    
    if (label) eventData.event_label = label;
    if (value !== undefined) eventData.value = value;
    if (customParameters) Object.assign(eventData, customParameters);
    
    // Event will be sent according to consent mode settings
    window.gtag('event', action, eventData);
    
    if (hasAnalyticsConsent()) {
      console.log('Event tracked with consent:', { action, category, label, value });
    } else {
      console.log('Event tracked without personal data (consent mode):', { action, category });
    }
  }
};

// Track conversions - requires consent for full functionality
export const trackConversion = (
  conversionAction: string,
  conversionValue?: number,
  currency: string = 'EUR'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const conversionData: any = {
      value: conversionValue,
      currency: currency,
      anonymize_ip: true,
    };
    
    // Enhanced conversions work only with analytics consent
    if (hasAnalyticsConsent()) {
      conversionData.enhanced_conversions = true;
    }
    
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/${conversionAction}`,
      ...conversionData,
    });
    
    console.log('Conversion tracked:', { conversionAction, conversionValue, hasConsent: hasAnalyticsConsent() });
  }
};

// Track user engagement - respects consent
export const trackEngagement = (
  engagementType: 'scroll' | 'click' | 'form_submit' | 'download' | 'video_play',
  details?: Record<string, any>
) => {
  trackEvent(engagementType, 'engagement', undefined, undefined, details);
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  // Only track significant scroll milestones
  if ([25, 50, 75, 90, 100].includes(depth)) {
    trackEvent('scroll', 'engagement', `${depth}%`, depth);
  }
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('click', 'outbound_link', url, undefined, {
    link_text: linkText,
    link_url: url,
  });
};

// Track form interactions
export const trackFormEvent = (
  formName: string,
  eventType: 'start' | 'submit' | 'error',
  details?: Record<string, any>
) => {
  trackEvent(`form_${eventType}`, 'forms', formName, undefined, details);
};

// Track search events
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', 'site_search', searchTerm, resultsCount, {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Update consent status and notify Google Analytics
export const updateConsentMode = (consentState: {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consentState.analytics ? 'granted' : 'denied',
      ad_storage: consentState.marketing ? 'granted' : 'denied',
      ad_user_data: consentState.marketing ? 'granted' : 'denied',
      ad_personalization: consentState.marketing ? 'granted' : 'denied',
      functionality_storage: consentState.functional ? 'granted' : 'denied',
      personalization_storage: consentState.functional ? 'granted' : 'denied',
    });
    
    // Send consent update event
    if (consentState.analytics) {
      window.gtag('event', 'consent_update', {
        event_category: 'consent',
        event_label: 'analytics_granted',
      });
    }
    
    console.log('Consent mode updated:', consentState);
  }
}; 