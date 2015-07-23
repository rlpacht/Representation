class Politician < ActiveRecord::Base
	has_many :contributions
	has_many :contributors, :through => :contributions

	def top_contributors(options)
		cycle = options[:cycle]
		limit = options[:limit]
		id = options[:id]
		Contribution.top_contributors({politician_id: id, cycle: cycle, limit: limit})
	end 

	def total_from_cycle(options)
		cycle = options[:cycle]
		id = options[:id]
		Contribution.total_from_cycle({politician_id: id, cycle: cycle})
	end

	def money_from_pacs(options)
		cycle = options[:cycle]
		id = options[:id]
		Contribution.money_from_pacs({politician_id: id, cycle: cycle})
	end

	def gender_contributions(options)
		cycle = options[:cycle]
		id = options[:id]
		contributions_from_genders = []

		women = Contribution.contributions_from_women({politician_id: id, cycle: cycle})
		men = Contribution.contributions_from_men({politician_id: id, cycle: cycle})

		contributions_from_genders << women
		contributions_from_genders << men
		return contributions_from_genders
	end
end
