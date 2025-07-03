// Google Analytics utilities
// Only active in production environment

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-D5F48XPHZJ';

// Check if analytics is enabled (production only)
export const isAnalyticsEnabled = () => {
  return typeof window !== 'undefined' && 
         process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && 
         window.gtag;
};

// Track page views
export const trackPageView = (url: string) => {
  if (isAnalyticsEnabled()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, parameters?: Record<string, any>) => {
  if (isAnalyticsEnabled()) {
    window.gtag('event', action, parameters);
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, section?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    section: section,
  });
};

// Track service page views
export const trackServiceView = (serviceName: string) => {
  trackEvent('service_view', {
    service_name: serviceName,
  });
}; 