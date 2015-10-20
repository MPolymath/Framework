module.exports = function(app,passport) {
	// HOMEPAGE ===================================
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	// LOCAL LOGIN    ===================================
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
	));

	// LOCAL SIGNUP   ===================================
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
	));

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

	// PROFILE  ===================================
	app.get('/profile', isLoggedIn, function (req, res){
		res.render('profile.ejs', {
			user: req.user
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

