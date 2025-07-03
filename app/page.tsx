import { Metadata } from 'next';
import { generateMetadata, BilingualMetadata, detectLanguage } from '@/lib/metadata';
import EnhancedHeader from '@/components/enhanced-header-fixed';
import Hero from '@/components/hero';
import dynamic from 'next/dynamic';
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

const EnhancedServices = dynamic(() => import('@/components/enhanced-services'), { ssr: false });
const EnhancedAbout = dynamic(() => import('@/components/enhanced-about'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false });
const EnhancedProjects = dynamic(() => import('@/components/enhanced-projects'), { ssr: false });
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