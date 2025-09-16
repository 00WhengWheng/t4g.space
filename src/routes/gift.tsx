import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Package, Star, Plus } from 'lucide-react'

export const Route = createFileRoute('/gift')({
  component: GiftSection,
})

function GiftSection() {
  const gifts = [
    {
      id: 1,
      name: "Premium Gift Package",
      description: "Exclusive collection of premium items",
      price: "$99.99",
      rating: 4.8,
      image: "🎁"
    },
    {
      id: 2,
      name: "Starter Bundle",
      description: "Perfect for beginners",
      price: "$29.99",
      rating: 4.5,
      image: "📦"
    },
    {
      id: 3,
      name: "Holiday Special",
      description: "Limited time holiday offering",
      price: "$149.99",
      rating: 4.9,
      image: "🎄"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Gift Management</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Create and manage your gift packages
          </p>
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
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +8 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">
              Based on 1.2k reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.2K</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Popular Gift Packages</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift) => (
            <Card key={gift.id}>
              <CardHeader>
                <div className="text-4xl mb-2">{gift.image}</div>
                <CardTitle>{gift.name}</CardTitle>
                <CardDescription>{gift.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">{gift.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{gift.rating}</span>
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
      </div>
    </div>
  )
}