import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Home, BarChart3, Gift, Trophy, User } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center space-x-8">
            <Link to="/" className="font-bold text-xl">
              T4G.Space
            </Link>
            <div className="flex space-x-6">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/analytics" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
              <Link 
                to="/gift" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
              >
                <Gift className="h-4 w-4" />
                <span>Gift</span>
              </Link>
              <Link 
                to="/challenge" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
              >
                <Trophy className="h-4 w-4" />
                <span>Challenge</span>
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})