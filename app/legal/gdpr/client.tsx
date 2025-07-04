'use client';

import BackToHomeButton from '@/components/BackToHomeButton';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GDPRClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">{t('common.gdpr')}</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-green-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
              dangerouslySetInnerHTML={{ __html: t('legal.gdpr.heroTitle') }}
            />
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t('legal.gdpr.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* GDPR Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <section id="exercising-rights" className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{t('legal.gdpr.exercisingRights')}</h2>
                <div className="text-gray-300 space-y-4">
                  <p>{t('legal.gdpr.exercisingRightsDesc')}</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>{t('legal.gdpr.contactDPO')}</li>
                    <li>{t('legal.gdpr.useForm')}</li>
                    <li>{t('legal.gdpr.writtenRequest')}</li>
                  </ul>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
                    <p className="text-blue-400 text-sm">
                      <strong>{t('legal.gdpr.responseTime')}</strong> {t('legal.gdpr.responseTimeDesc')}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button className="bg-gradient-neon text-white mr-4">
                      {t('legal.gdpr.submitRequest')}
                    </Button>
                    <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
                      {t('legal.gdpr.downloadData')}
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 