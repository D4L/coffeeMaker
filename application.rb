class CoffeeMaker < Sinatra::Base

  sugarAmount = []
  creamAmount = []

  get '/' do
    haml :index
  end

  get '/about' do
    haml :about
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
    newCream = {dissolved: false, id: creamAmount.size + 1}
    creamAmount << newCream
    [ 201, newCream.to_json ]
  end

  put '/creams/:id' do
    params  = JSON.parse(request.body.read).
      inject({}){|newParams, (k,v)| newParams[k.to_sym] = v; newParams}
    creamId = params.delete(:id) - 1
    creamAmount[creamId].update( params )
    202
  end

end
