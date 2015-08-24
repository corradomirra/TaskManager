var Reflux=require('reflux');

var ProjectUIActions = Reflux.createActions([
    "load",
    "update",
    "createTask",
    "createDeveloper",
    "delete"
]);

module.exports = ProjectUIActions;
