import { useState } from 'react';

import PageHeader from '../components/ui/layout/PageHeader';
import LoadingPage from '../components/ui/loading/LoadingPage';
import ErrorMessage from '../components/ui/feedback/ErrorMessage';
import SuccessMessage from '../components/ui/feedback/SuccessMessage';
import StatCard from '../components/ui/specialized/StatCard';
import RewardCard from '../components/ui/specialized/RewardCard';
import EmptyState from '../components/ui/layout/EmptyState';
import Card from '../components/ui/layout/Card';

import { useAuth } from '../contexts/AuthContext';
import { useRewards } from '../hooks/useRewards';
import { RedemptionService } from '../services/redemptionService';

import type { Reward } from '../lib/rewards-api';

const Rewards = () => {
  const { state, updateUser } = useAuth();
  const { rewards, loading, error, refetch } = useRewards();
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  const handleRedeem = async (reward: Reward) => {
    if (!state.user) return;

    setRedeeming(reward.id);
    setRedeemError(null);
    setSuccessMessage(null);

    const result = await RedemptionService.redeemReward(
      reward,
      state.user.points_balance,
      updateUser
    );

    if (result.success) {
      setSuccessMessage(result.message);
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } else {
      setRedeemError(result.message);
    }

    setRedeeming(null);
  };

  const canRedeem = (reward: Reward) => {
    return !!(state.user && RedemptionService.canRedeem(reward, state.user.points_balance));
  };

  if (loading) {
    return (
      <LoadingPage 
        title="Available Rewards" 
        subtitle="Browse and redeem rewards with your points."
        text="Loading rewards..."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Available Rewards" 
        subtitle="Browse and redeem rewards with your points." 
      />

      {/* Points Balance */}
      <StatCard
        title="Your Points Balance"
        value={`${state.user?.points_balance || 0} points`}
        icon="💎"
        valueColor="blue"
        className="bg-blue-50 border border-blue-200"
      />

      {/* Success Message */}
      {successMessage && (
        <SuccessMessage 
          message={successMessage} 
          onDismiss={() => setSuccessMessage(null)}
        />
      )}

      {/* Error Messages */}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
        />
      )}

      {redeemError && (
        <ErrorMessage 
          message={redeemError} 
          onDismiss={() => setRedeemError(null)}
        />
      )}

      {/* Rewards Grid */}
      {rewards.length === 0 ? (
        <Card>
          <EmptyState
            icon="🎁"
            title="No rewards available"
            description="Check back later for new rewards to redeem!"
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              name={reward.name}
              description={reward.description}
              pointsRequired={reward.points_required}
              category={reward.category}
              onRedeem={() => handleRedeem(reward)}
              canRedeem={canRedeem(reward)}
              isRedeeming={redeeming !== null && redeeming === reward.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Rewards;

