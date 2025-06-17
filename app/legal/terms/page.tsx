import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertTriangle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service - CloudFloo.io',
  description: 'CloudFloo.io Terms of Service - Legal terms and conditions for using our services.',
};

export default function TermsOfServicePage() {
  const lastUpdated = '2024-01-15';

  const tableOfContents = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Description of Services' },
    { id: 'user-accounts', title: 'User Accounts' },
    { id: 'acceptable-use', title: 'Acceptable Use Policy' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'payment-terms', title: 'Payment Terms' },
    { id: 'privacy', title: 'Privacy and Data Protection' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Information' }
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
            <div className="text-neon">Terms of Service</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300 mb-4">
              Legal terms and conditions governing your use of CloudFloo.io services.
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
                  <section id="acceptance" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <FileText className="w-6 h-6 text-neon mr-2" />
                      Acceptance of Terms
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        By accessing or using CloudFloo.io services ("Services"), you agree to be bound by these Terms of Service ("Terms"). 
                        If you do not agree to these Terms, you may not access or use our Services.
                      </p>
                      <p>
                        These Terms apply to all visitors, users, and others who access or use the Services. 
                        By using our Services, you represent that you are at least 18 years old or have reached the age of majority in your jurisdiction.
                      </p>
                    </div>
                  </section>

                  <section id="services" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Description of Services</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>CloudFloo.io provides cloud computing solutions, including but not limited to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Cloud infrastructure and migration services</li>
                        <li>AI and machine learning solutions</li>
                        <li>DevOps automation and CI/CD pipelines</li>
                        <li>Data engineering and analytics platforms</li>
                        <li>Application development and deployment</li>
                        <li>Edge computing and CDN services</li>
                      </ul>
                      <p>
                        We reserve the right to modify, suspend, or discontinue any part of our Services at any time with or without notice.
                      </p>
                    </div>
                  </section>

                  <section id="user-accounts" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <Users className="w-6 h-6 text-neon mr-2" />
                      User Accounts
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      <p>To access certain features of our Services, you may be required to create an account. You agree to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Provide accurate, current, and complete information</li>
                        <li>Maintain and update your account information</li>
                        <li>Keep your password secure and confidential</li>
                        <li>Notify us immediately of any unauthorized use</li>
                        <li>Accept responsibility for all activities under your account</li>
                      </ul>
                      <p>
                        You may not create an account using false information or on behalf of someone other than yourself without permission.
                      </p>
                    </div>
                  </section>

                  <section id="acceptable-use" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <AlertTriangle className="w-6 h-6 text-neon mr-2" />
                      Acceptable Use Policy
                    </h2>
                    <div className="text-gray-300 space-y-4">
                      <p>You agree not to use our Services to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on intellectual property rights</li>
                        <li>Transmit harmful, offensive, or illegal content</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with or disrupt our Services</li>
                        <li>Use our Services for competitive intelligence</li>
                        <li>Engage in any form of spam or unsolicited communications</li>
                      </ul>
                      <p>
                        We reserve the right to investigate and take appropriate action against users who violate this policy.
                      </p>
                    </div>
                  </section>

                  <section id="intellectual-property" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        The Services and their original content, features, and functionality are owned by CloudFloo.io and are protected by 
                        international copyright, trademark, patent, trade secret, and other intellectual property laws.
                      </p>
                      <p>
                        You retain ownership of any content you submit to our Services. By submitting content, you grant us a worldwide, 
                        non-exclusive, royalty-free license to use, reproduce, and distribute such content in connection with our Services.
                      </p>
                    </div>
                  </section>

                  <section id="payment-terms" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>For paid Services, you agree to pay all fees as described in your service agreement. Payment terms include:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Fees are due in advance and non-refundable unless otherwise stated</li>
                        <li>Late payments may result in service suspension</li>
                        <li>We may change fees with 30 days' notice</li>
                        <li>You are responsible for all taxes and third-party fees</li>
                      </ul>
                    </div>
                  </section>

                  <section id="privacy" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Privacy and Data Protection</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. 
                        By using our Services, you agree to the collection and use of information in accordance with our Privacy Policy.
                      </p>
                    </div>
                  </section>

                  <section id="disclaimers" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Disclaimers</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. 
                        WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
                        FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                      </p>
                      <p>
                        We do not warrant that our Services will be uninterrupted, error-free, or completely secure.
                      </p>
                    </div>
                  </section>

                  <section id="limitation-liability" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLOUDFLOO.IO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE.
                      </p>
                      <p>
                        Our total liability for any claim arising out of or relating to these Terms or our Services shall not exceed 
                        the amount you paid us in the twelve months preceding the claim.
                      </p>
                    </div>
                  </section>

                  <section id="indemnification" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        You agree to indemnify and hold harmless CloudFloo.io from any claims, damages, losses, or expenses 
                        arising out of your use of our Services or violation of these Terms.
                      </p>
                    </div>
                  </section>

                  <section id="termination" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        We may terminate or suspend your account and access to our Services immediately, without prior notice, 
                        for any reason, including breach of these Terms.
                      </p>
                      <p>
                        You may terminate your account at any time by contacting us. Upon termination, your right to use our Services will cease immediately.
                      </p>
                    </div>
                  </section>

                  <section id="governing-law" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        These Terms shall be governed by and construed in accordance with the laws of the State of California, 
                        without regard to its conflict of law provisions.
                      </p>
                    </div>
                  </section>

                  <section id="changes" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        We reserve the right to modify these Terms at any time. We will notify you of any material changes by 
                        posting the new Terms on this page and updating the "Last updated" date.
                      </p>
                      <p>
                        Your continued use of our Services after any such changes constitutes your acceptance of the new Terms.
                      </p>
                    </div>
                  </section>

                  <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>If you have any questions about these Terms, please contact us:</p>
                      <ul className="list-none space-y-2">
                        <li><strong>Email:</strong> legal@cloudfloo.io</li>
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