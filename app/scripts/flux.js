var GameStore = require("./game-store");
var Fluxxor = require("fluxxor")

var stores = {
  GameStore: new GameStore()
};

module.exports = new Fluxxor.Flux(stores, GameStore.actions);
