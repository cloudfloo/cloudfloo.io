'use client';

import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/spinner';
import { TeamMember } from '@/data/team';

const LongBioHeavy = dynamic(() => import('./LongBio-heavy'), {
  ssr: false,
  loading: () => <Spinner size="lg" />
});

interface LongBioProps {
  person: TeamMember;
}

export default function LongBio({ person }: LongBioProps) {
  return <LongBioHeavy person={person} />;
}