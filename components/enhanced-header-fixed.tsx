'use client';

import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/spinner';

const EnhancedHeaderHeavy = dynamic(() => import('./enhanced-header-heavy'), {
  ssr: false,
  loading: () => <Spinner size="md" />
});

export default function EnhancedHeader() {
  return <EnhancedHeaderHeavy />;
}
