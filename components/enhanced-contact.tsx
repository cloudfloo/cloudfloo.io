'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

export default function EnhancedContact() {
  const { t, isLoaded } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('field-0', formData.name);
    data.append('field-1', formData.email);
    data.append('field-2', formData.company);
    data.append('field-3', formData.message);

    try {
      const res = await fetch(
        'https://n8n.cloudfloo.io/form/c6bf2752-faf4-4d71-a439-0337795009b2',
        {
          method: 'POST',
          body: data,
        }
      );

      if (res.ok) {
        toast({ title: t('contact.form.success') });
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        toast({ title: t('common.error'), variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: t('common.error'), variant: 'destructive' });
    }
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
      title: t('contact.info.email'),
      value: 'hello@cloudfloo.io',
      link: 'mailto:hello@cloudfloo.io',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      value: '+48 728 963 591',
      link: 'tel:+48728963591',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: t('contact.info.office'),
      value: 'Chmieleniec 17/69, 30-348 Krakow, Poland',
      link: 'https://maps.google.com/?q=Chmieleniec+17/69,+30-348+Krakow,+Poland',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageSquare,
      title: t('contact.info.liveChat'),
      value: t('contact.info.available247'),
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
    <section id="contact" className="py-20 relative overflow-hidden scroll-offset bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            id="contact-us"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('contact.subtitle')}
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
            <Card className="glass border-gray-100 hover:border-primary/50 hover:shadow-lg transition-all duration-500 bg-white">
              <CardHeader>
                <CardTitle id="contact-form" className="text-2xl font-bold text-gray-900 mb-6">
                  {t('contact.form.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={inputVariants}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.nameRequired')}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </motion.div>
                    <motion.div variants={inputVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.emailRequired')}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={inputVariants}>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.company')}
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                      placeholder={t('contact.form.companyPlaceholder')}
                    />
                  </motion.div>
                  
                  <motion.div variants={inputVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.messageRequired')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary/20 resize-none transition-all duration-300"
                      placeholder={t('contact.form.messagePlaceholder')}
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
                        className="w-full bg-gradient-primary text-white hover:shadow-lg transition-all duration-300 group"
                      >
                        {t('contact.form.submit')}
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
              <Card className="glass border-gray-100 hover:border-primary/50 hover:shadow-lg transition-all duration-500 bg-white">
                <CardHeader>
                  <CardTitle id="contact-info" className="text-2xl font-bold text-gray-900 mb-6">
                    {t('contact.info.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.a
                        key={index}
                        href={info.link}
                        className="flex items-start space-x-4 group hover:text-primary transition-colors duration-300 p-3 rounded-lg hover:bg-blue-50"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={infoVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        style={{ transitionDelay: `${index * 0.1}s` }}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <motion.div 
                          className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-5 h-5 text-primary" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500">{info.title}</div>
                          <div className="text-gray-900 group-hover:text-primary transition-colors duration-300 text-sm">
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
              <Card className="glass border-gray-100 hover:border-primary/50 hover:shadow-lg transition-all duration-500 bg-white">
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
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-700">{t('contact.info.mapComing')}</p>
                    <p className="text-sm text-gray-500 mt-2">{t('contact.info.location')}</p>
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