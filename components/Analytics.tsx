'use client'
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
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
