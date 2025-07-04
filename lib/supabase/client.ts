import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/supabase.types'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key'

export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client-side Supabase client (uses placeholder when not configured)
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
)

// Server-side Supabase client (for API routes, etc.)
export const createServerClient = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase environment variables are not configured')
  }
  return createClient<Database>(supabaseUrl!, supabaseAnonKey!)
}
