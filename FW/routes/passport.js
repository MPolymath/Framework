// routes/passport.js

// local all the things we need
var localStrategy = require('passport-local').Strategy;
// import user model
var User = require('./user');

// export function
module.exports = function(passport) {
	// Passport Session Setup
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

// Local signup ======================================
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: True,
	},
	function(req, email, password, done){
		// asynchronous
		// following only called if req is sent back
		process.nextTick(function(){
			User.findOne({'local.user' : username }, function(err, user) {
				if (err)
					return done(err);

				// check to see if theres already a user with that email
				if (user)
				{
					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
				}
			}
		);
	}
	);
};


