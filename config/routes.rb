Rails.application.routes.draw do
  root to: "welcome#index"

  get "/", to: "welcome#index"

  get "/data", to: "welcome#show_data"

  get "/contributions", to: "politicians#top_contributors"

  get "/total", to: "politicians#total_raised_in_cycle"

  get "/amount_from_pacs", to: "politicians#pac_money"

  get "/gender_contributions", to: "politicians#contributions_by_gender"
end
