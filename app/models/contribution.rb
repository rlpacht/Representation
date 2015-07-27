class Contribution < ActiveRecord::Base
	belongs_to :politician
	belongs_to :contributor

	def self.top_contributors(options)
		cycle = options[:cycle]
		politician_id = options[:politician_id]
		limit = options[:limit]
		top_contributors_hash = Contribution
	   		.joins(:contributor)
	   		.group("contributors.name")
	   		.where({politician_id: politician_id, cycle: cycle})
	   		.where("amount > ?", 0)
	   		.where.not({transaction_id: 'pac2pac'})
	   		.order('SUM(contributions.amount) DESC')
	   		.limit(limit)
	   		.sum(:amount)
		top_contributors_hash.sort_by { |key, value| value }.reverse()
    end 

    def self.total_from_cycle(options)
    	cycle = options[:cycle]
		politician_id = options[:politician_id]

    	total = Contribution.where({politician_id: politician_id, cycle: cycle}).sum(:amount)
    	return total
    end

    def self.money_from_pacs(options)
    	cycle = options[:cycle]
		politician_id = options[:politician_id]

    	pacs = Contribution
	   		.joins(:contributor)
	   		.group("contributors.name")
	   		.where({politician_id: politician_id, cycle: cycle, transaction_id: 'pac2pac'})
	   		.order('SUM(contributions.amount) DESC')
	   		.sum(:amount).sort()
   		return pacs
    end

    def self.contributions_from_women(options)
    	cycle = options[:cycle]
		politician_id = options[:politician_id]

    	women = Contribution.joins(:contributor)
		.where({"contributors.contributor_gender" => 'F', politician_id: politician_id, cycle: cycle})
		.sum(:amount)
		return women
	end

	def self.contributions_from_men(options)
		cycle = options[:cycle]
		politician_id = options[:politician_id]

		men = Contribution.joins(:contributor)
		.where({"contributors.contributor_gender" => 'M', politician_id: politician_id, cycle: cycle})
		.sum(:amount)
		return men
	end


end
