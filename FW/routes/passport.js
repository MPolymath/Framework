// routes/passport.js

// local all the things we need
var localStrategy = require('passport-local').Strategy;
// Facebook all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;
// import user model
var User = require('./user');
// import auth.js
var configAuth = require('./auth');

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
			User.findOne({'local.username' : username }, function(err, user) {
				if (err)
					return done(err);

				// check to see if theres already a user with that email
				if (user)
				{
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
	// Local login ======================================
	passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		User.findOne({'local.username' : username }, function(err, user){
			if (err)
				return done(err);

			if (!user)
				return done(null, false, req.flash('loginMessage', 'No user found.'));

			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Oops Wrong Password!'));

			return done(null, user);
		});
	}
												 ));
	//==================================================
	// FACEBOOK  =======================================
	//==================================================
	passport.use(new FacebookStrategy({

		//pull in our app id and secret form auth.js file
		clientID:		configAuth.facebookAuth.clientID,
		clientSecret:	configAuth.facebookAuth.clientSecret,
		callbackURL:	configAuth.facebookAuth.callbackURL,
		profileFields: ['id', 'emails', 'name']
	},
	// facebook will send back the token and profile
  	function(token, refreshToken, profile, done) {

		// asynchronous
		process.nextTick(function() {

			// find the user in the database on their facebook id
			User.findOne({'facebook.id' : profile.id}, function(err, user) {

				// if there is an error, stop everything and return that
				// error related to connection to database
				if (err)
					return done(err);

				// if the user is found, then log them in
				if (user){
					console.log(profile._json.id);
					return (done(null, user));
				}else{
					console.log(profile._json.id);
					// if no user create them
					var newUser = new User();

					// set all of the facebook user info in model
					newUser.facebook.id		= profile._json.id; // set id
					newUser.facebook.token	= token; // set token
					newUser.facebook.name	= profile.name.givenName + ' ' + profile.name.familyName; // set name
					newUser.facebook.email	= profile.emails[0].value; // set email

					// save our user to the database
					newUser.save(function(err) {
						if (err)
							throw err;

						// if successful, return the new user
						return done(null, newUser);
					});
				}
			});
		});
	}))};