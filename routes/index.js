var express = require('express');
var router = express.Router();

var isLogin = function(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('login')
    }
}

var isLogin2 = function(req,res,next){
    if(req.isAuthenticated()){
        res.redirect('profile')
    }else{
        next()
    }
}

router.get('/',function(req,res,next){
    res.render('index',{title:'Express'})
})

router.get('/login',isLogin2,function(req,res,next){
    res.render('login',{title:'Login'})
})

router.get('/signup',function(req,res,next){
    res.render('signup',{title:'Signup'})
})

router.get('/profile',isLogin,function(req,res,next){
    res.send(req.session)
})

router.get('/logout',function(req,res,next){
    req.logOut();
    res.redirect('login')
})

module.exports = router;
