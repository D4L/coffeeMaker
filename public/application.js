$(document).ready(function() {

  var Sugar = Backbone.Model.extend({
    url: 'http://localhost:4567/sugar'
  });
  var Cream = Backbone.Model.extend({
    url: 'http://localhost:4567/cream'
  });

  var SugarView = Backbone.View.extend ({
    template: _.template('<h3>Sugars: <%= amount %></h3>'),
    render: function() {
      this.$el.html( this.template(this.model.toJSON()) );
      return this;
    }
  });

  var CreamView = Backbone.View.extend({
  });

  var AppView = Backbone.View.extend({

    render: function() {
      return this;
    }

  });

  var App = new AppView;
  App.render();

});
