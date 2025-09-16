import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared'
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react'

export const Route = createFileRoute('/analytics')({
  component: Analytics,
})

function Analytics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Business insights and performance metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Revenue Analytics</span>
            </CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,345</div>
            <p className="text-sm text-muted-foreground">This month</p>
            <div className="mt-4 h-32 bg-muted rounded flex items-center justify-center">
              <span className="text-muted-foreground">Chart placeholder</span>
            </div>
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
            <div className="mt-4 h-32 bg-muted rounded flex items-center justify-center">
              <span className="text-muted-foreground">Chart placeholder</span>
            </div>
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
            <div className="mt-4 h-32 bg-muted rounded flex items-center justify-center">
              <span className="text-muted-foreground">Chart placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Performance Timeline</span>
            </CardTitle>
            <CardDescription>Key performance indicators over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <span className="text-muted-foreground">Timeline chart placeholder</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}