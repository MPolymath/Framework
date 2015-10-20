//config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID'		:'1661386274090938', // APP ID
		'clientSecret'	:'957daeead5c2e7c217bea60d0ba779ee', // APP Secret
		'callbackURL'	:'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerID'	:'1661386274090938', // APP ID
		'consumerSecret':'957daeead5c2e7c217bea60d0ba779ee', // APP Secret
		'callbackURL'	:'http://localhost:3000/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID'		:'1661386274090938', // APP ID
		'clientSecret'	:'957daeead5c2e7c217bea60d0ba779ee', // APP Secret
		'callbackURL'	:'http://localhost:3000/auth/google/callback'
	}
}
