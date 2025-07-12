'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from '@/lib/auth/auth.service'
import { AuthContextType, AuthUser, SignInCredentials, SignUpCredentials, UserProfile } from '@/lib/auth/auth.types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing session on mount
    checkUser()

    let subscription: { unsubscribe: () => void } | undefined;
    
    try {
      // Listen for auth state changes
      const { data } = authService.onAuthStateChange((authUser) => {
        setUser(authUser)
        setLoading(false)
      })
      
      subscription = data.subscription;
    } catch (err) {
      console.error('Error setting up auth state change listener:', err)
      setLoading(false)
    }

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      console.error('Error checking user:', err)
      setError(err instanceof Error ? err.message : 'Failed to check user')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (credentials: SignInCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const authUser = await authService.signIn(credentials)
      setUser(authUser)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const authUser = await authService.signUp(credentials)
      setUser(authUser)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      await authService.signOut()
      setUser(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await authService.resetPassword(email)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setError(null)
      if (!user) throw new Error('No user logged in')
      
      const updatedProfile = await authService.updateProfile(user.id, updates)
      setUser({
        ...user,
        profile: updatedProfile
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 