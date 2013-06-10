var Sugar = Backbone.Model.extend({});
var Cream = Backbone.Model.extend({});

var SugarStore = Backbone.Collection.extend({
  model: Sugar,
    url: 'http://locaalhost:4567/sugars'
});

var sugars = new SugarStore;

var CreamStore = Backbone.Collection.extend({
  model: Cream,
    url: 'http://localhost:4567/creams'
});

var creams = new CreamStore;

var SugarView = Backbone.View.extend ({
  events: {
    "submit #addSream" : "addSreamHandler"
  },

  addSreamHandler: function(data) {
    sugars.create({});
  },

  render: function() {
    $('#coffeeStatus').text(sugars.length + " sugars");
    return this;
  }
});

var CreamView = Backbone.View.extend({
  events: {
    "submit #addCream" : "addCreamHandler"
  },

  addCreamHandler: function(data) {
    creams.create({});
  },

  render: function() {
    $('#coffeeStatus').text(creams.length + " creams");
    return this;
  }
});

sugars.bind('add', function(sugar) {
  sugars.fetch({success: function(){view.render();}});
});

creams.bind('add', function(cream) {
  creams.fetch({success: function(){view.render();}});
});

var sugarView = new SugarView({el: $('#coffeeStatus')});
var creamView = new CreamView({el: $('#coffeeStatus')});

/*
setInterval( function(){
  sugars.fetch({success: function(){
    view.render();
  }});
  creams.fetch({success: function(){
    view.render();
  }});
}, 1000);
*/
