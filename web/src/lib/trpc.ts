import { createTRPCReact } from '@trpc/react-query'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

// For development, we'll use any to bypass strict typing constraints
// In production, this would use the actual router type from the backend
export const trpc = createTRPCReact<any>()

// Create a proxy client for server-side calls if needed
export const trpcClient = createTRPCProxyClient<any>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      headers: async () => {
        // Get Auth0 token from localStorage or context
        const token = localStorage.getItem('auth0_token')
        return {
          Authorization: token ? `Bearer ${token}` : '',
        }
      },
    }),
  ],
})

// Helper function to get authenticated headers
export const getAuthHeaders = async (getAccessTokenSilently: () => Promise<string>) => {
  try {
    const token = await getAccessTokenSilently()
    return {
      Authorization: `Bearer ${token}`,
    }
  } catch (error) {
    console.error('Failed to get access token:', error)
    return {}
  }
}