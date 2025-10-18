Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # API routes for rewards redemption system
  namespace :api do
    # Authentication routes
    post 'auth/login', to: 'auth#login'
    post 'auth/logout', to: 'auth#logout'
    post 'users/signup', to: 'users#create'
    get 'users/me', to: 'users#show'
    
    # Get a user's current points balance
    get 'users/:id/points', to: 'users#points'
    
    # Get list of available rewards
    get 'rewards', to: 'rewards#index'
    
    # Redemption routes
    get 'redemptions', to: 'redemptions#index'
    post 'redemptions', to: 'redemptions#create'
    
    # Get user's redemption history (alternative route)
    get 'users/:id/redemptions', to: 'users#redemptions'
  end
end
