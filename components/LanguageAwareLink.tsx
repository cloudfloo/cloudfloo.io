'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageAwareLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
}

export default function LanguageAwareLink({ 
  href, 
  children, 
  className, 
  style, 
  onClick,
  target,
  rel,
  ...props 
}: LanguageAwareLinkProps) {
  const { getLanguageAwarePath } = useLanguage();

  const finalHref = getLanguageAwarePath(href);

  return (
    <Link 
      href={finalHref} 
      className={className} 
      style={style}
      onClick={onClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
} 