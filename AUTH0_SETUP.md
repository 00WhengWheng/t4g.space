# Auth0 Tenant Authentication Setup

This guide explains how to set up Auth0 authentication for tenant users in the T4G.Space application.

## Overview

The T4G.Space application now includes Auth0 authentication specifically designed for "tenant" users - business owners and operators who need access to the business dashboard features.

## Features

### ✅ Implemented Features

- **Auth0 Integration**: Full Auth0 React SDK integration with tenant-specific configuration
- **Tenant Authentication Guard**: Protects all routes requiring tenant authentication
- **User Profile Management**: Displays tenant user information with role-based access
- **Admin Role Support**: Special handling for tenant administrators
- **Callback Handling**: Secure Auth0 callback processing
- **Environment Configuration**: Proper environment variable setup for different deployments
- **Route Protection**: All dashboard routes are protected behind authentication
- **User Interface**: Clean, professional login screens and user profile displays

### 🔧 Technical Implementation

- **Auth0 Provider**: Wraps the entire application with Auth0Provider
- **Tenant Context**: Custom React context for tenant-specific functionality  
- **Route Guards**: TenantGuard component protects authenticated routes
- **Profile Components**: TenantUserProfile component for user information display
- **TypeScript Support**: Full TypeScript integration with proper types

## Setup Instructions

### 1. Auth0 Configuration

Create an Auth0 application with the following settings:

**Application Type**: Single Page Application

**Allowed Callback URLs**:
```
http://localhost:5173/callback
https://your-domain.com/callback
```

**Allowed Logout URLs**:
```
http://localhost:5173
https://your-domain.com
```

**Allowed Web Origins**:
```
http://localhost:5173
https://your-domain.com
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Auth0 Configuration for Tenant Authentication
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=https://your-api.com
VITE_AUTH0_REDIRECT_URI=http://localhost:5173/callback
```

### 3. User Metadata

For tenant-specific features, configure user metadata in Auth0:

```json
{
  "tenant_id": "business-123",
  "tenant_role": "admin",
  "business_name": "Example Business Inc."
}
```

## Usage

### Authentication Flow

1. **Unauthenticated Access**: Users see a professional login screen
2. **Login Process**: Clicking "Sign In to Dashboard" redirects to Auth0
3. **Callback Handling**: Auth0 redirects to `/callback` for secure token processing
4. **Dashboard Access**: Authenticated users access the full business dashboard

### User Roles

- **Admin**: Full access to all business features
- **Standard User**: Limited access to business operations

### Components

#### TenantGuard
Protects routes requiring authentication:
```tsx
<TenantGuard requireAdmin={true}>
  <AdminOnlyComponent />
</TenantGuard>
```

#### TenantUserProfile
Displays user information in the navigation:
```tsx
<TenantUserProfile />
```

### Hooks

#### useTenantAuth
Access authentication state and tenant information:
```tsx
const { 
  isAuthenticated, 
  user, 
  isTenantAdmin, 
  getBusinessName, 
  logout 
} = useTenantAuth()
```

## Security Features

- **Token Management**: Secure token storage and refresh
- **Route Protection**: All sensitive routes protected by authentication
- **Role-Based Access**: Admin features require appropriate permissions
- **Secure Logout**: Proper session cleanup and Auth0 logout
- **Environment Security**: Sensitive configuration through environment variables

## Development

### Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run web:dev

# Build for production
npm run build
```

### Testing Authentication

1. Start the development server
2. Navigate to `http://localhost:5173`
3. You should see the "Tenant Access Required" screen
4. Configure your Auth0 credentials in `.env`
5. Test the login flow

## Deployment

### Environment Variables

Ensure these environment variables are set in your production environment:

- `VITE_AUTH0_DOMAIN`
- `VITE_AUTH0_CLIENT_ID`
- `VITE_AUTH0_AUDIENCE`
- `VITE_AUTH0_REDIRECT_URI`

### Auth0 Configuration

Update your Auth0 application settings with production URLs.

## Troubleshooting

### Common Issues

1. **Auth0 Configuration Error**: Check environment variables are set correctly
2. **Callback URL Mismatch**: Ensure callback URLs match in Auth0 and environment
3. **Token Issues**: Check Auth0 audience configuration
4. **Development vs Production**: Use appropriate domain and callback URLs

### Support

For Auth0 configuration issues, contact `support@t4g.space`.