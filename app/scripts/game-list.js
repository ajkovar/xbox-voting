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
    return { 
      newGameText: "",
      status: this.props.status || "wantit"
    };
  },

  getStateFromFlux: function() {
    return this.getFlux().store("GameStore").getState();
  },

  componentDidMount: function() {
    this.getFlux().actions.loadGames();
  },
  
  componentWillReceiveProps: function(){
    this.setState(this.getInitialState());
  },

  render: function() {
    var self = this;
    return this.state.loading ? 
      <span>loading..</span> : 
      <div>
        <table className="table table-bordered">
          <tr>
            <th>Title</th>
            <th>Votes</th>
          </tr>
          {
            this.state.games.filter(function(game){
              return game.status===self.state.status
            }).map(function(game, i) {
              return <GameItem game={game} key={i} />;
            })
          }
        </table>
        <form onSubmit={this.onSubmitForm}>
          <div className="form-group">
            <input type="text" size="30" placeholder="New Game"
                   value={this.state.newGameText}
                   onChange={this.handleGameTextChange}
                   className="form-control" />
          </div>
          <input type="submit" value="Add Game" className="btn btn-primary"/>
        </form>
      </div>
  },

  handleGameTextChange: function(e) {
    this.setState({newGameText: e.target.value});
  },

  onSubmitForm: function(e) {
    e.preventDefault();
    if (this.state.newGameText.trim()) {
      this.getFlux().actions.addGame(this.state.newGameText, this.state.status);
      this.setState({newGameText: ""});
    }
  }
});
