require 'rubygems'
require 'bundler'

Bundler.require

sugarAmount = []
creamAmount = []

set :views, File.dirname(__FILE__) + "/public/views"

get '/' do
  # File.read(File.join('public', 'index.html'))
  haml :index
end

get '/sugars' do
  content_type :json
  sugarAmount.to_json
end

post '/sugars' do
  content_type :json
  sugarAmount << {}
  200
end

get '/creams' do
  content_type :json
  creamAmount.to_json
end

post '/creams' do
  content_type :json
  creamAmount << {}
  200
end
