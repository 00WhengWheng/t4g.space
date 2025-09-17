import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from '../lib/trpc'
import { useTenantAuth } from './tenant-auth'

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const { getAccessTokenSilently, isAuthenticated } = useTenantAuth()
  
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }))

  const [trpcClient] = useState(() =>
    (trpc as any).createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          headers: async () => {
            if (!isAuthenticated) {
              return {}
            }
            
            try {
              const token = await getAccessTokenSilently()
              return {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            } catch (error) {
              console.error('Failed to get access token for tRPC:', error)
              return {}
            }
          },
        }),
      ],
    })
  )

  const TrpcProviderComponent = (trpc as any).Provider

  return (
    <TrpcProviderComponent client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TrpcProviderComponent>
  )
}