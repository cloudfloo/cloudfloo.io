'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function EnhancedContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@cloudfloo.io',
      link: 'mailto:hello@cloudfloo.io',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      link: '#',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Available 24/7',
      link: '#',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
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

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden scroll-offset">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get In <span className="text-neon">Touch</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ready to transform your business? Let&apos;s discuss your project and explore the possibilities.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            variants={formVariants}
            initial="hidden"
            animate={formVisible ? "visible" : "hidden"}
          >
            <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-6">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={inputVariants}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </motion.div>
                    <motion.div variants={inputVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={inputVariants}>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20 transition-all duration-300"
                      placeholder="Your company"
                    />
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20 resize-none transition-all duration-300"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group"
                      >
                        Send Message
                        <motion.span
                          className="ml-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Send className="w-4 h-4" />
                        </motion.span>
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            ref={infoRef}
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={infoVisible ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white mb-6">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.a
                        key={index}
                        href={info.link}
                        className="flex items-center space-x-4 group hover:text-neon transition-colors duration-300 p-3 rounded-lg hover:bg-white/5"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={infoVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                      >
                        <motion.div 
                          className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <div className="text-sm text-gray-400">{info.title}</div>
                          <div className="text-white group-hover:text-neon transition-colors duration-300">
                            {info.value}
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div variants={itemVariants}>
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500">
                <CardContent className="p-8 h-64 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={infoVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MapPin className="w-12 h-12 text-neon mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-300">Interactive map coming soon</p>
                    <p className="text-sm text-gray-400 mt-2">San Francisco Bay Area</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}