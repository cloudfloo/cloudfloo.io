'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in modern cloud-native technologies including React, Next.js, NestJS, Kubernetes, Docker, AWS, and TypeScript. Our team focuses on scalable microservices architecture and DevOps practices."
    },
    {
      question: "How do you handle project communication?",
      answer: "We maintain transparent communication through regular sprint reviews, daily standups, and comprehensive project documentation. You'll have direct access to our team via Slack, weekly reports, and scheduled video calls."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. Most MVP projects take 8-12 weeks, while comprehensive enterprise solutions may take 16-24 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes, we offer comprehensive support packages including 24/7 monitoring, security updates, performance optimization, and feature enhancements. Our DevOps team ensures your applications run smoothly in production."
    },
    {
      question: "How do you ensure code quality and security?",
      answer: "We follow industry best practices including code reviews, automated testing, security audits, and compliance with GDPR and other regulations. All code is thoroughly tested and documented before deployment."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white animate-slide-in"
            style={{ animationDelay: '0.2s' }}
          >
            Frequently Asked <span className="text-neon">Questions</span>
          </h2>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-in"
            style={{ animationDelay: '0.4s' }}
          >
            Get answers to common questions about our services and processes
          </p>
        </div>

        <div
          ref={ref}
          className={`max-w-4xl mx-auto transform transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
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
                  <div
                    key={index}
                    className={`transform transition-all duration-700 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100 + 600}ms` }}
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
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}