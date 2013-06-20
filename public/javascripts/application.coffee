$ ->

  class Sugar extends Backbone.Model
    defaults:
      amount: 0

  class Cream extends Backbone.Model
    defaults:
      amount: 0

  class SugarList extends Backbone.Collection
    model: Sugar
    url: "http://localhost:9292/sugars"
    addOne: ->
      @create()

  class CreamList extends Backbone.Collection
    model: Cream
    url: "http://localhost:9292/creams"
    addOne: ->
      @create()

  class SugarUIView extends Backbone.View
    el: $ '#sugarUI'
    events:
      "click .add" : "add"
    template: _.template '<h3>Sugars: <%= length %></h3>'

    initialize: ->
      @listenTo @collection, 'add', @render

    render: ->
      $(@el).find(".amount").html( @template( @collection.toJSON() ) )
    add: ->
      @collection.addOne()

  class CreamUIView extends Backbone.View
    el: $ "#creamUI"
    events:
      "click .add" : "add"
    template: _.template '<h3>Creams: <%= length %></h3>'

    initialize: ->
      @listenTo @collection, 'add', @render

    render: ->
      $(@el).find(".amount").html( @template( @collection.toJSON() ) )

    add: ->
      @collection.addOne()

  class CreamCupView extends Backbone.View
    el: $ "#cream"

    initialize: ->
      @listenTo @collection, 'add', @render

    render: ->
      coffeeColor = 1 - 1/(@collection.length + 1)
      $(@el).animate
        opacity: coffeeColor
      , 500

  sugars = new SugarList()
  creams = new CreamList()
  sugarUIView = new SugarUIView collection: sugars
  creamUIView = new CreamUIView collection: creams
  creamCupView = new CreamCupView collection: creams

  sugars.fetch()
  creams.fetch()
