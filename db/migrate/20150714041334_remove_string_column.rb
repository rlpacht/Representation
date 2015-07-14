class RemoveStringColumn < ActiveRecord::Migration
  def change
  	remove_column :politicians, :string
  end
end
 	