import { useState, useEffect } from 'react';
import { rewardsApi } from '../lib/rewards-api';
import { useAuth } from '../contexts/AuthContext';

interface UseUserDataReturn {
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUserData(): UseUserDataReturn {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await rewardsApi.getCurrentUser();
      updateUser(userData);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    loading,
    error,
    refetch: fetchUserData,
  };
}
