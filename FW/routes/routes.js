var vhost = require('vhost');

module.exports = function(app,passport) {
	// VHOST set up
	// LOCAL LOGIN    ===================================
	app.use(vhost("login.local.42.fr", function(req, res, next) {
			res.render('login.ejs', {message: req.flash('loginMessage')});
	}));

	// process login form
	// app.post('/login', do all passport stuff here);
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect on success to profile
		successFailure: '/login', // redirect on failure to signup
		failureFlash: true // allow flash messages
	}
	));

	// LOCAL SIGNUP   ===================================
	// show the signup form
	app.use(vhost("signup.local.42.fr", function(req, res, next) {
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	}));

	// process signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect on success to profile
		successFailure: '/signup', // redirect on failure to signup
		failureFlash: true // allow flash messages
	}
	));

	app.use(vhost("twitter.local.42.fr", function(req, res, next) {
		require('./twitter.js')();
		res.render('index.ejs');
	}));
	// HOMEPAGE ===================================
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	// TWITTER QUERY  ===================================

	app.get('/twitter', function(req, res){
		console.log(require('./twitter.js')());
		res.render('index.ejs');
	});
/*	// LOCAL LOGIN    ===================================
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// process login form
	// app.post('/login', do all passport stuff here);
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect on success to profile
		successFailure: '/login', // redirect on failure to signup
		failureFlash: true // allow flash messages
	}
	));*/

/*	// LOCAL SIGNUP   ===================================
	// show the signup form
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});

	// process signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect on success to profile
		successFailure: '/signup', // redirect on failure to signup
		failureFlash: true // allow flash messages
	}
	));*/

	// ==================================================
	// FACEBOOK =========================================
	// ==================================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

	// handle call back once facebook user has been authenticated
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
	}));

	// ==================================================
	// TWITTER ==========================================
	// ==================================================
	// route for twitter authentication and login
	app.get('/auth/twitter', passport.authenticate('twitter'));

	// handle call back once twitter user has been authenticated
	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
	}));

	// PROFILE  ===================================
	app.get('/profile', isLoggedIn, function (req, res){
		//Callback functions
		var error = function (err, response, body) {
			console.log(err);
		};
		var success = function (data) {
			console.log(data);
		};
		console.log(req.user.twitter);
//		var results = req.user.twitter.getSearch({'q':'#haiku','count': 10}, error, success);
		res.render('profile.ejs', {
			user: req.user,
//			result: results
		});
	});
	// LOGOUT   ===================================
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	app.get('/admin', function(req, res){
		res.render('admin.ejs');
	});

	app.get('/test', function(req, res){
		res.render('test.ejs');
	});
}

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	return ('/');
}

