
var config = require( '../config' )( ),
	fs = require( 'fs' ),
	express = require( 'express' ),
	compressor = require( 'node-minify' );

/* bind */

module.exports = function( parent, options ) {
	var verbose = options.verbose || false,
		attachDb = options.database;

	fs.readdirSync( __dirname + '/../controllers' ).forEach( function( name ) {
		verbose && console.log( '\n   %s:', name );

		var obj = new( require( './../controllers/' + name + '/controller' ) ),
			assets = [ 'img', 'css', 'js', 'fonts' ],
			app = express( ),
			method, path,
			key, i, len;

		// serve static files
		for ( i = 0, len = assets.length; i < len; i++ ) {
			path = '/' + name + '/' + assets[ i ];

			app.use( path, express.static( __dirname + '/../controllers/' + name + '/public/' + assets[ i ] ) );

			verbose && console.log( '     %s -> %s', 'STATIC', path );
		}

		// before middleware support
		for ( i = 0, len = obj._hooks.before.length; i < len; i++ ) {
			if ( name == 'main' ) {
				path = ( obj._hooks.before[ i ].path != '*' ) ? '/' + obj._hooks.before[ i ].path : '/';
			}
			else {
				path = '/' + name + '/' + obj._hooks.before[ i ].path;
			}

			app.all( path, attachDb, obj._hooks.before[ i ].callback );

			verbose && console.log( '     %s -> %s', 'BEFORE', path );
		}

		// generate routes based on the exported methods
		for ( key in obj ) {
			// "reserved" exports
			if ( key.charAt( 0 ) == '_' ) {
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
