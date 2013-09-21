
var fs = require( 'fs' ),
	express = require( 'express' );

/* bind */

module.exports = function( parent, options ) {
	var verbose = options.verbose || false,
		attachDb = options.database;

	fs.readdirSync( __dirname + '/../controllers' ).forEach( function( name ) {
		// skip the base controller
		if ( name == 'base' ) return;

		verbose && console.log( '\n   %s:', name );

		var obj = new( require( './../controllers/' + name + '/controller' ) ),
			assets = [ 'img', 'css', 'js' ],
			app = express( ),
			method, path,
			key, i, len;

		// serve static files
		for ( i = 0, len = assets.length; i < len; i++ ) {
			app.use( '/' + name + '/' + assets[ i ], express.static( __dirname + '/../controllers/' + name + '/public/' + assets[ i ] ) );
		}

		// before middleware support
		for ( i = 0, len = obj._hooks.before.length; i < len; i++ ) {
			path = '/' + name + '/:' + name + '_id';
			app.all( path, obj._hooks.before[ i ] );

			path = '/' + name + '/:' + name + '_id/*';
			app.all( path, obj._hooks.before[ i ] );
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
