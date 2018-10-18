var express = require('express');
var router = express.Router();
var DB = require('../models/db');
var dataArr;

/* GET users listing. */
router.get('/',function (req,res,next) {
    // console.log("发文章！");
    // console.log(req.session.user);
    DB.findOne("CityBoyBlog","essayCollection",{user:req.session.user.name},function (err,result) {
        if (err || (result == null)){
            return false;
        } else {
            dataArr = result.reverse();
            res.render('post',{title:"发表文章",user:req.session.user,code:false,essays:dataArr});
        }
    });

});

router.post('/', function(req, res, next) {

    if (req.body.post.length <=0 || req.body.post == null){

        res.render('post',{title:"发表文章",
            user:req.session.user,
            message:"发表的内容不能为空！",
            statues:"alert-warning",
            code:true,
            essays:dataArr});
    } else {
        // 发表到数据库
        //文章存储到essayCollection表
        DB.insertOne("CityBoyBlog","essayCollection",{user:req.session.user.name,
            contents: req.body.post},function (err,resul) {
            if (err){
                res.render('post',{
                    title:"发表文章",
                    user:req.session.user,
                    message:"发表失败！",
                    code:true,
                    statues:"alert-warning",
                    content:req.body.post,
                    essays:dataArr});
            }else {
                DB.findOne("CityBoyBlog","essayCollection",{user:req.session.user.name},function (err,result) {
                    if (err || (result == null)){
                        return false;
                    } else {
                        dataArr = result.reverse();
                        res.render('post',{
                            title:"发表文章",
                            user:req.session.user,
                            message:"发表成功！",
                            statues:"alert-success",
                            code:true,
                            essays:dataArr});
                    }
                });

            }

        });
    }



});



module.exports = router;
