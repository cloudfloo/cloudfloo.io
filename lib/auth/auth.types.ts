export interface UserProfile {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  role: 'admin' | 'editor' | 'user'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthUser {
  id: string
  email: string
  profile?: UserProfile
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  email: string
  password: string
  fullName?: string
}

export interface AuthContextType extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
} 