$(document).ready(function() {

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
      console.log("SugarView render called");
      this.$el.html( "Hello" );
      return this;
    }
  });

  var CreamView = Backbone.View.extend({
  });

  var AppView = Backbone.View.extend({

    el: $("body"),

    initialize: function() {
      this.result = "Hello World";
      Sugars.fetch();
      console.log(Sugars.toJSON());
    },

    render: function() {
      console.log("appview Render called");
      /*var data = Sugars.map( function(sugar){
        console.log("inside map");
        var view = new SugarView({model: sugar});
        return view.render().el;
      } );

      console.log("appviewfinishmap");
      var result = data.reduce( function( a,b ) {return a + b}, '' );
      console.log("appViewfinish reduce");
      */
     console.log("Outputting sugars");
     Sugars.each( function(sugar) {
       console.log(sugar);
     } );
      $('#coffeeStatus').html(this.result);
      console.log("appview Render finishing");
      return this;
    },

    addOne: function( sugar ) {
      console.log(sugar)
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
  App.render();

});
