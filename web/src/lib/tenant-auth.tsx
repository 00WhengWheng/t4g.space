/**
 * Tenant Authentication Context and Hooks
 * Provides authentication state and methods for tenant users
 */

import { createContext, useContext, type ReactNode } from 'react'
import { useAuth0, User } from '@auth0/auth0-react'

export interface TenantUser extends User {
  // Add tenant-specific properties
  tenant_id?: string
  tenant_role?: 'admin' | 'manager' | 'viewer'
  business_name?: string
}

export interface TenantAuthContextType {
  // Auth state
  isAuthenticated: boolean
  isLoading: boolean
  user: TenantUser | undefined
  error: Error | undefined
  
  // Auth actions
  loginWithRedirect: () => Promise<void>
  logout: () => void
  getAccessTokenSilently: () => Promise<string>
  
  // Tenant-specific helpers
  isTenantAdmin: () => boolean
  getTenantId: () => string | undefined
  getBusinessName: () => string | undefined
}

const TenantAuthContext = createContext<TenantAuthContextType | undefined>(undefined)

export const useTenantAuth = (): TenantAuthContextType => {
  const context = useContext(TenantAuthContext)
  if (!context) {
    throw new Error('useTenantAuth must be used within a TenantAuthProvider')
  }
  return context
}

interface TenantAuthProviderProps {
  children: ReactNode
}

export const TenantAuthProvider = ({ children }: TenantAuthProviderProps) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0()

  const tenantUser = user as TenantUser

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }

  const isTenantAdmin = (): boolean => {
    return tenantUser?.tenant_role === 'admin'
  }

  const getTenantId = (): string | undefined => {
    return tenantUser?.tenant_id
  }

  const getBusinessName = (): string | undefined => {
    return tenantUser?.business_name || tenantUser?.name
  }

  const value: TenantAuthContextType = {
    isAuthenticated,
    isLoading,
    user: tenantUser,
    error,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    isTenantAdmin,
    getTenantId,
    getBusinessName,
  }

  return (
    <TenantAuthContext.Provider value={value}>
      {children}
    </TenantAuthContext.Provider>
  )
}