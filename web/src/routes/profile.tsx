import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from 'shared'
import { User, Mail, Edit, Settings, Bell, Shield, Building, Calendar, Crown } from 'lucide-react'
import { useTenantAuth } from '../lib/tenant-auth'
import { trpc } from '../lib/trpc'

export const Route = createFileRoute('/profile')({
  component: ProfileSection,
})

function ProfileSection() {
  const { 
    user, 
    isTenantAdmin, 
    getTenantId, 
    getBusinessName,
    isAuthenticated 
  } = useTenantAuth()

  const { data: tenantProfile, isLoading, error } = (trpc as any).tenant.getProfile.useQuery()

  console.log('tRPC Profile Query:', { tenantProfile, isLoading, error })

  if (!isAuthenticated || !user) {
    return null // This will be handled by TenantGuard
  }

  const stats = [
    { label: "Gifts Created", value: tenantProfile?.totalGifts || "45" },
    { label: "Challenges Won", value: tenantProfile?.challengesWon || "12" },
    { label: "Total Revenue", value: tenantProfile?.totalRevenue || "$23.4K" },
    { label: "User Rating", value: tenantProfile?.rating || "4.8/5" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Tenant Profile</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Manage your business account and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name || 'User'} 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              <CardTitle className="flex items-center justify-center gap-2">
                {user.name}
                {isTenantAdmin() && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </CardTitle>
              <CardDescription>
                {isTenantAdmin() ? 'Business Administrator' : 'Tenant User'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              
              {getBusinessName() && (
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{getBusinessName()}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {isTenantAdmin() ? 'Administrator' : 'Standard User'}
                </span>
              </div>
              
              {getTenantId() && (
                <div className="flex items-center space-x-3">
                  <span className="text-muted-foreground text-sm">Tenant ID:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {getTenantId()}
                  </code>
                </div>
              )}
              
              {user.updated_at && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Last updated: {new Date(user.updated_at).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="pt-4 space-y-2">
                <Button className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Statistics</CardTitle>
              <CardDescription>Your business performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest business actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Created new gift package "Summer Bundle"</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Completed "Sales Sprint" challenge</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Updated tenant profile information</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Customize your tenant experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm font-medium">Business Notifications</span>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm font-medium">Privacy & Security</span>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              {isTenantAdmin() && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Admin Settings</span>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}