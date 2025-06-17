'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="#home" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    viewBox="0 0 400 400" 
                    className="w-10 h-10 transition-all duration-300 group-hover:scale-105"
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
                    
                    {/* Cloud shape with infinity symbol */}
                    <path
                      d="M100 200 C100 150, 150 100, 200 100 C250 100, 300 150, 300 200 C350 200, 400 250, 400 300 C400 350, 350 400, 300 400 L100 400 C50 400, 0 350, 0 300 C0 250, 50 200, 100 200 Z"
                      fill="url(#cloudGradient)"
                      opacity="0.9"
                    />
                    
                    {/* Infinity symbol overlay */}
                    <path
                      d="M120 200 C120 180, 140 160, 160 160 C180 160, 200 180, 200 200 C200 180, 220 160, 240 160 C260 160, 280 180, 280 200 C280 220, 260 240, 240 240 C220 240, 200 220, 200 200 C200 220, 180 240, 160 240 C140 240, 120 220, 120 200 Z"
                      fill="rgba(255, 255, 255, 0.8)"
                      stroke="url(#cloudGradient)"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-lg group-hover:opacity-30 transition-all duration-300 rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-neon transition-colors duration-300">
              cloudfloo.io
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-neon transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-neon transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link href="#contact">
              <Button className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-neon transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 glass rounded-lg p-6 animate-slide-in">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 hover:text-neon transition-colors duration-300 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}