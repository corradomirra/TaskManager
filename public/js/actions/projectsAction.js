var Reflux=require('reflux');

var ProjectActions = Reflux.createActions([
    "load",
    "update",
    "add",
    "delete"
]);

module.exports = ProjectActions;
