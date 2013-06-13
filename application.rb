require 'rubygems'
require 'bundler'

Bundler.require

@@confections = [{:amount => 5}]

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/sugar' do
  content_type :json
  @@confections.to_json
end

get '/sugar/:id' do
  logger.info params[:id]
  return @@confections.first.to_json
end

post '/sugar' do
  content_type :json
  logger.info params
  @@confections << { :sugar => 4}
end

get '/cream' do
  content_type :json
  {:sugar => 3}.to_json
end

post '/cream' do
  content_type :json
  @@confections << :cream
end
