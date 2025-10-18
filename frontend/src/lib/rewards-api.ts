import api from './api';

// Types
export interface Reward {
  id: number;
  name: string;
  description: string;
  points_required: number;
  category: string;
  image_url?: string;
}

export interface Redemption {
  id: number;
  reward_id: number;
  user_id: number;
  points_used: number;
  created_at: string;
  reward: Reward;
}

export interface User {
  id: number;
  email: string;
  points_balance: number;
}

// API Functions
export const rewardsApi = {
  // Get all available rewards
  getRewards: async (): Promise<Reward[]> => {
    const response = await api.get('/api/rewards');
    return response.data;
  },

  // Get user's redemption history
  getRedemptionHistory: async (): Promise<Redemption[]> => {
    const response = await api.get('/api/redemptions');
    return response.data;
  },

  // Redeem a reward
  redeemReward: async (rewardId: number): Promise<Redemption> => {
    const response = await api.post('/api/redemptions', {
      reward_id: rewardId,
    });
    return response.data;
  },

  // Get current user (to refresh points balance)
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/users/me');
    return response.data.user;
  },
};
