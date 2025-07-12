'use client';

import LanguageAwareLink from '@/components/LanguageAwareLink';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const { t, isLoaded, language } = useLanguage();

  // Fix hydration issues by only enabling client-side features after mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only track active sections on homepage
      const isHomepage = pathname === '/' || pathname === '/en';
      if (isHomepage && hasMounted) {
        // Get all sections
        const sections = ['home', 'services', 'about', 'team', 'projects', 'contact'];
        const sectionElements = sections.map(id => document.getElementById(id));
        
        // Find which section is currently in view
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const element = sectionElements[i];
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    if (hasMounted) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }
    
    return () => {
      if (hasMounted) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname, hasMounted]);

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    if (!hasMounted) return;
    
    // Check if we're on the homepage using pathname directly
    const isHomepage = pathname === '/' || pathname === '/en';
    
    // If we're not on the homepage, navigate there first
    if (!isHomepage) {
      const homeUrl = pathname?.startsWith('/en') ? '/en' : '/';
      window.location.href = `${homeUrl}#${elementId}`;
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: '#home', label: t('navigation.home'), id: 'home' },
    { href: '#services', label: t('navigation.services'), id: 'services' },
    { href: '#about', label: t('navigation.about'), id: 'about' },
    { href: '#team', label: t('navigation.team'), id: 'team' },
    { href: '#projects', label: t('navigation.projects'), id: 'projects' },
    { href: '#contact', label: t('navigation.contact'), id: 'contact' },
  ];

  const services = [
    {
      title: t('services.cloudSolutions.title'),
      href: '/services/cloud-solutions',
      description: t('services.cloudSolutions.description')
    },
    {
      title: t('services.aiMl.title'),
      href: '/services/ai-ml',
      description: t('services.aiMl.description')
    },
    {
      title: t('services.devops.title'),
      href: '/services/devops',
      description: t('services.devops.description')
    },
    {
      title: t('services.dataEngineering.title'),
      href: '/services/data-engineering',
      description: t('services.dataEngineering.description')
    },
    {
      title: t('services.appDevelopment.title'),
      href: '/services/app-development',
      description: t('services.appDevelopment.description')
    },
    {
      title: t('services.edgeComputing.title'),
      href: '/services/edge-computing',
      description: t('services.edgeComputing.description')
    }
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    scrolled: {
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };

  // Function to determine if a nav item should show underline
  const shouldShowUnderline = (itemId: string) => {
    if (!hasMounted) return false;
    
    // Check if we're on the homepage
    const isHomepage = pathname === '/' || pathname === '/en';
    
    // On homepage, show underline for active section or hovered item
    if (isHomepage) {
      return hoveredItem === itemId || (hoveredItem === null && activeSection === itemId);
    }
    // On other pages, only show on hover
    return hoveredItem === itemId;
  };

  // Don't render anything during SSR or until mounted to prevent hydration mismatch
  if (!hasMounted || !isLoaded) {
    return (
      <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-800 rounded-lg animate-pulse" />
              <div className="w-32 h-6 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="hidden md:flex space-x-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-16 h-4 bg-gray-800 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </nav>
      </header>
    );
  }

  // Full interactive version after hydration
  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
      style={isScrolled ? headerVariants.scrolled : {}}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <LanguageAwareLink href="/" onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('home');
          }} className="flex items-center space-x-3 group cursor-pointer relative">
            {/* Modern logo container with subtle shadow */}
            <div className="relative">
                <Image
                src="/logo.avif"
                  alt="CloudFloo Logo"
                  width={48}
                  height={48}
                  priority
                  fetchPriority="high"
                  className="w-10 h-10 object-contain relative z-10 rounded-lg"
                  sizes="48px"
                />
              {/* Subtle shadow effect for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Modern logo text with better contrast */}
            <motion.span 
              className="text-xl font-bold relative z-10 text-gray-900"
              style={{
                fontWeight: '700',
                background: 'linear-gradient(135deg, #0070f3 0%, #0761d1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                padding: '4px 0',
                borderRadius: '6px'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              cloudfloo.io
            </motion.span>
          </LanguageAwareLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {navItems.map((item, index) => {
                  // Handle Services dropdown separately
                  if (item.id === 'services') {
                    return (
                      <NavigationMenuItem key={item.href}>
                        <motion.div
                          variants={navItemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <NavigationMenuTrigger 
                            className="text-gray-700 hover:text-primary transition-colors duration-300 relative group px-3 py-2 bg-transparent"
                            onClick={() => smoothScrollTo('services')}
                            onMouseEnter={() => setHoveredItem('services')}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {t('navigation.services')}
                            <motion.span 
                              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                                shouldShowUnderline('services') ? 'w-full' : 'w-0'
                              }`}
                            />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-2 gap-3 p-6 bg-white shadow-lg border border-gray-100 rounded-lg">
                              {services.map((service) => (
                                <NavigationMenuLink key={service.href} asChild>
                                  <LanguageAwareLink
                                    href={service.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50 group"
                                  >
                                    <div className="text-sm font-medium leading-none text-gray-900 group-hover:text-primary transition-colors">
                                      {service.title}
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                      {service.description}
                                    </p>
                                  </LanguageAwareLink>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </motion.div>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.href}>
                      <motion.div
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                      >
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => smoothScrollTo(item.id)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="text-gray-700 hover:text-primary transition-colors duration-300 relative group px-3 py-2"
                          >
                            {item.label}
                            <motion.span 
                              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                                shouldShowUnderline(item.id) ? 'w-full' : 'w-0'
                              }`}
                            />
                          </button>
                        </NavigationMenuLink>
                      </motion.div>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
            
            <MotionButton 
              onClick={() => smoothScrollTo('contact')}
              className="bg-gradient-primary text-white hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('navigation.getStarted')}
            </MotionButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary transition-colors duration-300 relative z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('navigation.toggleMenu')}
            style={{
              padding: '8px',
              borderRadius: '6px',
              background: isMenuOpen ? 'rgba(243, 244, 246, 0.8)' : 'transparent',
              backdropFilter: isMenuOpen ? 'blur(4px)' : 'none'
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 bg-white/95 backdrop-blur-md rounded-lg p-6 overflow-hidden border border-gray-200 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => smoothScrollTo(item.id)}
                  className={\`block text-gray-700 hover:text-primary transition-colors duration-300 py-3 w-full text-left text-lg font-medium ${
                    pathname === '/' && activeSection === item.id ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Services Menu */}
              <div className="py-2 border-t border-gray-200 mt-4">
                <div className="pl-4 space-y-3">
                  {services.map((service) => (
                    <LanguageAwareLink
                      key={service.href}
                      href={service.href}
                      className="block text-sm text-gray-500 hover:text-primary transition-colors duration-300 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.title}
                    </LanguageAwareLink>
                  ))}
                </div>
              </div>
              
              <MotionButton 
                onClick={() => smoothScrollTo('contact')}
                className="w-full bg-gradient-primary text-white hover:shadow-md transition-all duration-300 mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('navigation.getStarted')}
              </MotionButton>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
