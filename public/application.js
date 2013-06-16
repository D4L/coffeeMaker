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
    url:        "http://localhost:4567/sugars",
    addOne:     function() {
                  this.create({});
                }
  });

  var CreamList = Backbone.Collection.extend( {
    model:      Cream,
    url:        "http://localhost:4567/creams",
    addOne:     function() {
                  this.create({});
                }
  });

  var sugars = new SugarList();
  var creams = new CreamList();

  var SugarListView = Backbone.View.extend( {
    el:         $('#sugar'),
    events:     {
                  "click .add" : "add"
                },
    template:   _.template('<h3>Sugars: <%= length %></h3>'),

    initialize: function() {
                  this.listenTo( this.collection, 'add', this.render );
                  this.collection.fetch();
                },

    render:     function() {
                  this.$el.find(".amount").html( this.template( this.collection.toJSON() ) );
                  return this;
                },
    add:        function() {
                  this.collection.addOne();
                }
  });

  var CreamListView = Backbone.View.extend( {
    el:         $("#cream"),
    events:     {
                  "click .add" : "add"
                },
    template:   _.template('<h3>Creams: <%= length %></h3>'),

    initialize: function() {
                  this.listenTo( this.collection, 'add', this.render );

                  this.collection.fetch();
                },

    render:     function() {
                  this.$el.find(".amount").html( this.template( this.collection.toJSON() ) );
                  return this;
                },

    add:        function() {
                  this.collection.addOne();
                }
  });

  var sugarView = new SugarListView( { collection: sugars } );
  var creamView = new CreamListView( { collection: creams } );

});
