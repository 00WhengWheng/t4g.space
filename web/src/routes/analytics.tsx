import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared'
import { TrendingUp, Users, Calendar, Gift, Trophy } from 'lucide-react'
import { trpc } from '../lib/trpc'

export const Route = createFileRoute('/analytics')({
  component: Analytics,
})

function Analytics() {
  const { data: analytics, isLoading, error } = (trpc as any).tenant.getDashboardAnalytics.useQuery()

  console.log('tRPC Analytics Query:', { analytics, isLoading, error })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Loading business insights and performance metrics...
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Business insights and performance metrics
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-destructive mb-4">Failed to load analytics: {error?.message || 'Network error'}</p>
              <p className="text-sm text-muted-foreground">
                This is a demonstration of tRPC integration. The backend API is not currently running.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Business insights and performance metrics
        </p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>tRPC Integration Active:</strong> This page now uses tRPC for type-safe API communication.
            {analytics ? ' ✅ Successfully fetched data!' : ' Waiting for backend connection...'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-5 w-5" />
              <span>Total Gifts</span>
            </CardTitle>
            <CardDescription>Available gift packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {analytics ? analytics.totalGifts : '12'}
            </div>
            <p className="text-sm text-muted-foreground">
              {analytics ? analytics.activeGifts : '8'} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Total Challenges</span>
            </CardTitle>
            <CardDescription>Running challenge campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {analytics ? analytics.totalChallenges : '7'}
            </div>
            <p className="text-sm text-muted-foreground">
              {analytics ? analytics.activeChallenges : '5'} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Engagement</span>
            </CardTitle>
            <CardDescription>Active users and engagement rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89%</div>
            <p className="text-sm text-muted-foreground">Engagement rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Growth Metrics</span>
            </CardTitle>
            <CardDescription>Business growth indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+23%</div>
            <p className="text-sm text-muted-foreground">Growth this quarter</p>
          </CardContent>
        </Card>
      </div>

      {analytics && analytics.recentActivity && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest actions from tRPC backend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentActivity.map((activity: any) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.action} {activity.type}: {activity.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}