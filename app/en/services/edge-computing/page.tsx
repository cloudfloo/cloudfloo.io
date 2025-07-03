import { Metadata } from 'next';
import BackToHomeButton from '@/components/BackToHomeButton';
import { Zap, Globe, Server, Clock, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Edge Computing - CDN i Funkcje Serverless | CloudFloo',
  description: 'Ultraszybkie funkcje edge, CDN, przetwarzanie rozproszone. Optymalizacja wydajności globalnych aplikacji web 🔧',
};

export default function EdgeComputingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Ultra-Low Latency',
      description: 'Sub-10ms response times with computation at the edge of the network.'
    },
    {
      icon: Globe,
      title: 'Global Distribution',
      description: 'Worldwide edge locations ensuring optimal performance for all users.'
    },
    {
      icon: Server,
      title: 'Serverless Functions',
      description: 'Auto-scaling serverless functions deployed at edge locations globally.'
    },
    {
      icon: Clock,
      title: 'Real-time Processing',
      description: 'Process data at the source for immediate insights and responses.'
    },
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Distributed security with DDoS protection and data sovereignty.'
    },
    {
      icon: TrendingUp,
      title: 'Cost Optimization',
      description: 'Reduce bandwidth costs and improve efficiency with edge processing.'
    }
  ];

  const technologies = [
    'Cloudflare Workers', 'AWS Lambda@Edge', 'Vercel Edge Functions', 'Fastly Compute',
    'Azure Functions', 'Google Cloud Functions', 'WebAssembly', 'V8 Isolates'
  ];

  const useCases = [
    {
      title: 'Content Delivery Network',
      description: 'Global CDN with edge caching and dynamic content optimization.',
      metrics: ['< 50ms latency', '99.99% uptime', '70% bandwidth savings']
    },
    {
      title: 'Real-time Gaming',
      description: 'Low-latency game state synchronization and matchmaking at the edge.',
      metrics: ['< 10ms latency', '1M+ concurrent users', '99.9% availability']
    },
    {
      title: 'IoT Data Processing',
      description: 'Edge processing for IoT devices with real-time analytics and alerts.',
      metrics: ['1M+ devices', 'Real-time processing', '90% cost reduction']
    }
  ];

  const benefits = [
    {
      title: 'Performance',
      description: 'Dramatically reduced latency by processing data closer to users.',
      metric: '10x faster'
    },
    {
      title: 'Scalability',
      description: 'Auto-scaling edge functions handle traffic spikes seamlessly.',
      metric: 'Infinite scale'
    },
    {
      title: 'Reliability',
      description: 'Distributed architecture ensures high availability and fault tolerance.',
      metric: '99.99% uptime'
    },
    {
      title: 'Cost Efficiency',
      description: 'Reduce bandwidth and infrastructure costs with edge processing.',
      metric: '60% savings'
    }
  ];

  const edgeServices = [
    {
      category: 'Edge Functions',
      items: ['Serverless Computing', 'API Gateway', 'Authentication', 'Data Transformation']
    },
    {
      category: 'Content Delivery',
      items: ['Static Asset Caching', 'Dynamic Content', 'Image Optimization', 'Video Streaming']
    },
    {
      category: 'Security',
      items: ['DDoS Protection', 'Web Application Firewall', 'Bot Management', 'SSL/TLS Termination']
    },
    {
      category: 'Analytics',
      items: ['Real-time Metrics', 'Performance Monitoring', 'User Analytics', 'Error Tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">Edge Computing</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-green-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 id="edge-computing" className="text-5xl md:text-6xl font-bold mb-6">
              Edge <span className="text-neon">Computing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Deliver lightning-fast experiences with edge computing solutions. Process data at the network edge 
              for ultra-low latency, improved performance, and reduced bandwidth costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                Deploy to Edge
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                Performance Analysis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Edge Computing Advantages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Harness the power of distributed computing for unparalleled performance and user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
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

      {/* Benefits Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Edge Computing Benefits</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable improvements in performance, scalability, and cost efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{benefit.title}</CardTitle>
                  <div className="text-2xl font-bold text-neon">{benefit.metric}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {benefit.description}
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
            <h2 className="text-4xl font-bold mb-6">Edge Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive edge computing services for modern applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {edgeServices.map((service, index) => (
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
            <h2 className="text-4xl font-bold mb-6">Edge Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading edge computing platforms and technologies.
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

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Edge Computing Use Cases</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world applications delivering exceptional performance at the edge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{useCase.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {useCase.metrics.map((metric, metricIndex) => (
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
      <section className="py-20 bg-gradient-to-r from-teal-900/20 to-green-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go to the Edge?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your application performance with edge computing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              Deploy Edge Functions
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Edge Performance Audit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}