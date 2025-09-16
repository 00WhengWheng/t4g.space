// Re-export backend types for frontend use
export * from '../../../backend/apps/backend/src/tenants/tenant.entity';

// tRPC specific types
export interface TrpcContext {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// Additional shared types can be added here