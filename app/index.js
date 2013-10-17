
var config = require( './config' ),
	fs = require( 'fs' ),
	express = require( 'express' ),
	cons = require( 'consolidate' ),
	mongo = require( 'mongodb' ).MongoClient,
	app = module.exports = express( ),
	favicon = null;

if ( fs.existsSync( __dirname + '/public/favicon.ico' ) ) {
	favicon = __dirname + '/public/favicon.ico';
}

// environment settings
app.configure( function( ) {
	// configure view engine
	app.engine( 'html', cons.dot );
	app.set( 'view engine', 'html' );
	app.set( 'views', __dirname + '/views' );

	// logging
	if ( !module.parent ) app.use( express.logger( 'dev' ) );

	// compress response data with gzip / deflate
	app.use( express.compress( ) );

	// parse request bodies (req.body)
	app.use( express.bodyParser( ) );

	// support _method (PUT in forms etc)
	app.use( express.methodOverride( ) );

	if ( favicon != null ) {
		// use a favicon
		app.use( express.favicon( favicon ) );
	}
});

mongo.connect( 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name, function( err, db ) {
	if ( err ) {
		throw new Error( 'Sorry, there is no mongo db server running.' );
	}
	else {
		var attachDb = function( req, res, next ) {
			req.db = db;
			next( );
		};

		// load controllers
		require( './boot' )( app, { verbose: !module.parent, database: attachDb } );

		if ( config.server.cache == true ) {
			// serve asset cache
			app.use( '/cache', express.static( __dirname + '/cache' ) );
		}

		// serve public files
		app.use( express.static( __dirname + '/public' ) );

		// assume "not found" in the error msgs is a 404
		app.use( function( err, req, res, next ) {
			// treat as 404
			if ( ~err.message.indexOf( 'not found' ) ) return next( );

			// log it
			console.error( err.stack );
			req.error = { stack: err.stack };

			// error page
			var error = new( require( './controllers/error/controller' ) );
			error.message( req, res, 500 );
		});

		// assume 404 since no middleware responded
		app.use( function( req, res, next ) {
			var error = new( require( './controllers/error/controller' ) );
			error.message( req, res, 404 );
		});

		if ( !module.parent ) {
			app.listen( config.server.port );

			console.log( '\n  ' + config.server.environment + ' server listening on port ' + config.server.port + '\n' );
		}
	}
});
