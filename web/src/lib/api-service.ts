import { useTenantAuth } from './tenant-auth';
import type { Gift } from '@t4g/types';

const API_BASE_URL = '/api';

export class ApiService {
  private getHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  async getTenantProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/tenants/profile`, {
      headers: this.getHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tenant profile');
    }
    
    return response.json();
  }

  async getDashboardAnalytics(token: string) {
    const response = await fetch(`${API_BASE_URL}/tenants/dashboard/analytics`, {
      headers: this.getHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard analytics');
    }
    
    return response.json();
  }

  async getGifts(token: string) {
    const response = await fetch(`${API_BASE_URL}/tenants/gifts`, {
      headers: this.getHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch gifts');
    }
    
    return response.json();
  }

  async getChallenges(token: string) {
    const response = await fetch(`${API_BASE_URL}/tenants/challenges`, {
      headers: this.getHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch challenges');
    }
    
    return response.json();
  }

  async createGift(token: string, giftData: Partial<Gift>) {
    const response = await fetch(`${API_BASE_URL}/tenants/gifts`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(giftData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create gift');
    }
    
    return response.json();
  }

  async updateGift(token: string, giftId: string, giftData: Partial<Gift>) {
    const response = await fetch(`${API_BASE_URL}/tenants/gifts/${giftId}`, {
      method: 'PUT',
      headers: this.getHeaders(token),
      body: JSON.stringify(giftData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update gift');
    }
    
    return response.json();
  }

  async deleteGift(token: string, giftId: string) {
    const response = await fetch(`${API_BASE_URL}/tenants/gifts/${giftId}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete gift');
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();

// Hook to use the API service with authentication
export function useApiService() {
  const { getAccessTokenSilently, isAuthenticated } = useTenantAuth();

  const callApi = async <T>(apiCall: (token: string) => Promise<T>): Promise<T> => {
    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    const token = await getAccessTokenSilently();
    return apiCall(token);
  };

  return {
    getTenantProfile: () => callApi(apiService.getTenantProfile),
    getDashboardAnalytics: () => callApi(apiService.getDashboardAnalytics),
    getGifts: () => callApi(apiService.getGifts),
    getChallenges: () => callApi(apiService.getChallenges),
    createGift: (giftData: Partial<Gift>) => callApi((token) => apiService.createGift(token, giftData)),
    updateGift: (giftId: string, giftData: Partial<Gift>) => callApi((token) => apiService.updateGift(token, giftId, giftData)),
    deleteGift: (giftId: string) => callApi((token) => apiService.deleteGift(token, giftId)),
  };
}