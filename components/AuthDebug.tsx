'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function AuthDebug() {
  const { user, loading, error } = useAuth()

  useEffect(() => {
    console.log('🔐 Auth Debug - State Update:', {
      user: user ? {
        id: user.id,
        email: user.email,
        profile: user.profile ? {
          role: user.profile.role,
          fullName: user.profile.fullName,
          isActive: user.profile.isActive
        } : null
      } : null,
      loading,
      error,
      timestamp: new Date().toISOString()
    })
  }, [user, loading, error])

  useEffect(() => {
    console.log('🔐 Auth Debug - Component Mounted')
    
    // Log any uncaught errors
    const handleError = (event: ErrorEvent) => {
      console.error('🚨 Uncaught Error:', event.error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled Promise Rejection:', event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      console.log('🔐 Auth Debug - Component Unmounted')
    }
  }, [])

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-sm z-50">
      <div className="font-bold mb-2">🔐 Auth Debug</div>
      <div>Loading: {loading ? '✅' : '❌'}</div>
      <div>User: {user ? '✅' : '❌'}</div>
      <div>Error: {error ? '🚨' : '✅'}</div>
      {user && (
        <div className="mt-2">
          <div>Email: {user.email}</div>
          <div>Role: {user.profile?.role || 'none'}</div>
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-400">
          Error: {error}
        </div>
      )}
    </div>
  )
} 