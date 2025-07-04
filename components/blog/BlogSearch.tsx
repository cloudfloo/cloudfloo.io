'use client'

import { useState, useEffect, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Tag, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useDebounce } from '@/hooks/use-debounce'
import { BlogCategory } from '@/lib/types/blog.types'

interface BlogSearchProps {
  categories: BlogCategory[]
  onSearch: (query: string) => void
  onCategoryFilter: (categorySlug: string | null) => void
  onTagFilter?: (tagSlug: string | null) => void
  selectedCategory?: string | null
  selectedTag?: string | null
}

export function BlogSearch({ 
  categories, 
  onSearch, 
  onCategoryFilter, 
  onTagFilter,
  selectedCategory,
  selectedTag 
}: BlogSearchProps) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  const allCategories = useMemo(() => [
    { id: 'all', name: t('blog.categories.all') || 'All', slug: 'all', color: '#06b6d4', description: '', created_at: '', updated_at: '' },
    ...categories
  ], [categories, t])

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-neon focus:ring-neon/20"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setSearchTerm('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryFilter(category.slug === 'all' ? null : category.slug)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
              (selectedCategory === category.slug) || (selectedCategory === null && category.slug === 'all')
                ? 'border-neon text-neon'
                : 'border-gray-600 text-gray-300 hover:border-neon/50 hover:text-neon'
            }`}
            style={{
              backgroundColor: (selectedCategory === category.slug) || (selectedCategory === null && category.slug === 'all')
                ? category.color + '20'
                : 'transparent'
            }}
          >
            <Tag className="w-4 h-4 inline mr-2" />
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Active Filters */}
      {(selectedCategory || selectedTag || searchTerm) && (
        <motion.div 
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {searchTerm && (
            <Badge variant="secondary" className="bg-neon/20 text-neon">
              Search: {searchTerm}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => setSearchTerm('')}
              />
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="bg-neon/20 text-neon">
              Category: {categories.find(c => c.slug === selectedCategory)?.name}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onCategoryFilter(null)}
              />
            </Badge>
          )}
          {selectedTag && onTagFilter && (
            <Badge variant="secondary" className="bg-neon/20 text-neon">
              Tag: {selectedTag}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onTagFilter(null)}
              />
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  )
} 