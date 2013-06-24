$ ->

  class Sugar extends Backbone.Model

  class Cream extends Backbone.Model

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

      @render()

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

      @render()

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

  class SugarCubeView extends Backbone.View
    tagName: "div"
    className: "sugarCube"

    initialize: ->
      @top        = Math.floor( Math.random() * 250 )
      @left       = Math.floor( Math.random() * 100 )
      @move()
      # get the directional vector the sugar cube will travel
      direction   = Math.random() * Math.PI * 2
      @dx         = Math.cos direction
      @dy         = Math.sin direction
      setInterval(@animate, 50)

    animate: =>
      @left   += @dx
      @top    += @dy
      # Edge cases if the sugar hits the edge
      # TODO: non-hardcode the edge
      @dx     *= -1   if  @left <= 0 || @left >= 100
      @dy     *= -1   if   @top <= 0 || @top >= 250
      @move()

    move: ->
      $(@el).css
        "top": @top
        "left": @left


  class SugarCubesView extends Backbone.View
    el: $ "#coffee"

    initialize: ->
      @listenTo @collection, 'add', @addSugarCube

    addSugarCube: (sugar) ->
      sugarCubeView = new SugarCubeView model: sugar
      $(@el).append( sugarCubeView.el )

  class CupUIView extends Backbone.View
    el: $ "#cupUI"
    events:
      "click #stirUI" : "stir"

    stir: ->
      console.log("stirred")

  sugars          = new SugarList()
  creams          = new CreamList()
  sugarUIView     = new SugarUIView collection: sugars
  creamUIView     = new CreamUIView collection: creams
  creamCupView    = new CreamCupView collection: creams
  sugarCubesView  = new SugarCubesView collection: sugars
  cupUIView       = new CupUIView()

  sugars.fetch()
  creams.fetch()
