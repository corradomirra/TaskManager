var Reflux=require('reflux');

var ProjectActions = Reflux.createActions([
    "load",
    "update",
    "create",
    "delete",
    "loadDevProjects"
]);

module.exports = ProjectActions;
