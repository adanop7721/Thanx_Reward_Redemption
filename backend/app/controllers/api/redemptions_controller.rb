class Api::RedemptionsController < ApplicationController
  before_action :authenticate_user
  
  # GET /api/redemptions
  # Get current user's redemption history
  def index
    redemptions = current_user.redemptions.includes(:reward).order(redeemed_at: :desc)
    
    formatted_redemptions = redemptions.map do |redemption|
      {
        id: redemption.id,
        reward_id: redemption.reward_id,
        user_id: redemption.user_id,
        points_used: redemption.reward.points_cost,
        created_at: redemption.redeemed_at.iso8601,
        reward: {
          id: redemption.reward.id,
          name: redemption.reward.name,
          description: redemption.reward.description,
          points_required: redemption.reward.points_cost,
          category: redemption.reward.category || 'General',
          image_url: nil
        }
      }
    end
    
    render json: formatted_redemptions
  end
  
  # POST /api/redemptions
  # Allow users to redeem a reward
  def create
    user = current_user
    reward = Reward.find(params[:reward_id])
    
    # Check if reward is available
    unless reward.available
      return render json: { error: 'Reward is not available' }, status: :unprocessable_entity
    end
    
    # Check if user has enough points
    if user.points_balance < reward.points_cost
      return render json: { 
        error: 'Insufficient points', 
        current_balance: user.points_balance,
        required_points: reward.points_cost
      }, status: :unprocessable_entity
    end
    
    # Create redemption (this will automatically deduct points via callback)
    redemption = Redemption.create!(
      user: user,
      reward: reward
    )
    
    render json: {
      id: redemption.id,
      reward_id: redemption.reward_id,
      user_id: redemption.user_id,
      points_used: reward.points_cost,
      created_at: redemption.redeemed_at.iso8601,
      reward: {
        id: reward.id,
        name: reward.name,
        description: reward.description,
        points_required: reward.points_cost,
        category: reward.category || 'General',
        image_url: nil
      }
    }, status: :created
    
  rescue ActiveRecord::RecordNotFound => e
    render json: { error: 'User or reward not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: 'Redemption failed' }, status: :internal_server_error
  end
end
