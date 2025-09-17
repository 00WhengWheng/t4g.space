import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from 'shared'
import { Gift, Package, Star, Plus, Settings } from 'lucide-react'
import { trpc } from '../lib/trpc'
import type { GiftType as GiftTypeEnum, DrinkCategory } from '@t4g/types'

export const Route = createFileRoute('/gift')({
  component: GiftSection,
})

function GiftSection() {
  const { data: gifts, isLoading, error } = (trpc as any).gifts.getAll.useQuery()

  console.log('tRPC Gifts Query:', { gifts, isLoading, error })

  // Mock data fallback for demonstration when backend is not available
  const mockGifts = [
    {
      id: "1",
      name: "Premium Gift Package",
      description: "Exclusive collection of premium items",
      value: 99.99,
      category: "Premium",
      imageUrl: "🎁",
      isActive: true,
      createdBy: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: "org-1",
      settings: {
        scanActions: 8,
        shareActions: 3,
        gameActions: 8,
        timeframeMonths: 1,
        giftType: 'drink' as GiftTypeEnum,
        drinkCategory: 'cafe' as DrinkCategory,
      }
    },
    {
      id: "2", 
      name: "Starter Bundle",
      description: "Perfect for beginners",
      value: 29.99,
      category: "Starter",
      imageUrl: "📦",
      isActive: true,
      createdBy: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: "org-1",
      settings: {
        scanActions: 5,
        shareActions: 2,
        gameActions: 5,
        timeframeMonths: 1,
        giftType: 'drink' as GiftTypeEnum,
        drinkCategory: 'pizza' as DrinkCategory,
      }
    },
    {
      id: "3",
      name: "Holiday Special",
      description: "Limited time holiday offering",
      value: 149.99,
      category: "Special",
      imageUrl: "🎄",
      isActive: true,
      createdBy: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      organizationId: "org-1",
      settings: {
        scanActions: 12,
        shareActions: 5,
        gameActions: 10,
        timeframeMonths: 1,
        giftType: 'drink' as GiftTypeEnum,
        drinkCategory: 'bottle_wine' as DrinkCategory,
      }
    }
  ]

  // Use tRPC data if available, otherwise fall back to mock data
  const displayGifts = gifts || mockGifts



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Gift Management</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Create and manage your gift packages
          </p>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>tRPC Integration Active:</strong> This page now uses tRPC for type-safe gift management.
              {gifts ? ` ✅ Loaded ${gifts.length} gifts from API!` : ' Using fallback mock data...'}
            </p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Gift
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gifts</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayGifts.length}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Loading...' : 'From tRPC API'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {displayGifts.filter((gift: any) => gift.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Value</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${displayGifts.length > 0 ? (displayGifts.reduce((sum: number, gift: any) => sum + gift.value, 0) / displayGifts.length).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Average gift value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${displayGifts.reduce((sum: number, gift: any) => sum + gift.value, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total portfolio value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Default Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div>Scan: <span className="font-bold">8</span></div>
              <div>Share: <span className="font-bold">3</span></div>
              <div>Game: <span className="font-bold">8</span></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Default actions
            </p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-destructive mb-2">API Error: {error.message || 'Failed to connect to tRPC backend'}</p>
                <p className="text-sm text-muted-foreground">
                  Showing mock data for demonstration. The backend is not currently running.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Gift Packages</h2>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-8 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="h-6 bg-muted rounded animate-pulse mb-4" />
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                    <div className="h-8 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayGifts.map((gift: any) => (
              <Card key={gift.id}>
                <CardHeader>
                  <div className="text-4xl mb-2">{gift.imageUrl || '🎁'}</div>
                  <CardTitle>{gift.name}</CardTitle>
                  <CardDescription>{gift.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${gift.value.toFixed(2)}</span>
                    <div className="flex items-center space-x-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        gift.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {gift.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  {gift.settings && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Gift Configuration</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Scan Actions: <span className="font-semibold">{gift.settings.scanActions}</span></div>
                        <div>Share Actions: <span className="font-semibold">{gift.settings.shareActions}</span></div>
                        <div>Game Actions: <span className="font-semibold">{gift.settings.gameActions}</span></div>
                        <div>Duration: <span className="font-semibold">{gift.settings.timeframeMonths}mo</span></div>
                      </div>
                      <div className="mt-2 text-xs">
                        <div>Type: <span className="font-semibold capitalize">{gift.settings.giftType}</span></div>
                        {gift.settings.drinkCategory && (
                          <div>Category: <span className="font-semibold capitalize">{gift.settings.drinkCategory.replace('_', ' ')}</span></div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Button className="w-full">Edit Gift</Button>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}