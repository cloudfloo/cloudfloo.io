import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cloud, Bot, Settings, Database, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Services - CloudFloo.io',
  description: 'Comprehensive cloud solutions, AI automation, DevOps, and application development services.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      href: '/services/cloud-solutions',
      features: ['Cloud Migration', 'Infrastructure as Code', 'Auto-scaling', 'Security & Compliance'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'AI & Machine Learning',
      description: 'Intelligent automation and ML operations for data-driven insights.',
      href: '/services/ai-ml',
      features: ['Custom ML Models', 'Intelligent Automation', 'Predictive Analytics', 'MLOps Pipeline'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Settings,
      title: 'DevOps & Automation',
      description: 'Streamlined CI/CD pipelines and infrastructure automation.',
      href: '/services/devops',
      features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Alerting', 'Security Integration'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Robust data pipelines and analytics solutions for business intelligence.',
      href: '/services/data-engineering',
      features: ['Data Pipeline Design', 'Real-time Processing', 'Analytics Platforms', 'Data Governance'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Code,
      title: 'Application Development',
      description: 'Custom web and mobile applications built with modern frameworks.',
      href: '/services/app-development',
      features: ['Full-Stack Development', 'Mobile Applications', 'Web Applications', 'Performance Optimization'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Edge Computing',
      description: 'Ultra-fast edge functions and CDN solutions for global performance.',
      href: '/services/edge-computing',
      features: ['Ultra-Low Latency', 'Global Distribution', 'Serverless Functions', 'Real-time Processing'],
      color: 'from-teal-500 to-green-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered' },
    { number: '99.99%', label: 'Uptime Guarantee' },
    { number: '50+', label: 'Enterprise Clients' },
    { number: '24/7', label: 'Support Available' }
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
            <div className="text-neon">Services</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-neon">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive technology solutions designed to accelerate your digital transformation. 
              From cloud infrastructure to AI automation, we provide the expertise you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Complete Technology Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert services across the entire technology stack, delivered by seasoned professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-neon transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={service.href}>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-gray-600 text-gray-300 hover:border-neon hover:text-neon hover:bg-neon/10 transition-all duration-300"
                      >
                        Learn More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Why Choose CloudFloo?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">01</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
                <p className="text-gray-300">Industry veterans with deep expertise across all major cloud platforms and technologies.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">02</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Proven Results</h3>
                <p className="text-gray-300">500+ successful projects with measurable business impact and ROI.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">03</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Partnership Approach</h3>
                <p className="text-gray-300">We work as your technology partner, not just a service provider.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}