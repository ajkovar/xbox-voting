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
    this.games.push({title: payload.title, status: payload.status, votes: 0});
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
  addGame: function(title, status) {
    this.dispatch("addGame", {title: title, status: status});
  },
  loadGames: function() {
    var self = this;
    this.dispatch("loadGames")
    setTimeout(function(){
      var games = [
          {title: "Lee Carvallo's Putting Challenge", status: "wantit", votes: 50},
          {title: "Bonestorm", status: "gotit", votes: 50}
      ];
      self.dispatch("loadGamesSuccess", {games: games});
    }, 800)
  }
};

module.exports = GameStore; 
