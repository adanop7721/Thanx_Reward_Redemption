class User < ApplicationRecord
  # Enable password hashing
  has_secure_password
  
  # Associations
  has_many :redemptions, dependent: :destroy
  has_many :rewards, through: :redemptions
  
  # Validations
  validates :email, presence: true, uniqueness: true
  validates :points_balance, presence: true, numericality: { greater_than_or_equal_to: 0 }
  
  # Callbacks
  after_initialize :set_default_points_balance, if: :new_record?
  before_create :generate_auth_token
  
  # Authentication methods
  def generate_auth_token
    loop do
      self.auth_token = SecureRandom.hex(32)
      break unless User.exists?(auth_token: auth_token)
    end
  end
  
  def regenerate_auth_token
    generate_auth_token
    save
  end
  
  private
  
  def set_default_points_balance
    self.points_balance ||= 1000
  end
end
