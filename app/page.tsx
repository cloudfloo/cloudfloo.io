import { Metadata } from 'next';
import { generateMetadata, BilingualMetadata, detectLanguage } from '@/lib/metadata';
import EnhancedHeader from '@/components/enhanced-header-fixed';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

const bilingualMeta: BilingualMetadata = {
  pl: {
    title: 'Rozwiązania Chmurowe i Automatyzacja DevOps | CloudFloo',
    description: 'Przekształć swój biznes z ekspertami chmury AWS, Azure i GCP. Oferujemy kompleksowe rozwiązania cloud-native, DevOps i AI dla firm w Polsce 🔧',
  },
  en: {
    title: 'Cloud Solutions & DevOps Automation | CloudFloo',
    description: 'Transform your business with AWS, Azure & GCP cloud experts. We deliver comprehensive cloud-native, DevOps & AI solutions for companies 🔧',
  },
  keywords: 'cloud solutions, DevOps automation, AI agents, Polish engineers, cloud-native development, microservices, NestJS, React, Kubernetes, AWS, Azure, GCP',
  canonicalUrl: 'https://cloudfloo.io',
};

export const metadata: Metadata = generateMetadata(bilingualMeta, 'pl');

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
  '',
  'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
  'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.'
);

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