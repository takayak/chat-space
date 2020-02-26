Rails.application.routes.draw do
  resources :products
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update, :destroy]
  resources :groups, only: [:new,:create,:index,:edit,:update] do
    resources :messages , only: [:index, :create]
  end
end
