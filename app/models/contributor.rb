class Contributor < ActiveRecord::Base
	has_many :contributions
	has_many :politicians :through => :contributions
end
