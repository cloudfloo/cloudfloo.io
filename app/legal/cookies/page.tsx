import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, BarChart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cookie Policy - CloudFloo.io',
  description: 'CloudFloo.io Cookie Policy - How we use cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  const lastUpdated = '2024-01-15';

  const tableOfContents = [
    { id: 'what-are-cookies', title: 'What Are Cookies?' },
    { id: 'how-we-use', title: 'How We Use Cookies' },
    { id: 'types-of-cookies', title: 'Types of Cookies' },
    { id: 'third-party', title: 'Third-Party Cookies' },
    { id: 'managing-cookies', title: 'Managing Cookies' },
    { id: 'updates', title: 'Policy Updates' },
    { id: 'contact', title: 'Contact Information' }
  ];

  const cookieTypes = [
    {
      icon: Settings,
      title: 'Essential Cookies',
      description: 'Required for basic website functionality and security.',
      examples: ['Authentication', 'Security', 'Load balancing', 'Form submissions'],
      canDisable: false
    },
    {
      icon: BarChart,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      examples: ['Google Analytics', 'Page views', 'User behavior', 'Performance metrics'],
      canDisable: true
    },
    {
      icon: Cookie,
      title: 'Functional Cookies',
      description: 'Remember your preferences and provide enhanced features.',
      examples: ['Language preferences', 'Theme settings', 'Region selection', 'Saved preferences'],
      canDisable: true
    },
    {
      icon: Shield,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
      examples: ['Ad targeting', 'Campaign tracking', 'Social media integration', 'Remarketing'],
      canDisable: true
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
            <div className="text-neon">Cookie Policy</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-300 mb-4">
              Learn about how we use cookies and similar technologies to improve your experience.
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
                  <section id="what-are-cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        Cookies are small text files that are stored on your device when you visit a website. 
                        They are widely used to make websites work more efficiently and provide information to website owners.
                      </p>
                      <p>
                        Cookies can be "persistent" (remain on your device until deleted) or "session" cookies 
                        (deleted when you close your browser). They can also be "first-party" (set by our website) 
                        or "third-party" (set by other domains).
                      </p>
                    </div>
                  </section>

                  <section id="how-we-use" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We use cookies for several purposes:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Essential functionality:</strong> To provide core website features and security</li>
                        <li><strong>Performance:</strong> To analyze how our website is used and improve performance</li>
                        <li><strong>Personalization:</strong> To remember your preferences and provide customized content</li>
                        <li><strong>Analytics:</strong> To understand visitor behavior and optimize our services</li>
                        <li><strong>Marketing:</strong> To deliver relevant advertisements and measure campaign effectiveness</li>
                      </ul>
                    </div>
                  </section>

                  <section id="types-of-cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies</h2>
                    <div className="space-y-6">
                      {cookieTypes.map((type, index) => {
                        const Icon = type.icon;
                        return (
                          <Card key={index} className="glass border-gray-700">
                            <CardHeader>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-neon/10 rounded-lg flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-neon" />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-white text-lg">{type.title}</CardTitle>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      type.canDisable 
                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}>
                                      {type.canDisable ? 'Optional' : 'Required'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 mb-3">{type.description}</p>
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-2">Examples:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {type.examples.map((example, exampleIndex) => (
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
                        );
                      })}
                    </div>
                  </section>

                  <section id="third-party" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>We may use third-party services that set cookies on our website:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                        <li><strong>Social Media:</strong> For social sharing and embedded content</li>
                        <li><strong>Advertising:</strong> For targeted advertising and campaign measurement</li>
                        <li><strong>Support Tools:</strong> For customer support and live chat functionality</li>
                      </ul>
                      <p>
                        These third parties have their own privacy policies and cookie practices. 
                        We recommend reviewing their policies to understand how they use cookies.
                      </p>
                    </div>
                  </section>

                  <section id="managing-cookies" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>You have several options for managing cookies:</p>
                      
                      <h3 className="text-lg font-semibold text-white">Browser Settings</h3>
                      <p>Most browsers allow you to:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>View and delete cookies</li>
                        <li>Block cookies from specific websites</li>
                        <li>Block third-party cookies</li>
                        <li>Clear all cookies when you close the browser</li>
                        <li>Set up notifications when cookies are set</li>
                      </ul>

                      <h3 className="text-lg font-semibold text-white">Cookie Preferences</h3>
                      <p>You can manage your cookie preferences using our cookie consent tool:</p>
                      
                      <div className="mt-4">
                        <Button className="bg-gradient-neon text-white">
                          Manage Cookie Preferences
                        </Button>
                      </div>

                      <h3 className="text-lg font-semibold text-white">Opt-Out Links</h3>
                      <p>You can opt out of certain third-party cookies:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-neon hover:underline">Google Analytics Opt-out</a></li>
                        <li><a href="https://www.aboutads.info/choices/" className="text-neon hover:underline">Digital Advertising Alliance Opt-out</a></li>
                        <li><a href="https://www.networkadvertising.org/choices/" className="text-neon hover:underline">Network Advertising Initiative Opt-out</a></li>
                      </ul>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
                        <p className="text-yellow-400 text-sm">
                          <strong>Note:</strong> Disabling certain cookies may affect website functionality and your user experience.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section id="updates" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>
                        We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. 
                        We will notify you of any material changes by posting the updated policy on this page.
                      </p>
                    </div>
                  </section>

                  <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                    <div className="text-gray-300 space-y-4">
                      <p>If you have any questions about our use of cookies, please contact us:</p>
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