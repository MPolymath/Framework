module.exports = function(app,passport) {
	// HOMEPAGE ===================================
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	// LOGIN    ===================================
	app.get('/login', function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	// process login form
	// app.post('/login', do all passport stuff here);

	// SIGNUP   ===================================
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
}

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	return ('/');
}

