import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  defaultTitle: 'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
  titleTemplate: '%s | CloudFloo',
  description: 'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.',
  canonical: 'https://cloudfloo.io',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://cloudfloo.io',
    siteName: 'CloudFloo',
    title: 'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
    description: 'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.',
    images: [
      {
        url: 'https://cloudfloo.io/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'CloudFloo - Cloud Solutions & DevOps Automation',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@cloudfloo',
    site: '@cloudfloo',
    cardType: 'summary_large_image',
  },
  languageAlternates: [
    {
      hrefLang: 'pl',
      href: 'https://cloudfloo.io/',
    },
    {
      hrefLang: 'en',
      href: 'https://cloudfloo.io/en/',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover',
    },
    {
      name: 'author',
      content: 'CloudFloo Team',
    },
    {
      name: 'keywords',
      content: 'cloud solutions, AI agents, DevOps automation, data engineering, ML ops, edge functions, NestJS, React, Kubernetes, Polish engineers, cloud-native, microservices',
    },
    {
      name: 'theme-color',
      content: '#00FFFF',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'CloudFloo',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/logo.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'alternate',
      hrefLang: 'pl',
      href: 'https://cloudfloo.io/',
    },
    {
      rel: 'alternate',
      hrefLang: 'en',
      href: 'https://cloudfloo.io/en/',
    },
    {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: 'https://cloudfloo.io/',
    },
    {
      rel: 'preload',
      href: '/InterVariable.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/InterVariable-Italic.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/logo.avif',
    },
    {
      rel: 'preconnect',
      href: 'https://techicons.dev',
    },
    {
      rel: 'preconnect',
      href: 'https://images.pexels.com',
    },
    {
      rel: 'preconnect',
      href: 'https://www.googletagmanager.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://www.googletagmanager.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://www.google-analytics.com',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://techicons.dev',
    },
    {
      rel: 'dns-prefetch',
      href: 'https://images.pexels.com',
    },
  ],
};

export default config; 