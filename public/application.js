$(function() {

  var Sugar = Backbone.Model.extend({});
  var Cream = Backbone.Model.extend({});

  var SugarList = Backbone.Collection.extend({
    model: Sugar,
    url: 'http://localhost:4567/sugars'
  });

  var CreamList = Backbone.Collection.extend({
    model: Cream,
    url: 'http://localhost:4567/creams'
  });

  var Sugars = new SugarList;
  var Creams = new CreamList;

  var SugarView = Backbone.View.extend ({
    render: function() {
      this.$el.html( this.model.toJSON() );
      return this;
    }
  });

  var CreamView = Backbone.View.extend({
  });

  var AppView = Backbone.View.extend({

    el: $("body"),

    initialize: function() {
      this.listenTo(Sugars, 'all', this.render);

      Sugars.fetch()
      console.log(Sugars.models)
    },

    render: function() {
      console.log("appview Render called");
      var data = Sugars.map( this.addOne );
      var result = data.reduce( function( a,b ) {return a + b}, '' );
      $('#coffeeStatus').text(result);
      return this;
    },

    addOne: function( sugar ) {
      var view = new SugarView({model: sugar});
      this.$('#coffeeStatus').append(view.render().el);
      console.log("addOne called");
    },

    addAll: function() {
      Sugars.each(this.addOne, this);
      console.log("addAll called");
    }

  });

  var App = new AppView;

});
