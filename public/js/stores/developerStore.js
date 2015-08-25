var DevAction = require('../actions/developerAction');
var Reflux = require('reflux');
var $ = require('jquery');

var DevStore = Reflux.createStore({
    init: function(){
        this.listenTo(DevAction.load,this.onLoad)
    },
    onLoad: function (user) {
        var self = this;
        var url = "/developer/" + user.username;
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
module.exports = DevStore;

