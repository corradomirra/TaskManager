var taskUIAction = require('../actions/taskUIAction');
var Reflux = require('reflux');
var $ = require('jquery');

var TaskUIStore = Reflux.createStore({
    init: function(){
        this.listenTo(taskUIAction.load,this.onLoad);
        this.listenTo(taskUIAction.update,this.onUpdate);
        this.listenTo(taskUIAction.createComment,this.onCreateComment)
    },
    onLoad: function (params) {
        var url = "/project/" + params.project + '/' + 'task/' + params.task;
        var self = this;
        $.ajax({
            url:url,
            method:"GET",
            dataType:"json",
            success:function(data){
                self.trigger(data);
            }
        });
    },
    onUpdate: function(task){
        var self = this;
        var url = "/project/" + task.project + '/' + 'task/' + task.task;
        $.ajax({
            url:url,
            method:"PUT",
            dataType:"json",
            data:task.data,
            success:function(data){
                self.trigger(data);
            }
        });
    },
    onCreateComment: function(comment){
        var self = this;
        var url = "/comment";
        $.ajax({
            url:url,
            method:"POST",
            dataType:"json",
            data:comment,
            success:function(data){
                self.trigger(data);
            }
        });


    }
});
module.exports = TaskUIStore;