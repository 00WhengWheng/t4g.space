# tRPC Integration Documentation

## Overview

This document describes the integration between the T4G.Space frontend and the T4G-NestJS-Fastify backend using tRPC.

## Architecture

```
t4g.space/
├── web/                     # React frontend (Vite + TanStack Router)
├── mobile/                  # React Native mobile app  
├── shared/                  # Shared UI components
├── packages/
│   └── types/              # Shared TypeScript types
├── backend/                 # Git submodule: t4g-NestJS-Fastify
│   └── apps/backend/
│       └── src/
│           ├── trpc/       # tRPC server configuration
│           ├── tenants/    # Tenant management API
│           ├── users/      # User management API
│           └── auth/       # Auth0 authentication
└── README.md
```

## tRPC Integration

### Backend (NestJS + Fastify)

The backend repository (`t4g-NestJS-Fastify`) has been added as a Git submodule and includes:

#### tRPC Server Components

1. **TrpcService** (`backend/apps/backend/src/trpc/trpc.service.ts`)
   - Initializes tRPC with context for authenticated requests
   - Provides tRPC utilities (router, procedure)

2. **TrpcRouter** (`backend/apps/backend/src/trpc/trpc.router.ts`)
   - Defines the API schema with type-safe endpoints
   - Implements tenant, gift, and challenge management routes
   - Includes authentication and authorization logic

3. **TrpcController** (`backend/apps/backend/src/trpc/trpc.controller.ts`)
   - Exposes tRPC endpoints via HTTP at `/api/trpc/*`
   - Integrates with Auth0 authentication
   - Handles request/response conversion

#### API Endpoints via tRPC

- **Tenant Management**
  - `tenant.getProfile` - Get current tenant profile
  - `tenant.updateProfile` - Update tenant information
  - `tenant.getDashboardAnalytics` - Get dashboard metrics

- **Gift Management**
  - `gifts.getAll` - List all gifts for organization
  - `gifts.create` - Create new gift package
  - `gifts.update` - Update existing gift
  - `gifts.delete` - Remove gift package

- **Challenge Management**
  - `challenges.getAll` - List all challenges
  - `challenges.create` - Create new challenge
  - `challenges.update` - Update existing challenge
  - `challenges.delete` - Remove challenge

### Frontend (React + TanStack Router)

The frontend includes API integration infrastructure:

#### API Service Layer

1. **ApiService** (`web/src/lib/api-service.ts`)
   - Provides HTTP client for API calls
   - Handles Auth0 token management
   - Implements retry logic and error handling

2. **Route Integration**
   - `analytics.tsx` - Demonstrates dashboard analytics API integration
   - `gift.tsx` - Shows gift management with real-time data fetching
   - Other routes prepared for tRPC integration

#### Configuration

1. **Vite Proxy** (`web/vite.config.ts`)
   ```typescript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000',
         changeOrigin: true,
         secure: false,
       },
     },
   }
   ```

2. **Environment Variables**
   - `VITE_API_URL` - Backend API base URL
   - Auth0 configuration for authentication

## Authentication Flow

1. **Frontend Authentication**
   - Users authenticate via Auth0 in the frontend
   - JWT tokens are stored and managed by Auth0 React SDK

2. **API Authentication**
   - Each tRPC request includes Authorization header with JWT
   - Backend validates JWT using Auth0TenantGuard
   - User context is passed to tRPC procedures

3. **Authorization**
   - tRPC procedures check user permissions
   - Tenant-specific data access controls
   - Role-based feature access

## Type Safety

### Shared Types Package

The `packages/types` package provides shared TypeScript definitions:

```typescript
// Tenant types
export interface Tenant { ... }
export enum TenantRole { ... }
export enum TenantPermission { ... }

// Gift types  
export interface Gift { ... }

// Challenge types
export interface Challenge { ... }
export enum ChallengeType { ... }
export enum ChallengeDifficulty { ... }
```

### tRPC Type Inference

When fully implemented, tRPC will provide:
- End-to-end type safety from backend to frontend
- Automatic TypeScript inference for API calls
- Compile-time validation of request/response schemas
- IntelliSense support for API methods

## Development Workflow

### Running the Full Stack

1. **Start Backend**
   ```bash
   cd backend/apps/backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd web  
   npm run dev
   ```

3. **API Proxy**
   - Frontend development server proxies `/api/*` to backend
   - No CORS issues during development
   - Hot reload for both frontend and backend

### API Integration Example

```typescript
// Frontend component using tRPC (when fully implemented)
function Analytics() {
  const { data: analytics, isLoading } = trpc.tenant.getDashboardAnalytics.useQuery()
  
  if (isLoading) return <LoadingSpinner />
  
  return (
    <div>
      <h1>Analytics</h1>
      <p>Total Gifts: {analytics.totalGifts}</p>
      <p>Total Challenges: {analytics.totalChallenges}</p>
    </div>
  )
}
```

## Current Status

### ✅ Completed

- [x] Backend repository added as Git submodule
- [x] tRPC server configuration in NestJS backend
- [x] Full API router with tenant, gift, challenge endpoints
- [x] Auth0 integration for authenticated requests
- [x] Shared TypeScript types package
- [x] Frontend API service layer
- [x] Demonstration pages showing API integration
- [x] Vite proxy configuration for development
- [x] Build verification for both frontend and backend

### 🚧 In Progress / Next Steps

- [ ] Complete tRPC client setup with proper type inference
- [ ] React Query integration for caching and mutations
- [ ] TanStack Router data loading integration
- [ ] Error boundary and retry logic
- [ ] Loading states and optimistic updates
- [ ] Real-time subscriptions (if needed)

### 🔧 Development Notes

The current implementation provides the foundation for full tRPC integration. The backend is fully functional with tRPC endpoints, and the frontend has the infrastructure to consume these APIs. The demonstration pages show how data flows from backend to frontend with proper authentication.

To complete the integration:
1. Fix tRPC client type inference issues
2. Add React Query providers
3. Update components to use tRPC hooks
4. Implement mutation handling
5. Add proper error boundaries

## Deployment

### Production Considerations

1. **Environment Variables**
   - Configure `VITE_API_URL` for production backend
   - Set up Auth0 production domains
   - Configure CORS policies

2. **Build Process**
   - Backend builds to `backend/apps/backend/dist/`
   - Frontend builds to `web/dist/`
   - Types package builds to `packages/types/dist/`

3. **Docker/Container Setup**
   - Separate containers for frontend and backend
   - Shared network for internal communication
   - Load balancer for traffic routing

This architecture provides a solid foundation for a scalable, type-safe full-stack application with excellent developer experience.