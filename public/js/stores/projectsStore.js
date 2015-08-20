var projectAction = require('../actions/projectsAction');
var Reflux = require('reflux');
var $ = require('jquery');

var ProjectStore = Reflux.createStore({
    init: function(){
        this.listenTo(projectAction.load,this.onLoad)
    },
    onLoad: function () {
        var self = this;
        $.ajax({
            url:"project",
            method:"GET",
            dataType:"json",
            success:function(data){
                self.trigger(data);
            }
        });
    }

});
module.exports = ProjectStore;

