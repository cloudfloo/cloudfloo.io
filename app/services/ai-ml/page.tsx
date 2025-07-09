import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import AIMachineLearningClient from './client';
import { AuroraBackground } from '@/components/ui/aurora-background';

export const metadata: Metadata = generatePageMetadata(
  '/services/ai-ml',
  'AI & Machine Learning Solutions | CloudFloo',
  'Custom AI models, intelligent automation, MLOps pipelines, and predictive analytics. Transform your business with cutting-edge AI solutions.',
  true
);



export default function AIMachineLearningPage() {
  return (
    <AuroraBackground className="aurora-purple">
      <AIMachineLearningClient />
    </AuroraBackground>
  );
}