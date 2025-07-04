import { Metadata } from 'next';
import BackToHomeButton from '@/components/BackToHomeButton';
import { Database, BarChart3, Zap, Shield, Globe, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Inżynieria Danych - Apache Spark, Kafka | CloudFloo',
  description: 'Projektowanie pipeline\'ów danych, analityka real-time, Apache Spark i Kafka. Specjaliści big data i data governance w Polsce 🔧',
};

export default function DataEngineeringPage() {
  const features = [
    {
      icon: Database,
      title: 'Data Pipeline Design',
      description: 'Robust ETL/ELT pipelines for seamless data integration and transformation.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Stream processing for real-time analytics and immediate business insights.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Platforms',
      description: 'Comprehensive data warehouses and analytics solutions for business intelligence.'
    },
    {
      icon: Shield,
      title: 'Data Governance',
      description: 'Data quality, security, and compliance frameworks for enterprise-grade solutions.'
    },
    {
      icon: Globe,
      title: 'Data Lakes',
      description: 'Scalable data lakes for storing and processing structured and unstructured data.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Optimization',
      description: 'Query optimization and performance tuning for large-scale data operations.'
    }
  ];

  const technologies = [
    'Apache Spark', 'Apache Kafka', 'Apache Airflow', 'Snowflake', 'BigQuery',
    'Redshift', 'Databricks', 'dbt', 'Elasticsearch', 'ClickHouse'
  ];

  const solutions = [
    {
      title: 'Real-time Analytics Platform',
      description: 'Built a real-time analytics platform processing 10M+ events per second for a fintech company.',
      metrics: ['10M+ events/sec', '< 100ms latency', '99.99% availability']
    },
    {
      title: 'Data Lake Migration',
      description: 'Migrated legacy data warehouse to modern data lake architecture, reducing costs by 60%.',
      metrics: ['60% cost reduction', '10x faster queries', 'PB-scale storage']
    },
    {
      title: 'ML Data Pipeline',
      description: 'Automated ML data pipeline for feature engineering and model training at scale.',
      metrics: ['100+ features', 'Daily model updates', '95% automation']
    }
  ];

  const services = [
    {
      category: 'Data Integration',
      items: ['ETL/ELT Pipelines', 'API Integration', 'Database Migration', 'Data Synchronization']
    },
    {
      category: 'Analytics & BI',
      items: ['Data Warehousing', 'Business Intelligence', 'Reporting Dashboards', 'Self-Service Analytics']
    },
    {
      category: 'Real-time Processing',
      items: ['Stream Processing', 'Event-Driven Architecture', 'Real-time Dashboards', 'Alerting Systems']
    },
    {
      category: 'Data Management',
      items: ['Data Quality', 'Data Cataloging', 'Metadata Management', 'Data Lineage']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">Data Engineering</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-blue-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h1 id="data-engineering" className="text-5xl md:text-6xl font-bold mb-6">
              Data <span className="text-neon">Engineering</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform raw data into actionable insights with robust data pipelines, analytics platforms, and 
              real-time processing solutions. We build scalable data infrastructure that grows with your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-neon text-white">
                Build Data Pipeline
              </Button>
              <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
                Data Strategy Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Comprehensive Data Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From data ingestion to analytics, we provide end-to-end data engineering solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
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

      {/* Services Grid */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Data Engineering Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete data engineering capabilities for modern data-driven organizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{service.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-neon rounded-full mr-3"></div>
                        <span className="text-sm text-gray-300">{item}</span>
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
            <h2 className="text-4xl font-bold mb-6">Data Technologies</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern data stack with industry-leading tools and platforms.
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

      {/* Solutions Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Data Engineering Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world data solutions delivering measurable business impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">{solution.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {solution.metrics.map((metric, metricIndex) => (
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
      <section className="py-20 bg-gradient-to-r from-indigo-900/20 to-blue-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Unlock Your Data's Potential?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's build a data infrastructure that turns your data into a competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-neon text-white">
              Start Data Project
            </Button>
            <Button size="lg" variant="outline" className="border-neon text-neon hover:bg-neon/10">
              Data Architecture Review
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}