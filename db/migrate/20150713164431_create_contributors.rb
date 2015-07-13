class CreateContributors < ActiveRecord::Migration
  def change
    create_table :contributors do |t|
      t.string :name
      t.string :organization_name
      t.string :contributor_occupation
      t.string :contributor_state
      t.string :contributor_zipcode

      t.timestamps null: false
    end
  end
end
