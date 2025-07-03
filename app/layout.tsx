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
        {/* Google Analytics 4 - Production Only */}
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
                  gtag('config', 'G-D5F48XPHZJ');
                `,
              }}
            />
          </>
        )}
        
        {/* Google Search Console Verification - Production Only */}
        {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
          <meta name="google-site-verification" content="verify_token" />
        )}

        {/* Critical CSS for hero section performance */}
        <style id="critical">{`#home{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}`}</style>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <DefaultSeoProvider />
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}