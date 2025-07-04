'use client';

import BackToHomeButton from '@/components/BackToHomeButton';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

export default function TeamPage() {
  const leadership = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Former Google Cloud architect with 15+ years in distributed systems and cloud infrastructure. Led cloud transformations for Fortune 500 companies.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Cloud Architecture', 'Strategic Planning', 'Enterprise Solutions'],
      social: {
        linkedin: 'https://linkedin.com/in/alexchen',
        twitter: 'https://twitter.com/alexchen',
        email: 'alex@cloudfloo.io'
      }
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO',
      bio: 'Ex-AWS principal engineer specializing in serverless architectures and AI/ML operations. Pioneer in edge computing solutions.',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['AI/ML Engineering', 'Serverless Architecture', 'Edge Computing'],
      social: {
        linkedin: 'https://linkedin.com/in/sarahrodriguez',
        github: 'https://github.com/sarahrodriguez',
        email: 'sarah@cloudfloo.io'
      }
    },
    {
      name: 'David Kim',
      role: 'Head of DevOps',
      bio: 'Kubernetes expert and CNCF ambassador, leading DevOps automation and infrastructure as code initiatives across multiple industries.',
      image: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Kubernetes', 'DevOps Automation', 'Infrastructure as Code'],
      social: {
        linkedin: 'https://linkedin.com/in/davidkim',
        github: 'https://github.com/davidkim',
        twitter: 'https://twitter.com/davidkim'
      }
    }
  ];

  const team = [
    {
      name: 'Maria Santos',
      role: 'Senior Data Engineer',
      bio: 'Specializes in building scalable data pipelines and real-time analytics platforms.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Data Engineering', 'Apache Spark', 'Real-time Analytics']
    },
    {
      name: 'James Wilson',
      role: 'AI/ML Specialist',
      bio: 'Expert in machine learning model development and deployment at scale.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Machine Learning', 'TensorFlow', 'Model Deployment']
    },
    {
      name: 'Lisa Zhang',
      role: 'Cloud Security Architect',
      bio: 'Ensures enterprise-grade security across all cloud implementations.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Cloud Security', 'Compliance', 'Risk Assessment']
    },
    {
      name: 'Michael Brown',
      role: 'Full-Stack Developer',
      bio: 'Builds modern web applications with focus on performance and user experience.',
      image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['React/Next.js', 'Node.js', 'TypeScript']
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager',
      bio: 'Drives product strategy and ensures customer needs are at the center of everything we build.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Product Strategy', 'User Research', 'Agile Methodology']
    },
    {
      name: 'Robert Taylor',
      role: 'Solutions Architect',
      bio: 'Designs comprehensive cloud solutions tailored to specific business requirements.',
      image: 'https://images.pexels.com/photos/2182976/pexels-photo-2182976.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Solution Design', 'Cloud Migration', 'Enterprise Architecture']
    }
  ];

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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="O Firmie - Zespół i Historia CloudFloo | CloudFloo"
        description="Poznaj historię CloudFloo i nasz zespół liderów. Alex Chen, Sarah Rodriguez i David Kim prowadzą rozwój technologii cloud computing 🔧"
        keywords="CloudFloo company, team leadership, cloud computing company, Polish software house, Alex Chen, Sarah Rodriguez, David Kim"
        url="https://cloudfloo.io/company/team"
      />
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">Our Team</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Meet Your <span className="text-neon">Expert Team</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Industry veterans with deep expertise and a passion for innovation. We're not just service providers—we're your strategic technology partners.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Visionary leaders driving innovation and excellence in cloud technology.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {leadership.map((member, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex space-x-2 justify-center">
                          {member.social.linkedin && (
                            <a href={member.social.linkedin} aria-label={`LinkedIn ${member.name}`} className="glass p-2 rounded-full hover:bg-neon/20 transition-colors">
                              <Linkedin className="w-4 h-4 text-white" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a href={member.social.twitter} aria-label={`Twitter ${member.name}`} className="glass p-2 rounded-full hover:bg-neon/20 transition-colors">
                              <Twitter className="w-4 h-4 text-white" />
                            </a>
                          )}
                          {member.social.github && (
                            <a href={member.social.github} aria-label={`GitHub ${member.name}`} className="glass p-2 rounded-full hover:bg-neon/20 transition-colors">
                              <Github className="w-4 h-4 text-white" />
                            </a>
                          )}
                          {member.social.email && (
                            <a href={`mailto:${member.social.email}`} aria-label={`Email ${member.name}`} className="glass p-2 rounded-full hover:bg-neon/20 transition-colors">
                              <Mail className="w-4 h-4 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl text-white group-hover:text-neon transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-neon font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Core Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dedicated professionals bringing specialized expertise to every project.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg text-white group-hover:text-neon transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-neon font-medium text-sm">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">Expertise:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Work with Our Team?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise can help accelerate your digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white" onClick={() => window.location.href = '/#contact'}>
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10" onClick={() => window.location.href = '/company/careers'}>
                Join Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}