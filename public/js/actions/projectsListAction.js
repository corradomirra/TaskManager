var Reflux=require('reflux');

var ProjectActions = Reflux.createActions([
    "load",
    "update",
    "create",
    "delete"
]);

module.exports = ProjectActions;
