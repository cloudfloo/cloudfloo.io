'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Cloud, Bot, Settings, Database, Code, Zap, Server, Monitor, Smartphone, GitBranch, Package, Workflow, CheckCircle, Search, Bug, Shield, Target, Cpu, HardDrive, Network, Activity, BarChart3, Globe, Palette, Layout, Code2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';

interface TechIconProps {
  name: string;
  logo: string;
  fallbackIcon: any;
  className?: string;
}

function TechIcon({ name, logo, fallbackIcon: FallbackIcon, className = '' }: TechIconProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <FallbackIcon className={`text-gray-400 ${className}`} />;
  }

  return (
    <Image
      src={`https://techicons.dev/icons/${logo}.svg`}
      alt={name}
      className={className}
      onError={() => setImageError(true)}
      width={24}
      height={24}
      unoptimized
    />
  );
}

export default function ServicesPage() {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services for modern businesses.',
      href: '/services/cloud-solutions',
      features: ['Cloud Migration', 'Infrastructure as Code', 'Auto-scaling', 'Security & Compliance'],
      color: 'from-blue-500 to-cyan-500',
      techIcons: [Server, Database, Shield, Network]
    },
    {
      icon: Bot,
      title: 'AI & Machine Learning',
      description: 'Intelligent automation and ML operations for data-driven insights.',
      href: '/services/ai-ml',
      features: ['Custom ML Models', 'Intelligent Automation', 'Predictive Analytics', 'MLOps Pipeline'],
      color: 'from-purple-500 to-pink-500',
      techIcons: [Cpu, BarChart3, Activity, Target]
    },
    {
      icon: Settings,
      title: 'DevOps & Automation',
      description: 'Streamlined CI/CD pipelines and infrastructure automation.',
      href: '/services/devops',
      features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Alerting', 'Security Integration'],
      color: 'from-orange-500 to-red-500',
      techIcons: [GitBranch, Package, Workflow, CheckCircle]
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Robust data pipelines and analytics solutions for business intelligence.',
      href: '/services/data-engineering',
      features: ['Data Pipeline Design', 'Real-time Processing', 'Analytics Platforms', 'Data Governance'],
      color: 'from-indigo-500 to-blue-500',
      techIcons: [HardDrive, BarChart3, Activity, Search]
    },
    {
      icon: Code,
      title: 'Application Development',
      description: 'Custom web and mobile applications built with modern frameworks.',
      href: '/services/app-development',
      features: ['Full-Stack Development', 'Mobile Applications', 'Web Applications', 'Performance Optimization'],
      color: 'from-green-500 to-emerald-500',
      techIcons: [Monitor, Smartphone, Code2, Globe]
    },
    {
      icon: Zap,
      title: 'Edge Computing',
      description: 'Ultra-fast edge functions and CDN solutions for global performance.',
      href: '/services/edge-computing',
      features: ['Ultra-Low Latency', 'Global Distribution', 'Serverless Functions', 'Real-time Processing'],
      color: 'from-teal-500 to-green-500',
      techIcons: [Globe, Network, Zap, Activity]
    }
  ];

  // Complete technology showcase with REAL logos from techicons.dev
  const technologyStack = {
    'Cloud Platforms': [
      { name: 'AWS', icon: Cloud, category: 'Infrastructure', logo: 'aws' },
      { name: 'Google Cloud', icon: Cloud, category: 'Infrastructure', logo: 'gcp' },
      { name: 'Microsoft Azure', icon: Cloud, category: 'Infrastructure', logo: 'azure' },
      { name: 'DigitalOcean', icon: Server, category: 'Infrastructure', logo: 'digitalocean' },
      { name: 'Vercel', icon: Globe, category: 'Deployment', logo: 'vercel' },
      { name: 'Netlify', icon: Globe, category: 'Deployment', logo: 'netlify' }
    ],
    'Backend Technologies': [
      { name: 'Node.js', icon: Server, category: 'Runtime', logo: 'nodejs' },
      { name: 'Python', icon: Code2, category: 'Language', logo: 'python' },
      { name: 'NestJS', icon: Server, category: 'Framework', logo: 'nestjs' },
      { name: 'Express.js', icon: Code2, category: 'Framework', logo: 'express' },
      { name: 'FastAPI', icon: Zap, category: 'Framework', logo: 'fastapi' },
      { name: 'Go', icon: Code2, category: 'Language', logo: 'go' }
    ],
    'Databases & Storage': [
      { name: 'PostgreSQL', icon: Database, category: 'SQL', logo: 'postgresql' },
      { name: 'MongoDB', icon: HardDrive, category: 'NoSQL', logo: 'mongodb' },
      { name: 'Redis', icon: Zap, category: 'Cache', logo: 'redis' },
      { name: 'Elasticsearch', icon: Search, category: 'Search', logo: 'elasticsearch' },
      { name: 'InfluxDB', icon: BarChart3, category: 'Time Series', logo: 'influxdb' },
      { name: 'Amazon S3', icon: HardDrive, category: 'Object Storage', logo: 'amazons3' }
    ],
    'Frontend & Mobile': [
      { name: 'React', icon: Monitor, category: 'Library', logo: 'react' },
      { name: 'Next.js', icon: Layout, category: 'Framework', logo: 'nextjs' },
      { name: 'TypeScript', icon: Code2, category: 'Language', logo: 'typescript' },
      { name: 'React Native', icon: Smartphone, category: 'Mobile', logo: 'react' },
      { name: 'Flutter', icon: Smartphone, category: 'Mobile', logo: 'flutter' },
      { name: 'Vue.js', icon: Palette, category: 'Framework', logo: 'vuejs' }
    ],
    'DevOps & Infrastructure': [
      { name: 'Docker', icon: Package, category: 'Container', logo: 'docker' },
      { name: 'Kubernetes', icon: Server, category: 'Orchestration', logo: 'kubernetes' },
      { name: 'Jenkins', icon: GitBranch, category: 'CI/CD', logo: 'jenkins' },
      { name: 'GitHub Actions', icon: Workflow, category: 'CI/CD', logo: 'githubactions' },
      { name: 'Terraform', icon: Settings, category: 'IaC', logo: 'terraform' },
      { name: 'Ansible', icon: Network, category: 'Configuration', logo: 'ansible' }
    ],
    'Testing & Quality': [
      { name: 'Jest', icon: CheckCircle, category: 'Unit Testing', logo: 'jest' },
      { name: 'Playwright', icon: Bug, category: 'E2E Testing', logo: 'playwright' },
      { name: 'Cypress', icon: Target, category: 'E2E Testing', logo: 'cypress' },
      { name: 'SonarQube', icon: Search, category: 'Code Quality', logo: 'sonarqube' },
      { name: 'ESLint', icon: Shield, category: 'Linting', logo: 'eslint' },
      { name: 'Prettier', icon: Palette, category: 'Formatting', logo: 'prettier' }
    ],
    'AI & Machine Learning': [
      { name: 'TensorFlow', icon: Cpu, category: 'ML Framework', logo: 'tensorflow' },
      { name: 'PyTorch', icon: Bot, category: 'ML Framework', logo: 'pytorch' },
      { name: 'Pandas', icon: BarChart3, category: 'Data Analysis', logo: 'pandas' },
      { name: 'Apache Spark', icon: Activity, category: 'Big Data', logo: 'apachespark' },
      { name: 'Apache Kafka', icon: Network, category: 'Streaming', logo: 'apachekafka' },
      { name: 'Apache Airflow', icon: Workflow, category: 'Orchestration', logo: 'apacheairflow' }
    ],
    'Monitoring & Analytics': [
      { name: 'Grafana', icon: BarChart3, category: 'Visualization', logo: 'grafana' },
      { name: 'Prometheus', icon: Activity, category: 'Monitoring', logo: 'prometheus' },
      { name: 'New Relic', icon: Target, category: 'APM', logo: 'newrelic' },
      { name: 'Datadog', icon: Bug, category: 'Monitoring', logo: 'datadog' },
      { name: 'Sentry', icon: Shield, category: 'Error Tracking', logo: 'sentry' },
      { name: 'Google Analytics', icon: BarChart3, category: 'Analytics', logo: 'googleanalytics' }
    ]
  };

  const stats = [
    { number: '5+', label: 'Projects Delivered', icon: Target },
    { number: '99.99%', label: 'Uptime Guarantee', icon: Shield },
    { number: '3+', label: 'Enterprise Clients', icon: Globe },
    { number: '24/7', label: 'Support Available', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Services"
        description="Comprehensive cloud solutions, DevOps automation, AI/ML services, and application development by CloudFloo's senior Polish engineering team."
        keywords="cloud solutions, DevOps automation, AI machine learning, application development, data engineering, edge computing, NestJS, React, Kubernetes, Polish engineers"
        url="https://cloudfloo.io/services"
      />
      
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Our <span className="text-neon">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive technology solutions designed to accelerate your digital transformation. 
              From cloud infrastructure to AI automation, we provide the expertise you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with Icons */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-4">
                    <Icon className="w-8 h-8 text-neon mx-auto mb-2" />
                    <div className="text-3xl md:text-4xl font-bold text-neon mb-2">{stat.number}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Complete Technology Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert services across the entire technology stack, delivered by seasoned professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 group cursor-pointer h-full">
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
                    {/* Technology Icons */}
                    <div className="flex items-center justify-center gap-2 py-2">
                      {service.techIcons.map((TechIcon, techIndex) => (
                        <div
                          key={techIndex}
                          className="p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:scale-110 transition-transform duration-200"
                        >
                          <TechIcon className="w-4 h-4 text-neon" />
                        </div>
                      ))}
                    </div>
                    
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
                        className="w-full border-gray-600 text-gray-300 hover:border-neon hover:text-neon hover:bg-neon/10 transition-all duration-300 btn-accessible"
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

      {/* Complete Technology Stack with REAL Logos */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Our Complete <span className="text-neon">Technology Stack</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive expertise across all modern technology categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {Object.entries(technologyStack).map(([category, technologies], categoryIndex) => (
              <Card key={category} className="glass border-gray-700 hover:border-neon/30 transition-all duration-500 h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-white text-center">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-3 p-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg hover:from-neon/10 hover:to-neon/20 transition-all duration-300 group cursor-pointer"
                      >
                        {/* Real Logo from techicons.dev with proper fallback */}
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                          <TechIcon 
                            name={tech.name}
                            logo={tech.logo}
                            fallbackIcon={tech.icon}
                            className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 truncate">
                            {tech.name}
                          </div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                            {tech.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Why Choose CloudFloo?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-6 h-full">
                  <Users className="w-12 h-12 text-neon mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Expert Team</h3>
                  <p className="text-gray-300">Industry veterans with deep expertise across all major cloud platforms and technologies.</p>
                </Card>
              </div>
              <div className="text-center">
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-6 h-full">
                  <Target className="w-12 h-12 text-neon mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Proven Results</h3>
                  <p className="text-gray-300">500+ successful projects with measurable business impact and ROI.</p>
                </Card>
              </div>
              <div className="text-center">
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-6 h-full">
                  <Shield className="w-12 h-12 text-neon mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Partnership Approach</h3>
                  <p className="text-gray-300">We work as your technology partner, not just a service provider.</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white btn-accessible">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10 btn-accessible">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}