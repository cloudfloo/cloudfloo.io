import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
  description: 'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.',
  keywords: 'cloud solutions, AI agents, DevOps automation, data engineering, ML ops, edge functions, NestJS, React, Kubernetes, Polish engineers, cloud-native, microservices',
  authors: [{ name: 'CloudFloo Team' }],
  creator: 'CloudFloo',
  publisher: 'CloudFloo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloudfloo.io',
    title: 'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
    description: 'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.',
    siteName: 'CloudFloo',
    images: [
      {
        url: '/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'CloudFloo - Polish Cloud-Native Software House & DevOps Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
    description: 'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.',
    creator: '@cloudfloo',
    images: ['/og-cover.jpg'],
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
  alternates: {
    canonical: 'https://cloudfloo.io',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00E5FF" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" as="image" href="/logo.avif" fetchPriority="high" />
        <link rel="preconnect" href="https://techicons.dev" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://techicons.dev" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <style id="critical">{`#home{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}`}</style>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}