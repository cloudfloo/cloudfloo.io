import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import TeamPageClient from './client';

export const metadata: Metadata = generatePageMetadata(
  '/team',
  'Meet Our Expert Team | CloudFloo',
  'Industry veterans with deep expertise and a passion for innovation. We are not just service providers—we are your strategic technology partners.',
  true
);

export default function TeamPage() {
  return <TeamPageClient />;
}