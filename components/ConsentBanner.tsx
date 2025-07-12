'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Settings, Shield, Eye, ArrowRight, CheckCircle, BarChart3, Target, Zap } from 'lucide-react';
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
      <div className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl animate-modal-content">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900">
                <Settings className="w-6 h-6 text-primary" />
                {texts.settings.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="h-10 w-10 p-0 text-gray-500 hover:bg-gray-100 transition-all duration-300 group rounded-full"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </Button>
            </div>
            
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              {texts.settings.description}
            </p>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-3 mb-2 text-lg text-gray-900">
                      <Shield className="w-5 h-5 text-green-600" />
                      {texts.settings.necessary.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {texts.settings.necessary.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <div className="w-12 h-7 bg-green-500 rounded-full relative shadow-sm">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1 transition-transform shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-3 mb-2 text-lg text-gray-900">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      {texts.settings.analytics.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {texts.settings.analytics.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <button
                      onClick={() => toggleConsent('analytics')}
                      className={`w-12 h-7 rounded-full relative transition-all duration-300 shadow-lg group/switch ${
                        consent.analytics 
                          ? 'bg-blue-500 shadow-blue-200 hover:scale-105' 
                          : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-sm ${
                        consent.analytics ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-3 mb-2 text-lg text-gray-900">
                      <Target className="w-5 h-5 text-purple-500" />
                      {texts.settings.marketing.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {texts.settings.marketing.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <button
                      onClick={() => toggleConsent('marketing')}
                      className={`w-12 h-7 rounded-full relative transition-all duration-300 shadow-lg group/switch ${
                        consent.marketing 
                          ? 'bg-purple-500 shadow-purple-200 hover:scale-105' 
                          : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-sm ${
                        consent.marketing ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-3 mb-2 text-lg text-gray-900">
                      <Zap className="w-5 h-5 text-orange-500" />
                      {texts.settings.functional.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {texts.settings.functional.description}
                    </p>
                  </div>
                  <div className="ml-6">
                    <button
                      onClick={() => toggleConsent('functional')}
                      className={`w-12 h-7 rounded-full relative transition-all duration-300 shadow-lg group/switch ${
                        consent.functional 
                          ? 'bg-orange-500 shadow-orange-200 hover:scale-105' 
                          : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform duration-300 shadow-sm ${
                        consent.functional ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                onClick={() => saveConsent(consent)} 
                size="lg"
                className="flex-1 bg-gradient-primary text-white hover:bg-blue-600 font-semibold transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {texts.settings.save}
                  <CheckCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowSettings(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  {texts.settings.close}
                  <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl relative">
        <div className="relative">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold mb-3 text-gray-900">
                {texts.title}
              </h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed font-medium">
                {texts.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptAll} 
                  size="lg"
                  className="bg-gradient-primary text-white hover:bg-blue-600 font-semibold transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {texts.acceptAll}
                    <CheckCircle className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={acceptNecessary}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    {texts.acceptNecessary}
                    <Shield className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowSettings(true)}
                  className="border-primary text-primary hover:bg-blue-50 font-semibold transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    {texts.customize}
                    <Settings className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                  </span>
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="h-10 w-10 p-0 text-gray-500 hover:bg-gray-100 flex-shrink-0 transition-all duration-300 group rounded-full"
            >
              <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
} 