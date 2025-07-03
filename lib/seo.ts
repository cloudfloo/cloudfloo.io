import { NextSeoProps } from 'next-seo';

interface PageSeoConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

export function generatePageSeo({
  title,
  description,
  path = '',
  image = '/og-cover.jpg',
  noindex = false,
}: PageSeoConfig): NextSeoProps {
  const url = `https://cloudfloo.io${path}`;

  return {
    title,
    description,
    canonical: url,
    noindex,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: `https://cloudfloo.io${image}`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
    },
  };
}

// Common SEO configurations for different page types
export const seoConfigs = {
  home: {
    title: 'CloudFloo | Cloud Solutions & DevOps Automation',
    description: 'Transform your business with AWS, Azure & GCP cloud experts. We deliver comprehensive cloud-native, DevOps & AI solutions for companies.',
    path: '/',
  },
  services: {
    title: 'Our Services | CloudFloo',
    description: 'Expert cloud solutions, DevOps automation, AI/ML, and data engineering services. Professional team delivering enterprise-grade solutions.',
    path: '/services',
  },
  team: {
    title: 'Meet Our Expert Team | CloudFloo',
    description: 'Industry veterans with deep expertise and a passion for innovation. We\'re not just service providers—we\'re your strategic technology partners.',
    path: '/team',
  },
  about: {
    title: 'About CloudFloo | Cloud-Native Software House',
    description: 'Learn about CloudFloo - a senior team of Polish engineers specializing in cloud-native, microservices, and DevOps solutions.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us | CloudFloo',
    description: 'Get in touch with our expert team for cloud solutions, DevOps automation, and enterprise software development projects.',
    path: '/contact',
  },
}; 