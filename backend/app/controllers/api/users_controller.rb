class Api::UsersController < ApplicationController
  before_action :authenticate_user, except: [:create]
  
  # POST /api/users/signup
  # Create a new user account
  def create
    user = User.new(user_params)
    
    if user.save
      render json: {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          points_balance: user.points_balance
        },
        auth_token: user.auth_token
      }, status: :created
    else
      # Return generic error message for security (prevent user enumeration)
      render json: { errors: ['Invalid email or password. Please check your credentials and try again.'] }, status: :unprocessable_entity
    end
  end
  
  # GET /api/users/me
  # Get current user's profile
  def show
    render json: {
      user: {
        id: current_user.id,
        email: current_user.email,
        points_balance: current_user.points_balance
      }
    }
  end
  
  # GET /api/users/:id/points
  # Retrieve a user's current points balance
  def points
    user = User.find(params[:id])
    
    # Only allow users to view their own points
    if current_user.id != user.id
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
    
    render json: {
      user_id: user.id,
      email: user.email,
      points_balance: user.points_balance
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  # GET /api/users/:id/redemptions
  # Retrieve a user's redemption history
  def redemptions
    user = User.find(params[:id])
    
    # Only allow users to view their own redemptions
    if current_user.id != user.id
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end
    
    redemptions = user.redemptions.includes(:reward).order(redeemed_at: :desc)
    
    render json: {
      user_id: user.id,
      redemptions: redemptions.map do |redemption|
        {
          id: redemption.id,
          reward_name: redemption.reward.name,
          reward_description: redemption.reward.description,
          points_cost: redemption.reward.points_cost,
          redeemed_at: redemption.redeemed_at
        }
      end
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
