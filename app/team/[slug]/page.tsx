import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { team } from '@/data/team';
import LongBio from '@/components/LongBio';
import SEO from '@/components/SEO';

interface TeamMemberPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all team members
export async function generateStaticParams() {
  return team.map((person) => ({
    slug: person.slug,
  }));
}

// Generate metadata for each team member
export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const person = team.find((p) => p.slug === params.slug);
  
  if (!person) {
    return {
      title: 'Team Member Not Found | CloudFloo',
    };
  }

  return {
    title: `${person.name} - ${person.title} | CloudFloo`,
    description: `Learn more about ${person.name}, ${person.title} at CloudFloo. ${person.shortBio}`,
    keywords: `${person.name}, CloudFloo team, ${person.title}, Polish engineers, cloud experts, ${person.expertise.join(', ')}`,
  };
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const person = team.find((p) => p.slug === params.slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${person.name} - ${person.title}`}
        description={`Learn more about ${person.name}, ${person.title} at CloudFloo. ${person.shortBio}`}
        keywords={`${person.name}, CloudFloo team, ${person.title}, Polish engineers, cloud experts, ${person.expertise.join(', ')}`}
        url={`https://cloudfloo.io/team/${person.slug}`}
      />
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/team" className="flex items-center text-gray-300 hover:text-neon transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Team
            </Link>
            <div className="text-gray-500">/</div>
            <div className="text-neon">{person.name}</div>
          </div>
        </div>
      </header>

      {/* Team Member Profile */}
      <LongBio person={person} />
    </div>
  );
}