class AddColumnToContributors < ActiveRecord::Migration
  def change
  	change_table :contributors do |t|
  	  t.string :contributor_gender
  	end
  end
end
