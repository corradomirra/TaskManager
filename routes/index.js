var express = require('express');
var router = express.Router();
var Managers = require('../models/managers');
var Projects = require('../models/projects');
var Tasks = require('../models/tasks');
var names = ["a","a1","a2","a3","a4","a5","a6"];
var async = require('async');
var Developers = require('../models/developers');

require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

router.post('/login',function(req,res,next){
    async.waterfall([
        function(callback){
            Managers.findOne({username:req.body.user},function(err,user){
                if(err) callback(err,null);
                if(user){
                    callback(null,user);
                } else callback(null,null);
            });
         },
        function(user,callback){
            if(user !== null){
                callback(null,user);
            } else {
                Developers.findOne({username:req.body.user},function(err,user){
                   if(err) callback(err,null);
                    if(user){
                        callback(null,user)
                    } else callback(null,null);
                });
            }
        }],
        function(err,user){
            if(user) {
                if (user.checkPassword(req.body.password)) {
                    req.session.user = user._id;
                    if(user.projects){
                        res.send({text:"developer",name: user.username});
                        return;
                    }
                    res.send({text:"manager"});
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
        var tasks = [];
        var devs = [];
        for(var i = 0; i< data.developers.length; i++){
            devs.push(data.developers[i].username);
        }
        for(var i = 0; i< data.tasks.length; i++){
            tasks.push(data.tasks[i].name);
        }
        res.send({
            name:data.name,
            description:data.description,
            tasks:tasks,
            developers:devs
        });
    });

});

router.post('/task',function(req,res,next){
    async.series([
        function(callback){
            var newTask = new Tasks({
                name:req.body.name,
                project:req.body.project,
                status:false,
                description:req.body.description,
                comments:undefined
            });
            newTask.save(function(err,data){
                if(err) callback(err,null);
                console.log(data);
                callback(null,null);
            })
        },function(callback){
            Projects.update({name:req.body.project},
                {$push: {"tasks": {
                    name:req.body.name,
                    description:req.body.description,
                    comments:undefined,
                    status:false,
                    project:req.body.project
                }}},
                {upsert:true},function(err,data){
                    if(err) callback(err,null);
                    callback(null,null);
                });

        }],
        function(err,result) {
            if(err) throw err;
            res.send({taskName: req.body.name});
        });

});
router.post('/developer',function(req,res,next){
    async.waterfall([
        function(callback) {
            Developers.findOne({username:req.body.name},function(err,data){
                if(err) callback(err,null);
                console.log(data);
                if(data){
                    callback(null, data);
                } else callback(null,null);
            });
        },
        function(developer, callback) {
            if(developer !== null){
                callback(null,developer);
            } else {
                var newDev = new Developers({
                    username: req.body.name,
                    password: req.body.password,
                    projects: [{
                        name: req.body.project,
                        description: undefined,
                        tasks: undefined,
                        developers: undefined
                    }]
                });
                newDev.save(function (err, data) {
                    if (err) callback(err, null);
                    console.log(data);
                    callback(null, null);
                })
            }
        },
        function(developer,callback){
            if(developer === null){
                callback(null,null);
            } else {
                Developers.update({username:req.body.name},
                    {$push:{
                        projects:{
                            name: req.body.project,
                            description: undefined,
                            tasks: undefined,
                            developers: undefined
                        }
                    }},
                    {upsert:true}, function(err,data){
                        if(err) callback(err,null);
                        callback(null,null);
                    }
                )
            }
        },
        function(developer, callback) {
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
                    if(err) callback(err,null);
                    callback(null,'done');
                });
        }
    ], function (err, result) {
        if(err)console.log(err);
        res.send({devName:req.body.name});
    });

});
router.get('/project/:name/task/:taskName',function(req,res,next){
    Tasks.findOne({name:req.params.taskName,project:req.params.name},function(err,task){
        if(err) throw err;
        res.send({
            name:task.name,
                description:task.description,
                comments:task.comments,
                status:task.status
        });

    });
});
router.put('/project/:name/task/:taskName',function(req,res,next){
    async.series([
            function(callback){
                Projects.findOne({name:req.params.name},function(err,project){
                    var i = 0;
                    for( i =0;i<project.tasks.length;i++){
                        if(project.tasks[i].name == req.params.taskName)
                            break;
                    }
                    project.tasks[i].status = req.body.status;
                    project.save(function(err,data){
                       if(err) callback(err,null);
                        console.log(data);
                        callback(null,null);
                    });
                })
            },function(callback){
                Tasks.update({name:req.params.taskName},
                    {$set: {
                        status: req.body.status
                    }},
                    {upsert:true},function(err,data){
                        if(err) callback(err,null);
                        callback(null,null);
                    });
            }],
        function(err,result) {
            if(err)console.log(err);
            res.send({newStatus:req.body.status});
        });

});

router.post('/comment',function(req,res,next){
    async.waterfall([
            function(callback){
                Managers.findById(req.session.user,function(err,user){
                    if(err) callback(err,null);
                    if(user){
                        callback(null,user);
                    } else callback(null,null);
                });
            },
            function(user,callback){
                if(user !== null){
                    callback(null,user);
                } else {
                    Developers.findById(req.session.user,function(err,user){
                        if(err) callback(err,null);
                        if(user){
                            callback(null,user)
                        } else callback(null,null);
                    });
                }
            }],
        function(err,user){
            Tasks.update({name:req.body.task,project:req.body.project},
                {$push: {
                    comments:{
                        date:req.body.date,
                        text:req.body.text,
                        author:user.username
                    }
                }},
                {upsert:true},function(err,data){
                    if(err) console.log(err);
                    console.log(data);
                    res.send({comments:{
                        date:req.body.date,
                        text:req.body.text,
                        author:user.username
                    }});

                }
            );

        });
});
router.get('/developer/:devName',function(req,res,next){
    Developers.findOne({username:req.params.devName},function(err,dev){
        if(err) throw err;
        res.send({
            name:dev.username,
            projects:dev.projects
        });

    });
});


module.exports = router;
