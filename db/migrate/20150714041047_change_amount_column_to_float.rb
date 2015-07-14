class ChangeAmountColumnToFloat < ActiveRecord::Migration
  def change
  	change_column :contributions, :amount, 'float USING CAST(amount AS float)'
  end
end
