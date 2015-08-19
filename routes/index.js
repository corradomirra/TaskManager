var express = require('express');
var router = express.Router();
var Managers = require('../models/managers');

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

module.exports = router;
