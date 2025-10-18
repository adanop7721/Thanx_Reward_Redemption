class Api::RewardsController < ApplicationController
  
  # GET /api/rewards
  # Get a list of available rewards
  def index
    rewards = Reward.available.order(:points_cost)
    
    formatted_rewards = rewards.map do |reward|
      {
        id: reward.id,
        name: reward.name,
        description: reward.description,
        points_required: reward.points_cost,
        category: reward.category || 'General',
        image_url: nil
      }
    end
    
    render json: formatted_rewards
  end
end
