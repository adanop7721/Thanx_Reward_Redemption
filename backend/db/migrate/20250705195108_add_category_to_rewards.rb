class AddCategoryToRewards < ActiveRecord::Migration[7.1]
  def change
    add_column :rewards, :category, :string
  end
end
