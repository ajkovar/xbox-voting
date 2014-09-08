var constants = require("./constants");
var $ = require("jquery");

var GameStore = require('fluxxor').createStore({
  initialize: function() {
    this.games = [];

    this.bindActions(
      "addGame", this.onAddGame,
      "loadGames", this.onLoadGames,
      "loadGamesSuccess", this.onLoadGamesSuccess
    );
  },

  onAddGame: function(payload) {
    this.games.push(payload.game);
    this.emit("change");
  },
  
  onLoadGames: function(){
    this.loading = true;
    this.games = [];
    this.emit("change");
  },
  
  onLoadGamesSuccess: function(payload){
    this.loading = false;
    this.games = payload.games; 
    this.emit("change");
  },

  getState: function() {
    return {
      games: this.games,
      loading: this.loading
    };
  }
});

GameStore.actions = {
  addGame: function(title) {
    var self = this;
    var game = {
      title: title, 
      status: "wantit",
      saving: true,
      votes: 1
    };
    $.ajax({
      dataType: "jsonp",
      url: constants.url+"addGame",
      data: {
        apikey: constants.key,
        title: game.title
      },
      success: function(games){
        // its ugly.. but just hard reload the list in order to get data back about
        // the newly created resource
        self.flux.actions.loadGames()
      }
    });
    this.dispatch("addGame", {game: game});
  },
  loadGames: function() {
    var self = this;
    this.dispatch("loadGames")
    $.ajax({
      dataType: "jsonp",
      url: constants.url+"getGames",
      data: {
        apikey: constants.key
      },
      success: function(games){
        self.dispatch("loadGamesSuccess", {games: games});
      }
    });
  }
};

module.exports = GameStore; 
