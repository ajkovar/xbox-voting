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
      newGameLabel: "",
      status: this.props.status || "wantit",
      nameDuplicated: false
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
      <span>Loading..</span> : 
      <div>
        <table className="table table-bordered">
          <tr>
            <th>Title</th>
            <th>Votes</th>
            { this.state.status==="wantit" ? <th></th> : "" }
            { this.state.status==="wantit" ? <th></th> : "" }
          </tr>
          <tbody>
          {
            this.state.games.filter(function(game){
              return game.status===self.state.status
            }).map(function(game, i) {
              return <GameItem game={game} key={i} />;
            })
          }
          </tbody>
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
