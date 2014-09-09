/** @jsx React.DOM */
var Fluxxor = require("fluxxor");
var React = require("react");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

module.exports = React.createClass({
  mixins: [FluxChildMixin],

  propTypes: {
    game: React.PropTypes.object.isRequired
  },
   
  voteForGame: function(){
    this.getFlux().actions.voteForGame(this.props.game);
  },
   
  markAsOwned: function(){
    this.getFlux().actions.markAsOwned(this.props.game);
  },

  render: function() {
    if(this.props.game.status==="wantit"){
      var voteButton = <td><a href="javascript:;" onClick={this.voteForGame}>Vote</a></td>;
      var ownButton = <td><a href="javascript:;" onClick={this.markAsOwned}>Mark as owned</a></td>;
    }
    return (
      <tr>
        <td>{this.props.game.title} {this.props.game.saving ? "(saving..)" : ""}</td>
        <td>{this.props.game.votes}</td>
        {voteButton}
        {ownButton}
      </tr>
    );
  }
});
