import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CloudFloo.io - Next-Gen Cloud Solutions',
  description: 'Empowering businesses with cutting-edge cloud solutions, AI agents, and DevOps automation. Experience the future of cloud computing.',
  keywords: 'cloud solutions, AI agents, DevOps automation, data engineering, ML ops, edge functions',
  authors: [{ name: 'CloudFloo.io Team' }],
  creator: 'CloudFloo.io',
  publisher: 'CloudFloo.io',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloudfloo.io',
    title: 'CloudFloo.io - Next-Gen Cloud Solutions',
    description: 'Empowering businesses with cutting-edge cloud solutions, AI agents, and DevOps automation.',
    siteName: 'CloudFloo.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudFloo.io - Next-Gen Cloud Solutions',
    description: 'Empowering businesses with cutting-edge cloud solutions, AI agents, and DevOps automation.',
    creator: '@cloudfloo',
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
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}