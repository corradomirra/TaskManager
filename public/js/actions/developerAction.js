var Reflux=require('reflux');

var DeveloperAction = Reflux.createActions([
    "load",
    "update",
    "create",
    "delete"
]);

module.exports = DeveloperAction;

