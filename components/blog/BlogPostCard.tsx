import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/types/blog.types'

interface BlogPostCardProps {
  post: BlogPost
  locale: string
  variant?: 'default' | 'featured'
  index?: number
}

export function BlogPostCard({ post, locale, variant = 'default', index = 0 }: BlogPostCardProps) {
  const isFeatured = variant === 'featured' || post.featured

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className={`glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}>
        {post.featuredImageUrl && (
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-48"
            >
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            {isFeatured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-neon text-white">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author?.name || 'Unknown Author'}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {(post.publishedAt || post.createdAt).toLocaleDateString(locale)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTimeMinutes} min read
            </div>
          </div>
          
          {post.category && (
            <div className="mb-2">
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
            </div>
          )}
          
          <CardTitle className="text-xl text-white group-hover:text-neon transition-colors duration-300">
            <Link href={`/${locale}/blog/${post.slug}`}>
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-300 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-gradient-neon/10 text-neon text-xs rounded-full border border-neon/20"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              {post.viewCount} views
            </div>
            <Link href={`/${locale}/blog/${post.slug}`}>
              <Button 
                size="sm" 
                className="bg-transparent border border-neon text-neon hover:bg-neon hover:text-black transition-all duration-300 group/btn"
              >
                Read More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 