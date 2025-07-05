'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const { t } = useLanguage();

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
      title: 'Email',
      value: 'hello@cloudfloo.io',
      link: 'mailto:hello@cloudfloo.io'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'San Francisco, CA',
      link: '#'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      value: 'Available 24/7',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-neon">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business? Let&apos;s discuss your project and explore the possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                    className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                    placeholder="Your name"
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
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
                  placeholder="Your company"
                />
              </div>
              
              <div>
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
                  className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group hover:scale-105 focus-visible"
              >
                Send Message
                <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                     className="flex items-center space-x-4 group hover:text-neon transition-colors duration-300 touch-target focus-visible rounded-lg p-2 -m-2"
                    >
                      <div className="w-12 h-12 bg-gradient-neon/10 rounded-lg flex items-center justify-center group-hover:bg-gradient-neon/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-neon" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{info.title}</div>
                        <div className="text-white group-hover:text-neon transition-colors duration-300">{info.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-neon mx-auto mb-4" />
                <p className="text-gray-300">Interactive map coming soon</p>
                <p className="text-sm text-gray-400 mt-2">San Francisco Bay Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}