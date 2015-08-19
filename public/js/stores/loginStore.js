var loginAction = require('../actions/loginAction');
var Reflux = require('reflux');
var $ = require('jquery');

var LoginStore = Reflux.createStore({
   init: function(){
       this.listenTo(loginAction.login,this.onLogin)
   },
    onLogin: function (user) {
        var self = this;
            $.ajax({
                url:"login",
                method:"POST",
                dataType:"json",
                data:user,
                success:function(data){
                    self.trigger(data);
                }
            });
    }

});
module.exports = LoginStore;

