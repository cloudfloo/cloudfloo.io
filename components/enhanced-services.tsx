'use client';

import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/spinner';

const EnhancedServicesHeavy = dynamic(() => import('./enhanced-services-heavy'), {
  ssr: false,
  loading: () => <Spinner size="lg" />
});

export default function EnhancedServices() {
  return <EnhancedServicesHeavy />;
}