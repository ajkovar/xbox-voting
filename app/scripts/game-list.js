/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");
var GameItem = require("./game-item");

var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxChildMixin, StoreWatchMixin("GameStore")],

  getInitialState: function() {
    return { newGameText: "" };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("GameStore").getState();
  },

  componentDidMount: function() {
    this.getFlux().actions.loadGames();
  },

  render: function() {
    return this.state.loading ? 
      <span>loading..</span> : 
      <div>
        <ul>
          {this.state.games.map(function(game, i) {
            return <li key={i}><GameItem game={game} /></li>;
          })}
        </ul>
        <form onSubmit={this.onSubmitForm}>
          <input type="text" size="30" placeholder="New Game"
                 value={this.state.newGameText}
                 onChange={this.handleGameTextChange} />
          <input type="submit" value="Add Game" />
        </form>
        <button onClick={this.clearCompletedGames}>Clear Completed</button>
      </div>
  },

  handleGameTextChange: function(e) {
    this.setState({newGameText: e.target.value});
  },

  onSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.newGameText.trim()) {
      this.getFlux().actions.addGame(this.state.newGameText);
      this.setState({newGameText: ""});
    }
  }
});
