require 'rubygems'
require 'bundler'

Bundler.require

require 'sass/plugin/rack'
require './application.rb'

Sass::Plugin.add_template_location File.join( File.dirname(__FILE__), "public", "stylesheets" )
use Sass::Plugin::Rack

use Rack::Coffee, {
  root: File.join( File.dirname(__FILE__), 'public' ),
  urls: '/javascripts'
}

use CoffeeMaker
run Sinatra::Base
