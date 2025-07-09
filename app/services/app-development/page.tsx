import { Metadata } from 'next';
import BackToHomeButton from '@/components/BackToHomeButton';
import { Code, Smartphone, Globe, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuroraBackground } from '@/components/ui/aurora-background';

export const metadata: Metadata = {
  title: 'Rozwój Aplikacji Web i Mobile - React, Next.js | CloudFloo',
  description: 'Profesjonalny rozwój aplikacji webowych i mobilnych. Tworzymy nowoczesne rozwiązania w React, Next.js, TypeScript i React Native 🔧',
};

export default function AppDevelopmentPage() {
  const features = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'End-to-end application development with modern frameworks and architectures.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps for iOS and Android platforms.'
    },
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Responsive web applications with progressive web app capabilities.'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'High-performance applications with optimized loading times and user experience.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built-in security measures and compliance with industry standards.'
    },
    {
      icon: Users,
      title: 'User Experience',
      description: 'Intuitive interfaces designed for optimal user engagement and conversion.'
    }
  ];

  const technologies = [
    'React', 'Next.js', 'Vue.js', 'Angular', 'React Native',
    'Flutter', 'Node.js', 'Python', 'TypeScript', 'GraphQL'
  ];

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-featured e-commerce platform with real-time inventory and payment processing.',
      metrics: ['1M+ users', '99.9% uptime', '< 2s load time']
    },
    {
      title: 'Healthcare Mobile App',
      description: 'HIPAA-compliant mobile application for patient management and telemedicine.',
      metrics: ['50K+ downloads', '4.8★ rating', 'HIPAA compliant']
    },
    {
      title: 'Financial Dashboard',
      description: 'Real-time financial analytics dashboard with advanced data visualization.',
      metrics: ['Real-time data', 'Multi-tenant', 'SOC 2 compliant']
    }
  ];

  const services = [
    {
      category: 'Web Development',
      items: ['Single Page Applications', 'Progressive Web Apps', 'E-commerce Platforms', 'Content Management Systems']
    },
    {
      category: 'Mobile Development',
      items: ['Native iOS Apps', 'Native Android Apps', 'Cross-platform Apps', 'Mobile Backend Services']
    },
    {
      category: 'Backend Development',
      items: ['RESTful APIs', 'GraphQL APIs', 'Microservices', 'Database Design']
    },
    {
      category: 'UI/UX Design',
      items: ['User Interface Design', 'User Experience Research', 'Prototyping', 'Design Systems']
    }
  ];

  const developmentProcess = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'Requirements gathering, technical architecture, and project roadmap.'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'UI/UX design, wireframing, and interactive prototypes.'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Agile development with continuous testing and quality assurance.'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Production deployment with ongoing maintenance and support.'
    }
  ];

  return (
    <AuroraBackground className="aurora-green">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <BackToHomeButton />
              <div className="text-gray-500">/</div>
              <div className="text-neon">Application Development</div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Removed bg-gradient-to-br background */}
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h1 id="app-development" className="text-5xl md:text-6xl font-bold mb-6">
                Application <span className="text-neon">Development</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Build powerful, scalable applications that drive business growth. From web platforms to mobile apps, 
                we create custom solutions using modern technologies and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-neon text-white">
                  Start Your Project
                </Button>
                <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Development Expertise</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive application development services for web, mobile, and enterprise solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
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

        {/* Development Process */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Development Process</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A proven methodology that ensures successful project delivery from concept to launch.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentProcess.map((process, index) => (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="text-4xl font-bold text-neon mb-4">{process.step}</div>
                    <CardTitle className="text-white">{process.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {process.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Development Services</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Full-spectrum development services for all your application needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{service.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-neon rounded-full mr-3"></div>
                          <span className="text-sm text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Technologies We Use</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Modern frameworks and tools for building high-performance applications.
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

        {/* Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Featured Projects</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Successful applications we've built for clients across various industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {project.metrics.map((metric, metricIndex) => (
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
        <section className="py-20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Application?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's turn your ideas into powerful applications that drive business success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                Start Development
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                Get Project Estimate
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}