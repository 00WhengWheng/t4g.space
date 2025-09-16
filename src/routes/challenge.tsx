import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Target, Clock, Users, Plus } from 'lucide-react'

export const Route = createFileRoute('/challenge')({
  component: ChallengeSection,
})

function ChallengeSection() {
  const challenges = [
    {
      id: 1,
      title: "Summer Sales Sprint",
      description: "Achieve 100 sales in 30 days",
      status: "active",
      participants: 45,
      timeLeft: "12 days",
      reward: "$500",
      progress: 67
    },
    {
      id: 2,
      title: "Customer Satisfaction",
      description: "Maintain 4.8+ rating for a month",
      status: "completed",
      participants: 23,
      timeLeft: "Completed",
      reward: "$300",
      progress: 100
    },
    {
      id: 3,
      title: "New User Acquisition",
      description: "Bring 50 new users to the platform",
      status: "active",
      participants: 67,
      timeLeft: "8 days",
      reward: "$750",
      progress: 34
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Challenge Center</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Create and participate in business challenges
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Challenge
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Total participants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Average completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15.2K</div>
            <p className="text-xs text-muted-foreground">
              Distributed this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Current Challenges</h2>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <Card key={challenge.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="h-5 w-5" />
                      <span>{challenge.title}</span>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {challenge.description}
                    </CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    challenge.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.status === 'active' ? 'Active' : 'Completed'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{challenge.timeLeft}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reward: {challenge.reward}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{challenge.progress}% complete</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm">View Details</Button>
                  {challenge.status === 'active' && (
                    <Button variant="outline" size="sm">Join Challenge</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}