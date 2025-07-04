import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { AuthUser, UserProfile, SignInCredentials, SignUpCredentials } from './auth.types'
import { AuthError, User } from '@supabase/supabase-js'

class AuthService {
  /**
   * Transform Supabase user to our AuthUser type
   */
  private async transformUser(user: User): Promise<AuthUser> {
    let profile: any = null
    if (isSupabaseConfigured) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      profile = data
    }

    return {
      id: user.id,
      email: user.email!,
      profile: profile ? {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name || undefined,
        avatarUrl: profile.avatar_url || undefined,
        role: (profile.role as 'admin' | 'editor' | 'user') || 'user',
        isActive: profile.is_active ?? true,
        createdAt: new Date(profile.created_at || Date.now()),
        updatedAt: new Date(profile.updated_at || Date.now())
      } : undefined
    }
  }

  /**
   * Get current user session
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    if (!isSupabaseConfigured) {
      return null
    }
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        return null
      }

      return await this.transformUser(user)
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(credentials: SignInCredentials): Promise<AuthUser> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured')
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (error) {
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error('No user returned from sign in')
      }

      return await this.transformUser(data.user)
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(credentials: SignUpCredentials): Promise<AuthUser> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured')
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.fullName
          }
        }
      })

      if (error) {
        throw new Error(error.message)
      }

      if (!data.user) {
        throw new Error('No user returned from sign up')
      }

      return await this.transformUser(data.user)
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured')
    }
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured')
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured')
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          avatar_url: updates.avatarUrl,
          role: updates.role,
          is_active: updates.isActive
        })
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return {
        id: data.id,
        email: data.email,
        fullName: data.full_name || undefined,
        avatarUrl: data.avatar_url || undefined,
        role: (data.role as 'admin' | 'editor' | 'user') || 'user',
        isActive: data.is_active ?? true,
        createdAt: new Date(data.created_at || Date.now()),
        updatedAt: new Date(data.updated_at || Date.now())
      }
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  /**
   * Check if user has required role
   */
  hasRole(user: AuthUser | null, requiredRoles: string[]): boolean {
    if (!user?.profile) return false
    return requiredRoles.includes(user.profile.role)
  }

  /**
   * Check if user is admin
   */
  isAdmin(user: AuthUser | null): boolean {
    return this.hasRole(user, ['admin'])
  }

  /**
   * Check if user can edit content (admin or editor)
   */
  canEdit(user: AuthUser | null): boolean {
    return this.hasRole(user, ['admin', 'editor'])
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    if (!isSupabaseConfigured) {
      return { data: null }
    }
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = await this.transformUser(session.user)
        callback(authUser)
      } else {
        callback(null)
      }
    })
  }
}

export const authService = new AuthService() 