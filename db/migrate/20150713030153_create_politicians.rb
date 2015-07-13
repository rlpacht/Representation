class CreatePoliticians < ActiveRecord::Migration
  def change
    create_table :politicians do |t|
      t.string :name
      t.string :recipient_ext_id
      t.string :string
      t.string :party
      t.string :state

      t.timestamps null: false
    end
  end
end
