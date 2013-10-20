
/* grunt tasks - asset caching */

var fs = require( 'fs' ),
	util = require( './helpers/util' ),
	dot = require( 'dot' );

module.exports = function( grunt ) {
	var banner = '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n';
		amd = dot.compile( fs.readFileSync( __dirname + '/controllers/base/views/amd.html' ) ),
		tasks = [ 'clean' ],
		sl = [ ],
		fc = { },
		hint = [ ],
		js = { },
		pf = { },
		sp = { },
		img = { },
		css = { };

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

		// add the task to the list of jobs
		if ( Object.keys( css ).length > 0 && tasks.indexOf( 'cssmin' ) == -1 ) {
			tasks.push( 'cssmin' );
		}

		// cache js assets
		path = __dirname + '/controllers/' + name + '/public/js';
		if ( fs.existsSync( path ) ) {
			// create symbolic links to already minifed files in the cache folder
			sl.push({
				expand: true,
				cwd: 'controllers/' + name + '/public/js',
				src: [ '*.min.js' ],
				dest: 'public/cache/js'
			});

			files = fs.readdirSync( path );

			for ( i = 0, len = files.length; i < len; i++ ) {
				// skip already minified files
				if ( files[ i ].indexOf( '.min.' ) == -1 ) {
					path = files[ i ].substring( 0, files[ i ].lastIndexOf( '.' ) );

					// create a loader for the module
					if ( path == 'module' ) {
						path = name;

						// create the file
						fc[ path ] = { };
						fc[ path ][ 'public/cache/js/' + path + '.amd.js' ] = function( fs, fd, done ) {
							fs.writeSync( fd, amd({ path: '/cache/js/' + name + '.min' }) );
							done( );
						};

						// minify the file
						js[ path + '-amd' ] = { files: { } };
						js[ path + '-amd' ].files[ 'public/cache/js/' + path + '.amd.js' ] = [ 'public/cache/js/' + path + '.amd.js' ];
					}

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
						src: [ 'public/cache/js/' + path + '.min.js' ],
						overwrite: true,
						replacements: [
							{
								from: '/base/js/module.js',
								to: '/cache/js/base.min.js'
							},
							{
								from: '/base/js/',
								to: '/cache/js/'
							},
							{
								from: '/' + name + '/js/',
								to: '/cache/js/'
							},
							{
								from: /\/cache\/js\/(((?!\.min).)*?)\.js/g,
								to: '/cache/js/$1.min.js'
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

		// add the task to the list of jobs
		if ( Object.keys( sl ).length > 0 && tasks.indexOf( 'symlink' ) == -1 ) {
			tasks.push( 'symlink' );
		}

		if ( Object.keys( fc ).length > 0 && tasks.indexOf( 'file-creator' ) == -1 ) {
			tasks.push( 'file-creator' );
		}

		if ( hint.length > 0 && tasks.indexOf( 'jshint' ) == -1 ) {
			tasks.push( 'jshint' );
		}

		if ( Object.keys( js ).length > 0 && tasks.indexOf( 'uglify' ) == -1 ) {
			tasks.push( 'uglify' );
		}

		if ( Object.keys( pf ).length > 0 && tasks.indexOf( 'replace' ) == -1 ) {
			tasks.push( 'replace' );
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

		// add the task to the list of jobs
		if ( Object.keys( img ).length > 0 && tasks.indexOf( 'imagemin' ) == -1 ) {
			tasks.push( 'imagemin' );
		}
	} );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		clean: [ __dirname + '/public/cache/css/*.css', __dirname + '/public/cache/js/*.js' ],
		symlink: sl,
		'file-creator': fc,
		jshint: {
			uses_defaults: hint
		},
		uglify: js,
		replace: pf,
		spritepacker: sp,
		imagemin: img,
		cssmin: css
	} );

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-symlink' );
	grunt.loadNpmTasks( 'grunt-file-creator' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-text-replace' );
	grunt.loadNpmTasks( 'grunt-sprite-packer' );
	grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

	grunt.registerTask( 'img', [ 'sp', 'imagemin' ] );
	grunt.registerTask( 'css', [ 'cssmin' ] );
	grunt.registerTask( 'js', [ 'symlink', 'file-creator', 'jshint', 'uglify', 'replace' ] );
	grunt.registerTask( 'default', tasks );
};
