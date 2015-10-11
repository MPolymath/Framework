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
	passport.use('local-signup', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true,
	},
	function(req, username, password, done){
		// asynchronous
		// following only called if req is sent back
		process.nextTick(function(){
			User.findOne({'local.user' : username }, function(err, user) {
				if (err)
				{
					console.log("General error");
					return done(err);
				}

				// check to see if theres already a user with that email
				if (user)
				{
					console.log("username taken");
					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
				} else {
					// create user
					console.log("creating new user");
					var newUser = new User();
					// set user data
					newUser.local.username = username;
					newUser.local.password = newUser.generateHash(password);
					// save user
					newUser.save(function(err){
						if (err)
							throw err;
//						console.log(newUser);
						return done(null, newUser);
					});
			}
			});
	});
	}));
}
