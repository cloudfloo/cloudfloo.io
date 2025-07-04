import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ServicesClient from './client';

export const metadata: Metadata = generatePageMetadata(
  '/services',
  'Our Services | CloudFloo',
  'Expert cloud solutions, DevOps automation, AI/ML, and data engineering services. Professional team delivering enterprise-grade solutions.',
  true
);

export default function ServicesPage() {
  return <ServicesClient />;
}