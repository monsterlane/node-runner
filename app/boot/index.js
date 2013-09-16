
var express = require( 'express' ),
	fs = require( 'fs' );

/* bind */

module.exports = function( parent, options ) {
	var verbose = options.verbose || false,
		attachDb = options.database;

	fs.readdirSync( __dirname + '/../controllers' ).forEach( function( name ) {
		// load all controllers except system
		if ( name == 'system' ) return;

		verbose && console.log( '\n   %s:', name );

		var obj = new( require( './../controllers/' + name + '/controller' ) ),
			app = express( ),
			assets = [ 'img', 'css', 'js' ],
			method, path,
			key, len;

		obj._construct( );

		// serve static files
		for ( key = 0, len = assets.length; key < len; key++ ) {
			app.use( '/' + name + '/' + assets[ key ], express.static( __dirname + '/../controllers/' + name + '/public/' + assets[ key ] ) );
		}

		// generate routes based on the exported methods
		for ( key in obj ) {
			// "reserved" exports
			if ( key == 'super_' || key.charAt( 0 ) == '_' ) {
				continue;
			}

			if ( key == 'index' && name == 'main' ) {
				method = 'get';
				path = '/';
			}
			else if ( key == 'index' ) {
				method = 'get';
				path = '/' + name;
			}
			else {
				throw new Error( 'unrecognized route: ' + name + '.' + key );
			}

			app.all( path, attachDb, obj[ key ].bind( obj ) );

			verbose && console.log( '     %s %s -> %s', method.toUpperCase( ), path, key );
		}

		// mount the app
		parent.use( app );
	});
};
