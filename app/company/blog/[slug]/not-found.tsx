'use client'

import BackToHomeButton from '@/components/BackToHomeButton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileX } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
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
            <div className="text-neon">Post Not Found</div>
          </div>
        </div>
      </header>

      {/* Not Found Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <FileX className="w-24 h-24 mx-auto text-gray-400 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Article Not Found
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <Link href="/company/blog">
              <Button className="bg-gradient-neon text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <div className="text-gray-400">
              or{' '}
              <Link href="/" className="text-neon hover:text-cyan-300 transition-colors">
                return to homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 