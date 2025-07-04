export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  createdAt: Date
}

export interface BlogAuthor {
  id: string
  userId?: string
  name: string
  bio: string
  avatarUrl?: string
  socialLinks: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostTag {
  blog_post_id: string
  blog_tag_id: string
  blog_tags: BlogTag
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImageUrl?: string
  status: 'draft' | 'published' | 'archived'
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  readTimeMinutes: number
  viewCount: number
  metaTitle?: string
  metaDescription?: string
  featured: boolean
  // Nested relationships
  author?: BlogAuthor
  category?: BlogCategory
  tags: BlogTag[]
  blog_post_tags?: BlogPostTag[]
}

export interface BlogPostTranslation {
  id: string
  postId: string
  locale: string
  title: string
  excerpt: string
  content: string
  slug: string
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogPostWithTranslation extends Omit<BlogPost, 'title' | 'excerpt' | 'content' | 'slug'> {
  title: string
  excerpt: string
  content: string
  slug: string
  meta_title?: string
  meta_description?: string
}

export interface BlogSearchParams {
  search?: string
  category?: string
  tag?: string
  status?: 'draft' | 'published' | 'archived'
  author?: string
  featured?: boolean
  limit?: number
  offset?: number
}

export interface CreateBlogPostData {
  title: string
  content: string
  excerpt?: string
  slug?: string
  featuredImageUrl?: string
  categoryId?: string
  status?: 'draft' | 'published'
  publishedAt?: Date
  metaTitle?: string
  metaDescription?: string
  featured?: boolean
}

export interface BlogPaginatedResponse {
  posts: BlogPost[]
  total: number
  hasMore: boolean
} 