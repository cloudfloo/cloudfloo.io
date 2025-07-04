import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
import ImmersiveCloudVisualization from '@/components/immersive-cloud-visualization';

// Critical components - load immediately
import EnhancedHeader from '@/components/enhanced-header-fixed';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

// Cloud visualization loaded lazily inside the component itself

// Above-the-fold components - load with priority
const EnhancedServices = dynamic(() => import('@/components/enhanced-services'), { 
  ssr: true,
  loading: () => <div className="h-96 animate-pulse bg-gray-800/50 rounded-lg" />
});

// Below-the-fold components - lazy load when needed
const EnhancedAbout = dynamic(() => import('@/components/enhanced-about'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-800/50 rounded-lg" />
});

const TeamSection = dynamic(() => import('@/components/TeamSection'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-800/50 rounded-lg" />
});

const EnhancedProjects = dynamic(() => import('@/components/enhanced-projects'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-800/50 rounded-lg" />
});

const FAQSection = dynamic(() => import('@/components/faq-section'), { 
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-800/50 rounded-lg" />
});

const EnhancedContact = dynamic(() => import('@/components/enhanced-contact'), { 
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-gray-800/50 rounded-lg" />
});

export const metadata: Metadata = generatePageMetadata(
  '/en',
  'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
  'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.',
  true
);

export default function EnglishHome() {
  return (
    <main className="relative">
      <ImmersiveCloudVisualization />
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