'use client';

import LanguageAwareLink from '@/components/LanguageAwareLink';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BackToHomeButtonProps {
  className?: string;
  text?: string;
}

export default function BackToHomeButton({ 
  className = "flex items-center text-gray-300 hover:text-neon transition-colors",
  text 
}: BackToHomeButtonProps) {
  const { t, isLoaded } = useLanguage();
  
  // Use provided text, translated text, or fallback to prevent hydration issues
  const backText = text || (isLoaded ? t('navigation.backToHome') : 'Back to Home');

  return (
    <LanguageAwareLink href="/" className={className}>
      <ArrowLeft className="w-5 h-5 mr-2" />
      {backText}
    </LanguageAwareLink>
  );
} 