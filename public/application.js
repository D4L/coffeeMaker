$(document).ready(function() {

  var Sugar = Backbone.Model.extend( {
    urlRoot:    'http://localhost:4567/sugars',
    defaults:   {
                  amount: 0
                },

    addOne:     function() {
                  this.save();
                  this.fetch();
                }
  });

  var Cream = Backbone.Model.extend( {
    urlRoot:    'http://localhost:4567/creams',
    defaults:   {
                  amount: 0
                },

    addOne:     function() {
                  this.save();
                  this.fetch();
                }
  });

  var SugarView = Backbone.View.extend( {
    el:         $('#sugar'),
    events:     {
                  "click .add" : "add"
                },
    template:   _.template('<h3>Sugars: <%= amount %></h3>'),

    initialize: function() {
                  this.listenTo( this.model, 'all', this.render );
                },

    render:     function() {
                  this.$el.find(".amount").html( this.template( this.model.toJSON() ) );
                  return this;
                },
    add:        function() {
                  this.model.addOne();
                }
  });

  var CreamView = Backbone.View.extend( {
    el:         $("#cream"),
    events:     {
                  "click .add" : "add"
                },
    template:   _.template('<h3>Creams: <%= amount%></h3>'),

    initialize: function() {
                  this.listenTo( this.model, 'all', this.render );
                },

    render:     function() {
                  this.$el.find(".amount").html( this.template( this.model.toJSON() ) );
                  return this;
                },

    add:        function() {
                  this.model.addOne();
                }
  });

  var sugar = new Sugar();
  var cream = new Cream();

  var sugarView = new SugarView( { model: sugar } );
  var creamView = new CreamView( { model: cream } );

  sugar.fetch();
  cream.fetch();

});
