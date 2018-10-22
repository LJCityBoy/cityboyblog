var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('three',{title: '三维世界',user:req.session.user});
});
module.exports = router;