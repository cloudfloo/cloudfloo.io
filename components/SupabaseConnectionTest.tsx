'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error' | 'missing-config'>('testing')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔗 Testing Supabase connection...')

        // Check if Supabase URL and key are configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.warn('🚨 Supabase URL or key not configured')
          setError('Supabase URL or key not configured. Check your .env.local file.')
          setConnectionStatus('missing-config')
          return
        }
        
        // Test basic connection
        const { data, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        if (error) {
          console.error('🚨 Supabase connection error:', error)
          setError(error.message)
          setConnectionStatus('error')
        } else {
          console.log('✅ Supabase connection successful:', data)
          setConnectionStatus('connected')
        }
      } catch (err) {
        console.error('🚨 Supabase connection failed:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setConnectionStatus('error')
      }
    }

    testConnection()
  }, [])

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-sm z-50">
      <div className="font-bold mb-2">🔗 Supabase Test</div>
      <div>Status: {
        connectionStatus === 'testing' ? '🔄 Testing...' :
        connectionStatus === 'connected' ? '✅ Connected' : 
        connectionStatus === 'missing-config' ? '⚠️ Not Configured' :
        '🚨 Connection Error'
      }</div>
      {error && (
        <div className="mt-2 text-red-400">
          Error: {error}
        </div>
      )}
    </div>
  )
} 