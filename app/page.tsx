import EnhancedHeader from '@/components/enhanced-header';
import Hero from '@/components/hero';
import EnhancedServices from '@/components/enhanced-services';
import EnhancedAbout from '@/components/enhanced-about';
import TeamCard from '@/components/TeamCard';
import { team } from '@/data/team';
import EnhancedProjects from '@/components/enhanced-projects';
import FAQSection from '@/components/faq-section';
import EnhancedContact from '@/components/enhanced-contact';
import Footer from '@/components/footer';
import SEO from '@/components/SEO';

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
      
      {/* Team Section */}
      <section id="team" className="py-16 bg-black/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Our <span className="text-neon">team</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map(p => <TeamCard key={p.slug} person={p} />)}
          </div>
        </div>
      </section>
      
      <EnhancedProjects />
      <FAQSection />
      <EnhancedContact />
      <Footer />
    </main>
  );
}