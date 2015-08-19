var React = require("react");
var App = require("components/app");
var Login = require("components/login/login");
var Search = require("components/search");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var routes = (
    <Route handler={App}>
        <DefaultRoute name="login" handler={Login}/>
        <Route name="home" path="/home" handler={Search}/>
    </Route>
);

if (typeof window !== "undefined") {
    window.onload = function() {
        Router.run(routes, function (Handler) {
            React.render(<Handler/>, document.getElementById("container"));
        });
    };
}