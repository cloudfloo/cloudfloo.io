import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import dynamic from 'next/dynamic';
import { AuroraBackground } from '@/components/ui/aurora-background';

// Critical components - load immediately
import EnhancedHeader from '@/components/enhanced-header-fixed';
import Hero from '@/components/hero';
import Footer from '@/components/footer';
import PolishLanguageWrapper from '@/components/PolishLanguageWrapper';
import { GlowingEffect } from '@/components/ui/glowing-effect';

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
  '',
  'CloudFloo | Polish Cloud-Native Software House & DevOps Agency',
  'CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.'
);

export default function Home() {
  return (
    <PolishLanguageWrapper>
      <main className="relative">
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <EnhancedHeader />
        <AuroraBackground>
          <Hero />
        </AuroraBackground>
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <EnhancedServices />
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <EnhancedAbout />
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <TeamSection />
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <EnhancedProjects />
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <FAQSection />
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <EnhancedContact />
        <GlowingEffect glow={true} disabled={false} borderWidth={1} />
        <Footer />
      </main>
    </PolishLanguageWrapper>
  );
}