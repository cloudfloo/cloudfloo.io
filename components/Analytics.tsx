'use client'
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function Analytics() {
  return (
    <>
      <GoogleAnalytics gaId={GA_ID} />
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
