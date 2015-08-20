var express = require('express');
var router = express.Router();
var Managers = require('../models/managers');
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
    res.send({names:names});

});
router.post('/project',function(req,res,next){
    names.push(req.body.name);
    res.send({names:names});

});


module.exports = router;
