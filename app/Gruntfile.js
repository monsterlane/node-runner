
/* grunt tasks - asset caching */

var fs = require( 'fs' ),
	util = require( './helpers/util' );

module.exports = function( grunt ) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n';
		img = [ ],
		css = [ ],
		js = [ ],
		pf = [ ],
		hint = [ ];

	// clean up cache folders
	fs.readdirSync( __dirname + '/public/cache/css' ).forEach( function( name ) {
		if ( name.substring( name.lastIndexOf( '.' ) + 1 ) == 'css' ) {
			fs.unlinkSync( __dirname + '/public/cache/css/' + name );
		}
	});

	fs.readdirSync( __dirname + '/public/cache/js' ).forEach( function( name ) {
		if ( name.substring( name.lastIndexOf( '.' ) + 1 ) == 'js' ) {
			fs.unlinkSync( __dirname + '/public/cache/js/' + name );
		}
	});

	// create controller asset cache
	fs.readdirSync( __dirname + '/controllers' ).forEach( function( name ) {
		var path, files,
			i, len,
			t, ext;

		// check if the module has a custom view
		path = __dirname + '/controllers/' + name + '/html.js';
		if ( fs.existsSync( path ) ) {
			// create a view instance to get include order
			view = require( './controllers/' + name + '/html.js' );
			view = new view( null, name );
			group = ( name == 'base' ) ? 1 : 2;

			// cache css assets
			if ( view._styles[ group ] && view._styles[ group ].length > 0 ) {
				files = [ ];

				for ( i = 0, len = view._styles[ group ].length; i < len; i++ ) {
					// convert web paths to real paths
					path = view._styles[ group ][ i ].path.replace( '/' + name + '/css/', 'controllers/' + name + '/public/css/' );

					files.push( path );
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
					css[ name ].files[ 'public/cache/css/' + name + '.min.css' ] = files;
				}
			}
		}

		// cache js assets
		path = __dirname + '/controllers/' + name + '/public/js';
		if ( fs.existsSync( path ) ) {
			files = fs.readdirSync( path );

			for ( i = 0, len = files.length; i < len; i++ ) {
				// copy already minifed files to cache folder
				if ( files[ i ].indexOf( '.min.' ) != -1 ) {
					t = fs.readFileSync( __dirname + '/controllers/' + name + '/public/js/' + files[ i ] );
					fs.writeFileSync( 'public/cache/js/' + files[ i ], t );
				}
				else {
					path = files[ i ].substring( 0, files[ i ].lastIndexOf( '.' ) );
					if ( path == 'module' ) path = name;

					// hint the file
					hint.push( __dirname + '/controllers/' + name + '/public/js/' + files[ i ] );

					// minify the file
					js[ path ] = {
						options: {
							sourceMap: 'public/cache/js/' + path + '.map.js'
						},
						files: { }
					};

					// output : input
					js[ path ].files[ 'public/cache/js/' + path + '.min.js' ] = [ __dirname + '/controllers/' + name + '/public/js/' + files[ i ] ];

					// fix paths after minification
					pf[ path ] = {
						src: [ 'public/cache/js/' + name + '.min.js' ],
						overwrite: true,
						replacements: [
							{
								from: '/base/js/module.js',
								to: '/cache/js/base.min.js'
							},
							{
								from: '/' + name + '/js/',
								to: '/cache/js/'
							},
							{
								from: 'sourceMappingURL=public',
								to: 'sourceMappingURL='
							}
						]
					};
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
		jshint: {
			options: {
				globals: {
					jQuery: true
				}
			},
			uses_defaults: hint
		},
		uglify: js,
		replace: pf,
		imagemin: img
	} );

	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-text-replace' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );

	grunt.registerTask( 'default', [ 'cssmin', 'jshint', 'uglify', 'replace', 'imagemin' ] );
};
