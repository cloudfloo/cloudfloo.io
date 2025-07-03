'use client';

import { useState } from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'cloud', label: 'Cloud Computing' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'devops', label: 'DevOps' },
    { id: 'security', label: 'Security' },
    { id: 'tutorials', label: 'Tutorials' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Serverless Computing: Trends and Predictions for 2024',
      excerpt: 'Explore the latest developments in serverless architecture and what they mean for modern application development.',
      content: 'Serverless computing has revolutionized how we build and deploy applications...',
      author: 'Sarah Rodriguez',
      date: '2024-01-15',
      category: 'cloud',
      tags: ['serverless', 'aws', 'architecture'],
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Building Resilient AI Systems: Best Practices for Production ML',
      excerpt: 'Learn how to design and implement machine learning systems that can handle real-world challenges.',
      content: 'Production machine learning systems face unique challenges...',
      author: 'Alex Chen',
      date: '2024-01-12',
      category: 'ai',
      tags: ['machine-learning', 'mlops', 'production'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '12 min read',
      featured: true
    },
    {
      id: 3,
      title: 'Kubernetes Security: A Comprehensive Guide to Container Orchestration',
      excerpt: 'Deep dive into Kubernetes security best practices and how to protect your containerized applications.',
      content: 'Container security is more critical than ever...',
      author: 'David Kim',
      date: '2024-01-10',
      category: 'security',
      tags: ['kubernetes', 'security', 'containers'],
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '15 min read'
    },
    {
      id: 4,
      title: 'GitOps Workflow: Streamlining Deployment with Infrastructure as Code',
      excerpt: 'Implement GitOps practices to automate your deployment pipeline and improve reliability.',
      content: 'GitOps represents a paradigm shift in how we manage deployments...',
      author: 'Maria Santos',
      date: '2024-01-08',
      category: 'devops',
      tags: ['gitops', 'ci-cd', 'automation'],
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '10 min read'
    },
    {
      id: 5,
      title: 'Edge Computing Revolution: Bringing Processing Closer to Users',
      excerpt: 'Understand how edge computing is transforming application performance and user experience.',
      content: 'Edge computing is reshaping the digital landscape...',
      author: 'James Wilson',
      date: '2024-01-05',
      category: 'cloud',
      tags: ['edge-computing', 'performance', 'cdn'],
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '7 min read'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Blog - Najnowsze Trendy w Cloud Computing | CloudFloo"
        description="Poznaj najnowsze trendy w technologii chmurowej, DevOps, AI i programowaniu. Eksperci CloudFloo dzielą się wiedzą o AWS, Azure, Kubernetes 🔧"
        keywords="cloud computing blog, DevOps tutorials, AI machine learning, AWS Azure GCP, Kubernetes, Polish tech blog"
        url="https://cloudfloo.io/company/blog"
      />
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <div className="text-neon">Blog</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CloudFloo <span className="text-neon">Blog</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Insights, tutorials, and thought leadership on cloud computing, AI, and modern software development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Posts Carousel */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Featured Posts</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our latest insights and deep dives into cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-neon text-white">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-neon transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-300 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-transparent border border-neon text-neon hover:bg-neon hover:text-black transition-all duration-300 group/btn"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <motion.div 
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-neon/20 border-neon text-neon'
                      : 'border-gray-600 text-gray-300 hover:border-neon/50 hover:text-neon'
                  }`}
                >
                  <Tag className="w-4 h-4 inline mr-2" />
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mb-2">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <CardTitle className="text-lg text-white group-hover:text-neon transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <CardDescription className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-neon hover:bg-neon/10 p-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
              />
              <Button className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}