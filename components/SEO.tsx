'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  keywords?: string;
}

const defaultSiteTitle = 'CloudFloo | Polish Cloud-Native Software House & DevOps Agency';
const defaultDescription = 'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.';
const defaultImage = '/og-cover.jpg';
const siteUrl = 'https://cloudfloo.io';

export default function SEO({
  title,
  description = defaultDescription,
  image = defaultImage,
  url,
  type = 'website',
  noindex = false,
  keywords
}: SEOProps) {
  const pathname = usePathname();
  
  // Construct full title
  const fullTitle = title ? `${title} | CloudFloo` : defaultSiteTitle;
  
  // Construct canonical URL
  const canonicalUrl = url || `${siteUrl}${pathname}`;
  
  // Construct full image URL
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="CloudFloo" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:site" content="@cloudfloo" />
      <meta name="twitter:creator" content="@cloudfloo" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#00E5FF" />
      <meta name="msapplication-TileColor" content="#00E5FF" />
      <meta name="author" content="CloudFloo Team" />
      <meta name="publisher" content="CloudFloo" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://techicons.dev" />
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="dns-prefetch" href="https://techicons.dev" />
      <link rel="dns-prefetch" href="https://images.pexels.com" />
      
      {/* Organization & Persons JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "CloudFloo",
            "url": "https://cloudfloo.io",
            "logo": "https://cloudfloo.io/logo.avif",
            "founder": [
              {
                "@type": "Person",
                "name": "Michał Wiatr",
                "jobTitle": "CEO & CTO",
                "sameAs": [
                  "https://www.linkedin.com/in/mwiatr/",
                  "https://github.com/wiatrM"
                ]
              },
              {
                "@type": "Person",
                "name": "Sebastian Dębicki",
                "jobTitle": "Head of Frontend",
                "sameAs": [
                  "https://www.linkedin.com/in/debicki5/",
                  "https://github.com/Sebastian-Debicki"
                ]
              },
              {
                "@type": "Person",
                "name": "Damian Ogrodnik",
                "jobTitle": "Head of Backend",
                "sameAs": [
                  "https://www.linkedin.com/in/damian-ogrodnik-193408143/",
                  "https://github.com/Damian-Ogrodnik"
                ]
              }
            ]
          })
        }}
      />
    </Head>
  );
}