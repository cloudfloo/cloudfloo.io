'use client';

import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: t('languages.en'), flag: '🇬🇧' },
    { code: 'pl', name: t('languages.pl'), flag: '🇵🇱' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'en' | 'pl') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('footer.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4 text-gray-400 group-hover:text-neon transition-colors duration-300" />
        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label={currentLanguage?.name}>
            {currentLanguage?.flag}
          </span>
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
            {currentLanguage?.code.toUpperCase()}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-neon transition-colors duration-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-2 left-0 min-w-[140px] glass border border-gray-700 rounded-lg shadow-lg z-50"
              role="listbox"
              aria-label={t('footer.selectLanguage')}
            >
              <div className="p-2">
                <div className="text-xs text-gray-400 px-2 py-1 mb-1 font-medium">
                  {t('footer.language')}
                </div>
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'pl')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                      language === lang.code
                        ? 'bg-neon/20 text-neon border border-neon/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ x: 2 }}
                    role="option"
                    aria-selected={language === lang.code}
                  >
                    <span className="text-base" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {language === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-neon rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}