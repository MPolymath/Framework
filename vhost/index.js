// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ),
	vhost = require( 'vhost' );

function createVirtualHost(domainName, dirPath) {
	return vhost(domainName, express.static( dirPath ));
}

//Create server
var app = express();

//Create the virtual hosts
var potatoHost = createVirtualHost("potato.local.42.fr", "potato");
var tomatoHost = createVirtualHost("tomato.local.42.fr", "tomato");

//Use the virtual hosts
app.use(potatoHost);
app.use(tomatoHost);

//Start server
var port = 3000;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
