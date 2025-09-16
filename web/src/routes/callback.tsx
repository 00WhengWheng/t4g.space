import { createFileRoute } from '@tanstack/react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/callback')({
  component: CallbackPage,
})

function CallbackPage() {
  const { handleRedirectCallback, error } = useAuth0()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback()
        // Redirect will be handled automatically by Auth0
      } catch (err) {
        console.error('Auth0 callback error:', err)
      }
    }

    handleCallback()
  }, [handleRedirectCallback])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-2xl font-bold text-destructive">Authentication Error</div>
          <p className="text-muted-foreground">
            There was an error processing your login. Please try again.
          </p>
          <p className="text-sm text-muted-foreground">
            Error: {error.message}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <div className="text-lg font-medium">Completing sign in...</div>
        <p className="text-muted-foreground">
          Please wait while we securely authenticate your account.
        </p>
      </div>
    </div>
  )
}