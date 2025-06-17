'use client';

import { Users, Target, Award, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useCounterAnimation, useParallax } from '@/hooks/use-scroll-animation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EnhancedAbout() {
  const [isClient, setIsClient] = useState(false);
  
  const stats = [
    { number: 500, label: 'Projects Delivered', icon: Rocket, suffix: '+' },
    { number: 99.99, label: 'Uptime Guarantee', icon: Award, suffix: '%' },
    { number: 50, label: 'Enterprise Clients', icon: Users, suffix: '+' },
    { number: 24, label: 'Support Available', icon: Target, suffix: '/7' },
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

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.3);

  // Counter animations for stats
  const counter1 = useCounterAnimation(500, 2000);
  const counter2 = useCounterAnimation(99.99, 2000);
  const counter3 = useCounterAnimation(50, 2000);
  const counter4 = useCounterAnimation(24, 2000);

  const counters = [counter1, counter2, counter3, counter4];

  // Fix hydration error by initializing as empty array and populating in useEffect
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate floating elements only on client side
    setFloatingElements(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 4
      }))
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden scroll-offset">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {isClient && floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-neon/20 rounded-full"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Parallax Background */}
      <motion.div
        ref={parallaxRef}
        className="absolute inset-0 opacity-10"
        style={{
          ...(isClient && { transform: `translateY(${offset}px)` }),
          background: 'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(0,229,255,0.1) 0%, transparent 50%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={titleVisible ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={textRevealVariants}
            custom={0}
          >
            Why Partner with <span className="text-neon">CloudFloo</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            variants={textRevealVariants}
            custom={1}
          >
            We&apos;re more than a service provider—we&apos;re your strategic technology partner, committed to your long-term success through proven expertise and personalized solutions.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={statsVisible ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const counter = counters[index];
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="w-12 h-12 bg-gradient-neon/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-neon/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-neon" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-3xl font-bold text-neon mb-2"
                      initial={{ scale: 0 }}
                      animate={statsVisible ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.2 + 0.5, type: 'spring', stiffness: 200 }}
                    >
                      {index === 1 ? counter.count.toFixed(2) : counter.count}{stat.suffix}
                    </motion.div>
                    
                    <motion.div 
                      className="text-sm text-gray-300"
                      initial={{ opacity: 0 }}
                      animate={statsVisible ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.2 + 0.8 }}
                    >
                      {stat.label}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet Your <span className="text-neon">Expert Team</span>
          </motion.h3>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Industry veterans dedicated to understanding your unique challenges and delivering tailored solutions
          </motion.p>
          
          {/* Button to Team Page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/company/team">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 mb-12"
                >
                  Meet Our Team
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          ref={teamRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={teamVisible ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="relative mb-4 mx-auto w-24 h-24 overflow-hidden rounded-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.h4 
                    className="text-xl font-semibold text-white mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={teamVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {member.name}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-neon text-sm mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={teamVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {member.role}
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-300 text-sm leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={teamVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    {member.bio}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          ref={missionRef}
          className="text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={missionVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 max-w-4xl mx-auto overflow-hidden">
            <CardContent className="p-8">
              <motion.h3 
                className="text-2xl font-bold text-neon mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={missionVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Our Partnership Promise
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={missionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                We believe every business deserves a trusted technology partner who understands their unique journey. Through collaborative relationships and deep expertise, we empower organizations to harness the full potential of cloud technologies, ensuring sustainable growth and competitive advantage in an ever-evolving digital landscape.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}