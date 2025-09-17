// Tenant Management Types
export interface Tenant {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role: TenantRole;
  auth0Id: string;
  organizationName: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  permissions: TenantPermission[];
  settings?: TenantSettings;
}

export enum TenantRole {
  TENANT_ADMIN = 'tenant_admin',
  TENANT_MANAGER = 'tenant_manager',
  TENANT_USER = 'tenant_user',
}

export enum TenantPermission {
  MANAGE_GIFTS = 'manage_gifts',
  MANAGE_CHALLENGES = 'manage_challenges',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_USERS = 'manage_users',
  MANAGE_SETTINGS = 'manage_settings',
}

export interface TenantSettings {
  dashboardTheme: 'light' | 'dark';
  notifications: boolean;
  analyticsEnabled: boolean;
  realTimeUpdates: boolean;
}

// Gift Management Types
export enum GiftType {
  DRINK = 'drink',
  EXPERIENCE = 'experience',
  PRODUCT = 'product',
  SERVICE = 'service',
}

export enum DrinkCategory {
  CAFE = 'cafe',
  PIZZA = 'pizza',
  BOTTLE_WINE = 'bottle_wine',
  DISCOUNT = 'discount',
}

export interface GiftSettings {
  scanActions: number;
  shareActions: number;
  gameActions: number;
  timeframeMonths: number;
  giftType: GiftType;
  drinkCategory?: DrinkCategory;
}

export interface Gift {
  id: string;
  name: string;
  description: string;
  value: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  settings?: GiftSettings;
}

// Default gift settings as specified in requirements
export const DEFAULT_GIFT_SETTINGS: GiftSettings = {
  scanActions: 8,
  shareActions: 3,
  gameActions: 8,
  timeframeMonths: 1,
  giftType: GiftType.DRINK,
  drinkCategory: DrinkCategory.CAFE,
};

// Challenge Management Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  points: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  rules?: string[];
  rewards?: ChallengeReward[];
}

export enum ChallengeType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  SPECIAL = 'special',
}

export enum ChallengeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface ChallengeReward {
  type: 'gift' | 'points' | 'badge';
  value: string | number;
  description: string;
}

// tRPC Context
export interface TrpcContext {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// Dashboard Analytics
export interface DashboardAnalytics {
  totalGifts: number;
  totalChallenges: number;
  activeGifts: number;
  activeChallenges: number;
  recentActivity: Array<{
    id: string;
    type: 'gift' | 'challenge';
    action: 'created' | 'updated' | 'deleted';
    name: string;
    timestamp: Date;
  }>;
}