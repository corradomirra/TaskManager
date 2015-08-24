var Managers = require("./models/managers");
var Projects = require("./models/projects");
var Developers = require("./models/developers");
var Tasks = require("./models/tasks");
//Projects.remove({},function(err,data){
//    console.log(err);
//    console.log(data);
//
//});


Projects.findOne({name:"league of legend"},function(err,data){

    console.log(data);

});
//Developers.find({},function(err,data){
//    console.log(data);
//});



//var proj = [{name:"simple life",description:"project in medical sphere"},
//    {name:"Stalker",description:"game in Chernobil"},{name:"World of Warcraft",description:"fantasy game. MMORPG"}];
//for(var i = 0; i< proj.length;i++){
//
//}

//var user = {
//    username:"manager",
//    password:"manager"
//};
//var manager = new Managers(user);
//manager.save(function(err,newManager){
//   if(err) throw err;
//   console.log(newManager);
//
//});


