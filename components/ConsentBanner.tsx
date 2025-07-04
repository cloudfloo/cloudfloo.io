'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Settings, Shield, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  necessary: boolean;
}

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: false,
    necessary: true, // Always true - required cookies
  });

  useEffect(() => {
    setMounted(true);
    const savedConsent = localStorage.getItem('cookie-consent');
    
    if (!savedConsent) {
      // Show banner after 1 second delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      updateGoogleConsent(parsedConsent);
    }
  }, []);

  // Separate useEffect for event listener - always active
  useEffect(() => {
    if (!mounted) return;

    // Listen for custom event to open consent settings
    const handleOpenConsentSettings = () => {
      console.log('ConsentBanner: Otrzymano event openConsentSettings');
      setShowSettings(true);
      setShowBanner(true);
    };

    window.addEventListener('openConsentSettings', handleOpenConsentSettings);
    console.log('ConsentBanner: Event listener dodany');
    
    return () => {
      window.removeEventListener('openConsentSettings', handleOpenConsentSettings);
      console.log('ConsentBanner: Event listener usunięty');
    };
  }, [mounted]);

  // Initialize Google Consent Mode with default values
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Set default consent state before loading analytics
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted', // Always granted for necessary cookies
        wait_for_update: 500,
      });

      // Set region-specific defaults for EEA/EU
      window.gtag('consent', 'default', {
        region: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'],
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        wait_for_update: 500,
      });
    }
  }, [mounted]);

  const updateGoogleConsent = (newConsent: ConsentState) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newConsent.analytics ? 'granted' : 'denied',
        ad_storage: newConsent.marketing ? 'granted' : 'denied',
        ad_user_data: newConsent.marketing ? 'granted' : 'denied',
        ad_personalization: newConsent.marketing ? 'granted' : 'denied',
        functionality_storage: newConsent.functional ? 'granted' : 'denied',
        personalization_storage: newConsent.functional ? 'granted' : 'denied',
      });

      // Fire analytics event if analytics consent is granted
      if (newConsent.analytics) {
        window.gtag('event', 'consent_granted', {
          event_category: 'engagement',
          event_label: 'analytics',
        });
      }
    }
  };

  const saveConsent = (newConsent: ConsentState) => {
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    updateGoogleConsent(newConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      analytics: true,
      marketing: true,
      functional: true,
      necessary: true,
    };
    saveConsent(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      analytics: false,
      marketing: false,
      functional: false,
      necessary: true,
    };
    saveConsent(necessaryOnly);
  };

  const toggleConsent = (type: keyof ConsentState) => {
    if (type === 'necessary') return; // Can't toggle necessary cookies
    
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!mounted || !showBanner) return null;

  const consentTexts = {
    en: {
      title: 'We value your privacy',
      description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
      acceptAll: 'Accept All',
      acceptNecessary: 'Accept Necessary Only',
      customize: 'Customize Settings',
      settings: {
        title: 'Cookie Preferences',
        description: 'Choose which cookies you want to accept. You can change these settings at any time.',
        necessary: {
          title: 'Necessary Cookies',
          description: 'These cookies are essential for the website to function and cannot be switched off.',
        },
        analytics: {
          title: 'Analytics Cookies',
          description: 'These cookies help us understand how visitors interact with our website.',
        },
        marketing: {
          title: 'Marketing Cookies',
          description: 'These cookies are used to deliver relevant advertisements and marketing communications.',
        },
        functional: {
          title: 'Functional Cookies',
          description: 'These cookies enable enhanced functionality and personalization.',
        },
        save: 'Save Preferences',
        close: 'Close',
      },
    },
    pl: {
      title: 'Szanujemy Twoją prywatność',
      description: 'Używamy plików cookie, aby ulepszyć Twoje doświadczenie przeglądania, dostarczać spersonalizowane treści i analizować nasz ruch. Klikając "Akceptuj wszystkie", wyrażasz zgodę na nasze używanie plików cookie.',
      acceptAll: 'Akceptuj wszystkie',
      acceptNecessary: 'Akceptuj tylko niezbędne',
      customize: 'Dostosuj ustawienia',
      settings: {
        title: 'Preferencje plików cookie',
        description: 'Wybierz, które pliki cookie chcesz zaakceptować. Możesz zmienić te ustawienia w dowolnym momencie.',
        necessary: {
          title: 'Niezbędne pliki cookie',
          description: 'Te pliki cookie są niezbędne do działania strony internetowej i nie można ich wyłączyć.',
        },
        analytics: {
          title: 'Pliki cookie analityczne',
          description: 'Te pliki cookie pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony.',
        },
        marketing: {
          title: 'Pliki cookie marketingowe',
          description: 'Te pliki cookie są używane do dostarczania trafnych reklam i komunikacji marketingowej.',
        },
        functional: {
          title: 'Pliki cookie funkcjonalne',
          description: 'Te pliki cookie umożliwiają rozszerzoną funkcjonalność i personalizację.',
        },
        save: 'Zapisz preferencje',
        close: 'Zamknij',
      },
    },
  };

  const texts = consentTexts[language as keyof typeof consentTexts] || consentTexts.en;

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {texts.settings.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {texts.settings.description}
            </p>

            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex-1">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    {texts.settings.necessary.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {texts.settings.necessary.description}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-10 h-6 bg-green-600 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-blue-600" />
                    {texts.settings.analytics.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {texts.settings.analytics.description}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => toggleConsent('analytics')}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      consent.analytics ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      consent.analytics ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-purple-600" />
                    {texts.settings.marketing.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {texts.settings.marketing.description}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => toggleConsent('marketing')}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      consent.marketing ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      consent.marketing ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <Settings className="w-4 h-4 text-orange-600" />
                    {texts.settings.functional.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {texts.settings.functional.description}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => toggleConsent('functional')}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      consent.functional ? 'bg-orange-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                      consent.functional ? 'translate-x-4' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => saveConsent(consent)} className="flex-1">
                {texts.settings.save}
              </Button>
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                {texts.settings.close}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl border-t-4 border-neon">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-neon flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">{texts.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {texts.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button onClick={acceptAll} className="bg-neon hover:bg-neon/90 text-black">
                  {texts.acceptAll}
                </Button>
                <Button variant="outline" onClick={acceptNecessary}>
                  {texts.acceptNecessary}
                </Button>
                <Button variant="ghost" onClick={() => setShowSettings(true)}>
                  {texts.customize}
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 