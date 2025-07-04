'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Set language to English for /en routes
    setLanguage('en');
  }, [setLanguage]);

  return <>{children}</>;
} 