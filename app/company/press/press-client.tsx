'use client';

import Link from 'next/link';
import { ArrowLeft, Download, FileText, Image, Video, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PressClient() {
  const pressReleases = [
    {
      title: 'CloudFloo.io Raises $15M Series A to Accelerate AI-Powered Cloud Solutions',
      date: '2024-01-20',
      excerpt: 'Funding will support expansion of AI automation platform and global team growth.',
      link: '#'
    },
    {
      title: 'CloudFloo.io Partners with Major Enterprise Clients for Digital Transformation',
      date: '2024-01-10',
      excerpt: 'New partnerships demonstrate growing demand for comprehensive cloud solutions.',
      link: '#'
    },
    {
      title: 'CloudFloo.io Launches Revolutionary Edge Computing Platform',
      date: '2023-12-15',
      excerpt: 'New platform delivers sub-10ms response times for global applications.',
      link: '#'
    }
  ];

  const brandAssets = [
    {
      category: 'Logos',
      icon: Image,
      items: [
        { name: 'Primary Logo (PNG)', size: '2.1 MB', format: 'PNG' },
        { name: 'Primary Logo (SVG)', size: '156 KB', format: 'SVG' },
        { name: 'Logo Mark Only (PNG)', size: '1.8 MB', format: 'PNG' },
        { name: 'White Logo (PNG)', size: '2.0 MB', format: 'PNG' },
        { name: 'Black Logo (PNG)', size: '1.9 MB', format: 'PNG' }
      ]
    },
    {
      category: 'Brand Guidelines',
      icon: FileText,
      items: [
        { name: 'Brand Style Guide', size: '8.5 MB', format: 'PDF' },
        { name: 'Logo Usage Guidelines', size: '3.2 MB', format: 'PDF' },
        { name: 'Color Palette', size: '1.1 MB', format: 'PDF' }
      ]
    },
    {
      category: 'Media Assets',
      icon: Video,
      items: [
        { name: 'Company Overview Video', size: '45 MB', format: 'MP4' },
        { name: 'Product Demo Screenshots', size: '12 MB', format: 'ZIP' },
        { name: 'Team Photos', size: '25 MB', format: 'ZIP' }
      ]
    }
  ];

  const companyFacts = [
    { label: 'Founded', value: '2022' },
    { label: 'Headquarters', value: 'San Francisco, CA' },
    { label: 'Employees', value: '50+' },
    { label: 'Funding', value: '$15M Series A' },
    { label: 'Clients', value: '500+ Companies' },
    { label: 'Global Reach', value: '25+ Countries' }
  ];

  const mediaContacts = [
    {
      name: 'Sarah Johnson',
      role: 'Head of Communications',
      email: 'press@cloudfloo.io',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Michael Chen',
      role: 'PR Manager',
      email: 'media@cloudfloo.io',
      phone: '+1 (555) 123-4568'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-300 hover:text-neon transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-gray-500">/</div>
            <div className="text-neon">Press Kit</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Press <span className="text-neon">Kit</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Media resources, brand assets, and company information for journalists and media professionals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Company at a Glance</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key facts and figures about CloudFloo.io.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companyFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-neon mb-2">{fact.value}</div>
                    <div className="text-sm text-gray-300">{fact.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Latest Press Releases</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Recent news and announcements from CloudFloo.io.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white mb-2">{release.title}</CardTitle>
                        <CardDescription className="text-gray-300 mb-2">
                          {release.excerpt}
                        </CardDescription>
                        <div className="text-sm text-gray-400">
                          {new Date(release.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <Link href={release.link}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-neon text-neon hover:bg-neon/10 ml-4"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Brand Assets</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Download our logos, brand guidelines, and media assets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandAssets.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-neon/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-neon" />
                      </div>
                      <CardTitle className="text-white">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <div className="text-sm text-white">{item.name}</div>
                            <div className="text-xs text-gray-400">{item.size} • {item.format}</div>
                          </div>
                          <Button size="sm" variant="ghost" className="text-neon hover:bg-neon/10">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" className="bg-gradient-neon text-white">
              <Download className="w-5 h-5 mr-2" />
              Download Complete Press Kit
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Media Contacts */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Media Contacts</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get in touch with our media relations team for interviews and inquiries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mediaContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{contact.name}</CardTitle>
                    <CardDescription className="text-neon">{contact.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-neon" />
                      <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-neon transition-colors">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-neon" />
                      <a href={`tel:${sanitizePhoneNumber(contact.phone)}`} className="text-gray-300 hover:text-neon transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

