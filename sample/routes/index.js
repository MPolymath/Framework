var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
	res.render('helloworld', {title: 'Hello, World!'});
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var Collection = db.collection('User');
	var Kitten = db['models'].Kitten;
	var silence = new Kitten({name: 'Silence'});
	silence.speak();
	res.render('userlist', {kitname: silence.name});
//	Collection.find({}, function(err, userlist) {
//		if (err) return err;
//		res.render('userlist', {userlist: userlist});
//	});
});

module.exports = router;
