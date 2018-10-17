var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.user = null;
    res.render('index',{title:"首页"})
});

module.exports = router;
