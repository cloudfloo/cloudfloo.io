'use client';

import Link from 'next/link';
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
  const { t, isLoaded } = useLanguage();

  // Fix hydration issues by only enabling client-side features after mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only track active sections on homepage
      if (pathname === '/' && hasMounted) {
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
    
    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      window.location.href = `/#${elementId}`;
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
      title: t('services.aiAutomation.title'),
      href: '/services/ai-ml',
      description: t('services.aiAutomation.description')
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
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    
    // On homepage, show underline for active section or hovered item
    if (pathname === '/') {
      return hoveredItem === itemId || (hoveredItem === null && activeSection === itemId);
    }
    // On other pages, only show on hover
    return hoveredItem === itemId;
  };

  // If client-side hydration hasn't happened yet, return a simple version without interactive elements
  if (!hasMounted) {
    return (
      <header className="fixed top-0 w-full z-50 bg-transparent">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative"></div>
              <span className="text-xl font-bold text-white">cloudfloo.io</span>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-6">
                {/* Static placeholders for nav items */}
              </div>
            </div>
            <div className="md:hidden">
              <div className="w-6 h-6"></div>
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
        isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
      style={isScrolled ? headerVariants.scrolled : {}}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('home');
          }} className="flex items-center space-x-3 group cursor-pointer">
            <Image
              src="/logo.png"
              alt="CloudFloo Logo"
              width={64}
              height={64}
              className="w-12 h-12"
            />
             <motion.span 
               className="text-xl font-bold text-white group-hover:text-neon transition-colors duration-700"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4, duration: 0.7 }}
            >
              cloudfloo.io
            </motion.span>
          </Link>

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
                            className="text-gray-300 hover:text-neon transition-colors duration-300 relative group px-3 py-2 bg-transparent"
                            onClick={() => smoothScrollTo('services')}
                            onMouseEnter={() => setHoveredItem('services')}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            {t('navigation.services')}
                            <motion.span 
                              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-neon transition-all duration-300 ${
                                shouldShowUnderline('services') ? 'w-full' : 'w-0'
                              }`}
                            />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-2 gap-3 p-6 glass backdrop-blur-md border border-gray-700">
                              {services.map((service) => (
                                <NavigationMenuLink key={service.href} asChild>
                                  <Link
                                    href={service.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                                  >
                                    <div className="text-sm font-medium leading-none text-white group-hover:text-neon transition-colors">
                                      {service.title}
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                      {service.description}
                                    </p>
                                  </Link>
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
                            className="text-gray-300 hover:text-neon transition-colors duration-300 relative group px-3 py-2"
                          >
                            {item.label}
                            <motion.span 
                              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-neon transition-all duration-300 ${
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
              className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('navigation.getStarted')}
            </MotionButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-neon transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('navigation.toggleMenu')}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-lg p-6 overflow-hidden">
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => smoothScrollTo(item.id)}
                  className={`block text-gray-300 hover:text-neon transition-colors duration-300 py-2 w-full text-left ${
                    pathname === '/' && activeSection === item.id ? 'text-neon' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Services Menu */}
              <div className="py-2">
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block text-sm text-gray-400 hover:text-neon transition-colors duration-300 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              <MotionButton 
                onClick={() => smoothScrollTo('contact')}
                className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('navigation.getStarted')}
              </MotionButton>
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
}
