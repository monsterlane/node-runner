
var config = require( './config' )( ),
	http = require( 'http' ),
	path = require( 'path' ),
	express = require( 'express' ),
	dot = require( 'express-dot' ),
	mongo = require( 'mongodb' ).MongoClient,
	app = module.exports = express( );

// environment settings
app.configure( function( ) {
	// configure dot template engine
	app.set( 'views', __dirname + '/views' );
	app.set( 'view engine', 'dot' );
	app.engine( 'html', dot.__express );
	app.use( express.static( __dirname + '/public' ) );

	// logging
	if ( !module.parent ) app.use( express.logger( 'div' ) );

	// compress response data with gzip / deflate
	app.use( express.compress( ) );

	// parse request bodies (req.body)
	app.use( express.bodyParser( ) );

	// support _method (PUT in forms etc)
	app.use( express.methodOverride( ) );

	// expose the "messages" local variable when views are rendered
	app.use( function(req, res, next ) {
		var msgs = req.session.messages || [];

		// expose "messages" local variable
		res.locals.messages = msgs;

		// expose "hasMessages"
		res.locals.hasMessages = !!msgs.length;

		next( );

		// empty or "flush" the messages so they don't build up
		req.session.messages = [ ];
	});
});

// load controllers
require( './boot/index' )( app, { verbose: !module.parent } );

// assume "not found" in the error msgs is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set properties, use instanceof etc.
app.use( function( err, req, res, next ) {
	// treat as 404
	if ( ~err.message.indexOf( 'not found' ) ) return next( );

	// log it
	console.error( err.stack );

	// error page
	res.status( 500 ).render( '5xx' );
});

// assume 404 since no middleware responded
app.use( function( req, res, next ) {
	res.status( 404 ).render( '404', { url: req.originalUrl } );
});

if ( !module.parent ) {
  app.listen( config.port );
  console.log( '\n  ' + config.mode + 'listening on port ' + config.port + '\n' );
}
