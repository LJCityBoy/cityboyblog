var express = require('express');
var router = express.Router();
var DB = require('../models/db');
/* GET home page. */
router.get('/', function(req, res, next) {

    DB.findOne("CityBoyBlog","essayCollection",{},function (err,result) {
        if (err || (result == null)) {
            return false;
        } else {
            if (req.session.user != null) {

                res.render('index', {title: '首页', user: req.session.user,essays:result.reverse()});
            } else {
                res.render('index', {title: '首页',essays:result.reverse()});
            }
        }
    });

});

module.exports = router;


