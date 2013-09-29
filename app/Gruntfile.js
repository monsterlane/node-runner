
/* grunt tasks - asset caching */

var fs = require( 'fs' ),
	util = require( './helpers/util' );

module.exports = function( grunt ) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n';
		img = [ ],
		css = [ ],
		js = [ ];

	fs.readdirSync( __dirname + '/controllers' ).forEach( function( name ) {
		var path, files,
			i, len,
			t, ext;

		// clear module assets cache
		path = __dirname + '/cache/' + name + '.css';
		if ( fs.existsSync( path ) ) fs.unlinkSync( path );

		path = __dirname + '/cache/' + name + '.js';
		if ( fs.existsSync( path ) ) fs.unlinkSync( path );

		// check if the module has a custom view
		path = __dirname + '/controllers/' + name + '/html.js';
		if ( fs.existsSync( path ) ) {
			// create a view instance to get include order
			view = require( './controllers/' + name + '/html.js' );
			view = new view( null, name );
			group = ( name == 'base' ) ? 0 : 1;

			if ( view._styles[ group ] && view._styles[ group ].length > 0 ) {
				files = [ ];

				for ( i = 0, len = view._styles[ group ].length; i < len; i++ ) {
					// ignore external files
					if ( view._styles[ group ][ i ].path.substring( 0, 1 ) != '//' ) {
						// convert web paths to real paths
						files.push( view._styles[ group ][ i ].path.replace( '/' + name + '/css/', 'controllers/' + name + '/public/css/' ) );
					}
				}

				if ( files.length > 0 ) {
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
			}

			if ( view._scripts[ group ] && view._scripts[ group ].length > 0 ) {
				files = [ ];

				for ( i = 0, len = view._scripts[ group ].length; i < len; i++ ) {
					// ignore external files
					if ( view._scripts[ group ][ i ].path.substring( 0, 1 ) != '//' ) {
						// convert web paths to real paths
						files.push( view._scripts[ group ][ i ].path.replace( '/' + name + '/js/', 'controllers/' + name + '/public/js/' ) );
					}
				}

				if ( files.length > 0 ) {
					// create a task for the module
					js[ name ] = {
						options: {
							banner: banner,
							sourceMap: 'cache/' + name + '.map.js'
						},
						files: { }
					};

					// output : input
					js[ name ].files[ 'cache/' + name + '.js' ] = files;
				}
			}
		}

		// check if the module has images to compress
		path = __dirname + '/controllers/' + name + '/public/img';
		if ( fs.existsSync( path ) ) {
			t = fs.readdirSync( path );
			files = { };

			for ( i = 0, len = t.length; i < len; i++ ) {
				ext = t[ i ].substring( t[ i ].lastIndexOf( '.' ) + 1 );

				// supported image types
				if ( ext == 'png' || ext == 'gif' || ext == 'jpg' || ext == 'jpeg' ) {
					// does it end in .min.ext?
					if ( t[ i ].substring( 0, t[ i ].lastIndexOf( '.' ) ).substr( -4 ) == '.min' ) {
						// output : input
						files[ 'controllers/' + name + '/public/img/' + t[ i ].replace( '.min', '' ) ] = 'controllers/' + name + '/public/img/' + t[ i ];
					}
				}
			}

			if ( Object.keys( files ).length > 0 ) {
				// create task for the module
				img[ name ] = {
					files: files
				};
			}
		}
	} );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		cssmin: css,
		uglify: js,
		imagemin: img
	} );

	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );

	grunt.registerTask( 'default', [ 'cssmin', 'uglify', 'imagemin' ] );
};
