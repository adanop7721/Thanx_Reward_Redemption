class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward
  
  validates :redeemed_at, presence: true
  
  # Set redeemed_at to current time before saving
  before_save :set_redeemed_at, if: :new_record?
  
  # Deduct points from user after redemption
  after_create :deduct_points_from_user
  
  private
  
  def set_redeemed_at
    self.redeemed_at = Time.current
  end
  
  def deduct_points_from_user
    user.update!(points_balance: user.points_balance - reward.points_cost)
  end
end
