var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login',{title: '登录'});
});
router.post('/',function (req,res,next) {
    res.send('post login respond with a resource');
});

module.exports = router;
