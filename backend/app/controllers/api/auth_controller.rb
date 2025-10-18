class Api::AuthController < ApplicationController
  before_action :authenticate_user, only: [:logout]
  
  # POST /api/auth/login
  def login
    user = User.find_by(email: params[:email])
    
    if user&.authenticate(params[:password])
      user.regenerate_auth_token
      render json: {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          points_balance: user.points_balance
        },
        auth_token: user.auth_token
      }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
  
  # POST /api/auth/logout
  def logout
    if current_user
      current_user.update(auth_token: nil)
      render json: { message: 'Logged out successfully' }, status: :ok
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end
end
