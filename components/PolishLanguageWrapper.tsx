'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PolishLanguageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Set language to Polish for root pages
    setLanguage('pl');
  }, [setLanguage]);

  return <>{children}</>;
} 