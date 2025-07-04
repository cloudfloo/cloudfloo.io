'use client'

import { BlogPost } from '@/lib/types/blog.types'
import BackToHomeButton from '@/components/BackToHomeButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, Eye, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import dynamic from 'next/dynamic'

interface BlogPostPageClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

const MarkdownRenderer = dynamic(() => import('@/components/MarkdownRenderer'), { ssr: false })

export function BlogPostPageClient({ post, relatedPosts }: BlogPostPageClientProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <BackToHomeButton />
            <div className="text-gray-500">/</div>
            <Link href="/company/blog" className="text-gray-400 hover:text-neon transition-colors">
              Blog
            </Link>
            <div className="text-gray-500">/</div>
            <div className="text-neon truncate">{post.title}</div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link href="/company/blog">
                <Button 
                  variant="ghost" 
                  className="text-gray-400 hover:text-neon transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* Category & Featured Badge */}
              <div className="flex items-center gap-3 mb-4">
                {post.category && (
                  <Badge 
                    style={{ 
                      backgroundColor: post.category.color + '20', 
                      color: post.category.color,
                      borderColor: post.category.color + '40'
                    }}
                    variant="outline"
                  >
                    {post.category.name}
                  </Badge>
                )}
                {post.featured && (
                  <Badge className="bg-gradient-neon text-white">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
                {post.author && (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTimeMinutes} min read</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{post.viewCount} views</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-neon/10 text-neon text-sm rounded-full border border-neon/20"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </motion.header>

            {/* Featured Image */}
            {post.featuredImageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                </div>
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg prose-invert max-w-none mb-12"
            >
              <MarkdownRenderer content={post.content} />
            </motion.div>

            {/* Author Bio */}
            {post.author && post.author.bio && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass border-gray-700 rounded-lg p-6 mb-12"
              >
                <div className="flex items-start space-x-4">
                  {post.author.avatarUrl && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-3">
                      {post.author.bio}
                    </p>
                    {post.author.socialLinks && Object.keys(post.author.socialLinks).length > 0 && (
                      <div className="flex space-x-4">
                        {Object.entries(post.author.socialLinks).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neon hover:text-cyan-300 transition-colors capitalize"
                          >
                            {platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <BlogPostCard
                      key={relatedPost.id}
                      post={relatedPost}
                      locale="en"
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </article>
    </div>
  )
} 