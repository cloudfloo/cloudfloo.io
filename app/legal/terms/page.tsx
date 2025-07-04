import { Metadata } from 'next';
import TermsOfServiceClient from './client';

export const metadata: Metadata = {
  title: 'Regulamin Usług - Warunki Współpracy | CloudFloo',
  description: 'Regulamin usług CloudFloo - warunki prawne i zasady korzystania z naszych usług cloud computing i DevOps w Polsce 🔧',
};

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />;
}
