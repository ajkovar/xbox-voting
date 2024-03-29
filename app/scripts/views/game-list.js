/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");
var GameItem = require("./game-item");
var GameForm = require("./game-form");
var translations = require("./translations");

var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var getInitialState = function(props){
    return { 
      status: props.status || "wantit"
    };
}

module.exports = React.createClass({
  mixins: [FluxChildMixin, StoreWatchMixin("GameStore")],

  getInitialState: function() {
    return getInitialState(this.props)
  },

  componentDidMount: function() {
    this.getFlux().actions.loadGames();
  },

  getStateFromFlux: function() {
    return this.getFlux().store("GameStore").getState();
  },
  
  componentWillReceiveProps: function(updatedProps){
    this.setState(getInitialState(updatedProps));
  },
    
  clearGames: function(){
    this.getFlux().actions.clearGames();
  },

  render: function() {
    var self = this;
    var th = this.state.status==="wantit" ? <th></th> : undefined;
    var gameItems = this.state.games.filter(function(game){
      return game.status===self.state.status
    }).map(function(game, i) {
      return <GameItem game={game} key={i} />;
    });
    var gameForm = this.state.status==="wantit" ? <GameForm /> : undefined;
    return this.state.loading ? 
      <span>Loading..</span> : 
      <div>
        <h1>{translations[this.state.status]}</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Votes</th>
              {th}
              {th}
            </tr>
          </thead>
          <tbody>{gameItems}</tbody>
        </table>
        {gameForm}
        <input type="button" value="Clear Games" className="btn btn-primary" onClick={this.clearGames}/>
      </div>
  }

});
