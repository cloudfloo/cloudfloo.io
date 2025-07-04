'use client';

import BackToHomeButton from '@/components/BackToHomeButton';
import { Shield, Eye, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPolicyClient() {
  const { t } = useLanguage();
  const lastUpdated = '2024-01-15';

  const tableOfContents = [
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'international', title: 'International Transfers' },
    { id: 'children', title: 'Children\'s Privacy' },
    { id: 'changes', title: 'Policy Changes' },
    { id: 'contact', title: 'Contact Information' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">{t('common.privacy')}</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: t('legal.privacy.heroTitle') }}
            />
            <p className="text-xl text-gray-300 mb-4">
              {t('legal.privacy.heroSubtitle')}
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
                  <section id="information-collection" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <Eye className="w-6 h-6 text-neon mr-2" />
                      Information We Collect
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                      <p>We collect information you provide directly to us, including:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Name, email address, and contact information</li>
                        <li>Company information and job title</li>
                        <li>Account credentials and preferences</li>
                        <li>Payment and billing information</li>
                        <li>Communications with our support team</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-white">Automatically Collected Information</h3>
                      <p>We automatically collect certain information when you use our services:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>IP address and device information</li>
                        <li>Browser type and operating system</li>
                        <li>Usage patterns and preferences</li>
                        <li>Log data and performance metrics</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </section>

                  <section id="information-use" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">How We Use Information</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We use the information we collect to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process transactions and send related information</li>
                        <li>Send technical notices and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Analyze usage patterns and optimize performance</li>
                        <li>Detect and prevent fraud and abuse</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </div>
                  </section>

                  <section id="information-sharing" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We do not sell, trade, or rent your personal information. We may share information in the following circumstances:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in our operations</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                        <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                        <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                      </ul>
                    </div>
                  </section>

                  <section id="data-security" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <Lock className="w-6 h-6 text-neon mr-2" />
                      Data Security
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We implement appropriate technical and organizational measures to protect your information:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Encryption in transit and at rest</li>
                        <li>Regular security assessments and audits</li>
                        <li>Access controls and authentication</li>
                        <li>Employee training on data protection</li>
                        <li>Incident response procedures</li>
                      </ul>
                      <p>While we strive to protect your information, no method of transmission over the internet is 100% secure.</p>
                    </div>
                  </section>

                  <section id="your-rights" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <Users className="w-6 h-6 text-neon mr-2" />
                      Your Rights
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      <p>Depending on your location, you may have the following rights:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Access:</strong> Request access to your personal information</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                        <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                        <li><strong>Objection:</strong> Object to certain processing activities</li>
                        <li><strong>Restriction:</strong> Request restriction of processing</li>
                      </ul>
                      <p>To exercise these rights, please contact us at privacy@cloudfloo.io.</p>
                    </div>
                  </section>

                  <section id="cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We use cookies and similar technologies to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Remember your preferences and settings</li>
                        <li>Analyze site traffic and usage patterns</li>
                        <li>Provide personalized content and features</li>
                        <li>Improve our services and user experience</li>
                      </ul>
                      <p>You can control cookies through your browser settings, but this may affect functionality.</p>
                    </div>
                  </section>

                  <section id="third-party" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>Our services may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.</p>
                    </div>
                  </section>

                  <section id="data-retention" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. We may retain certain information for longer periods as required by law or for legitimate business purposes.</p>
                    </div>
                  </section>

                  <section id="international" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">International Transfers</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during such transfers.</p>
                    </div>
                  </section>

                  <section id="children" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.</p>
                    </div>
                  </section>

                  <section id="changes" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Policy Changes</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
                    </div>
                  </section>

                  <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>If you have any questions about this privacy policy, please contact us:</p>
                      <ul className="list-none space-y-2">
                        <li><strong>Email:</strong> privacy@cloudfloo.io</li>
                        <li><strong>Address:</strong> CloudFloo.io, 123 Cloud Street, San Francisco, CA 94105</li>
                        <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                      </ul>
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
