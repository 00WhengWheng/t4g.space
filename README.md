# T4G.Space - Tag 4 Gift Business Platform

A modern business dashboard platform built with Turborepo, featuring both web and mobile applications with shared components, Auth0 tenant authentication, and tRPC API integration.

## 📁 Project Structure

This is a turborepo monorepo with the following structure:

```
t4g.space/
├── web/                     # React web application (Vite + TanStack Router)
├── mobile/                  # React Native mobile app (Expo)
├── shared/                  # Shared components and utilities
├── packages/
│   └── types/              # Shared TypeScript types for frontend/backend
├── backend/                 # Git submodule: t4g-NestJS-Fastify backend
└── turbo.json              # Turborepo configuration
```

## 🔐 Authentication

The application uses Auth0 for tenant authentication. All dashboard routes are protected and require business account authentication.

### Setup Auth0

1. Copy `web/.env.example` to `web/.env`
2. Configure your Auth0 credentials
3. See `AUTH0_SETUP.md` for detailed configuration instructions

### Features

- **Tenant Authentication**: Secure login for business users
- **Role-Based Access**: Admin and standard user roles
- **Route Protection**: All dashboard routes require authentication
- **User Profile**: Display tenant information and business details

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- For mobile development: Expo CLI and mobile development environment

### Installation

```bash
# Install all dependencies
npm install

# Build all packages
npm run build
```

## 🛠️ Development

### All Applications

```bash
# Start all applications in development mode
npm run dev

# Build all applications
npm run build

# Lint all applications
npm run lint

# Type check all applications
npm run type-check
```

### Individual Applications

```bash
# Web application only
npm run web:dev

# Mobile application only
npm run mobile:dev

# Shared package only
npm run shared:dev
```

## 📱 Applications

### Web Application (`web/`)

A modern React web application featuring:
- **Framework**: React 19 + Vite
- **Authentication**: Auth0 tenant authentication for business users
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with class-variance-authority
- **TypeScript**: Full type safety

Available routes:
- `/` - Dashboard home (protected)
- `/analytics` - Business analytics (protected)
- `/gift` - Gift management (protected)
- `/challenge` - Challenge system (protected)
- `/profile` - Tenant user profile (protected)
- `/callback` - Auth0 authentication callback

#### Development

```bash
cd web
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Lint code
```

### Mobile Application (`mobile/`)

A React Native mobile application featuring:
- **Framework**: React Native + Expo
- **Platform**: iOS and Android
- **Components**: Native components mirroring web interface
- **TypeScript**: Full type safety

#### Development

```bash
cd mobile
npm run dev      # Start Expo development server
npm run android  # Run on Android
npm run ios      # Run on iOS
npm run build    # Build for production
```

### Shared Package (`shared/`)

Shared components and utilities used by both web and mobile:
- **UI Components**: Button, Card, and variants
- **Utilities**: Common helper functions
- **Dual Export**: Separate web and native component exports

#### Usage

```typescript
// In web applications
import { Button, Card } from 'shared'

// In React Native applications
import { Button, Card } from 'shared/native'
```

## 🏗️ Architecture

### Turborepo Configuration

The project uses Turborepo for efficient monorepo management:
- **Parallel builds**: All packages build in parallel with dependency awareness
- **Shared caching**: Build outputs are cached for faster subsequent builds
- **Task pipelines**: Coordinated build, lint, and development tasks

### Component Sharing Strategy

- **Web Components**: Built with React DOM, styled with Tailwind CSS
- **Native Components**: Built with React Native, styled with StyleSheet
- **Dual Exports**: Shared package exports platform-specific components

### Workspace Dependencies

- `web` depends on `shared` for UI components
- `mobile` depends on `shared/native` for native components
- `shared` provides both web and native component variants

## 📦 Package Scripts

### Root Level
- `npm run build` - Build all packages
- `npm run dev` - Start all development servers
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages

### Package Specific
- `npm run web:dev` - Web development only
- `npm run mobile:dev` - Mobile development only
- `npm run shared:dev` - Shared package development

## 🚀 Deployment

### Web Application
The web application builds to a `dist/` folder and can be deployed to any static hosting service.

### Mobile Application
The mobile application uses Expo for easy deployment to app stores.

```bash
# Build mobile app for distribution
cd mobile
npm run build
```

## 🔧 Development Guidelines

### Adding New Components

1. Create web version in `shared/src/ui/`
2. Create native version in `shared/src/native/`
3. Export both from respective index files
4. Use in web/mobile applications

### Code Style

- TypeScript for all new code
- ESLint configuration applied to all packages
- Consistent naming conventions across packages

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Make your changes
4. Test across packages: `npm run build && npm run lint`
5. Submit a pull request
