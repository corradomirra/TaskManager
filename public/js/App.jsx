var React = require("react");
var App = require("components/app");
var Login = require("components/login/login");
var Search = require("components/search");
var ManagerUI = require('components/managerUI/managerUI');
var AddProject = require('components/managerUI/addProject');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var routes = (
    <Route handler={App}>
        <DefaultRoute name="login" handler={Login}/>
        <Route name="manager" path="/manager" handler={ManagerUI}>
            <Route name="project" path="project/:name" handler = {Search}/>
            <Route name = "addProject" path = "addProject" handler = {AddProject}/>
        </Route>
    </Route>
);

if (typeof window !== "undefined") {
    window.onload = function() {
        Router.run(routes, function (Handler) {
            React.render(<Handler/>, document.getElementById("container"));
        });
    };
}