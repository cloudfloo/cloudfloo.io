'use client';

import { Users, Target, Award, Rocket } from 'lucide-react';

export default function About() {
  const stats = [
    { number: '500+', label: 'Projects Delivered', icon: Rocket },
    { number: '99.99%', label: 'Uptime Guarantee', icon: Award },
    { number: '50+', label: 'Enterprise Clients', icon: Users },
    { number: '24/7', label: 'Support Available', icon: Target },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Former Google Cloud architect with 15+ years in distributed systems and cloud infrastructure.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO',
      bio: 'Ex-AWS principal engineer specializing in serverless architectures and AI/ML operations.',
      image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'David Kim',
      role: 'Head of DevOps',
      bio: 'Kubernetes expert and CNCF ambassador, leading DevOps automation and infrastructure as code.',
      image: 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-neon">CloudFloo</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            We&apos;re not just another cloud provider. We&apos;re your partners in digital transformation.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="glass rounded-lg p-6 text-center group hover:neon-glow transition-all duration-300">
                  <Icon className="w-8 h-8 text-neon mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-neon mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our <span className="text-neon">Team</span>
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Industry veterans with a passion for innovation and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="glass rounded-lg p-6 text-center group hover:neon-glow transition-all duration-300">
              <div className="relative mb-4 mx-auto w-24 h-24 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-xl font-semibold text-white mb-1">{member.name}</h4>
              <p className="text-neon text-sm mb-3">{member.role}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="glass rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-neon mb-4">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              To democratize access to enterprise-grade cloud technologies and AI solutions, 
              empowering businesses of all sizes to compete in the digital economy. We believe 
              that every organization deserves the tools to innovate, scale, and succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}