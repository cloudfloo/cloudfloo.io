'use client';

import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { placeholders, DEFAULT_BLUR } from "@/data/placeholders";

export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Scalable microservices architecture handling 1M+ daily transactions',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Next.js', 'Kubernetes', 'PostgreSQL', 'Redis'],
      metrics: { users: '500K+', uptime: '99.9%', performance: '< 100ms' }
    },
    {
      title: 'AI Analytics Dashboard',
      description: 'Real-time business intelligence with predictive analytics',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Python', 'TensorFlow', 'BigQuery'],
      metrics: { dataPoints: '10M+', accuracy: '94%', latency: '< 200ms' }
    },
    {
      title: 'IoT Fleet Management',
      description: 'Edge computing solution for manufacturing IoT devices',
      image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Node.js', 'InfluxDB', 'Grafana', 'Docker'],
      metrics: { devices: '50K+', coverage: '99.5%', efficiency: '+40%' }
    },
    {
      title: 'Financial Trading Bot',
      description: 'High-frequency trading system with ML-driven strategies',
      image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Python', 'Kafka', 'Redis', 'AWS Lambda'],
      metrics: { trades: '1M+/day', latency: '< 5ms', roi: '+23%' }
    },
    {
      title: 'Healthcare Data Platform',
      description: 'HIPAA-compliant data pipeline for medical research',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['TypeScript', 'PostgreSQL', 'Elasticsearch', 'Docker'],
      metrics: { records: '1B+', compliance: '100%', availability: '99.99%' }
    },
    {
      title: 'Media Streaming Service',
      description: 'Global CDN with adaptive bitrate streaming',
      image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Go', 'CloudFront', 'FFmpeg'],
      metrics: { viewers: '2M+', quality: '4K HDR', buffer: '< 1s' }
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-neon">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world solutions that drive business growth and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="glass rounded-lg overflow-hidden group hover:neon-glow transition-all duration-500 card-3d"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={placeholders[project.image] ?? DEFAULT_BLUR}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="glass p-2 rounded-full hover:bg-white/20 transition-colors touch-target focus-visible"
                    aria-label="View project"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    className="glass p-2 rounded-full hover:bg-white/20 transition-colors touch-target focus-visible"
                    aria-label="View source code"
                  >
                    <Github className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-700">
                  {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-sm font-semibold text-neon">{value}</div>
                      <div className="text-xs text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full bg-transparent border border-neon text-neon hover:bg-neon hover:text-black transition-all duration-300 group/btn"
                >
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 focus-visible"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}