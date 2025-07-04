'use client';

import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: t('languages.en'), flag: '🇬🇧' },
    { code: 'pl', name: t('languages.pl'), flag: '🇵🇱' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'en' | 'pl') => {
    setIsOpen(false);
    
    // Construct the new URL based on language selection
    let newPath = '';
    
    if (langCode === 'en') {
      // For English, add /en prefix
      if (pathname?.startsWith('/en')) {
        // Already on English route, no change needed
        return;
      } else {
        // Convert Polish route to English route
        newPath = pathname === '/' ? '/en' : `/en${pathname}`;
      }
    } else {
      // For Polish, remove /en prefix (root routes)
      if (pathname?.startsWith('/en')) {
        // Convert English route to Polish route
        const pathWithoutEn = pathname.substring(3);
        newPath = pathWithoutEn === '' ? '/' : pathWithoutEn;
      } else {
        // Already on Polish route, no change needed
        return;
      }
    }
    
    // Navigate to the new URL
    router.push(newPath);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg hover:bg-gray-700/40 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('footer.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" />
        <div className="flex items-center gap-1.5">
          <span className="text-sm opacity-80" role="img" aria-label={currentLanguage?.name}>
            {currentLanguage?.flag}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-medium">
            {currentLanguage?.code.toUpperCase()}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" />
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
              className="absolute bottom-full mb-2 left-0 min-w-[130px] bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl z-50"
              role="listbox"
              aria-label={t('footer.selectLanguage')}
            >
              <div className="p-1.5">
                <div className="text-xs text-gray-500 px-2 py-1 mb-1 font-normal">
                  {t('footer.language')}
                </div>
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'pl')}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-200 ${
                      language === lang.code
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                    whileHover={{ x: 1 }}
                    role="option"
                    aria-selected={language === lang.code}
                  >
                    <span className="text-sm opacity-90" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <span className="flex-1 text-left text-xs font-normal">{lang.code === 'en' ? 'English' : 'Polski'}</span>
                    {language === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
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