import { useState, useEffect } from 'react';
import { rewardsApi, type Redemption } from '../lib/rewards-api';

interface UseRedemptionHistoryReturn {
  redemptions: Redemption[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalPointsUsed: number;
}

export function useRedemptionHistory(): UseRedemptionHistoryReturn {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRedemptionHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await rewardsApi.getRedemptionHistory();
      setRedemptions(data);
    } catch (err) {
      setError('Failed to load redemption history. Please try again.');
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedemptionHistory();
  }, []);

  const totalPointsUsed = redemptions.reduce((total, redemption) => total + redemption.points_used, 0);

  return {
    redemptions,
    loading,
    error,
    refetch: fetchRedemptionHistory,
    totalPointsUsed,
  };
}
