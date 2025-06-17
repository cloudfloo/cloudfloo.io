'use client';

import { Cloud, Code, Bot, Settings, Database, Zap, Server } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable infrastructure that grows with your business, powered by cutting-edge cloud technologies.',
      features: ['Auto-scaling', 'Global CDN', 'Load Balancing', '99.99% SLA']
    },
    {
      icon: Code,
      title: 'App Development',
      description: 'Full-stack applications built with modern frameworks and best practices for performance.',
      features: ['React/Next.js', 'TypeScript', 'API Development', 'Mobile-First']
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Intelligent automation agents that streamline workflows and enhance productivity.',
      features: ['NLP Processing', 'Task Automation', 'Smart Analytics', 'Custom Training']
    },
    {
      icon: Settings,
      title: 'DevOps Automation',
      description: 'Streamlined CI/CD pipelines and infrastructure as code for rapid deployment.',
      features: ['Docker/K8s', 'CI/CD Pipelines', 'Monitoring', 'Auto-deployment']
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Robust data pipelines and analytics solutions for data-driven decision making.',
      features: ['ETL Processes', 'Data Lakes', 'Real-time Analytics', 'Data Governance']
    },
    {
      icon: Zap,
      title: 'ML Ops',
      description: 'End-to-end machine learning operations for model deployment and monitoring.',
      features: ['Model Training', 'A/B Testing', 'Performance Monitoring', 'Auto-scaling']
    },
    {
      icon: Server,
      title: 'Edge Functions',
      description: 'Ultra-fast serverless functions deployed at the edge for minimal latency.',
      features: ['Sub-10ms Response', 'Global Distribution', 'Auto-scaling', 'Cost Optimization']
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 volumetric-lighting"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-neon">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive cloud solutions designed to accelerate your digital transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass rounded-lg p-6 hover:neon-glow transition-all duration-500 group cursor-pointer card-3d"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-neon rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-neon transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-gradient-neon rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}