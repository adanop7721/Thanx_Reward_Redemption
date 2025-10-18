class ApplicationController < ActionController::API
  protected
  
  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last
    
    if token.blank?
      render json: { error: 'Authorization token required' }, status: :unauthorized
      return
    end
    
    @current_user = User.find_by(auth_token: token)
    
    unless @current_user
      render json: { error: 'Invalid authorization token' }, status: :unauthorized
    end
  end
  
  def current_user
    @current_user
  end
  
  def authenticate_user!
    authenticate_user
  end
end
