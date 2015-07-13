class Politician < ActiveRecord::Base
	has_many :contributions
	has_many :contributors, :through => :contributions
end
