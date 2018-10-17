var express = require('express');
var router = express.Router();
var md5 = require('md5');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('reg',{title: '注册'});
});

router.post('/',function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password; //密码MD5加密传输
    var repassword=req.body.password_repeat;

    //用户名是否为空
    if(username==''){
        res.render('reg',{title:'注册',message:"用户名不能为空！"});
        return;
    }

    if(password==''){
        res.render('reg',{title:'注册',message:"用户密码不能为空！",username:username});
        return;
    }

    if(repassword!==password){
        res.render('reg',{title:'注册',message:"两次密码不一致！",username:username});
        return;
    }
    var DB = require('../models/db');
    var mdpassword = md5(password);//密码加密
    DB.findOne("CityBoyBlog","userCollection",{name:username},function (err,result) {
        if (err){
            res.render('reg',{title:'注册',message:"注册失败！" + err,username:username});
        } else {
            let r = result;
            DB.insertOne("CityBoyBlog","userCollection",{name:username,password:mdpassword},function (err,result) {
               if (r == 0){
                   res.render('success',{title:"注册成功",message:"注册成功！",page:"登录页面。",pagUrl:"/login"});
               } else {
                   console.log("注册失败！");
                   res.render('reg',{title:'注册',message:"注册失败！该账户已经存在。",username:username});
               }
            });

        }
    });

});

module.exports = router;
















