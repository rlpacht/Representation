class AddColumnToContributor < ActiveRecord::Migration
  def change
  	change_table :contributors do |t|
  	  t.string :contributor_name
  	end
  end
end
