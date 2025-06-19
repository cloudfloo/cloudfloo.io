import Link from 'next/link';
import Image from 'next/image';
import { placeholders, DEFAULT_BLUR } from '@/data/placeholders';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Footer() {
  const footerLinks = {
    Services: [
      { name: 'Cloud Solutions', href: '/services/cloud-solutions' },
      { name: 'AI & Machine Learning', href: '/services/ai-ml' },
      { name: 'DevOps & Automation', href: '/services/devops' },
      { name: 'Data Engineering', href: '/services/data-engineering' },
      { name: 'Application Development', href: '/services/app-development' },
      { name: 'Edge Computing', href: '/services/edge-computing' },
    ],
    Company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/company/careers' },
      { name: 'Blog', href: '/company/blog' },
      { name: 'Press', href: '/company/press' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
      { name: 'GDPR Compliance', href: '/legal/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/cloudfloo', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/cloudfloo', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/cloudfloo', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@cloudfloo.io', label: 'Email' },
  ];

  return (
    <footer className="bg-black/50 border-t border-gray-800" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
      <div className="container mx-auto px-6 py-12" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
            <div className="flex items-center space-x-2 mb-4">
              <picture>
                <source srcSet="/logo.avif" type="image/avif" />
                <source srcSet="/logo.webp" type="image/webp" />
                <Image
                  src="/logo.png"
                  alt="CloudFloo Logo"
                  width={32}
                  height={32}
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  blurDataURL={placeholders['/logo.png'] ?? DEFAULT_BLUR}
                  className="object-contain w-8 h-8"
                />
              </picture>
              <span className="text-xl font-bold text-neon" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>cloudfloo.io</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              Empowering businesses with next-generation cloud solutions and AI-driven automation.
            </p>
            
            {/* Contact Information */}
            <div className="mb-6 space-y-2" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              <div className="text-sm text-gray-400" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                <strong className="text-white" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>Address:</strong><br />
                <span style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>Chmieleniec 17/69</span><br />
                <span style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>30-348 Krakow, Poland</span>
              </div>
              <div className="text-sm text-gray-400" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                <strong className="text-white" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>Phone:</strong> <span style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>+48 728 963 591</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-neon/10 hover:text-neon transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              <h3 className="text-white font-semibold mb-4" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>{category}</h3>
              <ul className="space-y-2" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                {links.map((link, index) => (
                  <li key={index} style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-neon transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                      style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-gray-400 text-sm" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              © 2025 CloudFloo.io. All rights reserved.
            </p>
            <LanguageSwitcher />
          </div>
          
          <div className="flex items-center space-x-6" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
            <span className="text-sm text-gray-400" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>
              Built with ❤️ using Next.js
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400" style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}