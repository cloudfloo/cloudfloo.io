'use client'
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-D5F48XPHZJ';
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

// Check if we should load analytics
const shouldLoadAnalytics = () => {
  // Always load if explicitly enabled, or if we detect production environment
  return ANALYTICS_ENABLED || 
         process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || 
         process.env.NODE_ENV === 'production' ||
         (typeof window !== 'undefined' && window.location.hostname !== 'localhost');
};

export default function Analytics() {
  if (!GA_ID || !shouldLoadAnalytics()) {
    console.log('Analytics disabled - GA_ID:', GA_ID, 'shouldLoad:', shouldLoadAnalytics());
    return null;
  }

  console.log('Loading Google Analytics with ID:', GA_ID);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { 
            page_path: window.location.pathname,
            page_title: document.title,
            page_location: window.location.href
          });
          console.log('Google Analytics initialized with ID: ${GA_ID}');
        `}
      </Script>
      <Script id="next-web-vitals" strategy="afterInteractive">
        {`
          function sendToGA({name, value}) {
            if (!window.gtag) return;
            window.gtag('event', name, {
              event_category: 'Web Vitals',
              value: Math.round(name === 'CLS' ? value * 1000 : value),
              non_interaction: true
            });
          }
          window.addEventListener('DOMContentLoaded', function() {
            import('next/web-vitals').then(({onLCP,onCLS,onINP}) => {
              onLCP(sendToGA);
              onCLS(sendToGA);
              onINP(sendToGA);
            });
          });
        `}
      </Script>
    </>
  );
}
