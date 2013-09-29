
/* asset caching */

var fs = require( 'fs' );

module.exports = function( grunt ) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n';
		css = [ ],
		js = [ ];

	fs.readdirSync( __dirname + '/controllers' ).forEach( function( name ) {
		var i, len, t;

		// clear module assets cache
		path = __dirname + '/cache/' + name + '.css';
		if ( fs.existsSync( path ) ) fs.unlinkSync( path );

		path = __dirname + '/cache/' + name + '.js';
		if ( fs.existsSync( path ) ) fs.unlinkSync( path );

		// create module assets cache
		path = __dirname + '/controllers/' + name + '/html.js';
		if ( fs.existsSync( path ) ) {
			// create a view instance to get include order
			view = require( './controllers/' + name + '/html.js' );
			view = new view( null, name );
			group = ( name == 'base' ) ? 0 : 1;

			files = [ ];
			if ( view._styles[ group ] && view._styles[ group ].length > 0 ) {
				for ( i = 0, len = view._styles[ group ].length; i < len; i++ ) {
					// convert web paths to real paths
					files.push( view._styles[ group ][ i ].path.replace( '/' + name + '/css/', 'controllers/' + name + '/public/css/' ) );
				}

				// create a task for the module
				css[ name ] = {
					options: {
						banner: banner
					},
					files: { }
				};

				// output : input
				css[ name ].files[ 'cache/' + name + '.css' ] = files;
			}

			files = [ ];
			if ( view._scripts[ group ] && view._scripts[ group ].length > 0 ) {
				for ( i = 0, len = view._scripts[ group ].length; i < len; i++ ) {
					// convert web paths to real paths
					files.push( view._scripts[ group ][ i ].path.replace( '/' + name + '/js/', 'controllers/' + name + '/public/js/' ) );
				}

				// create a task for the module
				js[ name ] = {
					options: {
						banner: banner
					},
					files: { }
				};

				// output : input
				js[ name ].files[ 'cache/' + name + '.js' ] = files;
			}
		}
	} );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		cssmin: css,
		uglify: js
	} );

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.registerTask( 'default', [ 'cssmin', 'uglify' ] );
};