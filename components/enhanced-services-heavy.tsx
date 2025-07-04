'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Cloud, Code2, Database, Cpu, Shield, GitBranch, Bot, Zap, ArrowRight } from 'lucide-react';
import { DEFAULT_BLUR } from "@/data/placeholders";
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Simplified tech icon component - reduced complexity
function TechIcon({ name, logo, fallbackIcon: FallbackIcon, className = '' }: {
  name: string;
  logo: string;
  fallbackIcon: React.ComponentType<any>;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <FallbackIcon className={`text-gray-400 group-hover:text-neon transition-colors duration-300 ${className}`} />;
  }

  return (
    <Image
      src={`https://techicons.dev/icons/${logo}.svg`}
      alt={name}
      className={`group-hover:scale-110 transition-transform duration-300 ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
      width={24}
      height={24}
      unoptimized
    />
  );
}

export default function EnhancedServices() {
  const { t } = useLanguage();

  // Simplified services data - reduced complexity
  const services = [
    {
      icon: Cloud,
      title: t('services.cloudSolutions.title'),
      description: t('services.cloudSolutions.description'),
      features: [
        t('services.cloudSolutions.features.aws'),
        t('services.cloudSolutions.features.azure'),
        t('services.cloudSolutions.features.gcp'),
        t('services.cloudSolutions.features.architecture'),
      ],
      link: '/services/cloud-solutions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: t('services.aiMl.title'),
      description: t('services.aiMl.description'),
      features: [
        t('services.aiMl.features.models'),
        t('services.aiMl.features.automation'),
        t('services.aiMl.features.analytics'),
        t('services.aiMl.features.deployment'),
      ],
      link: '/services/ai-ml',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: GitBranch,
      title: t('services.devops.title'),
      description: t('services.devops.description'),
      features: [
        t('services.devops.features.kubernetes'),
        t('services.devops.features.cicd'),
        t('services.devops.features.infrastructure'),
        t('services.devops.features.monitoring'),
      ],
      link: '/services/devops',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Database,
      title: t('services.dataEngineering.title'),
      description: t('services.dataEngineering.description'),
      features: [
        t('services.dataEngineering.features.pipelines'),
        t('services.dataEngineering.features.analytics'),
        t('services.dataEngineering.features.streaming'),
        t('services.dataEngineering.features.governance'),
      ],
      link: '/services/data-engineering',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Simplified tech stack - reduced number of items
  const technologyStack = {
    [t('services.techStack.backend')]: [
      { name: 'Node.js', logo: 'nodejs', fallback: Code2 },
      { name: 'NestJS', logo: 'nestjs', fallback: Code2 },
      { name: 'PostgreSQL', logo: 'postgresql', fallback: Database },
      { name: 'Redis', logo: 'redis', fallback: Database },
    ],
    [t('services.techStack.frontend')]: [
      { name: 'React', logo: 'react', fallback: Code2 },
      { name: 'Next.js', logo: 'nextjs', fallback: Code2 },
      { name: 'TypeScript', logo: 'typescript', fallback: Code2 },
      { name: 'Tailwind', logo: 'tailwindcss', fallback: Code2 },
    ],
    [t('services.techStack.cloud')]: [
      { name: 'AWS', logo: 'aws', fallback: Cloud },
      { name: 'Kubernetes', logo: 'kubernetes', fallback: Cpu },
      { name: 'Docker', logo: 'docker', fallback: Cpu },
      { name: 'Terraform', logo: 'terraform', fallback: Shield },
    ]
  };

  return (
    <section id="services" className="py-20 relative scroll-offset">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in">
          <h2 
            id="expert-solutions" 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            dangerouslySetInnerHTML={{ __html: t('services.title') }}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid - simplified layout with CSS animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 group h-full card-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-neon transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center opacity-0 animate-slide-in" style={{ animationDelay: `${(index * 0.1) + (featureIndex * 0.1)}s`, animationFillMode: 'forwards' }}>
                        <div className="w-2 h-2 bg-neon rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={service.link}>
                    <Button 
                      className="w-full group bg-gradient-to-r from-neon/20 to-transparent border border-neon/30 text-neon hover:bg-neon/10"
                    >
                      {t('services.learnMore')}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technology Stack - simplified */}
        <div className="text-center mb-16 animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <h3 
            id="technologies-we-master"
            className="text-3xl font-bold mb-6 text-white"
            dangerouslySetInnerHTML={{ __html: t('services.techStack.title') }}
          />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('services.techStack.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(technologyStack).map(([category, technologies], categoryIndex) => (
            <Card 
              key={category} 
              className="glass border-gray-700 hover:border-neon/30 transition-all duration-500 h-full card-3d"
              style={{ animationDelay: `${0.5 + (categoryIndex * 0.1)}s` }}
            >
              <CardHeader>
                <CardTitle className="text-lg text-white text-center">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="flex flex-col items-center p-3 rounded-lg hover:bg-white/5 transition-colors duration-300 group opacity-0 animate-slide-in"
                      style={{ animationDelay: `${0.6 + (categoryIndex * 0.1) + (techIndex * 0.05)}s`, animationFillMode: 'forwards' }}
                    >
                      <TechIcon 
                        name={tech.name}
                        logo={tech.logo}
                        fallbackIcon={tech.fallback}
                        className="w-8 h-8 mb-2"
                      />
                      <span className="text-xs text-gray-300 text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}