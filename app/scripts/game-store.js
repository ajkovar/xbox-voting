var constants = require("./constants");
var $ = require("jquery");

var GameStore = require('fluxxor').createStore({
  initialize: function() {
    this.games = [];

    this.bindActions(
      "addGame", this.onAddGame,
      "loadGames", this.onLoadGames,
      "loadGamesSuccess", this.onLoadGamesSuccess,
      "voteForGame", this.onVoteForGame,
      "error", this.onError
    );
  },
    
  onError: function(payload){
    this.error = payload.message 
    this.emit("change");
  },
    
  onVoteForGame: function(payload){
    this.games.forEach(function(game){
      if(game.id===payload.game.id){
        game.votes++;
      }
    }) 
    this.emit("change");
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
      loading: this.loading,
      error: this.error
    };
  }
});

var checkAccess = function(){
  var deffered = $.Deferred();

  var lastAction = localStorage["lastAction"] ? 
          new Date(parseInt(localStorage["lastAction"])) :
          undefined;

  var now = new Date();
  var lastActionWasToday = lastAction &&
          lastAction.getMonth()===now.getMonth() && 
          lastAction.getDay()===now.getDay() &&
          lastAction.getYear()===now.getYear();
  if(lastActionWasToday){
    deffered.reject("Can't vote or add a game more than once per day.");
  }
  else if(now.getDay()===0 || now.getDay()===6){
    deffered.reject("Can't vote or add a game on weekends.");
  }
  deffered.resolve();
  return deffered;
};

GameStore.actions = {
  voteForGame: function(game){
    var self = this;
    checkAccess().then(function(){
      self.dispatch("voteForGame", {game: game})
      $.ajax({
        dataType: "jsonp",
        url: constants.url+"addVote",
        data: {
          apikey: constants.key,
          id: game.id
        }, success: function(){
          localStorage["lastAction"] = new Date().getTime()
        }
      });
    }, function(reason){
      self.dispatch("error", {message: reason})
    })
  },
  addGame: function(title) {
    var self = this;
    checkAccess().then(function(){
      var game = {
        title: title, 
        status: "wantit",
        saving: true,
        votes: 1
      };
      this.dispatch("addGame", {game: game});
      $.ajax({
        dataType: "jsonp",
        url: constants.url+"addGame",
        data: {
          apikey: constants.key,
          title: game.title
        },
        success: function(games){
          localStorage["lastAction"] = new Date().getTime()
          // its ugly.. but just hard reload the list in order to get data back about
          // the newly created resource
          self.flux.actions.loadGames()
        }
      });
    }, function(reason){
      self.dispatch("error", {message: reason})
    })
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
