'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function FAQSection() {
  const faqs = [
    {
      question: 'What cloud platforms do you support?',
      answer: 'We support all major cloud platforms including AWS, Google Cloud Platform, Microsoft Azure, and hybrid cloud solutions. Our team has extensive experience with each platform and can help you choose the best fit for your specific needs.'
    },
    {
      question: 'How do you ensure data security and compliance?',
      answer: 'Security is our top priority. We implement industry-standard security practices including encryption at rest and in transit, multi-factor authentication, regular security audits, and compliance with standards like SOC 2, HIPAA, and GDPR depending on your requirements.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on complexity and scope. Simple applications can be deployed in 2-4 weeks, while enterprise-grade solutions typically take 3-6 months. We provide detailed project timelines during our initial consultation.'
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive support packages including 24/7 monitoring, regular updates, performance optimization, and technical support. Our support tiers range from basic monitoring to full managed services.'
    },
    {
      question: 'Can you help migrate existing applications to the cloud?',
      answer: 'Absolutely! We specialize in cloud migration strategies including lift-and-shift, re-platforming, and complete application modernization. We assess your current infrastructure and create a migration plan that minimizes downtime and maximizes benefits.'
    },
    {
      question: 'What makes your AI agents different?',
      answer: 'Our AI agents are custom-built for your specific use cases, trained on your data, and designed to integrate seamlessly with your existing workflows. They continuously learn and improve, providing increasingly accurate and valuable insights over time.'
    }
  ];

  const { ref, isVisible } = useScrollAnimation();

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
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
          >
            Frequently Asked <span className="text-neon">Questions</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get answers to common questions about our services and processes
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Everything you need to know
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <AccordionItem 
                      value={`item-${index}`}
                      className="border border-gray-700 rounded-lg px-6 hover:border-neon/30 transition-colors duration-300"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-neon transition-colors duration-300 py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}