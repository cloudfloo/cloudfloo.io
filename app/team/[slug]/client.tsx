'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { team } from '@/data/team';
import LongBio from '@/components/LongBio';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMemberClientProps {
  slug: string;
}

export default function TeamMemberClient({ slug }: TeamMemberClientProps) {
  const { t } = useLanguage();
  const person = team.find((p) => p.slug === slug);

  if (!person) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 id="team-member-not-found" className="text-4xl font-bold text-white mb-4">{t('team.member.teamMemberNotFound')}</h1>
          <Link href="/team" className="text-neon hover:underline">
            {t('team.member.backToTeam')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/team" className="flex items-center text-gray-300 hover:text-neon transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('team.member.backToTeam')}
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