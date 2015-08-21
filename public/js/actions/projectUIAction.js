var Reflux=require('reflux');

var ProjectUIActions = Reflux.createActions([
    "load",
    "update",
    "create",
    "delete"
]);

module.exports = ProjectUIActions;
