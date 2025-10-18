import { rewardsApi, type Reward } from '../lib/rewards-api';

export interface RedemptionResult {
  success: boolean;
  message: string;
  error?: string;
}

export class RedemptionService {
  static async redeemReward(
    reward: Reward,
    currentPoints: number,
    onSuccess: (updatedUser: any) => void
  ): Promise<RedemptionResult> {
    if (currentPoints < reward.points_required) {
      return {
        success: false,
        message: 'Insufficient points to redeem this reward.',
        error: 'insufficient_points',
      };
    }

    try {
      await rewardsApi.redeemReward(reward.id);

      const updatedUser = await rewardsApi.getCurrentUser();
      onSuccess(updatedUser);

      return {
        success: true,
        message: `Successfully redeemed ${reward.name}! 🎉`,
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Failed to redeem reward. Please try again.',
        error: 'redemption_failed',
      };
    }
  }

  static canRedeem(reward: Reward, currentPoints: number): boolean {
    return currentPoints >= reward.points_required;
  }
}
