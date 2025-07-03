'use client';

import { DefaultSeo } from 'next-seo';
import SEOConfig from '@/next-seo.config';

export default function DefaultSeoProvider() {
  return <DefaultSeo {...SEOConfig} />;
} 