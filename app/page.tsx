import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import EnhancedHeader from '@/components/enhanced-header-fixed';
import Hero from '@/components/hero';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer';

export const metadata: Metadata = generatePageMetadata(
  '',
  'CloudFloo | Cloud Solutions & DevOps Automation',
  'Transform your business with AWS, Azure & GCP cloud experts. We deliver comprehensive cloud-native, DevOps & AI solutions for companies.',
  true
);

import EnhancedServices from '@/components/enhanced-services';
import EnhancedProjects from '@/components/enhanced-projects';
const EnhancedAbout = dynamic(() => import('@/components/enhanced-about'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/faq-section'), { ssr: false });
const EnhancedContact = dynamic(() => import('@/components/enhanced-contact'), { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <EnhancedHeader />
      <Hero />
      <EnhancedServices />
      <EnhancedAbout />
      <TeamSection />
      <EnhancedProjects />
      <FAQSection />
      <EnhancedContact />
      <Footer />
    </main>
  );
}