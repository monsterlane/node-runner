
var express = require( 'express' ),
	fs = require( 'fs' );

module.exports = function( parent, options ) {
	var verbose = options.verbose || false;

	fs.readdirSync( __dirname + '/../controllers' ).forEach( function( name ) {
		verbose && console.log( '\n   %s:', name );

		var obj = require( './../controllers/' + name + '/index' ),
			obj = new obj( ),
			app = express( ),
			method,
			path,
			key;

		// allow specifying the view engine
		if ( obj.engine ) app.set( 'view engine', obj.engine );
		app.set( 'views', __dirname + '/../controllers/' + name + '/views' );

		// serve static files
		app.use( express.static( __dirname + '/../controllers/' + name + '/public' ) );

		// generate routes based on the exported methods
		for ( var key in obj ) {
			// "reserved" exports
			if ( ~[ 'name', 'prefix', 'engine', 'before', 'super_' ].indexOf( key ) || key.charAt( 0 ) == '_' ) {
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
				console.log( 'unrecognized route: ' + name + '.' + key );
				//throw new Error( 'unrecognized route: ' + name + '.' + key );
			}

			app[ method ]( path, obj[ key ] );

			verbose && console.log( '     %s %s -> %s', method.toUpperCase( ), path, key );
		}

		// mount the app
		parent.use( app );
	});
};
