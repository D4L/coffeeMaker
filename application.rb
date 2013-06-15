require 'rubygems'
require 'bundler'

Bundler.require

confections = {:sugarAmount => 0, :creamAmount => 0}

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/sugars' do
  content_type :json
  result = {:amount => confections[:sugarAmount]}
  result.to_json
end

post '/sugars' do
  content_type :json
  confections[:sugarAmount] += 1
end

get '/creams' do
  content_type :json
  result = {:amount => confections[:creamAmount]}
  result.to_json
end

post '/creams' do
  content_type :json
  confections[:creamAmount] += 1
end
