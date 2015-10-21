//config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID'		:'1661386274090938', // APP ID
		'clientSecret'	:'957daeead5c2e7c217bea60d0ba779ee', // APP Secret
		'callbackURL'	:'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey'	:'9BHeLsq2NTO2kPZKBSkcLm5No', // APP ID
		'consumerSecret':'SAwsJ6odkwu0efTZ0v7LOCd6uJtWFZA5Wr6Y93q5qRK3ibFNDk', // APP Secret
		'tokenSecret':   'D1OQ40XjGsd0tUfo1qOfnLNSaJh0foFg2Xio8pVlRks7s',
		'callbackURL'	:'http://localhost:3000/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID'		:'1661386274090938', // APP ID
		'clientSecret'	:'957daeead5c2e7c217bea60d0ba779ee', // APP Secret
		'callbackURL'	:'http://localhost:3000/auth/google/callback'
	}
}
