'use client';

import { NextSeo, NextSeoProps } from 'next-seo';

interface PageSeoProps extends Omit<NextSeoProps, 'children'> {
  children?: React.ReactNode;
}

/**
 * PageSeo component for page-specific SEO overrides
 * Use this component at the top of any page that needs custom SEO
 * 
 * Example usage:
 * <PageSeo 
 *   title="Custom Page Title"
 *   description="Custom page description"
 *   canonical="https://cloudfloo.io/custom-page"
 * />
 */
export default function PageSeo({ children, ...seoProps }: PageSeoProps) {
  return (
    <>
      <NextSeo {...seoProps} />
      {children}
    </>
  );
} 