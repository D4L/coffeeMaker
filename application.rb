require 'rubygems'
require 'bundler'

Bundler.require

@@confections = []

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/sugars' do
  content_type :json
  {:models => @@confections}.to_json
end

post '/sugars' do
  content_type :json
  @@confections << :sugar
end

get '/creams' do
  content_type :json
  {:models => @@confections}.to_json
end

post '/creams' do
  content_type :json
  @@confections << :cream
end
