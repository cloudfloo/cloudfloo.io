import EnhancedHeader from '@/components/enhanced-header-fixed';
import Hero from '@/components/hero';
import dynamic from 'next/dynamic';
import Footer from '@/components/footer';
import SEO from '@/components/SEO';

const EnhancedServices = dynamic(() => import('@/components/enhanced-services'), { ssr: false });
const EnhancedAbout = dynamic(() => import('@/components/enhanced-about'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false });
const EnhancedProjects = dynamic(() => import('@/components/enhanced-projects'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/faq-section'), { ssr: false });
const EnhancedContact = dynamic(() => import('@/components/enhanced-contact'), { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <SEO 
        title="Home"
        keywords="cloud solutions, DevOps automation, AI agents, Polish engineers, cloud-native development, microservices, NestJS, React, Kubernetes"
      />
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