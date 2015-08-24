var React = require("react");
var App = require("components/app");
var Login = require("components/login/login");
var ProjectUI = require("components/managerUI/projectUI");
var ManagerUI = require('components/managerUI/managerUI');
var AddEntity = require('components/managerUI/addEntity');
var TaskUI = require('components/managerUI/taskUI');
var Search = require('components/search');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var routes = (
    <Route handler={App}>
        <DefaultRoute name="login" handler={Login}/>
        <Route name="manager" path="/manager" handler={ManagerUI}>
            <Route name="project" path="project/:name" handler = {ProjectUI}>
                <Route name = "task" path="task/:taskName" handler = {TaskUI}/>
                <Route name = "developer" path="developer/:devName" handler = {Search}/>
                <Route name = "addDeveloper" path="addDeveloper" handler = {AddEntity}/>
                <Route name = "addTask" path="addTask" handler = {AddEntity}/>
            </Route>
            <Route name = "addProject" path = "addProject" handler = {AddEntity}/>
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