var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('sign-in', function(req, res) {
	res.render('/sign/sign-in');
});

router.get('sign-up', function(req, res){
	res.render('sign/sign-up');
});
module.exports = router;