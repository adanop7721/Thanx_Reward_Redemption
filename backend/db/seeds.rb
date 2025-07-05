# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create sample users
users = [
  { email: 'user1@example.com', password: 'password123', points_balance: 1500 },
  { email: 'user2@example.com', password: 'password123', points_balance: 2000 },
  { email: 'user3@example.com', password: 'password123', points_balance: 500 }
]

users.each do |user_attrs|
  User.find_or_create_by!(email: user_attrs[:email]) do |user|
    user.password = user_attrs[:password]
    user.points_balance = user_attrs[:points_balance]
  end
end

# Create sample rewards
rewards = [
  { name: 'Coffee Voucher', description: 'Get a free coffee at any participating cafe', points_cost: 100, available: true },
  { name: 'Movie Ticket', description: 'Enjoy a movie at your local cinema', points_cost: 500, available: true },
  { name: 'Restaurant Gift Card', description: '$25 gift card for popular restaurants', points_cost: 750, available: true },
  { name: 'Spa Day Package', description: 'Relax with a full spa day experience', points_cost: 1200, available: true },
  { name: 'Tech Gadget', description: 'Latest wireless earbuds', points_cost: 2000, available: true },
  { name: 'Travel Voucher', description: '$100 towards your next trip', points_cost: 3000, available: false }
]

rewards.each do |reward_attrs|
  Reward.find_or_create_by!(name: reward_attrs[:name]) do |reward|
    reward.description = reward_attrs[:description]
    reward.points_cost = reward_attrs[:points_cost]
    reward.available = reward_attrs[:available]
  end
end

puts "Seed data created successfully!"
puts "Users: #{User.count}"
puts "Rewards: #{Reward.count}"
puts "Redemptions: #{Redemption.count}"
