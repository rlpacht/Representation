require 'net/http'
require 'HTTParty'
class WelcomeController < ApplicationController
	include HTTParty
	base_uri("http://transparencydata.com/api/1.0/contributions.json")

	def index
		
		
	end

	def show_data
		politician_name = params[:name]
		
		query = {query: {apikey: sunlight_api_key, recipient_ft: politician_name, cycle: "2014"}}
		# response = HTTParty.get(url)
		response = self.class.get("", query)
		respond_to do |f|
		  f.json { render json: {data: response.body}}
		  f.html
		end
	end
end