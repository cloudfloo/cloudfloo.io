import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Users, Award, Globe } from 'lucide-react';
import TeamCard from '@/components/TeamCard';
import { team } from '@/data/team';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Our Team | CloudFloo',
  description: 'Meet the expert team behind CloudFloo - experienced Polish engineers specializing in cloud-native solutions, DevOps, and modern web development.',
};

export default function TeamPage() {
  const teamStats = [
    { number: '30+', label: 'Years Combined Experience', icon: Award },
    { number: '3', label: 'Senior Engineers', icon: Users },
    { number: '100+', label: 'Projects Delivered', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Team"
        description="Meet the expert team behind CloudFloo - experienced Polish engineers specializing in cloud-native solutions, DevOps, and modern web development."
        keywords="CloudFloo team, Polish engineers, cloud experts, DevOps specialists, software developers, Michał Wiatr, Sebastian Dębicki, Damian Ogrodnik"
        url="https://cloudfloo.io/team"
      />
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-gray-300 hover:text-neon transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-gray-500">/</div>
            <div className="text-neon">Our Team</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Our <span className="text-neon">Expert Team</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Meet the experienced Polish engineers who bring deep expertise in cloud-native technologies, 
              DevOps practices, and modern software development to every project.
            </p>
            
            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {teamStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="glass border-gray-700 hover:border-neon/50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 text-neon mx-auto mb-3" />
                      <div className="text-2xl font-bold text-neon mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {team.map(person => (
              <div key={person.slug}>
                <TeamCard person={person} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Our Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-6 h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Technical Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">We believe in writing clean, maintainable code and following industry best practices to deliver robust solutions.</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-6 h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Continuous Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Technology evolves rapidly, and we stay ahead by continuously learning and adapting to new tools and methodologies.</p>
                </CardContent>
              </Card>
              
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-300 p-6 h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Client Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">We work as true partners, understanding your business goals and delivering solutions that drive real value.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Work with Our Team?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our expertise can help accelerate your digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <button className="bg-gradient-neon text-white px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 btn-accessible">
                Start Your Project
              </button>
            </Link>
            <Link href="/company/careers">
              <button className="border-2 border-neon text-neon hover:bg-neon/10 px-8 py-4 rounded-lg font-semibold transition-all duration-200 btn-accessible">
                Join Our Team
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}