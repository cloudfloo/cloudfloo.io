import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import CloudSolutionsClient from './client';
import { AuroraBackground } from '@/components/ui/aurora-background';

export const metadata: Metadata = generatePageMetadata(
  '/services/cloud-solutions',
  'Cloud Solutions & Migration | CloudFloo',
  'Expert cloud migration, infrastructure design, and optimization services for AWS, Azure, and GCP. Transform your business with scalable cloud solutions.',
  true
);

export default function CloudSolutionsPage() {
  return (
    <AuroraBackground className="aurora-blue">
      <CloudSolutionsClient />
    </AuroraBackground>
  );
}