var projectUIAction = require('../actions/projectUIAction');
var Reflux = require('reflux');
var $ = require('jquery');

var ProjectUIStore = Reflux.createStore({
    init: function(){
        this.listenTo(projectUIAction.load,this.onLoad);
        this.listenTo(projectUIAction.createTask,this.onCreateTask);
        this.listenTo(projectUIAction.createDeveloper, this.onCreateDeveloper);
    },
    onLoad: function (name) {
        var url = "/project/" + name;
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
    onCreateTask: function(task){
        var self = this;
        $.ajax({
            url:'/task',
            method:"POST",
            dataType:"json",
            data:task,
            success:function(data){
                self.trigger(data);
            }
        });

    },
    onCreateDeveloper:function(developer){
        var self=this;
        $.ajax({
            url:'/developer',
            method:"POST",
            dataType:"json",
            data:developer,
            success:function(data){
                self.trigger(data);
            }
        });
    }

});
module.exports = ProjectUIStore;
