'use client';

import { useState, useEffect, useCallback } from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogService } from '@/lib/services/blog.service';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogPost, BlogCategory } from '@/lib/types/blog.types';

export default function BlogPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [postsResult, categoriesResult] = await Promise.all([
          blogService.getPosts({ status: 'published' }),
          blogService.getCategories()
        ]);
        
        setPosts(postsResult.posts);
        setCategories(categoriesResult);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setPosts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    
    try {
      if (query.trim()) {
        const result = await blogService.searchPosts(query);
        setPosts(result);
      } else {
        // Reset to all posts
        const result = await blogService.getPosts({ 
          status: 'published',
          category: selectedCategory || undefined
        });
        setPosts(result.posts);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  // Handle category filter
  const handleCategoryFilter = useCallback(async (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setLoading(true);
    
    try {
      const result = await blogService.getPosts({ 
        status: 'published',
        category: categorySlug || undefined
      });
      setPosts(result.posts);
    } catch (error) {
      console.error('Error filtering by category:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

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
              dangerouslySetInnerHTML={{ __html: t('blog.heroTitle') || 'Tech <span class="text-neon">Insights</span>' }}
            />
            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('blog.heroSubtitle') || 'Discover the latest trends in cloud computing, DevOps, AI, and software development from our team of experts.'}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-black/30">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">{t('blog.featuredTitle') || 'Featured Articles'}</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('blog.featuredSubtitle') || 'Hand-picked articles showcasing the latest innovations and best practices in technology.'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale="en"
                  variant="featured"
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <BlogSearch
              categories={categories}
              onSearch={handleSearch}
              onCategoryFilter={handleCategoryFilter}
              selectedCategory={selectedCategory}
            />

            {/* Blog Posts Grid */}
            <div className="mt-12">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="glass border-gray-700 rounded-lg overflow-hidden h-96">
                        <div className="bg-gray-700 h-48"></div>
                        <div className="p-6 space-y-4">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-700 rounded"></div>
                            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, index) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      locale="en"
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>

            {!loading && regularPosts.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-400 text-lg">{t('blog.noPosts') || 'No articles found matching your criteria.'}</p>
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
            <h2 className="text-4xl font-bold mb-6">{t('blog.stayUpdatedTitle') || 'Stay Updated'}</h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('blog.stayUpdatedSubtitle') || 'Get the latest insights delivered directly to your inbox.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('blog.newsletterPlaceholder') || 'Enter your email'}
                className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
              />
              <Button className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                {t('blog.subscribe') || 'Subscribe'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}