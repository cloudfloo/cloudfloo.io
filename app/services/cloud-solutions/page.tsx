import { Metadata } from 'next';
import CloudSolutionsClient from './client';

export const metadata: Metadata = {
  title: 'Rozwiązania Chmurowe AWS, Azure, GCP | CloudFloo',
  description: 'Migracja do chmury, infrastruktura jako kod, auto-skalowanie i bezpieczeństwo. Eksperci AWS, Azure i Google Cloud w Polsce 🔧',
};

export default function CloudSolutionsPage() {
  return <CloudSolutionsClient />;
}