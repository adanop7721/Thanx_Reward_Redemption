import { useState, useEffect } from 'react';
import { rewardsApi, type Reward } from '../lib/rewards-api';

interface UseRewardsReturn {
  rewards: Reward[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRewards(): UseRewardsReturn {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await rewardsApi.getRewards();
      setRewards(data);
    } catch (err) {
      setError('Failed to load rewards. Please try again.');
      console.error('Error loading rewards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return {
    rewards,
    loading,
    error,
    refetch: fetchRewards,
  };
}
