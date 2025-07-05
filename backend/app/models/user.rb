class User < ApplicationRecord
  has_secure_password
  
  has_many :redemptions, dependent: :destroy
  has_many :rewards, through: :redemptions
  
  validates :email, presence: true, uniqueness: true
  validates :points_balance, presence: true, numericality: { greater_than_or_equal_to: 0 }
  
  # Initialize new users with 1000 points
  after_initialize :set_default_points, if: :new_record?
  
  private
  
  def set_default_points
    self.points_balance ||= 1000
  end
end
