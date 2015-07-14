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

		# TODO: Break this out into a store_data_if_needed helper
		# Check if the politician being searched is already in the db
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

		# @contributor_hash = {}

		# Contribution.where(politician_id: @politician.id, cycle: cycle).find_each do |contribution|
		# 	contributor = contribution.contributor
		# 	@contributor_hash[contributor.organization_name] ||= {}
		# 	@contributor_hash[contributor.organization_name][contributor.name] ||= 0
		# 	@contributor_hash[contributor.organization_name][contributor.name] += contribution.amount.to_i
		# 	@contributor_hash = @contributor_hash.sort
			# TODO: need to continue what is below this
			# it needs to be able to be read by the frontend and d3 in  nice way
			# contributor = Contributor.find_by({id: contribution.contributor_id})
			# @contributor_hash[contributor.organization_name] ||= {"contributors" => contributor.name}
			# @contributor_hash[contributor.organization_name]["contributors"][contributor.name] ||= {"amount" => 0}
			# binding.pry
			# @contributor_hash[contributor.organization_name]["contributors"][contributor.name]["amount"] += contribution.amount.to_i
		# end


		# Contribution.joins(:contributor)
		# 						.where({politician: @politician,cycle: cycle})
		# 						.group(:contributor)
		# 						.count
		# 						.sort("sum(amount) DESC")
		# 						.limit(20)

		# Contribution.joins(:contributor).where({politician_id: 1,cycle: 2014}).group(:contributor).count(:amount).sort("sum(amount) DESC").limit(20)
		# Contributor.joins(:contributor).group(:contributor_id).where({politician_id: 1,cycle: 2014}).select('SUM(amount) as tot').order('tot desc')

		# Contribution.where({politician: 1, cycle: 2014}).select("sum(amount) as total_amount").group("contributor_id")
		# # returns  [#<Contribution id: nil>, #<Contribution id: nil>, #<Contribution id: nil>,  ...]> 
		#  Contributor.group(:id)
		#  # returns <Contributor id: 1, name: "McCain-Palin Compliance Fund",
		#  #  organization_name: "McCain-Palin Compliance Fund", contributor_occupation: "",
		#  #  contributor_state: "DC", contributor_zipcode: "20005",
		#  #  created_at: "2015-07-14 03:56:31", updated_at: "2015-07-14 03:56:31"> 
		#  Contribution.group(:id).group(:contributor_id).where({politician_id: 1, cycle: 2014})
		#  returns #<Contribution id: 821, amount: -2600.0, cycle: 2014, transaction_type: "15", 
		#  # politician_id: 1, contributor_id: 26, committee_name: "Friends of John McCain", 
		#  # committee_ext_id: "C00540310", created_at: "2015-07-14 03:57:13", updated_at: "2015-07-14 03:57:13"> 

		# Contribution.group(:id).group(:contributor_id).where({politician_id: 1, cycle: 2014}).order(:amount)
		# # returns #<Contribution id: 1, amount: 811479.0, cycle: 2014, transaction_type: "18g", politician_id: 1,
		# # contributor_id: 1, committee_name: "Friends of John McCain", committee_ext_id: "C00540310",
		# # created_at: "2015-07-14 03:56:31", updated_at: "2015-07-14 03:56:31"> 

		# Contribution.group(:id).group(:contributor_id).where({politician_id: 1, cycle: 2014}).order(amount: :desc)
		# # returns #<Contribution id: 1, amount: 811479.0, cycle: 2014, transaction_type: "18g", politician_id: 1,
		# # contributor_id: 1, committee_name: "Friends of John McCain", committee_ext_id: "C00540310",
		# # created_at: "2015-07-14 03:56:31", updated_at: "2015-07-14 03:56:31">

		#  Contributor.joins(:contributions).group(:id)
		# # returns <Contributor id: 1, name: "McCain-Palin Compliance Fund",
		# # organization_name: "McCain-Palin Compliance Fund",contributor_occupation: "", contributor_state: "DC",
		# # contributor_zipcode: "20005",created_at: "2015-07-14 03:56:31",updated_at: "2015-07-14 03:56:31">

		# Contributor.joins(:contributions).where(contributions: {contributor_id:  594}).length

		# 	array = []
		#  Contributor.joins(:contributions).group(:id).find_each do |contribution|
		#  	 array = array.push(contribution)
		#  	end
	 # 	# returns <Contributor id: 3, name: "NICHOLSON, DAVID A MR", 
	 # 	# organization_name: "PVS Chemicals", contributor_occupation: "VICE PRESIDENT", 
	 # 	# contributor_state: "MI", contributor_zipcode: "48236", created_at: "2015-07-14 03:56:31",
	 # 	# updated_at: "2015-07-14 03:56:31">

	 # 	 array.each do |contributor|
	 # 	 	contribution_array = contribution_array.push(c)
	 # 	 	c = Contribution.find_by({contributor_id: contributor.id})
	 # 	end
	 # 	returns contribution_array[1]: 
	 	# <Contribution id: 5, amount: 354854.0, cycle: 2014, transaction_type: "18g", politician_id: 1,
	 	# contributor_id: 2, committee_name: "Friends of John McCain", committee_ext_id: "C00540310",
	 	# created_at: "2015-07-14 03:56:31", updated_at: "2015-07-14 03:56:31"> 

	 	# Contribution.where({politician_id: 1, cycle: 2014}).group(:contributor_id).sum(:amount)
	 	# returns 557=>250.0,

	 	# Contribution.joins(:contributor).group(:name).sum(:amount)
	 	# returns "WEISZ, GEORGE E MR"=>2600.0,
	 	 	
 	 #  Contribution.joins(:contributor).group(:organization_name).sum(:amount)
 	 #  returns "National Confectioners Assn"=>1000.0,

 	 #  Contribution.joins(:contributor).group(:organization_name).group(:name).sum(:amount)
 	 #  ["Rubin & Rudman", "DETORE, JOHN MR"]=>2600.0,

	  # Contribution.joins(:contributor).group(:organization_name).group(:name).group(:contributor_occupation).sum(:amount)
	  # ["Sempra Energy", "Sempra Energy", ""]=>5000.0,

   	contributions_list = Contribution.joins(:contributor).group(:organization_name).group(:name).sum(:amount).sort
    # [["Trujillo Co", "TRUJILLO, SOLOMON DENNIS MR", "PRESIDENT"], 2600.0]
    # ALWAYS USE sort. it makes it an array instead of a hash

			# If the politician is in the db, check if any contributions 
			# for the searched year are in the db. 
			# If they are, assume this search has already been made, and the results
			# are in db. If not, search for them in the Sunlight API
			#TODO # each time a request is made, if there is a politican, 
			# check if any contributions for the cycle are already in the db (find_by({politician: "", cycle: ""})
		respond_to do |f|
		  f.json { render json: {data: contributions_list}}
		  f.html
		end
	end 

	def total_raised_in_cycle
		 Contributor.joins(:contributions).sum(:amount)
	end
	private

	def add_contributors_and_contributions(politician_id, contributions)
		contributions.each do |contribution|
			if Contributor.find_by_name(contribution["contributor_name"]).nil?
				contributor_info = {
												name: contribution["contributor_name"],
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
											contributor_id: contributor.id
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

	def sunlight_api(cycle, politician_name)
		page = 1
		query = {query: {
			apikey: ENV["sunlight_api_key"], 
			recipient_ft: politician_name, 
			for_against: "for", 
			cycle: cycle,
			page: page
		}}
		# all_contributions = []
		# loop do 
		# 	response = self.class.get("", query)
		# 	parsed_response = JSON.parse(response.body)
		# 	break if parsed_response.empty?
		# 	all_contributions = all_contributions.concat(parsed_response)
		# 	page += 1
		# end 

		# return all_contributions
		response = self.class.get("", query)
		JSON.parse(response.body)
	end

end
