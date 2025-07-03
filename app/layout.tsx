import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { LanguageProvider } from '@/contexts/LanguageContext';
import DefaultSeoProvider from '@/components/DefaultSeoProvider';

const inter = localFont({
  src: [
    {
      path: '../public/InterVariable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/InterVariable-Italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

import Analytics from "@/components/Analytics";

// Minimal metadata for App Router - next-seo handles most SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://cloudfloo.io'),
  manifest: '/manifest.json',
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://cloudfloo.io" />
        {/* Hreflang for bilingual SEO */}
        <link rel="alternate" hrefLang="pl" href="https://cloudfloo.io/" />
        <link rel="alternate" hrefLang="en" href="https://cloudfloo.io/en/" />
        <link rel="alternate" hrefLang="x-default" href="https://cloudfloo.io/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00E5FF" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" as="image" href="/logo.avif" fetchPriority="high" />
        <link rel="preconnect" href="https://techicons.dev" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://techicons.dev" />
        
        {/* Google Search Console Verification - Production Only */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <meta name="google-site-verification" content="verify_token" />
        )}

        {/* Critical CSS for hero section performance */}
        <style id="critical">{`
          #home{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
          .hero-title{font-size:clamp(2.5rem,8vw,6rem);line-height:1.1;font-weight:700}
          .glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1)}
          .text-neon{background:linear-gradient(135deg,#00E5FF,#FF00E0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        `}</style>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <DefaultSeoProvider />
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
        
        {/* Google Analytics 4 - Non-blocking, Production Only */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-D5F48XPHZJ"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-D5F48XPHZJ', {
                    page_title: document.title,
                    page_location: window.location.href
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}