'use client';

import LanguageAwareLink from '@/components/LanguageAwareLink';
import Image from 'next/image';
import { placeholders, DEFAULT_BLUR } from '@/data/placeholders';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    [t('footer.services')]: [
      { name: t('services.cloudSolutions.title'), href: '/services/cloud-solutions' },
      { name: t('services.aiMl.title'), href: '/services/ai-ml' },
      { name: t('services.devops.title'), href: '/services/devops' },
      { name: t('services.dataEngineering.title'), href: '/services/data-engineering' },
      { name: t('services.appDevelopment.title'), href: '/services/app-development' },
      { name: t('services.edgeComputing.title'), href: '/services/edge-computing' },
    ],
    [t('footer.company')]: [
      { name: t('common.about'), href: '/#about' },
      { name: t('navigation.team'), href: '/team' },
      { name: t('common.careers'), href: '/company/careers' },
      { name: t('common.blog'), href: '/company/blog' },
      { name: t('common.press'), href: '/company/press' },
    ],
    [t('footer.legal')]: [
      { name: t('common.privacy'), href: '/legal/privacy' },
      { name: t('common.terms'), href: '/legal/terms' },
      { name: t('common.cookies'), href: '/legal/cookies' },
      { name: t('common.gdpr'), href: '/legal/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/cloudfloo', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/cloudfloo', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/cloudfloo-io', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@cloudfloo.io', label: 'Email' },
  ];

  return (
    <footer className="bg-slate-900/40 backdrop-blur-sm border-t border-gray-700/30 mt-16 mb-8" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
      <div className="container mx-auto px-6 py-16" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 mt-4" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/logo.avif"
                alt="CloudFloo Logo"
                width={32}
                height={32}
                priority={false}
                className="object-contain w-8 h-8"
                sizes="32px"
              />
              <span className="text-xl font-bold text-neon" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                cloudfloo.io
              </span>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              {t('footer.description')}
            </p>
            
            {/* Contact Information */}
            <div className="mb-8 space-y-3" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              <div className="text-sm text-gray-300" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                <strong className="text-white" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>{t('footer.address')}</strong><br />
                <span style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>Chmieleniec 17/69</span><br />
                <span style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>30-348 Krakow, Poland</span>
              </div>
              <div className="text-sm text-gray-300" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                <strong className="text-white" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>{t('footer.phone')}</strong> <span style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>+48 728 963 591</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-neon/10 hover:text-neon transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="mt-4" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              <h3 className="text-white font-semibold mb-6" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>{category}</h3>
              <ul className="space-y-3" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                {links.map((link, index) => (
                  <li key={index} style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                    <LanguageAwareLink
                      href={link.href}
                      className="text-gray-300 hover:text-neon transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                      style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}
                    >
                      {link.name}
                    </LanguageAwareLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6 md:mb-0">
            <p className="text-gray-300 text-sm" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              {t('footer.copyright')}
            </p>
            <div className="opacity-75">
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="flex items-center space-x-6" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
            <span className="text-sm text-gray-300" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              {t('footer.builtWith')}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>{t('footer.systemsOperational')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}