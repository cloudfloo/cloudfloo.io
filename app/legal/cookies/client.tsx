'use client';

import BackToHomeButton from '@/components/BackToHomeButton';
import { Cookie, Settings, BarChart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiePolicyClient() {
  const { t, language } = useLanguage();
  const lastUpdated = '2024-01-15';

  // Open consent modal function
  const openConsentSettings = () => {
    console.log('CookiePage: Kliknięto przycisk zarządzania preferencjami');
    // Trigger the consent banner settings
    const event = new CustomEvent('openConsentSettings');
    window.dispatchEvent(event);
    console.log('CookiePage: Wysłano event openConsentSettings');
  };

  const tableOfContents = [
    { id: 'what-are-cookies', title: t('legal.cookies.sections.whatAreCookies') },
    { id: 'how-we-use', title: t('legal.cookies.sections.howWeUse') },
    { id: 'types-of-cookies', title: t('legal.cookies.sections.typesOfCookies') },
    { id: 'third-party', title: t('legal.cookies.sections.thirdParty') },
    { id: 'managing-cookies', title: t('legal.cookies.sections.managingCookies') },
    { id: 'updates', title: t('legal.cookies.sections.updates') },
    { id: 'contact', title: t('legal.cookies.sections.contact') }
  ];

  const cookieTypes = [
    {
      icon: Settings,
      title: t('legal.cookies.types.essential.title'),
      description: t('legal.cookies.types.essential.description'),
      examples: [
        t('legal.cookies.types.essential.examples.authentication'),
        t('legal.cookies.types.essential.examples.security'),
        t('legal.cookies.types.essential.examples.loadBalancing'),
        t('legal.cookies.types.essential.examples.formSubmissions')
      ],
      canDisable: false
    },
    {
      icon: BarChart,
      title: t('legal.cookies.types.analytics.title'),
      description: t('legal.cookies.types.analytics.description'),
      examples: [
        t('legal.cookies.types.analytics.examples.googleAnalytics'),
        t('legal.cookies.types.analytics.examples.pageViews'),
        t('legal.cookies.types.analytics.examples.userBehavior'),
        t('legal.cookies.types.analytics.examples.performanceMetrics')
      ],
      canDisable: true
    },
    {
      icon: Cookie,
      title: t('legal.cookies.types.functional.title'),
      description: t('legal.cookies.types.functional.description'),
      examples: [
        t('legal.cookies.types.functional.examples.languagePreferences'),
        t('legal.cookies.types.functional.examples.themeSettings'),
        t('legal.cookies.types.functional.examples.regionSelection'),
        t('legal.cookies.types.functional.examples.savedPreferences')
      ],
      canDisable: true
    },
    {
      icon: Shield,
      title: t('legal.cookies.types.marketing.title'),
      description: t('legal.cookies.types.marketing.description'),
      examples: [
        t('legal.cookies.types.marketing.examples.adTargeting'),
        t('legal.cookies.types.marketing.examples.campaignTracking'),
        t('legal.cookies.types.marketing.examples.socialMediaIntegration'),
        t('legal.cookies.types.marketing.examples.remarketing')
      ],
      canDisable: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">{t('legal.cookies.breadcrumb')}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('legal.cookies.title')}</h1>
            <p className="text-xl text-gray-300 mb-4">
              {t('legal.cookies.subtitle')}
            </p>
            <p className="text-sm text-gray-400">
              {t('legal.cookies.lastUpdated')}: {new Date(lastUpdated).toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <Card className="glass border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{t('legal.cookies.tableOfContents')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-300 hover:text-neon transition-colors py-1"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <Card className="glass border-gray-700">
                <CardContent className="p-8 prose prose-invert max-w-none">
                  <section id="what-are-cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.whatAreCookies')}</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>{t('legal.cookies.content.whatAreCookies.paragraph1')}</p>
                      <p>{t('legal.cookies.content.whatAreCookies.paragraph2')}</p>
                    </div>
                  </section>

                  <section id="how-we-use" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.howWeUse')}</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>{t('legal.cookies.content.howWeUse.intro')}</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>{t('legal.cookies.content.howWeUse.list.essential.title')}:</strong> {t('legal.cookies.content.howWeUse.list.essential.description')}</li>
                        <li><strong>{t('legal.cookies.content.howWeUse.list.performance.title')}:</strong> {t('legal.cookies.content.howWeUse.list.performance.description')}</li>
                        <li><strong>{t('legal.cookies.content.howWeUse.list.personalization.title')}:</strong> {t('legal.cookies.content.howWeUse.list.personalization.description')}</li>
                        <li><strong>{t('legal.cookies.content.howWeUse.list.analytics.title')}:</strong> {t('legal.cookies.content.howWeUse.list.analytics.description')}</li>
                        <li><strong>{t('legal.cookies.content.howWeUse.list.marketing.title')}:</strong> {t('legal.cookies.content.howWeUse.list.marketing.description')}</li>
                      </ul>
                    </div>
                  </section>

                  <section id="types-of-cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.typesOfCookies')}</h2>
                    <div className="space-y-6">
                      {cookieTypes.map((type, index) => {
                        const Icon = type.icon;
                        return (
                          <Card key={index} className="glass border-gray-700">
                            <CardHeader>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-neon/10 rounded-lg flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-neon" />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-white text-lg">{type.title}</CardTitle>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      type.canDisable 
                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}>
                                      {type.canDisable ? t('legal.cookies.labels.optional') : t('legal.cookies.labels.required')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 mb-3">{type.description}</p>
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-2">{t('legal.cookies.labels.examples')}:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {type.examples.map((example, exampleIndex) => (
                                    <span
                                      key={exampleIndex}
                                      className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                                    >
                                      {example}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </section>

                  <section id="third-party" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.thirdParty')}</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>{t('legal.cookies.content.thirdParty.intro')}</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>{t('legal.cookies.content.thirdParty.list.googleAnalytics.title')}:</strong> {t('legal.cookies.content.thirdParty.list.googleAnalytics.description')}</li>
                        <li><strong>{t('legal.cookies.content.thirdParty.list.socialMedia.title')}:</strong> {t('legal.cookies.content.thirdParty.list.socialMedia.description')}</li>
                        <li><strong>{t('legal.cookies.content.thirdParty.list.advertising.title')}:</strong> {t('legal.cookies.content.thirdParty.list.advertising.description')}</li>
                        <li><strong>{t('legal.cookies.content.thirdParty.list.supportTools.title')}:</strong> {t('legal.cookies.content.thirdParty.list.supportTools.description')}</li>
                      </ul>
                      <p>{t('legal.cookies.content.thirdParty.conclusion')}</p>
                    </div>
                  </section>

                  <section id="managing-cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.managingCookies')}</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>{t('legal.cookies.content.managing.intro')}</p>
                      
                      <h3 className="text-lg font-semibold text-white">{t('legal.cookies.content.managing.browserSettings.title')}</h3>
                      <p>{t('legal.cookies.content.managing.browserSettings.intro')}</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>{t('legal.cookies.content.managing.browserSettings.list.viewDelete')}</li>
                        <li>{t('legal.cookies.content.managing.browserSettings.list.blockSpecific')}</li>
                        <li>{t('legal.cookies.content.managing.browserSettings.list.blockThirdParty')}</li>
                        <li>{t('legal.cookies.content.managing.browserSettings.list.clearAll')}</li>
                        <li>{t('legal.cookies.content.managing.browserSettings.list.notifications')}</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-white">{t('legal.cookies.content.managing.cookiePreferences.title')}</h3>
                      <p>{t('legal.cookies.content.managing.cookiePreferences.description')}</p>
                      
                      <div className="mt-4">
                        <Button 
                          onClick={openConsentSettings}
                          className="bg-gradient-neon text-white hover:bg-gradient-neon/90"
                        >
                          {t('legal.cookies.manageCookiePreferences')}
                        </Button>
                      </div>

                      <h3 className="text-lg font-semibold text-white">{t('legal.cookies.content.managing.optOutLinks.title')}</h3>
                      <p>{t('legal.cookies.content.managing.optOutLinks.description')}</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-neon hover:underline">{t('legal.cookies.content.managing.optOutLinks.googleAnalytics')}</a></li>
                        <li><a href="https://www.aboutads.info/choices/" className="text-neon hover:underline">{t('legal.cookies.content.managing.optOutLinks.digitalAdvertising')}</a></li>
                        <li><a href="https://www.networkadvertising.org/choices/" className="text-neon hover:underline">{t('legal.cookies.content.managing.optOutLinks.networkAdvertising')}</a></li>
                      </ul>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
                        <p className="text-yellow-400 text-sm">
                          <strong>{t('legal.cookies.labels.note')}:</strong> {t('legal.cookies.content.managing.disclaimer')}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="updates" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.updates')}</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>{t('legal.cookies.content.updates.paragraph')}</p>
                    </div>
                  </section>

                  <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('legal.cookies.sections.contact')}</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>{t('legal.cookies.content.contact.intro')}</p>
                      <ul className="list-none space-y-2">
                        <li><strong>{t('legal.cookies.content.contact.email')}:</strong> privacy@cloudfloo.io</li>
                        <li><strong>{t('legal.cookies.content.contact.address')}:</strong> CloudFloo.io, 123 Cloud Street, San Francisco, CA 94105</li>
                        <li><strong>{t('legal.cookies.content.contact.phone')}:</strong> +1 (555) 123-4567</li>
                      </ul>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
