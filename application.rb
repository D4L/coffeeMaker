class CoffeeMaker < Sinatra::Base

  sugarAmount = []
  creamAmount = []

  get '/' do
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

  get '/creams/:id' do
    content_type :json
    creamAmount.first
  end

  post '/creams' do
    content_type :json
    creamAmount << {dissolved: false, id: creamAmount.size + 1}
    200
  end

  put '/creams/:id' do
    params = JSON.parse(request.body.read)
    p params
    202
  end

end
