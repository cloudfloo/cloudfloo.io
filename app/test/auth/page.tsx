'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthTestPage() {
  const { user, loading, error, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('admin@cloudfloo.io')
  const [password, setPassword] = useState('Admin123!')
  const [testResult, setTestResult] = useState<string>('')

  const handleTestSignIn = async () => {
    try {
      setTestResult('Testing sign in...')
      console.log('🔐 Testing sign in with:', { email, password })
      
      await signIn({ email, password })
      setTestResult('✅ Sign in successful!')
      console.log('✅ Sign in test completed')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      setTestResult(`🚨 Sign in failed: ${errorMsg}`)
      console.error('🚨 Sign in test failed:', err)
    }
  }

  const handleTestSignOut = async () => {
    try {
      setTestResult('Testing sign out...')
      console.log('🔐 Testing sign out')
      
      await signOut()
      setTestResult('✅ Sign out successful!')
      console.log('✅ Sign out test completed')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      setTestResult(`🚨 Sign out failed: ${errorMsg}`)
      console.error('🚨 Sign out test failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">🔐 Authentication Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-gray-300">Loading:</strong>
                <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
                  {loading ? ' ⏳ Yes' : ' ✅ No'}
                </span>
              </div>
              <div>
                <strong className="text-gray-300">User:</strong>
                <span className={user ? 'text-green-400' : 'text-red-400'}>
                  {user ? ' ✅ Logged In' : ' ❌ Not Logged In'}
                </span>
              </div>
              <div className="col-span-2">
                <strong className="text-gray-300">Error:</strong>
                <span className={error ? 'text-red-400' : 'text-green-400'}>
                  {error ? ` 🚨 ${error}` : ' ✅ None'}
                </span>
              </div>
            </div>

            {user && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                <div className="text-green-400 font-semibold">User Details:</div>
                <div className="text-sm text-gray-300">
                  <div>ID: {user.id}</div>
                  <div>Email: {user.email}</div>
                  <div>Role: {user.profile?.role || 'No profile'}</div>
                  <div>Full Name: {user.profile?.fullName || 'Not set'}</div>
                  <div>Active: {user.profile?.isActive ? 'Yes' : 'No'}</div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white"
              />
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleTestSignIn}
                  disabled={loading || !!user}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Test Sign In
                </Button>
                <Button 
                  onClick={handleTestSignOut}
                  disabled={loading || !user}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  Test Sign Out
                </Button>
              </div>
            </div>

            {testResult && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <div className="text-blue-400 font-semibold">Test Result:</div>
                <div className="text-sm text-gray-300">{testResult}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">🔗 Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/auth/login" className="block text-blue-400 hover:text-blue-300">
              → Go to Login Page
            </a>
            <a href="/admin/dashboard" className="block text-blue-400 hover:text-blue-300">
              → Go to Admin Dashboard
            </a>
            <a href="/" className="block text-blue-400 hover:text-blue-300">
              → Go to Homepage
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 