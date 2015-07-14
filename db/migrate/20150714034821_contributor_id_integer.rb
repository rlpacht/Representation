class ContributorIdInteger < ActiveRecord::Migration
  def change
  	change_column :contributions, :contributor_id, 'integer USING CAST(contributor_id AS integer)'
  end
end
