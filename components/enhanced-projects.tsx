'use client';

import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Code2, Database, Server, Shield, Zap, Users, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EnhancedProjects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, isLoaded } = useLanguage();

  const project = {
    id: 1,
    title: 'WebKD: Advanced Enterprise Web Solution',
    shortDescription: 'Sophisticated enterprise web application with modern microservices architecture, focusing on robust security, performance, and scalability.',
    fullDescription: `WebKD is a sophisticated enterprise web application built with a modern microservices architecture, focusing on robust security, performance, and scalability. The project features multiple frontend applications and a powerful backend system, all developed with best-in-class technologies.

This enterprise solution demonstrates advanced software engineering principles with a focus on maintainability, scalability, and performance. The project follows industry best practices including Test-Driven Development (TDD), Page Object Model for E2E testing, comprehensive documentation, and structured PR workflow with quality gates.`,
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    customer: {
      name: 'HSK Data Ltd. Sp. z o.o.',
      logo: '/hsk.png'
    },
    technologies: {
      backend: ['NestJS', 'TypeORM', 'PostgreSQL', 'Docker', 'Kubernetes'],
      frontend: ['React', 'TypeScript', 'Redux', 'Styled Components'],
      testing: ['Playwright', 'Jest', 'SonarCloud'],
      devops: ['Kubernetes', 'Docker Compose', 'Nginx', 'Skaffold', 'CI/CD Pipeline']
    },
    features: [
      'Microservices Architecture',
      'Authentication & Authorization',
      'End-to-End Testing',
      'Responsive UI',
      'Containerized Deployment',
      'Monorepo Structure',
      'Internationalization'
    ],
    metrics: { 
      architecture: 'Microservices', 
      testing: '95% Coverage', 
      performance: 'Enterprise Grade',
      deployment: 'Kubernetes'
    },
    achievements: [
      'Modern microservices architecture for scalability',
      'Comprehensive automated testing ensuring reliability',
      'Enterprise-grade security protocols',
      'Multi-language support for global audience',
      'Seamless deployment across environments'
    ],
    developmentPractices: [
      'Test-Driven Development (TDD)',
      'Page Object Model for E2E testing',
      'Comprehensive documentation',
      'Consistent code styling with ESLint and Prettier',
      'Structured PR workflow with quality gates'
    ]
  };

  const { ref, isVisible } = useScrollAnimation();

  const handleProjectClick = (e: React.MouseEvent) => {
    // Prevent event bubbling if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: any } = {
      'NestJS': Code2,
      'React': Code2,
      'TypeScript': Code2,
      'PostgreSQL': Database,
      'Docker': Server,
      'Kubernetes': Server,
      'Jest': Shield,
      'Playwright': Shield,
      'SonarCloud': Zap,
      'Redux': Code2,
      'TypeORM': Database,
      'Nginx': Server
    };
    return iconMap[tech] || Code2;
  };

  // Unified rendering for SSR and client
  return (
    <section id="projects" className="py-20 relative overflow-hidden scroll-offset" suppressHydrationWarning>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            dangerouslySetInnerHTML={{ __html: t('projects.title') }}
          />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <Card 
            className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden"
            onClick={handleProjectClick}
          >
            <div className="relative overflow-hidden">
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                  priority
                />
              </div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button 
                    className="glass p-3 rounded-full hover:bg-white/20 transition-colors btn-accessible"
                    aria-label={t('projects.viewDetails')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(e);
                    }}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button 
                    className="glass p-3 rounded-full hover:bg-white/20 transition-colors btn-accessible"
                    aria-label={t('projects.viewSource')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{t('projects.clickDetails')}</p>
                </div>
              </motion.div>

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <Badge className="bg-gradient-neon text-white font-semibold">
                  Enterprise Solution
                </Badge>
                <div className="flex items-center gap-2 px-3 py-1 bg-black/70 rounded-full">
                  <div className="relative w-6 h-6">
                    <Image 
                      src={project.customer.logo} 
                      alt={project.customer.name}
                      fill
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">{project.customer.name}</span>
                </div>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-2xl text-white group-hover:text-neon transition-colors duration-300">
                {project.title}
              </CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed text-base">
                {project.shortDescription}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.technologies.backend.slice(0, 5).map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-3 py-1 bg-gradient-neon/10 text-neon text-sm rounded-full border border-neon/20 font-medium"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: techIndex * 0.1 + 0.4 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600">
                  +{Object.values(project.technologies).flat().length - 5} more
                </span>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                  <motion.div 
                    key={metricIndex} 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: metricIndex * 0.1 + 0.6, type: 'spring', stiffness: 200 }}
                  >
                    <div className="text-lg font-semibold text-neon">{value}</div>
                    <div className="text-xs text-gray-400 capitalize">{key}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 }}
              >
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(e);
                  }}
                  className="w-full bg-gradient-neon text-white hover:scale-105 transition-all duration-300 group/btn btn-accessible text-lg py-3"
                >
                  {t('projects.viewDetails')}
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Detail Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedProject && (
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                    <Badge className="bg-gradient-neon text-white font-semibold mb-4">
                      Enterprise Solution
                    </Badge>
                  </div>
                </div>
                
                {/* Customer Information */}
                <Card className="glass border-gray-700 mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center relative">
                        <Image 
                          src={selectedProject.customer.logo} 
                          alt={selectedProject.customer.name}
                          fill
                          className="object-contain p-2"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-neon" />
                          {t('projects.client')}
                        </CardTitle>
                        <p className="text-lg text-gray-300 font-medium">
                          {selectedProject.customer.name}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Image Carousel */}
              <div className="mb-8">
                <ImageCarousel images={selectedProject.images} />
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">{t('projects.overview')}</h4>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {selectedProject.fullDescription.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">{t('projects.techStack')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(selectedProject.technologies).map(([category, techs]) => (
                    <Card key={category} className="glass border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-white capitalize">{category} Technologies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {(techs as string[]).map((tech, index) => {
                            const Icon = getTechIcon(tech);
                            return (
                              <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gradient-neon/10 text-neon rounded-lg border border-neon/20">
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{tech}</span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">{t('projects.keyFeatures')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-gray-700">
                      <div className="w-2 h-2 bg-neon rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">{t('projects.achievements')}</h4>
                <div className="space-y-3">
                  {selectedProject.achievements.map((achievement: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass rounded-lg border border-gray-700">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Practices */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">{t('projects.practices')}</h4>
                <div className="space-y-3">
                  {selectedProject.developmentPractices.map((practice: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 glass rounded-lg border border-gray-700">
                      <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{practice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                <Button className="flex-1 bg-gradient-neon text-white btn-accessible">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('projects.viewDemo')}
                </Button>
                <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:border-neon hover:text-neon btn-accessible">
                  <Github className="w-4 h-4 mr-2" />
                  {t('projects.viewSource')}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}