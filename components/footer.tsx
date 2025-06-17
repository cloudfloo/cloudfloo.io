import Link from 'next/link';
import { Cloud, Github, Twitter, Linkedin, Mail } from 'lucide-react';

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
      { name: 'Our Team', href: '/company/team' },
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
    <footer className="bg-black/50 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="w-8 h-8 text-neon" />
              <span className="text-xl font-bold text-neon">cloudfloo.io</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering businesses with next-generation cloud solutions and AI-driven automation.
            </p>
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
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-neon transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 CloudFloo.io. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">
              Built with ❤️ using Next.js
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}