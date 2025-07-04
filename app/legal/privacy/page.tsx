import { Metadata } from 'next';
import PrivacyPolicyClient from './client';

export const metadata: Metadata = {
  title: 'Polityka Prywatności - Ochrona Danych | CloudFloo',
  description: 'Polityka prywatności CloudFloo - jak gromadzimy, używamy i chronimy Twoje dane osobowe zgodnie z RODO i prawem polskim 🔧',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
