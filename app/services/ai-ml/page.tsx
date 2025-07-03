import { Metadata } from 'next';
import AIMachineLearningClient from './client';

// Default Polish metadata
export const metadata: Metadata = {
  title: 'AI i Machine Learning - Automatyzacja | CloudFloo',
  description: 'Zaawansowane rozwiązania AI/ML: automatyzacja procesów, analityka predykcyjna, modele ML na zamówienie. Eksperci TensorFlow, PyTorch i MLOps 🔧',
  alternates: {
    canonical: 'https://cloudfloo.io/services/ai-ml',
    languages: {
      'pl': 'https://cloudfloo.io/services/ai-ml',
      'en': 'https://cloudfloo.io/en/services/ai-ml',
      'x-default': 'https://cloudfloo.io/services/ai-ml',
    }
  },
  openGraph: {
    title: 'AI i Machine Learning - Automatyzacja | CloudFloo',
    description: 'Zaawansowane rozwiązania AI/ML: automatyzacja procesów, analityka predykcyjna, modele ML na zamówienie. Eksperci TensorFlow, PyTorch i MLOps 🔧',
    locale: 'pl_PL',
    alternateLocale: 'en_US',
  }
};



export default function AIMachineLearningPage() {
  return <AIMachineLearningClient />;
}