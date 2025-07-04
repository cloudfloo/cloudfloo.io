import { Metadata } from 'next';
import CookiePolicyClient from './client';

export const metadata: Metadata = {
  title: 'Polityka Cookies - Zarządzanie Plikami Cookie | CloudFloo',
  description: 'Polityka plików cookie CloudFloo - informacje o używaniu cookies i technologii śledzących na naszej stronie 🔧',
};

export default function CookiePolicyPage() {
  return <CookiePolicyClient />;
}
