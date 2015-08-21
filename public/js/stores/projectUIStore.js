var projectUIAction = require('../actions/projectUIAction');
var Reflux = require('reflux');
var $ = require('jquery');

var ProjectUIStore = Reflux.createStore({
    init: function(){
        this.listenTo(projectUIAction.load,this.onLoad);
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
    }

});
module.exports = ProjectUIStore;
