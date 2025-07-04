import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { LanguageProvider } from '@/contexts/LanguageContext';
import DefaultSeoProvider from '@/components/DefaultSeoProvider';

// Primary font (regular) - preloaded for immediate use
const interRegular = localFont({
  src: '../public/InterVariable.woff2',
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

// Italic font - loaded on demand to avoid preload warning
const interItalic = localFont({
  src: '../public/InterVariable-Italic.woff2',
  variable: '--font-inter-italic',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
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
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://techicons.dev" />
        
        {/* Preload critical assets - fonts are handled by Next.js localFont */}
        <link rel="preload" as="image" href="/logo.avif" fetchPriority="high" />
        
        {/* Google Search Console Verification - Production Only */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <meta name="google-site-verification" content="verify_token" />
        )}
        
        {/* PWA Theme Color */}
        <meta name="theme-color" content="#000000" />

        {/* Critical CSS for hero section performance */}
        <style id="critical">{`
          *,*::before,*::after{box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{margin:0;background:#000;color:#fff;font-family:var(--font-inter),system-ui,-apple-system,sans-serif;font-display:swap}
          #home{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
          .hero-title{font-size:clamp(2.5rem,8vw,6rem);line-height:1.1;font-weight:700;color:#fff;font-display:swap}
          .glass{background:rgba(255,255,255,0.05);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1)}
          .text-neon{background:linear-gradient(135deg,#00E5FF,#FF00E0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .bg-gradient-neon{background:linear-gradient(135deg,#00E5FF,#FF00E0)}
          .container{max-width:1200px;margin:0 auto;padding:0 1.5rem}
          .btn-accessible{min-height:44px;border-radius:8px;transition:all 0.2s ease-in-out}
          @media(max-width:767px){.hero-title{font-size:2.5rem}.container{padding:0 1rem}}
        `}</style>
      </head>
      <body className={`${interRegular.className} ${interItalic.variable}`} suppressHydrationWarning>
        <LanguageProvider>
          <DefaultSeoProvider />
          {children}
          <Analytics />
        </LanguageProvider>
        
        {/* Google Analytics 4 - Non-blocking, Production Only */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-D5F48XPHZJ"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-D5F48XPHZJ', {
                  page_title: document.title,
                  page_location: window.location.href
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}