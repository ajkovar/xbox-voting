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

  render: function() {
    return (
      <tr>
        <td>{this.props.game.title} {this.props.game.saving ? "(saving..)" : ""}</td>
        <td>{this.props.game.votes}</td>
        <td><a href="javascript:;" onClick={this.voteForGame}>Vote</a></td>
      </tr>
    );
  }
});
