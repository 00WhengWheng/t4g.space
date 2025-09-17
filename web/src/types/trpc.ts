import type { DashboardAnalytics, Tenant, Gift, Challenge } from '@t4g/types'

// This is a simplified type definition that matches the expected tRPC router structure
// In a real implementation, this would be imported from the backend
export type AppRouter = {
  tenant: {
    getProfile: {
      input: void
      output: Tenant
    }
    updateProfile: {
      input: Partial<Tenant>
      output: Tenant
    }
    getDashboardAnalytics: {
      input: void
      output: DashboardAnalytics
    }
  }
  gifts: {
    getAll: {
      input: void
      output: Gift[]
    }
    create: {
      input: Partial<Gift>
      output: Gift
    }
    update: {
      input: { id: string; data: Partial<Gift> }
      output: Gift
    }
    delete: {
      input: { id: string }
      output: { success: boolean }
    }
  }
  challenges: {
    getAll: {
      input: void
      output: Challenge[]
    }
    create: {
      input: Partial<Challenge>
      output: Challenge
    }
    update: {
      input: { id: string; data: Partial<Challenge> }
      output: Challenge
    }
    delete: {
      input: { id: string }
      output: { success: boolean }
    }
  }
}