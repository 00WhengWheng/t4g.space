import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './router.tsx'
import { auth0Config, validateAuth0Config } from './lib/auth0'
import { TenantAuthProvider } from './lib/tenant-auth'

// Validate Auth0 configuration
try {
  validateAuth0Config()
} catch (error) {
  console.error('Auth0 Configuration Error:', error)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider {...auth0Config}>
      <TenantAuthProvider>
        <App />
      </TenantAuthProvider>
    </Auth0Provider>
  </StrictMode>,
)
