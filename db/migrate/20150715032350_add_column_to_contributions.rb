class AddColumnToContributions < ActiveRecord::Migration
  def change
  	change_table :contributions do |t|
  	  t.string :transaction_id
  	end
  end
end
