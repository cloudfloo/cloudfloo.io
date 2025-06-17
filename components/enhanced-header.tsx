'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Cloud, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function EnhancedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only track active sections on homepage
      if (pathname === '/') {
        // Get all sections
        const sections = ['home', 'services', 'about', 'projects', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
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
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const services = [
    {
      title: 'Cloud Solutions',
      href: '/services/cloud-solutions',
      description: 'Scalable cloud infrastructure and migration services'
    },
    {
      title: 'AI & Machine Learning',
      href: '/services/ai-ml',
      description: 'Intelligent automation and ML operations'
    },
    {
      title: 'DevOps & Automation',
      href: '/services/devops',
      description: 'CI/CD pipelines and infrastructure automation'
    },
    {
      title: 'Data Engineering',
      href: '/services/data-engineering',
      description: 'Data pipelines and analytics platforms'
    },
    {
      title: 'Application Development',
      href: '/services/app-development',
      description: 'Custom web and mobile applications'
    },
    {
      title: 'Edge Computing',
      href: '/services/edge-computing',
      description: 'Ultra-fast edge functions and CDN solutions'
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
    // On homepage, show underline for active section or hovered item
    if (pathname === '/') {
      return hoveredItem === itemId || (hoveredItem === null && activeSection === itemId);
    }
    // On other pages, only show on hover
    return hoveredItem === itemId;
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hasMounted && isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      }`}
      style={hasMounted && isScrolled ? headerVariants.scrolled : {}}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => smoothScrollTo('home')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="relative"
            >
              <div className="w-12 h-12 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    viewBox="0 0 400 400" 
                    className="w-10 h-10"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.3))'
                    }}
                  >
                    <defs>
                      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" />
                        <stop offset="50%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#FF00E0" />
                      </linearGradient>
                    </defs>
                    
                    <path
                      d="M100 200 C100 150, 150 100, 200 100 C250 100, 300 150, 300 200 C350 200, 400 250, 400 300 C400 350, 350 400, 300 400 L100 400 C50 400, 0 350, 0 300 C0 250, 50 200, 100 200 Z"
                      fill="url(#cloudGradient)"
                      opacity="0.9"
                    />
                    
                    <path
                      d="M120 200 C120 180, 140 160, 160 160 C180 160, 200 180, 200 200 C200 180, 220 160, 240 160 C260 160, 280 180, 280 200 C280 220, 260 240, 240 240 C220 240, 200 220, 200 200 C200 220, 180 240, 160 240 C140 240, 120 220, 120 200 Z"
                      fill="rgba(255, 255, 255, 0.8)"
                      stroke="url(#cloudGradient)"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-white group-hover:text-neon transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              cloudfloo.io
            </motion.span>
          </button>

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
                            Services
                            <motion.span 
                              className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-neon transition-all duration-300 ${
                                shouldShowUnderline('services') ? 'w-full' : 'w-0'
                              }`}
                            />
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-2 gap-3 p-6 glass backdrop-blur-md border border-gray-700">
                              {services.map((service, serviceIndex) => (
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
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <button onClick={() => smoothScrollTo('contact')}>
                <MotionButton 
                  className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </MotionButton>
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white hover:text-neon transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-4 glass rounded-lg p-6 overflow-hidden"
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <button
                      onClick={() => smoothScrollTo(item.id)}
                      className={`block text-gray-300 hover:text-neon transition-colors duration-300 py-2 w-full text-left ${
                        pathname === '/' && activeSection === item.id ? 'text-neon' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
                
                {/* Mobile Services Menu */}
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navItems.length}
                >
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
                </motion.div>
                
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={navItems.length + 1}
                >
                  <button onClick={() => smoothScrollTo('contact')}>
                    <MotionButton 
                      className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </MotionButton>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}