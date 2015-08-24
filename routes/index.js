var express = require('express');
var router = express.Router();
var Managers = require('../models/managers');
var Projects = require('../models/projects');
var Tasks = require('../models/tasks');
var names = ["a","a1","a2","a3","a4","a5","a6"];

require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.post('/login',function(req,res,next){
    Managers.findOne({username:req.body.user},function(err,user){
        if(err) throw err;
        if(user) {
            if (user.checkPassword(req.body.password)) {
                res.send({text:""});
            } else res.send({text:"login or password is invalid"});
        } else res.send({text:"login or password is invalid"});

    });
});

router.get('/project',function(req,res,next){
    Projects.find({},function(err,projects){
        if(err) throw err;
        var names=[];
        if(!projects.length){
            res.send({names:[]});
        } else{
            for(var i = 0; i<projects.length; i++){
                names.push(projects[i].name);
            }
            res.send({names:names});
        }
    })

});
router.post('/project',function(req,res,next){
    var project = {};
    project.tasks = undefined;
    project.developers = undefined;
    project.name = req.body.name;
    project.description = req.body.description;
    var newProject = new Projects(project);
    newProject.save(function(err,data){
        if(err) throw err;
        console.log(data);
        res.send({names:data.name});
    });

});

router.get('/project/:name',function(req,res,next){
    Projects.findOne({name:req.params.name},function(err,data){
       if(err) console.log(err);
        var name = data.name;
        var descr = data.description;
        res.send({
            name:name,
            description:descr,
            tasks:["asdasd","asdad1","ae23","qwefaf"],
            developers:["Mike","Tedd","Barny","Marshal"]
        });
    });

});

router.post('/task',function(req,res,next){
    Projects.update({name:req.body.project},
        {$set: {tasks: {name:req.body.name,description:req.body.descr,comments:undefined, status:false} }},
        {upsert:true},function(err,data){
            if(err) throw err;
            console.log(data);
            res.send({taskName:req.body.name});
        });
});
router.post('/developer',function(req,res,next){
    Projects.update({name:req.body.project},
        {$push: {developers: {
            username: req.body.name,
            password: req.body.password,
            projects:[{
                name: req.body.project,
                description: undefined,
                tasks: undefined,
                developers: undefined
            }]
        } }},
        {upsert:true},function(err,data){
            if(err) throw err;
            console.log(data);
            res.send({devName:req.body.name});
        });
});


module.exports = router;
