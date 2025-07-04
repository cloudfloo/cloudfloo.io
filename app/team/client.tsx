'use client';

import LanguageAwareLink from '@/components/LanguageAwareLink';
import { ArrowLeft, Users, Award, Globe } from 'lucide-react';
import TeamCard from '@/components/TeamCard';
import { team } from '@/data/team';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TeamPageClient() {
  const { t, getHomeUrl } = useLanguage();

  const teamStats = [
    { number: '30+', labelKey: 'team.stats.experience', icon: Award },
    { number: '3', labelKey: 'team.stats.engineers', icon: Users },
    { number: '100+', labelKey: 'team.stats.projectsDelivered', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <LanguageAwareLink href="/" className="flex items-center text-gray-300 hover:text-neon transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('team.breadcrumb.home')}
            </LanguageAwareLink>
            <div className="text-gray-500">/</div>
            <div className="text-neon">{t('team.breadcrumb.ourTeam')}</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="meet-our-team" className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {t('team.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t('team.subtitle')}
            </p>
            
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {teamStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 text-neon mx-auto mb-3" />
                      <div className="text-2xl font-bold text-neon mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-300">{t(stat.labelKey)}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {team.map(person => (
              <div key={person.slug}>
                <TeamCard person={person} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">{t('team.philosophy.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-neon mb-3">{t('team.philosophy.technicalExcellence.title')}</h3>
                  <p className="text-sm text-gray-300">{t('team.philosophy.technicalExcellence.description')}</p>
                </CardContent>
              </Card>
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-neon mb-3">{t('team.philosophy.continuousLearning.title')}</h3>
                  <p className="text-sm text-gray-300">{t('team.philosophy.continuousLearning.description')}</p>
                </CardContent>
              </Card>
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-neon mb-3">{t('team.philosophy.clientPartnership.title')}</h3>
                  <p className="text-sm text-gray-300">{t('team.philosophy.clientPartnership.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 id="work-with-us" className="text-4xl font-bold mb-6 text-white">{t('team.cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('team.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LanguageAwareLink href="/#contact">
              <button className="bg-gradient-neon text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 btn-accessible">
                {t('team.cta.startProject')}
              </button>
            </LanguageAwareLink>
            <LanguageAwareLink href="/company/careers">
              <button className="border-2 border-neon text-neon hover:bg-neon/10 px-8 py-4 rounded-lg font-semibold transition-all duration-200 btn-accessible">
                {t('team.cta.joinTeam')}
              </button>
            </LanguageAwareLink>
          </div>
        </div>
      </section>
    </div>
  );
} 