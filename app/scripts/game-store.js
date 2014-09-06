var GameStore = require('fluxxor').createStore({
  initialize: function() {
    this.games = [{
        title: "Lee Carvallo's Putting Challenge", status: "wantit", votes: 50
    }];

    this.bindActions(
      "addGame", this.onAddGame
    );
  },

  onAddGame: function(payload) {
      console.log( payload );

    this.games.push({title: payload.title, status: payload.status, votes: 0});
    this.emit("change");
  },

  getState: function() {
    return {
      games: this.games
    };
  }
});

GameStore.actions = {
  addGame: function(title, status) {
    this.dispatch("addGame", {title: title, status: status});
  }
};

module.exports = GameStore; 
