class Contribution < ActiveRecord::Base
	belongs_to :politician
	belongs_to :contributor
end
