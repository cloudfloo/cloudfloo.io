'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Heart, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    position: '',
    resume: '',
    coverLetter: ''
  });

  const departments = [
    { id: 'all', label: 'All Departments' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'product', label: 'Product' },
    { id: 'sales', label: 'Sales & Marketing' },
    { id: 'operations', label: 'Operations' }
  ];

  const openings = [
    {
      id: 1,
      title: 'Senior Cloud Engineer',
      department: 'engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$140k - $180k',
      description: 'Lead cloud infrastructure projects and mentor junior engineers in building scalable solutions.',
      requirements: ['5+ years cloud experience', 'AWS/GCP/Azure expertise', 'Kubernetes proficiency', 'Infrastructure as Code'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $170k',
      description: 'Develop and deploy machine learning models at scale for our AI automation platform.',
      requirements: ['ML/AI expertise', 'Python/TensorFlow', 'MLOps experience', 'PhD preferred'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'Drive product strategy and roadmap for our cloud solutions platform.',
      requirements: ['3+ years PM experience', 'Technical background', 'B2B SaaS experience', 'Data-driven mindset'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $150k',
      description: 'Build and maintain CI/CD pipelines and infrastructure automation tools.',
      requirements: ['DevOps experience', 'Docker/Kubernetes', 'CI/CD tools', 'Monitoring systems'],
      posted: '5 days ago'
    },
    {
      id: 5,
      title: 'Sales Engineer',
      department: 'sales',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$100k - $140k + Commission',
      description: 'Support sales team with technical expertise and customer demonstrations.',
      requirements: ['Technical sales experience', 'Cloud knowledge', 'Presentation skills', 'Customer-facing experience'],
      posted: '1 week ago'
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'operations',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $110k',
      description: 'Ensure customer satisfaction and drive adoption of our cloud solutions.',
      requirements: ['Customer success experience', 'Technical aptitude', 'Communication skills', 'SaaS background'],
      posted: '4 days ago'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness stipend'
    },
    {
      icon: Zap,
      title: 'Professional Growth',
      description: 'Learning budget, conference attendance, and certification support'
    },
    {
      icon: Users,
      title: 'Work-Life Balance',
      description: 'Flexible hours, unlimited PTO, and remote-first culture'
    },
    {
      icon: Shield,
      title: 'Financial Security',
      description: 'Competitive salary, equity options, and 401k matching'
    }
  ];

  const filteredOpenings = selectedDepartment === 'all' 
    ? openings 
    : openings.filter(job => job.department === selectedDepartment);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationForm);
    // Handle form submission
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.value
    });
  };

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
            <div className="text-neon">Careers</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-emerald-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Join Our <span className="text-neon">Mission</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Help us shape the future of cloud technology while building your career with industry-leading experts.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Why Work With Us?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe in investing in our people and creating an environment where everyone can thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 text-center h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-neon/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-neon" />
                      </div>
                      <CardTitle className="text-white">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find your next opportunity and help us build the future of cloud technology.
            </p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                  selectedDepartment === dept.id
                    ? 'bg-neon/20 border-neon text-neon'
                    : 'border-gray-600 text-gray-300 hover:border-neon/50 hover:text-neon'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                      <Badge variant="outline" className="border-neon text-neon">
                        {job.posted}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-300 leading-relaxed">
                      {job.description}
                    </CardDescription>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, reqIndex) => (
                          <span
                            key={reqIndex}
                            className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      onClick={() => setApplicationForm({...applicationForm, position: job.title})}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Apply Today</h2>
              <p className="text-xl text-gray-300">
                Ready to join our team? Submit your application below.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Job Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleApplicationSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={applicationForm.name}
                          onChange={handleInputChange}
                          className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={applicationForm.email}
                          onChange={handleInputChange}
                          className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                        Position *
                      </label>
                      <Input
                        id="position"
                        name="position"
                        type="text"
                        required
                        value={applicationForm.position}
                        onChange={handleInputChange}
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                        placeholder="Position you're applying for"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
                        Resume/CV Link *
                      </label>
                      <Input
                        id="resume"
                        name="resume"
                        type="url"
                        required
                        value={applicationForm.resume}
                        onChange={handleInputChange}
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                        placeholder="Link to your resume (Google Drive, LinkedIn, etc.)"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 mb-2">
                        Cover Letter
                      </label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={5}
                        value={applicationForm.coverLetter}
                        onChange={handleInputChange}
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20 resize-none"
                        placeholder="Tell us why you're interested in this position..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}