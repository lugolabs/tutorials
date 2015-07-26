Rails.application.routes.draw do
  resources :books do
    get :search, :on => :collection
  end

  resources :handlers, :only => [:index]

  root 'books#index'
end
