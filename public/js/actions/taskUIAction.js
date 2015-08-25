var Reflux=require('reflux');

var TaskUIActions = Reflux.createActions([
    "load",
    "update",
    "createComment",
    "delete"
]);

module.exports = TaskUIActions;

