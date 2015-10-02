var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var schema = mongoose.Schema;
mongoose.connect('mongodb://root:toto@localhost:27017/Testing', {auth:{authdb:"admin"}});
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// testing Schema
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	var kittySchema = mongoose.Schema({
		name: String
	});

	kittySchema.methods.speak = function () {
		var greeting = this.name
		    ? "Meow name is " + this.name
		    : "I don't have a name";
		console.log(greeting);
	}

	var Kitten = mongoose.model('Kitten', kittySchema);

	var silence = new Kitten({ name: 'Silence' });

	var fluffy = new Kitten({ name: 'fluffy' });

	app.use(function(req, res, next){
		req.Kitten = Kitten();
		next();
	});
	
	fluffy.save(function (err, fluffy) {
		if (err) return console.error(err);
		fluffy.speak();
	}) ;
	
	fluffy.speak();
	silence.speak();

});

var user = new schema({
	username:  String,
	email: String,
});
//

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
	req.db = db;
	req.mongoose = mongoose;
	next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
