import { Metadata } from 'next';
import GDPRClient from './client';

export const metadata: Metadata = {
  title: 'Zgodność z RODO - Ochrona Danych Osobowych | CloudFloo',
  description: 'Informacje o zgodności CloudFloo z RODO i środkach ochrony danych osobowych w usługach cloud computing 🔧',
};

export default function GDPRPage() {
  return <GDPRClient />;
}