'use client';

import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/spinner';

const EnhancedProjectsHeavy = dynamic(() => import('./enhanced-projects-heavy'), {
  ssr: false,
  loading: () => <Spinner size="lg" />
});

export default function EnhancedProjects() {
  return <EnhancedProjectsHeavy />;
}