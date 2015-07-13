class PoliticiansController < ApplicationController

	
	# Send all the contributions in your own db (creating them if needed)
	def contributions
		politician_name = params[:name] || 'mccain'
		cycle = params[:cycle] || '2014'

		# Check if the politician being searched is already in the db
		if Politician.find_by_name(politician_name).empty?
			# If the politian is not the in db, none of its contributions are either. 
			# Create a politician, contributor, and contribution records.
			contributions = sunlight_api(cycle, politician_name)
			# Each contribution in the API contains information about the 
			# receiving politician
			politician_info = {
											name: parse_name(contributions[0]["recipient_name"]),
											recipient_ext_id: contributions[0]["recipient_ext_id"],
											state: contributions[0]["state_held"],
											party: contributions[0]["recipient_party"]
											}
			@politician = Politician.create(politician_info)
			# TODO: create contribution model
			add_contributions(@politian.id)
		else 
			@politician = Politician.find_by({name: politician_name})
			if Contribution.find_by({politician: @politician.id, cycle: cycle}).empty?
				add_contributions(@politician.id)
			end
		end

			# If the politician is in the db, check if any contributions 
			# for the searched year are in the db. 
			# If they are, assume this search has already been made, and the results
			# are in db. If not, search for them in the Sunlight API
			#TODO # each time a request is made, if there is a politican, 
			# check if any contributions for the cycle are already in the db (find_by({politician: "", cycle: ""})

		 
		puts "NUMBER OF CONTRIBUTIONS: #{contributions.length}"
		# A hash from contributor ext id to contributions
		contributions_hash = {}
		contributions.each do |contribution|
			org_id = contribution["cycle"]

			if contributions_hash.has_key?(org_id)
				contributions_hash[org_id].push(contribution)
			else 
				contributions_hash[org_id] = [contribution]
			end 
		end 	

		respond_to do |f|
		  f.json { render json: {data: contributions_hash}}
		  f.html
		end
	end 

	def top_contributors

	end 

	private

	def add_contributions(politician_id)
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
		end
	end

	# the api returns "candidate name (party)" when I only need candidate name
	def parse_name(name)
		paren_index = name.index("(")
		if paren_index.nil? 
			return name
		else
			return name[0..paren_index - 1].chomp(" ")
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
		all_contributions = []
		loop do 
			response = self.class.get("", query)
			parsed_response = JSON.parse(response.body)
			break if parsed_response.empty?
			all_contributions = all_contributions.concat(parsed_response)
			page += 1
		end 

		return all_contributions
	end

end
