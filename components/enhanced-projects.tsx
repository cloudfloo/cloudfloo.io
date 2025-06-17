'use client';

import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStaggeredAnimation } from '@/hooks/use-scroll-animation';

// Create a motion-enabled Button component
const MotionButton = motion(Button);

export default function EnhancedProjects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Scalable microservices architecture handling 1M+ daily transactions',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Next.js', 'Kubernetes', 'PostgreSQL', 'Redis'],
      category: 'web',
      metrics: { users: '500K+', uptime: '99.9%', performance: '< 100ms' },
      featured: true
    },
    {
      title: 'AI Analytics Dashboard',
      description: 'Real-time business intelligence with predictive analytics',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Python', 'TensorFlow', 'BigQuery'],
      category: 'ai',
      metrics: { dataPoints: '10M+', accuracy: '94%', latency: '< 200ms' }
    },
    {
      title: 'IoT Fleet Management',
      description: 'Edge computing solution for manufacturing IoT devices',
      image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Node.js', 'InfluxDB', 'Grafana', 'Docker'],
      category: 'iot',
      metrics: { devices: '50K+', coverage: '99.5%', efficiency: '+40%' }
    },
    {
      title: 'Financial Trading Bot',
      description: 'High-frequency trading system with ML-driven strategies',
      image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Python', 'Kafka', 'Redis', 'AWS Lambda'],
      category: 'fintech',
      metrics: { trades: '1M+/day', latency: '< 5ms', roi: '+23%' },
      featured: true
    },
    {
      title: 'Healthcare Data Platform',
      description: 'HIPAA-compliant data pipeline for medical research',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['TypeScript', 'PostgreSQL', 'Elasticsearch', 'Docker'],
      category: 'healthcare',
      metrics: { records: '1B+', compliance: '100%', availability: '99.99%' }
    },
    {
      title: 'Media Streaming Service',
      description: 'Global CDN with adaptive bitrate streaming',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Go', 'CloudFront', 'FFmpeg'],
      category: 'media',
      metrics: { viewers: '2M+', quality: '4K HDR', buffer: '< 1s' },
      featured: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'iot', label: 'IoT' },
    { id: 'fintech', label: 'FinTech' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'media', label: 'Media' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const { ref, visibleItems } = useStaggeredAnimation(filteredProjects.length, 100);

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
      y: 50,
      scale: 0.9,
      rotateX: -10
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
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const filterVariants = {
    active: {
      scale: 1.05,
      backgroundColor: 'rgba(0, 229, 255, 0.2)',
      borderColor: 'rgba(0, 229, 255, 0.5)',
      color: '#00E5FF'
    },
    inactive: {
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      color: '#9CA3AF'
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden scroll-offset">
      <div className="container mx-auto px-6">
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
            Featured <span className="text-neon">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real-world solutions that drive business growth and innovation
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              className="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300"
              variants={filterVariants}
              animate={activeFilter === filter.id ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const isVisible = visibleItems[index];
              
              return (
                <motion.div
                  key={`${project.title}-${activeFilter}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  exit="exit"
                  layout
                  className={`${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                        variants={imageVariants}
                        whileHover="hover"
                        loading="lazy"
                      />
                      
                      {project.featured && (
                        <motion.div
                          className="absolute top-4 left-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                        >
                          <Badge className="bg-gradient-neon text-white">
                            Featured
                          </Badge>
                        </motion.div>
                      )}
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        variants={overlayVariants}
                        initial="hidden"
                        whileHover="visible"
                      >
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <motion.button 
                            className="glass p-2 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="View project"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </motion.button>
                          <motion.button 
                            className="glass p-2 rounded-full hover:bg-white/20 transition-colors"
                            aria-label="View source code"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl text-white group-hover:text-neon transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                            transition={{ delay: tagIndex * 0.1 + 0.4 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700"
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
                            <div className="text-sm font-semibold text-neon">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.7 }}
                      >
                        <MotionButton 
                          size="sm" 
                          className="w-full bg-transparent border border-neon text-neon hover:bg-neon hover:text-black transition-all duration-300 group/btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Details
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </MotionButton>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MotionButton 
            size="lg" 
            className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
}