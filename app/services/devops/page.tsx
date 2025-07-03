import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Settings, GitBranch, Zap, Shield, Monitor, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'DevOps i Automatyzacja - CI/CD, Kubernetes | CloudFloo',
  description: 'Pipeline\'y CI/CD, Kubernetes, Terraform, monitoring Grafana/Prometheus. Automatyzacja infrastruktury i deploymentów 🔧',
};

export default function DevOpsPage() {
  const features = [
    {
      icon: GitBranch,
      title: 'CI/CD Pipelines',
      description: 'Automated build, test, and deployment pipelines for faster, reliable releases.'
    },
    {
      icon: Settings,
      title: 'Infrastructure as Code',
      description: 'Version-controlled infrastructure management with Terraform and Ansible.'
    },
    {
      icon: Monitor,
      title: 'Monitoring & Alerting',
      description: 'Comprehensive observability with real-time monitoring and intelligent alerting.'
    },
    {
      icon: Shield,
      title: 'Security Integration',
      description: 'DevSecOps practices with automated security scanning and compliance checks.'
    },
    {
      icon: Zap,
      title: 'Auto-scaling',
      description: 'Dynamic resource management based on demand with cost optimization.'
    },
    {
      icon: Rocket,
      title: 'Deployment Strategies',
      description: 'Blue-green, canary, and rolling deployments for zero-downtime releases.'
    }
  ];

  const technologies = [
    'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'Docker', 'Kubernetes',
    'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ELK Stack'
  ];

  const benefits = [
    {
      title: 'Faster Time to Market',
      description: 'Reduce deployment time from weeks to minutes with automated pipelines.',
      metric: '90% faster deployments'
    },
    {
      title: 'Improved Reliability',
      description: 'Automated testing and monitoring ensure higher quality releases.',
      metric: '99.9% uptime achieved'
    },
    {
      title: 'Cost Optimization',
      description: 'Efficient resource utilization and automated scaling reduce operational costs.',
      metric: '40% cost reduction'
    },
    {
      title: 'Enhanced Security',
      description: 'Integrated security scanning and compliance automation.',
      metric: '100% security coverage'
    }
  ];

  const services = [
    {
      category: 'Pipeline Automation',
      items: ['CI/CD Setup', 'Automated Testing', 'Code Quality Gates', 'Deployment Automation']
    },
    {
      category: 'Infrastructure Management',
      items: ['Infrastructure as Code', 'Configuration Management', 'Environment Provisioning', 'Resource Optimization']
    },
    {
      category: 'Monitoring & Observability',
      items: ['Application Monitoring', 'Infrastructure Monitoring', 'Log Management', 'Performance Analytics']
    },
    {
      category: 'Security & Compliance',
      items: ['Security Scanning', 'Compliance Automation', 'Vulnerability Management', 'Access Control']
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
            <div className="text-neon">DevOps & Automation</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <h1 id="devops-automation" className="text-5xl md:text-6xl font-bold mb-6">
              DevOps & <span className="text-neon">Automation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Accelerate your development lifecycle with modern DevOps practices. We implement automated pipelines, 
              infrastructure as code, and comprehensive monitoring to ensure fast, reliable, and secure deployments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                Optimize Your Pipeline
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                DevOps Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Complete DevOps Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From code commit to production deployment, we automate every step of your development pipeline.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
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

      {/* Services Grid */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">DevOps Service Areas</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive DevOps capabilities covering all aspects of modern software delivery.
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">DevOps Benefits</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable improvements in speed, reliability, and cost efficiency.
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

      {/* Technologies Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">DevOps Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-leading tools and platforms for modern DevOps practices.
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your Development?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your development process with modern DevOps practices and automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              Start DevOps Transformation
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Get DevOps Audit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}