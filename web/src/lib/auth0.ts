/**
 * Auth0 Configuration for Tenant Authentication
 * Provides centralized configuration for Auth0 tenant authentication
 */

export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email read:tenant_data manage:tenant_business',
  },
  cacheLocation: 'localstorage' as const,
  useRefreshTokens: true,
}

export const validateAuth0Config = () => {
  const { domain, clientId } = auth0Config
  
  if (!domain || !clientId) {
    throw new Error(
      'Auth0 configuration is missing. Please check your environment variables:\n' +
      '- VITE_AUTH0_DOMAIN\n' +
      '- VITE_AUTH0_CLIENT_ID'
    )
  }
}