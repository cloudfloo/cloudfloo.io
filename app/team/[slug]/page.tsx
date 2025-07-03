import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { team } from '@/data/team';
import SEO from '@/components/SEO';
import TeamMemberClient from './client';

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
    title: `${person.name} - Ekspert ${person.title} | CloudFloo`,
    description: `Poznaj ${person.name}, specjalistę ${person.title} w CloudFloo. Doświadczony inżynier z Polski z expertise w cloud computing i DevOps 🔧`,
    keywords: `${person.name}, CloudFloo team, ${person.title}, Polish engineers, cloud experts, ${person.expertise.join(', ')}`,
  };
}

export default function TeamMemberPage({ params }: TeamMemberPageProps) {
  const person = team.find((p) => p.slug === params.slug);

  if (!person) {
    notFound();
  }

  return (
    <>
      <SEO 
        title={`${person.name} - Ekspert ${person.title} | CloudFloo`}
        description={`Poznaj ${person.name}, specjalistę ${person.title} w CloudFloo. Doświadczony inżynier z Polski z expertise w cloud computing i DevOps 🔧`}
        keywords={`${person.name}, CloudFloo team, ${person.title}, Polish engineers, cloud experts, ${person.expertise.join(', ')}`}
        url={`https://cloudfloo.io/team/${person.slug}`}
      />
      <TeamMemberClient slug={params.slug} />
    </>
  );
}