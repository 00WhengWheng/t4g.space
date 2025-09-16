/**
 * Tenant User Profile Component
 * Displays tenant user information and authentication controls
 */

import { useTenantAuth } from '../lib/tenant-auth'
import { Button } from 'shared'
import { LogOut, Shield, Building, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const TenantUserProfile = () => {
  const { 
    user, 
    logout, 
    isTenantAdmin, 
    getTenantId, 
    getBusinessName,
    isAuthenticated 
  } = useTenantAuth()
  
  const [isOpen, setIsOpen] = useState(false)

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2"
      >
        <div className="flex items-center space-x-2">
          {user.picture ? (
            <img 
              src={user.picture} 
              alt={user.name || 'User'} 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          )}
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium">
              {getBusinessName() || user.name}
            </div>
            {isTenantAdmin() && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </div>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-background border rounded-lg shadow-lg z-20">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name || 'User'} 
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Business:</span>
                  <span className="ml-2 font-medium">
                    {getBusinessName() || 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Role:</span>
                  <span className="ml-2 font-medium">
                    {isTenantAdmin() ? 'Administrator' : 'User'}
                  </span>
                </div>
                
                {getTenantId() && (
                  <div className="flex items-center text-sm">
                    <span className="text-muted-foreground">Tenant ID:</span>
                    <code className="ml-2 text-xs bg-muted px-1 py-0.5 rounded">
                      {getTenantId()}
                    </code>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                    logout()
                  }}
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}