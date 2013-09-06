
var express = require( 'express' ),
	fs = require( 'fs' );

module.exports = function( parent, options ) {
	var verbose = options.verbose || false;

	fs.readdirSync( __dirname + '/../controllers' ).forEach( function( name ) {
		verbose && console.log( '\n   %s:', name );

		var obj = require( './../controllers/' + name ),
			name = obj.name || name,
			prefix = obj.prefix || '',
			app = express( ),
			method,
			path;

		// allow specifying the view engine
		if ( obj.engine ) app.set( 'view engine', obj.engine );
		app.set( 'views', __dirname + '/../controllers/' + name + '/views' );

		// serve static files
		app.use( express.static( __dirname + '/../controllers/' + name + '/public' ) );

		// before middleware support
		if ( obj.before ) {
			path = '/' + name + '/:' + name + '_id';
			app.all( path, obj.before );

			verbose && console.log( '     ALL %s -> before', path );

			path = '/' + name + '/:' + name + '_id/*';
			app.all( path, obj.before );

			verbose && console.log( '     ALL %s -> before', path );
		}

		// generate routes based on the exported methods
		for ( var key in obj ) {
			// "reserved" exports
			if ( ~[ 'name', 'prefix', 'engine', 'before' ].indexOf( key ) ) {
				continue;
			}

			if ( key == 'show' ) {
				method = 'get';
				path = '/' + name + '/:' + name + '_id';
			}
			else if ( key == 'list' ) {
				method = 'get';
				path = '/' + name + 's';
			}
			else if ( key == 'edit' ) {
				method = 'get';
				path = '/' + name + '/:' + name + '_id/edit';
			}
			else if ( key == 'update' ) {
				method = 'put';
				path = '/' + name + '/:' + name + '_id';
			}
			else if ( key == 'create' ) {
				method = 'post';
				path = '/' + name;
			}
			else if ( key == 'index' ) {
				method = 'get';
				path = ( name != 'main' ) ? '/' + name : '/';
			}
			else {
				throw new Error( 'unrecognized route: ' + name + '.' + key );
			}

			path = prefix + path;
			app[ method ]( path, obj[ key ] );

			verbose && console.log( '     %s %s -> %s', method.toUpperCase( ), path, key );
		}

		// mount the app
		parent.use( app );
	});
};
