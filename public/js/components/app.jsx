var React = require("react");
var Router = require('react-router');
var ReactBootstrap = require("react-bootstrap");

var Grid = ReactBootstrap.Grid;
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var App = React.createClass({
    render() {
        return (
            <Grid>
                <RouteHandler/>
            </Grid>
        );
    }
});

module.exports = App;