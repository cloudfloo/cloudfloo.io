import { supabase } from '@/lib/supabase/client'
import { 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  BlogAuthor, 
  BlogSearchParams,
  BlogPaginatedResponse 
} from '@/lib/types/blog.types'
import { Database } from '@/lib/types/supabase.types'

type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']
type BlogCategoryRow = Database['public']['Tables']['blog_categories']['Row']
type BlogTagRow = Database['public']['Tables']['blog_tags']['Row']
type BlogAuthorRow = Database['public']['Tables']['blog_authors']['Row']

export class BlogService {
  // Transform database row to BlogPost interface
  private transformPost(
    post: BlogPostRow & {
      blog_categories?: BlogCategoryRow | null
      blog_authors?: BlogAuthorRow | null
      tags?: BlogTagRow[]
    }
  ): BlogPost {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImageUrl: post.featured_image_url || undefined,
      status: post.status as 'draft' | 'published' | 'archived',
      publishedAt: post.published_at ? new Date(post.published_at) : undefined,
      createdAt: new Date(post.created_at!),
      updatedAt: new Date(post.updated_at!),
      readTimeMinutes: post.read_time_minutes || 5,
      viewCount: post.view_count || 0,
      metaTitle: post.meta_title || undefined,
      metaDescription: post.meta_description || undefined,
      featured: post.featured || false,
      category: post.blog_categories ? {
        id: post.blog_categories.id,
        name: post.blog_categories.name,
        slug: post.blog_categories.slug,
        description: post.blog_categories.description || '',
        color: post.blog_categories.color || '#06b6d4',
        createdAt: new Date(post.blog_categories.created_at!),
        updatedAt: new Date(post.blog_categories.updated_at!)
      } : undefined,
      author: post.blog_authors ? {
        id: post.blog_authors.id,
        name: post.blog_authors.name,
        bio: post.blog_authors.bio || '',
        avatarUrl: post.blog_authors.avatar_url || undefined,
        socialLinks: (post.blog_authors.social_links as Record<string, string>) || {},
        createdAt: new Date(post.blog_authors.created_at!),
        updatedAt: new Date(post.blog_authors.updated_at!)
      } : undefined,
      tags: post.tags?.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        createdAt: new Date(tag.created_at!)
      })) || []
    }
  }

  // Transform database row to BlogCategory interface
  private transformCategory(category: BlogCategoryRow): BlogCategory {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color || '#06b6d4',
      createdAt: new Date(category.created_at!),
      updatedAt: new Date(category.updated_at!)
    }
  }

  // Get posts with filtering and pagination
  async getPosts(params: BlogSearchParams = {}): Promise<BlogPaginatedResponse> {
    const {
      status = 'published',
      category,
      featured,
      search,
      limit = 10,
      offset = 0
    } = params

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories!inner(*),
        blog_authors!inner(*),
        blog_post_tags!inner(
          blog_tags!inner(*)
        )
      `)

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }

    if (category) {
      query = query.eq('blog_categories.slug', category)
    }

    if (featured !== undefined) {
      query = query.eq('featured', featured)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
    }

    // Get total count
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    // Execute query with pagination
    const { data, error } = await query
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching posts:', error)
      return { posts: [], total: 0, hasMore: false }
    }

    // Transform and group tags
    const postsMap = new Map<string, any>()
    
    data?.forEach(row => {
      const postId = row.id
      if (!postsMap.has(postId)) {
        postsMap.set(postId, {
          ...row,
          tags: []
        })
      }
      
      // Add tag if it exists
      if (row.blog_post_tags?.[0]?.blog_tags) {
        const existingPost = postsMap.get(postId)
        existingPost.tags.push(row.blog_post_tags[0].blog_tags)
      }
    })

    const posts = Array.from(postsMap.values()).map(post => this.transformPost(post))

    return {
      posts,
      total: count || 0,
      hasMore: offset + limit < (count || 0)
    }
  }

  // Get single post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(*),
        blog_authors(*),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      console.error('Error fetching post:', error)
      return null
    }

    // Transform tags
    const tags = data.blog_post_tags?.map(pt => pt.blog_tags).filter(Boolean) || []

    return this.transformPost({
      ...data,
      tags
    })
  }

  // Get all categories
  async getCategories(): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data.map(category => this.transformCategory(category))
  }

  // Search posts
  async searchPosts(query: string, limit = 10): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_categories(*),
        blog_authors(*),
        blog_post_tags(
          blog_tags(*)
        )
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error searching posts:', error)
      return []
    }

    return data.map(post => {
      const tags = post.blog_post_tags?.map(pt => pt.blog_tags).filter(Boolean) || []
      return this.transformPost({
        ...post,
        tags
      })
    })
  }

  // CRUD operations (for CMS)
  async createPost(post: Partial<BlogPost>): Promise<BlogPost | null> {
    // TODO: Implement create post
    throw new Error('Not implemented yet')
  }

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    // TODO: Implement update post
    throw new Error('Not implemented yet')
  }

  async deletePost(id: string): Promise<boolean> {
    // TODO: Implement delete post
    throw new Error('Not implemented yet')
  }

  async incrementViewCount(slug: string): Promise<void> {
    const { error } = await supabase.rpc('increment_view_count', { post_slug: slug })
    
    if (error) {
      console.error('Error incrementing view count:', error)
    }
  }
}

// Export singleton instance
export const blogService = new BlogService() 