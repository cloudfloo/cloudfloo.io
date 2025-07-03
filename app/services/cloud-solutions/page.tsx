import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import CloudSolutionsClient from './client';

export const metadata: Metadata = generatePageMetadata(
  '/services/cloud-solutions',
  'Cloud Solutions & Migration | CloudFloo',
  'Expert cloud migration, infrastructure design, and optimization services for AWS, Azure, and GCP. Transform your business with scalable cloud solutions.',
  true
);

export default function CloudSolutionsPage() {
  return <CloudSolutionsClient />;
}