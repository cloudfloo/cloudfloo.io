'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.questions.cloudPlatforms.question'),
      answer: t('faq.questions.cloudPlatforms.answer')
    },
    {
      question: t('faq.questions.security.question'),
      answer: t('faq.questions.security.answer')
    },
    {
      question: t('faq.questions.timeline.question'),
      answer: t('faq.questions.timeline.answer')
    },
    {
      question: t('faq.questions.support.question'),
      answer: t('faq.questions.support.answer')
    },
    {
      question: t('faq.questions.migration.question'),
      answer: t('faq.questions.migration.answer')
    },
    {
      question: t('faq.questions.aiAgents.question'),
      answer: t('faq.questions.aiAgents.answer')
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
            dangerouslySetInnerHTML={{ __html: t('faq.title') }}
          />
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-in"
            style={{ animationDelay: '0.4s' }}
          >
            {t('faq.subtitle')}
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
                {t('faq.tableOfContents')}
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