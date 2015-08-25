var Managers = require("./models/managers");
var Projects = require("./models/projects");
var Developers = require("./models/developers");
var Tasks = require("./models/tasks");
//Projects.remove({},function(err,data){
//    console.log(err);
//    console.log(data);
//
//});
//Developers.remove({},function(err,data){
//    console.log(err);
//    console.log(data);
//
//});
//Tasks.remove({},function(err,data){
//    console.log(err);
//    console.log(data);
//});
//
//
//Projects.collection.dropAllIndexes(function (err, results) {
//    console.log(err);
//    console.log(results);
//});
//
//Developers.collection.dropAllIndexes(function (err, results) {
//    console.log(err);
//    console.log(results);
//});
//
//Tasks.collection.dropAllIndexes(function (err, results) {
//    console.log(err);
//    console.log(results);
//});
//Projects.update({name:'ddd'},
//    {$push: {developers: {
//        username: 'df',
//        password: 'df',
//        projects:[{
//            name: undefined,
//            description: undefined,
//            tasks: undefined,
//            developers: undefined
//        }]
//    } }},
//    {upsert:true},function(err,data){
//        if(err) console.log(err);
//    });
//
//
//
Projects.findOne({name:'sss'},function(err,data){
   console.log(data);
});

Developers.findOne({username:'A'},function(err,data){
    console.log(data.projects);
});



//Projects.findOne({name:"league of legend"},function(err,data){
//
//    console.log(data);
//
//});
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


