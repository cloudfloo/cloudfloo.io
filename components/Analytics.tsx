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

  console.log('Loading Google Analytics with Consent Mode:', GA_ID);

  return (
    <>
      {/* Google Consent Mode - Load this BEFORE gtag */}
      <Script id="google-consent-mode" strategy="beforeInteractive">
        {`
          // Default consent state - deny all until user provides consent
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent state for all regions
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
          
          // Set region-specific consent defaults for EU/EEA
          gtag('consent', 'default', {
            'region': ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'],
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied',
            'wait_for_update': 500
          });
          
          console.log('Google Consent Mode initialized with default denied state');
        `}
      </Script>

      {/* Google Analytics gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            // Enhanced measurement settings
            enhanced_measurements: {
              scrolls: true,
              outbound_clicks: true,
              site_search: true,
              video_engagement: true,
              file_downloads: true
            },
            // Privacy settings
            anonymize_ip: true,
            allow_google_signals: false, // Will be enabled via consent
            allow_ad_personalization_signals: false, // Will be enabled via consent
            // Custom parameters
            custom_map: {
              'custom_parameter_1': 'page_type',
              'custom_parameter_2': 'user_type'
            },
            // Debug mode for development
            debug_mode: ${process.env.NODE_ENV === 'development'}
          });
          
          // Log that analytics is loaded but waiting for consent
          console.log('Google Analytics loaded with Consent Mode. Tracking will start after user consent.');
          
          // Send initial page view with respect to consent mode
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
          });
        `}
      </Script>

      {/* Enhanced Conversion Tracking for EU users */}
      <Script id="enhanced-conversions" strategy="afterInteractive">
        {`
          // Enhanced conversions will only work when user consents to analytics
          gtag('config', '${GA_ID}', {
            'enhanced_conversions': true
          });
        `}
      </Script>
    </>
  );
}
