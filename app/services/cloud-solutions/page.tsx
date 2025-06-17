import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cloud, Server, Shield, Zap, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Cloud Solutions - CloudFloo.io',
  description: 'Comprehensive cloud infrastructure solutions including migration, scaling, and optimization services.',
};

export default function CloudSolutionsPage() {
  const features = [
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamless migration from on-premises to cloud with zero downtime strategies.'
    },
    {
      icon: Server,
      title: 'Infrastructure as Code',
      description: 'Automated infrastructure provisioning using Terraform and CloudFormation.'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with SOC 2, HIPAA, and GDPR compliance.'
    },
    {
      icon: Zap,
      title: 'Auto-Scaling',
      description: 'Dynamic resource allocation based on demand with cost optimization.'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Worldwide content delivery for optimal performance and user experience.'
    },
    {
      icon: Database,
      title: 'Managed Databases',
      description: 'Fully managed database solutions with automated backups and monitoring.'
    }
  ];

  const technologies = [
    'AWS', 'Google Cloud', 'Microsoft Azure', 'Kubernetes', 'Docker',
    'Terraform', 'CloudFormation', 'Ansible', 'Jenkins', 'GitLab CI/CD'
  ];

  const caseStudies = [
    {
      title: 'E-commerce Platform Migration',
      description: 'Migrated a legacy e-commerce platform to AWS, reducing costs by 40% and improving performance by 60%.',
      metrics: ['40% cost reduction', '60% performance improvement', '99.99% uptime']
    },
    {
      title: 'Healthcare Data Platform',
      description: 'Built HIPAA-compliant cloud infrastructure for medical data processing and analytics.',
      metrics: ['HIPAA compliant', '1B+ records processed', '< 100ms query time']
    },
    {
      title: 'Financial Services Scaling',
      description: 'Implemented auto-scaling infrastructure handling 10x traffic spikes during market events.',
      metrics: ['10x traffic handling', '99.9% availability', '50% cost optimization']
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
            <div className="text-neon">Cloud Solutions</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Cloud className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cloud <span className="text-neon">Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your infrastructure with enterprise-grade cloud solutions. We provide comprehensive migration, 
              scaling, and optimization services that reduce costs while improving performance and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                Start Your Migration
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Comprehensive Cloud Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From migration planning to ongoing optimization, we handle every aspect of your cloud journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Technologies We Use</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We work with industry-leading cloud platforms and tools to deliver robust solutions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 glass rounded-full border border-gray-700 hover:border-neon/50 transition-all duration-300"
              >
                <span className="text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real results from our cloud transformation projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{study.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {study.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-neon rounded-full mr-3"></div>
                        <span className="text-sm text-gray-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Infrastructure?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your cloud migration strategy and build a solution that scales with your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Download Migration Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}