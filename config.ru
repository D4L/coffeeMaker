require 'rubygems'
require 'bundler'

Bundler.require

require './application.rb'

use CoffeeMaker
run Sinatra::Base
