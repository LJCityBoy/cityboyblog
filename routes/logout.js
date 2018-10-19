var express = require('express');
var router = express.Router();
let DB = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {

    DB.findOne("CityBoyBlog","essayCollection",{},(error,result)=> {
        req.session.user = null;
        res.render('index',{
            title:"首页",
            essays:result.reverse()
        });
    });
    // res.render('index',{title:"首页"})
});

module.exports = router;
