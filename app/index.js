
var config = require( './config' )( ),
	express = require( 'express' ),
	cons = require( 'consolidate' ),
	dot = require( 'dot' ),
	mongo = require( 'mongodb' ).MongoClient,
	app = module.exports = express( );

// environment settings
app.configure( function( ) {
	// configure dot template engine
	app.engine( 'html', cons.dot );
	app.set( 'view engine', 'html' );
	app.set( 'views', __dirname + '/views' );
	app.use( express.favicon( ) );

	// logging
	if ( !module.parent ) app.use( express.logger( 'dev' ) );

	// compress response data with gzip / deflate
	app.use( express.compress( ) );

	// parse request bodies (req.body)
	app.use( express.bodyParser( ) );

	// support _method (PUT in forms etc)
	app.use( express.methodOverride( ) );
});

// load controllers
require( './boot' )( app, { verbose: !module.parent } );

// assume "not found" in the error msgs is a 404
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
  console.log( '\n  ' + config.mode + ' server listening on port ' + config.port + '\n' );
}
