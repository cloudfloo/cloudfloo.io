import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogService } from '@/lib/services/blog.service'
import { BlogPost } from '@/lib/types/blog.types'
import { BlogPostPageClient } from './BlogPostPageClient'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate static params for static export
export async function generateStaticParams() {
  // For static export, we return known blog post slugs
  // These should match the slugs in your database
  return [
    { slug: 'ai-powered-cloud-infrastructure' },
    { slug: 'kubernetes-security-best-practices' },
    { slug: 'serverless-architecture-guide' },
    { slug: 'building-resilient-ai-systems' },
  ]
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await blogService.getPostBySlug(params.slug)
    
    if (!post) {
      return {
        title: 'Post Not Found - CloudFloo',
        description: 'The requested blog post could not be found.'
      }
    }

    return {
      title: post.metaTitle || `${post.title} - CloudFloo Blog`,
      description: post.metaDescription || post.excerpt,
      keywords: post.tags.map(tag => tag.name).join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt?.toISOString(),
        authors: post.author ? [post.author.name] : [],
        images: post.featuredImageUrl ? [
          {
            url: post.featuredImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post - CloudFloo',
      description: 'Read the latest insights on cloud computing, AI, and technology.'
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: BlogPost
  let relatedPosts: BlogPost[] = []

  try {
    // Fetch the post
    const fetchedPost = await blogService.getPostBySlug(params.slug)
    
    if (!fetchedPost) {
      notFound()
    }

    post = fetchedPost

    // Only increment view count if we're not in static generation
    if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
      try {
        await blogService.incrementViewCount(params.slug)
      } catch (error) {
        // Silently fail during static generation
        console.warn('Could not increment view count during static generation')
      }
    }

    // Fetch related posts (same category, excluding current post)
    if (post.category) {
      try {
        const relatedResult = await blogService.getPosts({
          category: post.category.slug,
          limit: 3
        })
        relatedPosts = relatedResult.posts.filter(p => p.id !== post.id).slice(0, 3)
      } catch (error) {
        console.warn('Could not fetch related posts:', error)
        // Continue without related posts
      }
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }

  return <BlogPostPageClient post={post} relatedPosts={relatedPosts} />
} 