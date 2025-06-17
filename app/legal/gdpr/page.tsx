import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Users, Eye, Lock, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'GDPR Compliance - CloudFloo.io',
  description: 'CloudFloo.io GDPR Compliance - How we protect EU residents\' data rights.',
};

export default function GDPRPage() {
  const lastUpdated = '2024-01-15';

  const tableOfContents = [
    { id: 'overview', title: 'GDPR Overview' },
    { id: 'your-rights', title: 'Your Rights Under GDPR' },
    { id: 'data-processing', title: 'Data Processing' },
    { id: 'legal-basis', title: 'Legal Basis for Processing' },
    { id: 'data-transfers', title: 'International Data Transfers' },
    { id: 'data-protection', title: 'Data Protection Measures' },
    { id: 'exercising-rights', title: 'Exercising Your Rights' },
    { id: 'complaints', title: 'Filing Complaints' },
    { id: 'contact', title: 'Contact Information' }
  ];

  const gdprRights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'You have the right to know what personal data we hold about you and how we use it.',
      actions: ['Request a copy of your data', 'Understand how we process your information']
    },
    {
      icon: FileText,
      title: 'Right to Rectification',
      description: 'You can request correction of inaccurate or incomplete personal data.',
      actions: ['Update incorrect information', 'Complete missing data fields']
    },
    {
      icon: Shield,
      title: 'Right to Erasure',
      description: 'Also known as the "right to be forgotten" - request deletion of your personal data.',
      actions: ['Delete your account', 'Remove specific data points']
    },
    {
      icon: Lock,
      title: 'Right to Restrict Processing',
      description: 'You can request that we limit how we process your personal data.',
      actions: ['Pause data processing', 'Limit specific uses of your data']
    },
    {
      icon: Download,
      title: 'Right to Data Portability',
      description: 'Receive your personal data in a structured, machine-readable format.',
      actions: ['Export your data', 'Transfer data to another service']
    },
    {
      icon: Users,
      title: 'Right to Object',
      description: 'Object to certain types of processing, including direct marketing.',
      actions: ['Opt out of marketing', 'Object to automated decision-making']
    }
  ];

  const legalBases = [
    {
      basis: 'Consent',
      description: 'You have given clear consent for us to process your personal data for specific purposes.',
      examples: ['Newsletter subscriptions', 'Marketing communications', 'Optional features']
    },
    {
      basis: 'Contract',
      description: 'Processing is necessary for the performance of a contract with you.',
      examples: ['Service delivery', 'Account management', 'Payment processing']
    },
    {
      basis: 'Legal Obligation',
      description: 'Processing is necessary for compliance with legal obligations.',
      examples: ['Tax reporting', 'Regulatory compliance', 'Legal proceedings']
    },
    {
      basis: 'Legitimate Interest',
      description: 'Processing is necessary for legitimate interests pursued by us or third parties.',
      examples: ['Security monitoring', 'Service improvement', 'Fraud prevention']
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
            <div className="text-neon">GDPR Compliance</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">GDPR Compliance</h1>
            <p className="text-xl text-gray-300 mb-4">
              Your data protection rights under the General Data Protection Regulation.
            </p>
            <p className="text-sm text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <Card className="glass border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-300 hover:text-neon transition-colors py-1"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8">
              <Card className="glass border-gray-700">
                <CardContent className="p-8 prose prose-invert max-w-none">
                  <section id="overview" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">GDPR Overview</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect 
                        on May 25, 2018. It applies to all organizations that process personal data of EU residents, 
                        regardless of where the organization is located.
                      </p>
                      <p>
                        At CloudFloo.io, we are committed to protecting your privacy and ensuring compliance with GDPR requirements. 
                        This page outlines your rights under GDPR and how we protect your personal data.
                      </p>
                    </div>
                  </section>

                  <section id="your-rights" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Your Rights Under GDPR</h2>
                    <div className="space-y-6">
                      {gdprRights.map((right, index) => {
                        const Icon = right.icon;
                        return (
                          <Card key={index} className="glass border-gray-700">
                            <CardHeader>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-neon/10 rounded-lg flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-neon" />
                                </div>
                                <CardTitle className="text-white text-lg">{right.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 mb-3">{right.description}</p>
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-2">You can:</h4>
                                <ul className="list-disc pl-6 space-y-1">
                                  {right.actions.map((action, actionIndex) => (
                                    <li key={actionIndex} className="text-sm text-gray-300">{action}</li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </section>

                  <section id="data-processing" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Data Processing</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We process personal data for the following purposes:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Service Provision:</strong> To provide and maintain our cloud services</li>
                        <li><strong>Account Management:</strong> To manage your account and provide customer support</li>
                        <li><strong>Communication:</strong> To send service-related communications and updates</li>
                        <li><strong>Security:</strong> To protect our services and prevent fraud</li>
                        <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                        <li><strong>Business Operations:</strong> To improve our services and develop new features</li>
                      </ul>
                    </div>
                  </section>

                  <section id="legal-basis" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Legal Basis for Processing</h2>
                    <div className="space-y-4">
                      {legalBases.map((basis, index) => (
                        <Card key={index} className="glass border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white text-lg">{basis.basis}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-300 mb-3">{basis.description}</p>
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-2">Examples:</h4>
                              <div className="flex flex-wrap gap-2">
                                {basis.examples.map((example, exampleIndex) => (
                                  <span
                                    key={exampleIndex}
                                    className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>

                  <section id="data-transfers" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate data protection</li>
                        <li><strong>Standard Contractual Clauses:</strong> EU-approved contract terms for data transfers</li>
                        <li><strong>Binding Corporate Rules:</strong> Internal rules for multinational organizations</li>
                        <li><strong>Certification Schemes:</strong> Industry-recognized data protection certifications</li>
                      </ul>
                    </div>
                  </section>

                  <section id="data-protection" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Data Protection Measures</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We implement comprehensive technical and organizational measures to protect your data:</p>
                      
                      <h3 className="text-lg font-semibold text-white">Technical Measures</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Access controls and authentication systems</li>
                        <li>Regular security assessments and penetration testing</li>
                        <li>Automated backup and disaster recovery systems</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-white">Organizational Measures</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Data protection policies and procedures</li>
                        <li>Employee training on data protection</li>
                        <li>Data protection impact assessments</li>
                        <li>Incident response and breach notification procedures</li>
                      </ul>
                    </div>
                  </section>

                  <section id="exercising-rights" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Exercising Your Rights</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>To exercise your GDPR rights, you can:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Contact our Data Protection Officer at dpo@cloudfloo.io</li>
                        <li>Use our online data request form</li>
                        <li>Send a written request to our postal address</li>
                      </ul>
                      
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
                        <p className="text-blue-400 text-sm">
                          <strong>Response Time:</strong> We will respond to your request within 30 days. 
                          In complex cases, we may extend this period by up to 60 days with notification.
                        </p>
                      </div>

                      <div className="mt-6">
                        <Button className="bg-gradient-neon text-white mr-4">
                          Submit Data Request
                        </Button>
                        <Button variant="outline" className="border-neon text-neon hover:bg-neon/10">
                          Download My Data
                        </Button>
                      </div>
                    </div>
                  </section>

                  <section id="complaints" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Filing Complaints</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        If you believe we have not handled your personal data in accordance with GDPR, 
                        you have the right to file a complaint with a supervisory authority.
                      </p>
                      <p>You can contact:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Your local data protection authority in the EU</li>
                        <li>The Irish Data Protection Commission (our lead supervisory authority)</li>
                        <li>Any EU supervisory authority where you have your habitual residence</li>
                      </ul>
                    </div>
                  </section>

                  <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>For GDPR-related inquiries, please contact:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <Card className="glass border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white text-lg">Data Protection Officer</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-none space-y-2 text-sm">
                              <li><strong>Email:</strong> dpo@cloudfloo.io</li>
                              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                              <li><strong>Response Time:</strong> 48 hours</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="glass border-gray-700">
                          <CardHeader>
                            <CardTitle className="text-white text-lg">Legal Department</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-none space-y-2 text-sm">
                              <li><strong>Email:</strong> legal@cloudfloo.io</li>
                              <li><strong>Address:</strong> 123 Cloud Street, San Francisco, CA 94105</li>
                              <li><strong>EU Representative:</strong> Available upon request</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}