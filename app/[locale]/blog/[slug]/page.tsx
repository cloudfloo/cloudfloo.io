import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogService } from '@/lib/services/blog.service'
import { BlogPost } from '@/lib/types/blog.types'
import { BlogPostPageClient } from '@/app/company/blog/[slug]/BlogPostPageClient'

interface BlogLocalePageProps {
  params: {
    locale: string
    slug: string
  }
}

// Supported locales; extend as needed
const SUPPORTED_LOCALES = ['en', 'pl']

export async function generateStaticParams() {
  let slugs: string[] = []
  try {
    // Fetch up to 100 published posts if environment variables are available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { posts } = await blogService.getPosts({ status: 'published', limit: 100 })
      slugs = posts.map(p => p.slug)
    }
  } catch (_) {
    // Ignore errors and fall back to hard-coded list
  }

  if (slugs.length === 0) {
    slugs = [
      'ai-powered-cloud-infrastructure',
      'kubernetes-security-best-practices',
      'serverless-architecture-guide',
      'building-resilient-ai-systems'
    ]
  }

  const params: { locale: string; slug: string }[] = []
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: BlogLocalePageProps): Promise<Metadata> {
  const { slug } = params
  const post = await blogService.getPostBySlug(slug)
  if (!post) {
    return { title: 'Post not found' }
  }
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function BlogLocalePostPage({ params }: BlogLocalePageProps) {
  const { locale, slug } = params

  // In this initial version we ignore locale differences and show the default content.
  // Future work: fetch translation by locale from blog_post_translations.
  const post = await blogService.getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  // Increment view count only on production runtime (reuse logic)
  await blogService.incrementViewCount(slug)

  // Related posts logic (simple)
  let relatedPosts: BlogPost[] = []
  if (post.category) {
    const related = await blogService.getPosts({ category: post.category.slug, limit: 3 })
    relatedPosts = related.posts.filter(p => p.id !== post.id).slice(0, 3)
  }

  return <BlogPostPageClient post={post} relatedPosts={relatedPosts} />
} 