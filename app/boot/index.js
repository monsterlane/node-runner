
var express = require( 'express' ),
	fs = require( 'fs' );

/**
 * exports
 * @param {Object} parent
 * @param {Object} options
 */

module.exports = function( parent, options ) {
	var verbose = options.verbose || false;

	fs.readdirSync( __dirname + '/../controllers' ).forEach( function( name ) {
		if ( name == 'system' ) return;

		verbose && console.log( '\n   %s:', name );

		var obj = require( './../controllers/' + name + '/index' ),
			obj = new obj( ),
			app = express( ),
			method,
			path,
			key;

		// serve static files
		app.use( '/' + name + '/img', express.static( __dirname + '/../controllers/' + name + '/public/img' ) );
		app.use( '/' + name + '/css', express.static( __dirname + '/../controllers/' + name + '/public/css' ) );
		app.use( '/' + name + '/js', express.static( __dirname + '/../controllers/' + name + '/public/js' ) );

		// generate routes based on the exported methods
		for ( var key in obj ) {
			// "reserved" exports
			if ( ~[ 'super_', 'name', 'options', 'hooks', 'scripts', 'styles' ].indexOf( key ) || key.charAt( 0 ) == '_' ) {
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

			app.use( path, obj[ key ].bind( obj ) );

			verbose && console.log( '     %s %s -> %s', method.toUpperCase( ), path, key );
		}

		// mount the app
		parent.use( app );
	});
};
