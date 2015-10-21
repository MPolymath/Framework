// routes/twitter.js
//Callback Functions
module.exports = function(){
	
	var error = function(err, response, body){
	console.log("KEEP TWEAKING");
	console.log("Error [%s]", err);
};

	var success = function(data) {
	console.log("SUUUUCESSSSSS");
	console.log("Data [%s]", data);
};

var Twitter = require('twitter-js-client').Twitter;

//Twitter data from dashboard
var config = {
	'consumerKey'   :		'9BHeLsq2NTO2kPZKBSkcLm5No', // APP ID
    'consumerSecret':		'SAwsJ6odkwu0efTZ0v7LOCd6uJtWFZA5Wr6Y93q5qRK3ibFNDk', // APP Secret
	'accessToken':			'3012074284-EqTcnHDMlEuP7fxF3XMSATQWRHteK3XVNOHiqOJ',
	'accessTokenSecret':	'D1OQ40XjGsd0tUfo1qOfnLNSaJh0foFg2Xio8pVlRks7s',
	'callBackURL'   :		'http://localhost:3000/auth/twitter/callback'
};

var twitter = new Twitter(config);

	console.log('testing');
//	twitter.getTweet({ id: '1111111111'}, error, success);
//	twitter.getUserTimeline({ screen_name: 'OuchErf', count: '10'}, error, success);
	twitter.getSearch({'q':'#lost','count': 10}, error, success);
};
