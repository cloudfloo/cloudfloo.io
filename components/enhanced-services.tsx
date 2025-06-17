'use client';

import Link from 'next/link';
import { Cloud, Code, Bot, Settings, Database, Zap, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStaggeredAnimation } from '@/hooks/use-scroll-animation';

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function EnhancedServices() {
  const services = [
    {
      icon: Cloud,
      title: 'Strategic Cloud Consulting',
      description: 'Expert guidance tailored to your business goals, ensuring optimal cloud architecture and seamless migration strategies.',
      features: ['Architecture Design', 'Migration Planning', 'Cost Optimization', 'Security Assessment'],
      color: 'from-blue-500 to-cyan-500',
      href: '/services/cloud-solutions'
    },
    {
      icon: Code,
      title: 'Custom Application Development',
      description: 'Scalable, modern applications built with your specific requirements in mind, leveraging cutting-edge technologies.',
      features: ['Full-Stack Development', 'API Integration', 'Performance Optimization', 'Responsive Design'],
      color: 'from-green-500 to-emerald-500',
      href: '/services/app-development'
    },
    {
      icon: Bot,
      title: 'Intelligent Automation',
      description: 'AI-powered solutions that streamline operations and enhance productivity through smart workflow automation.',
      features: ['Process Automation', 'AI Integration', 'Workflow Optimization', 'Predictive Analytics'],
      color: 'from-purple-500 to-pink-500',
      href: '/services/ai-ml'
    },
    {
      icon: Settings,
      title: 'DevOps Excellence',
      description: 'Comprehensive DevOps practices that accelerate delivery while maintaining reliability and security.',
      features: ['CI/CD Implementation', 'Infrastructure as Code', 'Monitoring & Alerting', 'Security Integration'],
      color: 'from-orange-500 to-red-500',
      href: '/services/devops'
    },
    {
      icon: Database,
      title: 'Data Engineering Solutions',
      description: 'Transform raw data into actionable insights with robust pipelines and advanced analytics platforms.',
      features: ['Data Pipeline Design', 'Real-time Processing', 'Analytics Platforms', 'Data Governance'],
      color: 'from-indigo-500 to-blue-500',
      href: '/services/data-engineering'
    },
    {
      icon: Zap,
      title: 'ML Operations',
      description: 'End-to-end machine learning lifecycle management, from model development to production deployment.',
      features: ['Model Development', 'Automated Training', 'Performance Monitoring', 'Scalable Deployment'],
      color: 'from-yellow-500 to-orange-500',
      href: '/services/ai-ml'
    },
    {
      icon: Server,
      title: 'Edge Computing',
      description: 'Ultra-fast, globally distributed solutions that bring computation closer to your users for optimal performance.',
      features: ['Global Distribution', 'Low Latency', 'Auto-scaling', 'Edge Optimization'],
      color: 'from-teal-500 to-green-500',
      href: '/services/edge-computing'
    }
  ];

  const { ref, visibleItems } = useStaggeredAnimation(services.length, 150);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.4,
        duration: 0.3
      }
    })
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden scroll-offset">
      {/* Background Effects */}
      <div className="absolute inset-0 volumetric-lighting"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Expert <span className="text-neon">Solutions</span> Tailored for You
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Comprehensive technology services designed around your business needs, delivered by seasoned professionals who understand your industry challenges.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems[index];
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="h-full"
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 h-full group cursor-pointer overflow-hidden">
                  <CardHeader className="pb-4">
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 relative overflow-hidden`}
                      variants={iconVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                      whileHover="hover"
                    >
                      <Icon className="w-6 h-6 text-white relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ 
                          scale: 1, 
                          opacity: 1,
                          transition: { duration: 0.3 }
                        }}
                      />
                    </motion.div>
                    
                    <CardTitle className="text-xl text-white group-hover:text-neon transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-300 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    
                    <motion.ul 
                      className="space-y-2"
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="text-xs text-gray-400 flex items-center"
                          variants={featureVariants}
                          custom={featureIndex}
                        >
                          <motion.span 
                            className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full mr-2`}
                            initial={{ scale: 0 }}
                            animate={isVisible ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: featureIndex * 0.1 + 0.6 }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Link href={service.href}>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full border-gray-600 text-gray-300 hover:border-neon hover:text-neon hover:bg-neon/10 transition-all duration-300 group/btn"
                        >
                          Learn More
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </Button>
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/services">
            <MotionButton 
              size="lg" 
              className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discuss Your Project
            </MotionButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}