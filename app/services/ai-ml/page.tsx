import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Bot, Brain, Cpu, TrendingUp, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI & Machine Learning - CloudFloo.io',
  description: 'Advanced AI and ML solutions including intelligent automation, predictive analytics, and custom model development.',
};

export default function AIMachineLearningPage() {
  const features = [
    {
      icon: Bot,
      title: 'Intelligent Automation',
      description: 'AI-powered workflow automation that learns and adapts to your business processes.'
    },
    {
      icon: Brain,
      title: 'Custom ML Models',
      description: 'Tailored machine learning models trained on your specific data and use cases.'
    },
    {
      icon: Cpu,
      title: 'MLOps Pipeline',
      description: 'End-to-end ML operations with automated training, testing, and deployment.'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Advanced analytics to forecast trends and optimize business decisions.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'High-performance ML inference with sub-millisecond response times.'
    },
    {
      icon: Target,
      title: 'Model Optimization',
      description: 'Continuous model improvement with A/B testing and performance monitoring.'
    }
  ];

  const technologies = [
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'OpenAI GPT',
    'AWS SageMaker', 'Google AI Platform', 'Azure ML', 'Kubernetes', 'Docker'
  ];

  const useCases = [
    {
      title: 'Customer Service Automation',
      description: 'AI chatbots and virtual assistants that handle 80% of customer inquiries automatically.',
      metrics: ['80% automation rate', '24/7 availability', '95% satisfaction score']
    },
    {
      title: 'Fraud Detection System',
      description: 'Real-time fraud detection using ML models that adapt to new fraud patterns.',
      metrics: ['99.5% accuracy', '< 100ms detection', '60% false positive reduction']
    },
    {
      title: 'Demand Forecasting',
      description: 'Predictive models for inventory optimization and supply chain management.',
      metrics: ['25% inventory reduction', '98% forecast accuracy', '15% cost savings']
    }
  ];

  const aiServices = [
    {
      category: 'Natural Language Processing',
      services: ['Text Analysis', 'Sentiment Analysis', 'Language Translation', 'Document Processing']
    },
    {
      category: 'Computer Vision',
      services: ['Image Recognition', 'Object Detection', 'Quality Control', 'Medical Imaging']
    },
    {
      category: 'Predictive Analytics',
      services: ['Demand Forecasting', 'Risk Assessment', 'Customer Behavior', 'Market Analysis']
    },
    {
      category: 'Automation',
      services: ['Process Automation', 'Decision Making', 'Resource Optimization', 'Workflow Management']
    }
  ];

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
            <div className="text-neon">AI & Machine Learning</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI & <span className="text-neon">Machine Learning</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to automate processes, gain insights, and drive innovation. 
              Our AI solutions are designed to integrate seamlessly with your existing systems and scale with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                Explore AI Solutions
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                Schedule AI Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">AI-Powered Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From intelligent automation to predictive analytics, we deliver AI solutions that transform your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Services Grid */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">AI Service Categories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI capabilities across multiple domains and industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiServices.map((category, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-neon rounded-full mr-3"></div>
                        <span className="text-sm text-gray-300">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">AI Technologies & Frameworks</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We leverage cutting-edge AI frameworks and platforms to build robust, scalable solutions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 glass rounded-full border border-gray-700 hover:border-neon/50 transition-all duration-300"
              >
                <span className="text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Real-World Applications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our AI solutions deliver measurable business value across industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{useCase.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {useCase.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-neon rounded-full mr-3"></div>
                        <span className="text-sm text-gray-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Implement AI in Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's explore how AI can transform your operations and unlock new opportunities for growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              Start AI Project
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Download AI Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}