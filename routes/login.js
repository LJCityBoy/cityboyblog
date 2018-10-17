var express = require('express');
var router = express.Router();
var md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login',{title: '登录'});
});
router.post('/',function (req,res,next) {
    var username=req.body.username;


    if (username == null || req.body.password == null){
        res.render('login',{title:'登录',message:"用户名或者密码不能为空！"});
        return;
    } else {
        //数据库中查找是否有该用户
        var DB = require('../models/db');
         DB.findOne("CityBoyBlog","userCollection",{name:username},function (err,result) {
             if (result.length==1){//有该用户
                 //判断密码是否正确
                 //生成口令散列
                 var password = md5(req.body.password);
                 if (result[0].password == password ){
                     req.session.user = {name:username};
                     res.render('',{title:"首页",message:"登录成功！",page:"首页。",pagUrl:"/",user:req.session.user});
                     return;
                 } else {
                     res.render('login',{title:'登录',message:"密码错误！"});
                 }
                 return;
             } else {
                 res.render('login',{title:'登录',message:"登录失败！该用户不存在！"});
                 return;
             }
         })
    }



});

module.exports = router;
