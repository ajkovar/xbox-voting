/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");
var GameItem = require("./game-item");

var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var getInitialState = function(props){
    return { 
      newGameLabel: "",
      status: props.status || "wantit",
      nameDuplicated: false
    };
}

module.exports = React.createClass({
  mixins: [FluxChildMixin, StoreWatchMixin("GameStore")],

  getInitialState: function() {
    return getInitialState(this.props)
  },

  getStateFromFlux: function() {
    return this.getFlux().store("GameStore").getState();
  },

  componentDidMount: function() {
    this.getFlux().actions.loadGames();
  },
  
  componentWillReceiveProps: function(updatedProps){
    this.setState(getInitialState(updatedProps));
  },

  render: function() {
    var self = this;
    var th = this.state.status==="wantit" ? <th></th> : undefined;
    var gameItems = this.state.games.filter(function(game){
      return game.status===self.state.status
    }).map(function(game, i) {
      return <GameItem game={game} key={i} />;
    });
    return this.state.loading ? 
      <span>Loading..</span> : 
      <div>
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
        <form onSubmit={this.onSubmitForm}>
          <div className={"form-group"+(this.state.nameDuplicated ? " has-error" : "")}>
            <input type="text" size="30" placeholder="New Game"
                   value={this.state.newGameLabel}
                   onChange={this.handleGameTextChange}
                   className="form-control" />
            { this.state.nameDuplicated ? 
                <span className="text-danger">Duplicate Name</span> : 
                "" }
          </div>
          <input type="submit" value="Add Game" className="btn btn-primary"/>
        </form>
      </div>
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
