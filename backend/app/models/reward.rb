class Reward < ApplicationRecord
  has_many :redemptions, dependent: :destroy
  has_many :users, through: :redemptions
  
  validates :name, presence: true
  validates :description, presence: true
  validates :points_cost, presence: true, numericality: { greater_than: 0 }
  validates :available, inclusion: { in: [true, false] }
  
  scope :available, -> { where(available: true) }
end
