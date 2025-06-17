import EnhancedHeader from '@/components/enhanced-header';
import Hero from '@/components/hero';
import EnhancedServices from '@/components/enhanced-services';
import EnhancedAbout from '@/components/enhanced-about';
import EnhancedProjects from '@/components/enhanced-projects';
import FAQSection from '@/components/faq-section';
import EnhancedContact from '@/components/enhanced-contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="relative">
      <EnhancedHeader />
      <Hero />
      <EnhancedServices />
      <EnhancedAbout />
      <EnhancedProjects />
      <FAQSection />
      <EnhancedContact />
      <Footer />
    </main>
  );
}