require 'net/http'
require 'HTTParty'
class WelcomeController < ApplicationController
	include HTTParty
	base_uri("http://transparencydata.com/api/1.0/contributions.json")

	def index
		
		
	end

	def show_data
		politician_name = params[:name] || 'mccain'
		# politician_name = "mccain"
		
		query = {query: {
			apikey: ENV["sunlight_api_key"], 
			recipient_ft: politician_name, 
			for_against: "for", 
			cycle: '2014',
			page: '1'q
		}}
		# response = HTTParty.get(url)
		response = self.class.get("", query)
		contributions = JSON.parse(response.body)
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
		amounts_hash = {}
		# contributions_hash.each do |org, contributions_array|
		# 	total_amount = contributions_array.map { |cont| cont["cycle"] }.inject(&:+)
		# 	amounts_hash[org] = total_amount
		# end

		# no_org = contributions_hash[""]
		# occupations_hash = {}
		# no_org.each do |contribution|
		# 	occupation = contribution["contributor_occupation"]
		# 	if occupations_hash.has_key?(occupation)
		# 		occupations_hash[occupation].push(contribution)
		# 	else 
		# 		occupations_hash[occupation] = [contribution]
		# 	end 
		# end 

		respond_to do |f|
		  f.json { render json: {data: contributions_hash}}
		  f.html
		end
	end
end
