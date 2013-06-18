$(document).ready(function() {

  var Sugar = Backbone.Model.extend( {
    defaults:   {
                  amount: 0
                }
  });

  var Cream = Backbone.Model.extend( {
    defaults:   {
                  amount: 0
                },
  });

  var SugarList = Backbone.Collection.extend( {
    model:      Sugar,
    url:        "http://localhost:9292/sugars",
    addOne:     function() {
                  this.create({});
                }
  });

  var CreamList = Backbone.Collection.extend( {
    model:      Cream,
    url:        "http://localhost:9292/creams",
    addOne:     function() {
                  this.create({});
                }
  });

  var sugars = new SugarList();
  var creams = new CreamList();

  var SugarUIView = Backbone.View.extend( {
    el:         $('#sugarUI'),
    events:     {
                  "click .add" : "add"
                },
    template:   _.template('<h3>Sugars: <%= length %></h3>'),

    initialize: function() {
                  this.listenTo( this.collection, 'add', this.render );
                  this.listenTo( this.collection, 'sync', this.render );
                },

    render:     function() {
                  this.$el.find(".amount").html( this.template( this.collection.toJSON() ) );
                  return this;
                },
    add:        function() {
                  this.collection.addOne();
                }
  });

  var CreamUIView = Backbone.View.extend( {
    el:         $("#creamUI"),
    events:     {
                  "click .add" : "add"
                },
    template:   _.template('<h3>Creams: <%= length %></h3>'),

    initialize: function() {
                  this.listenTo( this.collection, 'add', this.render );
                  this.listenTo( this.collection, 'sync', this.render );
                },

    render:     function() {
                  this.$el.find(".amount").html( this.template( this.collection.toJSON() ) );
                  return this;
                },

    add:        function() {
                  this.collection.addOne();
                }
  });

  var sugarUIView = new SugarUIView( { collection: sugars } );
  var creamUIView = new CreamUIView( { collection: creams } );

  var CreamCupView = Backbone.View.extend( {
    el:         $("#cream"),

    initialize: function() {
                  this.listenTo( this.collection, 'add', this.render );
                  this.listenTo( this.collection, 'sync', this.render );
                },

    render:     function() {
                  var coffeeColor = 1 - 1/(this.collection.length + 1);
                  this.$el.animate({
                    opacity: coffeeColor
                  }, 500);
                }
  });

  var creamCupView = new CreamCupView( {collection: creams} );

  sugars.fetch();
  creams.fetch();

});
