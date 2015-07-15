require 'net/http'
require 'HTTParty'
class PoliticiansController < ApplicationController
	include HTTParty
	base_uri("http://transparencydata.com/api/1.0/contributions.json")
	
	# Send all the contributions in your own db (creating them if needed)
	def top_contributors
		politician_name = params[:name] || 'john mccain'
		politician_name.downcase!
		cycle = params[:cycle] || '2014'
		limit = params[:limit] || 30

		check_database(politician_name, cycle)

		# Contributor.select('SUM(contributions.amount), contributors.name, contributors.id').joins(:contributions).where("contributions.politician_id" => 1, "contributions.cycle" => 2014).group('contributors.id').order('SUM(amount) DESC').limit(10)


		# Contribution.joins(:contributor).group("contributors.name").where({politician_id: 1, cycle: 2014}).order('SUM(contributions.amount) DESC').limit(30).sum(:amount)
		
	  # contributions_list = []
	  @politician = Politician.find_by_name(politician_name)
   	# stored_contributions = Contribution.joins(:contributor)
   	# 	.group(:organization_name)
   	# 	.group(:name)
   	# 	.where({politician_id: @politician.id, cycle: cycle})
   	# 	.sum(:amount)
   	# 	.order('SUM(amount) DESC')
   	top_contributors_hash = Contribution
   		.joins(:contributor)
   		.group("contributors.name")
   		.where({politician_id: @politician.id, cycle: cycle})
   		.order('SUM(contributions.amount) DESC')
   		.limit(limit)
   		.sum(:amount)
   	sorted = top_contributors_hash.sort_by { |key, value| value }.reverse()


   	# stored_contributions = stored_contributions.sort_by do |index_zero, index_one|
   	# 	index_one
   	# end
   	# array_length = stored_contributions.length
   	# stored_contributions = stored_contributions[array_length - 20 .. -1]
   	# contributions_list = contributions_list.push(stored_contributions)
   	# contributions_list = contributions_list.push(total_raised_in_cycle)

		respond_to do |f|
		  f.json { render json: {data: sorted}}
		  f.html
		end
	end 

	def total_raised_in_cycle
		politician_name = params[:name] || 'john mccain'
		politician_name.downcase!
		cycle = params[:cycle] || '2014'

		check_database(politician_name, cycle)

		# Contributor.joins(:contributions).sum(:amount)
		total = Contribution
			.where({politician_id: @politician.id, cycle: cycle})
			.sum(:amount)
		respond_to do |f|
		  f.json { render json: {data: {total: total}}}
		  f.html
		end
	end

	private

	# Check if the politician being searched is already in the db
	def check_database (politician_name, cycle)
		if Politician.find_by_name(politician_name).nil?
			# If the politian is not the in db, none of its contributions are either. 
			# Create a politician, contributor, and contribution records.
			@contributions = sunlight_api(cycle, politician_name)
			# Each contribution in the API contains information about the 
			# receiving politician
			politician_info = {
											name: parse_name(@contributions[0]["recipient_name"]),
											recipient_ext_id: @contributions[0]["recipient_ext_id"],
											state: @contributions[0]["recipient_state_held"],
											party: @contributions[0]["recipient_party"]
											}
			@politician = Politician.create(politician_info)
			add_contributors_and_contributions(@politician.id, @contributions)

		else 
			@politician = Politician.find_by_name(politician_name)

			if Contribution.find_by({politician_id: @politician.id, cycle: cycle}).nil?
				@contributions = sunlight_api(cycle, politician_name)
				add_contributors_and_contributions(@politician.id, @contributions)	
			end
		end
	end

	def add_contributors_and_contributions(politician_id, contributions)
		contributions.each do |contribution|
			if Contributor.find_by_name(contribution["contributor_name"]).nil?
				if contribution["organization_ext_id"] == ""
					name_key = "contributor_name"
				else 
					name_key = "organization_name"
				contributor_info = {
												name: contribution[name_key],
												contributor_name: contribution["contributor_name"],
												organization_name: contribution["organization_name"],
												contributor_occupation: contribution["contributor_occupation"],
												contributor_state: contribution["contributor_state"],
												contributor_zipcode: contribution["contributor_zipcode"],
												}
				@contributor = Contributor.create(contributor_info)
			end
			add_contribution(politician_id, contribution)
		end
	end

	def add_contribution(politician_id, contribution)
		contributor = Contributor.find_by({name: contribution["contributor_name"]})
			# TODO: Store and parse the transaction_id as well
			contribution_info = {
											# TODO: Parse amount as float. Needs a migration to change the column type
											amount: contribution["amount"].to_f,
											cycle: contribution["cycle"],
											transaction_type: contribution["transaction_type"],
											committee_name: contribution["committee_name"],
											committee_ext_id: contribution["committee_ext_id"],
											politician_id: politician_id,
											contributor_id: contributor.id,
											committee_ext_id: parse_transaction_id(contribution["transaction_id"])
											}
			@contribution = Contribution.create(contribution_info)
	end

	# the api returns "candidate name (party)" when I only need candidate name
	def parse_name(name)
		paren_index = name.index("(")
		if paren_index.nil? 
			return name.downcase
		else
			return name[0..paren_index - 1].chomp(" ").downcase
		end
	end

	def parse_transaction_id(transaction_id)
		transaction_id.split(':')[0]
	end

	def sunlight_api(cycle, politician_name)
		query = {query: {
			apikey: ENV["sunlight_api_key"], 
			recipient_ft: politician_name, 
			for_against: "for", 
			cycle: cycle,
			page: 1
		}}

		all_contributions = []
		loop do 
			response = self.class.get("", query)
			parsed_response = JSON.parse(response.body)
			break if parsed_response.empty?
			all_contributions = all_contributions.concat(parsed_response)
			query[:query][:page] += 1
		end 

		all_contributions
	end

end
