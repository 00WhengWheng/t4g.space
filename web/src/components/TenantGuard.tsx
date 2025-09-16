/**
 * Tenant Authentication Guard
 * Protects routes that require tenant authentication
 */

import { type ReactNode } from 'react'
import { useTenantAuth } from '../lib/tenant-auth'
import { Button } from 'shared'
import { Shield, LogIn, Loader2 } from 'lucide-react'

interface TenantGuardProps {
  children: ReactNode
  fallback?: ReactNode
  requireAdmin?: boolean
}

export const TenantGuard = ({ 
  children, 
  fallback,
  requireAdmin = false 
}: TenantGuardProps) => {
  const { 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    isTenantAdmin,
    getBusinessName 
  } = useTenantAuth()

  // Show loading state
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Verifying tenant authentication...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6 p-6">
          <div className="space-y-2">
            <Shield className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-2xl font-bold">Tenant Access Required</h1>
            <p className="text-muted-foreground">
              Please sign in with your business account to access the T4G.Space dashboard.
            </p>
          </div>
          
          <Button 
            onClick={() => loginWithRedirect()}
            className="w-full"
            size="lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In to Dashboard
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Don't have a business account?{' '}
            <a 
              href="mailto:support@t4g.space" 
              className="text-primary hover:underline"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Check admin requirement
  if (requireAdmin && !isTenantAdmin()) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6 p-6">
          <div className="space-y-2">
            <Shield className="h-12 w-12 mx-auto text-destructive" />
            <h1 className="text-2xl font-bold">Admin Access Required</h1>
            <p className="text-muted-foreground">
              This area requires administrator privileges for{' '}
              <strong>{getBusinessName()}</strong>.
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Need admin access?{' '}
            <a 
              href="mailto:support@t4g.space" 
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated and authorized - render children
  return <>{children}</>
}