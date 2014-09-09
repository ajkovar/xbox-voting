/** @jsx React.DOM */

'use strict';

var Fluxxor = require("fluxxor");
var React = require("react");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("GameStore")],

  getStateFromFlux: function() {
    return this.getFlux().store("GameStore").getState();
  },

  render: function() {
    return (
      <div className="container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Xbox Voting</a>
            </div>
        
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className={location.hash==="#/owned" ? "active" : undefined}><a href="#/owned">Owned</a></li>
                <li className={location.hash==="#/wanted" ? "active" : undefined}><a href="#/wanted">Wanted</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="text-danger">{this.state.error ? this.state.error : ""}</div>
        <this.props.activeRouteHandler/>
      </div>
    )
    
  }
});
