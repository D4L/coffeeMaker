var Sugar = Backbone.Model.extend({});
var Cream = Backbone.Model.extend({});

var SugarList = Backbone.Collection.extend({
  model: Sugar,
    url: 'http://locaalhost:4567/sugars'
});

var CreamList = Backbone.Collection.extend({
  model: Cream,
    url: 'http://localhost:4567/creams'
});

var SugarView = Backbone.View.extend ({
  render: function() {
    this.$el.html( "Hello" );
  }
});

var SugarListView = Backbone.View.extend ({
  initialize: function() {
    this.collection.on('add', this.addOne, this);
  },
  events: {
    "click #addSugar" : "addSugar"
  },
  render: function() {
    this.collection.forEach( this.addOne, this );
  },
  addOne: function(sugar) {
    var sugarView = new SugarView({model: sugar});
    this.$el.append( sugarView.render().el );
  },
  addSugar: function() {
    alert("Hello");
    this.collection.add({});
  }
});

var CreamView = Backbone.View.extend({
});

var sugarList = new SugarList;
var creamList = new CreamList;
var sugarListView = new SugarListView({collection: sugarList});
var creamListView = new CreamListView({collection: creamList});
