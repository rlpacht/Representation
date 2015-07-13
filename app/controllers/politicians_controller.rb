require 'net/http'
require 'HTTParty'
class PoliticiansController < ApplicationController
	include HTTParty
	base_uri("http://transparencydata.com/api/1.0/contributions.json")
	
	# Send all the contributions in your own db (creating them if needed)
	def contributions
		politician_name = params[:name] || 'john mccain'
		politician_name.downcase
		cycle = params[:cycle] || '2014'


		# Check if the politician being searched is already in the db
		if Politician.find_by_name(politician_name) == nil
			# If the politian is not the in db, none of its contributions are either. 
			# Create a politician, contributor, and contribution records.
			@contributions = sunlight_api(cycle, politician_name)
			# Each contribution in the API contains information about the 
			# receiving politician
			politician_info = {
											name: parse_name(contributions[0]["recipient_name"]),
											recipient_ext_id: contributions[0]["recipient_ext_id"],
											state: contributions[0]["recipient_state_held"],
											party: contributions[0]["recipient_party"]
											}
			@politician = Politician.create(politician_info)
			# TODO: create contribution model
			add_contributions(@politician.id, @contributions)
		else 
			@politician = Politician.find_by({name: politician_name})

			if Contribution.find_by({politician_id: @politician.id, cycle: cycle}) == nil
				add_contributions(@politician.id)
				
			end
		end
		@contributions = []
	
		Contribution.where(politician_id: @politician.id).where(cycle: cycle).find_each do |contribution|
			@contributions = @contributions.push(contribution)
		end

			# If the politician is in the db, check if any contributions 
			# for the searched year are in the db. 
			# If they are, assume this search has already been made, and the results
			# are in db. If not, search for them in the Sunlight API
			#TODO # each time a request is made, if there is a politican, 
			# check if any contributions for the cycle are already in the db (find_by({politician: "", cycle: ""})
		binding.pry
		respond_to do |f|
		  f.json { render json: {data: @contributions}}
		  f.html
		end
	end 

	def top_contributors

	end 

	private

	def add_contributions(politician_id, contributions)
		i = 0
		while i < contributions.length
			contribution_info = {
											amount: contributions[i]["amount"],
											cycle: contributions[i]["cycle"],
											transaction_type: contributions[i]["transaction_type"],
											committee_name: contributions[i]["committee_name"],
											committee_ext_id: contributions[i]["committee_ext_id"],
											politician_id: politician_id
											}
			@contribution = Contribution.create(contribution_info)
			i += 1
		end
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
		parsed_response = JSON.parse(response.body)
		return parsed_response
	end

end
