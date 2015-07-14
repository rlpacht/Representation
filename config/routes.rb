Rails.application.routes.draw do
  root to: "welcome#index"

  get "/", to: "welcome#index"

  get "/data", to: "welcome#show_data"

  get "/contributions", to: "politicians#top_contributors"
end
