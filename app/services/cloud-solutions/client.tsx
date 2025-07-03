'use client';

import Link from 'next/link';
import { ArrowLeft, Cloud, Server, Database, Shield, Monitor, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CloudSolutionsClient() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamless migration of your existing infrastructure to modern cloud platforms with zero downtime.'
    },
    {
      icon: Server,
      title: 'Infrastructure as Code',
      description: 'Automated, version-controlled infrastructure management for consistent and scalable deployments.'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Secure, scalable database solutions with automated backups and disaster recovery.'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security implementations meeting industry standards and regulations.'
    },
    {
      icon: Monitor,
      title: 'Monitoring & Analytics',
      description: 'Comprehensive monitoring solutions with real-time insights and performance optimization.'
    },
    {
      icon: Settings,
      title: 'Auto-scaling',
      description: 'Dynamic resource allocation that automatically adjusts to your application demands.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-300 hover:text-neon transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('common.backToHome')}
            </Link>
            <div className="text-gray-500">/</div>
            <div className="text-neon">{t('services.cloudSolutions.title')}</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Cloud className="w-10 h-10 text-white" />
            </div>
            <h1 
              id="cloud-solutions"
              className="text-5xl md:text-6xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: t('services.cloudSolutions.heroTitle') }}
            />
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t('services.cloudSolutions.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                {t('services.cloudSolutions.ctaMain')}
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                {t('services.cloudSolutions.ctaSecondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Cloud Solutions Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cloud services designed to optimize your infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('services.cloudSolutions.readyTitle')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('services.cloudSolutions.readyDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              {t('services.cloudSolutions.ctaConsultation')}
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              {t('services.cloudSolutions.ctaGuide')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 