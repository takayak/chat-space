class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  # has_many :users

  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
