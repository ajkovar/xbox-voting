/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");

var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxChildMixin, StoreWatchMixin("GameStore")],
    
  getInitialState: function(){
      return {
        newGameLabel: "",
        nameDuplicated: false
      }
  },

  getStateFromFlux: function() {
    return this.getFlux().store("GameStore").getState();
  },

  render: function() {
    var errorMessage = this.state.nameDuplicated ? <span className="text-danger">Duplicate Name</span> : undefined;
    return (
      <form onSubmit={this.onSubmitForm}>
        <div className={"form-group"+(this.state.nameDuplicated ? " has-error" : "")}>
          <input type="text" size="30" placeholder="New Game"
                 value={this.state.newGameLabel}
                 onChange={this.handleGameTextChange}
                 className="form-control" />
          { errorMessage }
        </div>
        <input type="submit" value="Add Game" className="btn btn-primary"/>
      </form>
    )
  },

  handleGameTextChange: function(e) {
    this.setState({
      newGameLabel: e.target.value,
      nameDuplicated: this.state.games.some(function(game){
        return (game.title || "").trim().toLowerCase()===e.target.value.trim().toLowerCase()
      })
    });
  },

  onSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.newGameLabel.trim() && !this.state.nameDuplicated) {
      this.getFlux().actions.addGame(this.state.newGameLabel, this.state.status);
      this.setState({newGameLabel: ""});
    }
  }
});
