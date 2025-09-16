import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from 'shared'
import { Gift, Package, Star, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useApiService } from '../lib/api-service'
import type { Gift as GiftType } from '@t4g/types'

export const Route = createFileRoute('/gift')({
  component: GiftSection,
})

function GiftSection() {
  const [gifts, setGifts] = useState<GiftType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const apiService = useApiService()

  // Mock data for demonstration
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
      organizationId: "org-1"
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
      organizationId: "org-1"
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
      organizationId: "org-1"
    }
  ]

  useEffect(() => {
    async function fetchGifts() {
      try {
        setLoading(true)
        setError(null)
        const data = await apiService.getGifts()
        setGifts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gifts')
        console.error('Failed to fetch gifts:', err)
        // Use mock data when API fails
        setGifts(mockGifts)
      } finally {
        setLoading(false)
      }
    }

    fetchGifts()
  }, [])

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
              <strong>tRPC Integration Demo:</strong> This page demonstrates API integration for gift management.
              Data is fetched from <code>/api/tenants/gifts</code> with authentication.
            </p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Gift
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gifts</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gifts.length}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading...' : 'From tRPC API'}
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
              {gifts.filter(gift => gift.isActive).length}
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
              ${gifts.length > 0 ? (gifts.reduce((sum, gift) => sum + gift.value, 0) / gifts.length).toFixed(2) : '0.00'}
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
              ${gifts.reduce((sum, gift) => sum + gift.value, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total portfolio value
            </p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-destructive mb-2">API Error: {error}</p>
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
        {loading ? (
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
            {gifts.map((gift) => (
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