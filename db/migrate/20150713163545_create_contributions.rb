class CreateContributions < ActiveRecord::Migration
  def change
    create_table :contributions do |t|
      t.string :amount
      t.integer :cycle
      t.string :transaction_type
      t.integer :politician_id
      t.string :contributor_id
      t.string :committee_name
      t.string :committee_ext_id

      t.timestamps null: false
    end
  end
end
