var Managers = require("./models/managers");


var user = {
    username:"manager",
    password:"manager"
};
var manager = new Managers(user);
manager.save(function(err,newManager){
   if(err) throw err;
   console.log(newManager);

});
