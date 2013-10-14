
/**
 * View: Html
 */

var config = require( '../../config' ),
	util = require( '../../helpers/util' ),
	fs = require( 'fs' ),
	async = require( 'async' ),
	dot = require( 'dot' ),
	Base_view = require( './view' );

function Html_view( res, name ) {
	Base_view.apply( this, arguments );

	this._name = name;

	this._webPath = '/' + this._name;
	this._filePath = '/controllers/' + this._name;
	this._viewPath = this._filePath + '/views';

	this._meta = [ ];
	this._styles = [ [ ], [ ], [ ] ];
	this._scripts = [ ];
	this._module = null;

	this.resolveOptions( );
	this.resolveMetaTags( );
	this.resolveIncludes( );
}

util.inherits( Html_view, Base_view );

/**
 * Method: resolveOptions
 */

Html_view.prototype.resolveOptions = function( ) {
	this.getOptions( ).set( 'app.use.googleAnalytics', null );
};

/**
 * Method: resolveMetaTags
 */

Html_view.prototype.resolveMetaTags = function( ) {
	this.addMetaTag( 'author', 'Jonathan Down' );
	this.addMetaTag( 'description', 'An HTML5 app framework written in Express, doT.js, MongoDB, and Redis' );
	this.addMetaTag( 'robots', 'index,follow' );
	this.addMetaTag( 'viewport', 'initial-scale=1.0,width=device-width' );
};

/**
 * Method: addMetaTag
 * @param {String} name
 * @param {String} content
 */

Html_view.prototype.addMetaTag = function( name, content ) {
	this._meta.push( {
		name: name,
		content: content
	} );
};

/**
 * Method: createMetaTags
 * @return {String}
 */

Html_view.prototype.createMetaTags = function( ) {
	var str = '',
		i, len;

	for ( i = 0, len = this._meta.length; i < len; i++ ) {
		str += '<meta name="' + this._meta[ i ].name + '" content="' + this._meta[ i ].content + '" />';
	}

	return str;
};

/**
 * Method: resolveIncludes
 */

Html_view.prototype.resolveIncludes = function( ) {
	var opts = { group: 1 };

	this.addStyle( '/base/css/bootstrap.min.css', opts );
	this.addStyle( '/base/css/style.css', opts );

	this.setModule( '/base/js/module' );
};

/**
 * Method: addStyle
 * @param {String} path
 * @param {Object} opts
 */

Html_view.prototype.addStyle = function( path, opts ) {
	var opts = util.merge( {
		group: 2,
		media: 'all'
	}, opts );

	if ( !this._styles[ opts.group ] ) {
		this._styles[ opts.group ] = [ ];
	}

	this._styles[ opts.group ].push( {
		path: path,
		media: opts.media
	} );
};

/**
 * Method: createStyleIncludes
 * @return {String}
 */

Html_view.prototype.createStyleIncludes = function( ) {
	var t = new Date( ).getTime( ),
		str = '',
		i, len1,
		j, len2;

	if ( config.server.cache == true ) {
		for ( i = 0, len1 = this._styles[ 0 ].length; i < len1; i++ ) {
			str += '<link href="' + this._styles[ 0 ][ i ].path + '" type="text/css" rel="stylesheet" />';
		}

		if ( this._styles[ 1 ].length > 0 ) {
			str += '<link href="/cache/css/base.min.css" type="text/css" rel="stylesheet" />';
		}

		if ( this._styles[ 2 ].length > 0 ) {
			str += '<link href="/cache/css/' + this._name + '.min.css" type="text/css" rel="stylesheet" />';
		}
	}
	else {
		for ( i = 0, len1 = this._styles[ 0 ].length; i < len1; i++ ) {
			str += '<link href="' + this._styles[ 0 ][ i ].path + '" type="text/css" rel="stylesheet" />';
		}

		for ( i = 1, len1 = this._styles.length; i < len1; i++ ) {
			for ( j = 0, len2 = this._styles[ i ].length; j < len2; j++ ) {
				str += '<link href="' + this._styles[ i ][ j ].path + '?t=' + t + '" type="text/css" rel="stylesheet" media="' + this._styles[ i ][ j ].media + '" />';
			}
		}
	}

	return str;
};

/**
 * Method: addScript
 * @param {String} path
 * @param {Object} opts
 */

Html_view.prototype.addScript = function( path, opts ) {
	var opts = util.merge( {
	}, opts );

	this._scripts.push( {
		path: path
	} );
};

/**
 * Method: createScriptIncludes
 * @return {String}
 */

Html_view.prototype.createScriptIncludes = function( ) {
	var str = '',
		i, len;

	for ( i = 0, len = this._scripts.length; i < len; i++ ) {
		str += '<script src="' + this._scripts[ i ].path + '" type="text/javascript"></script>';
	}

	return str;
};

/**
 * Method: setModule
 * @param {String} path
 */

Html_view.prototype.setModule = function( path ) {
	this._module = path;
};

/**
 * Method: getModule
 * @return {String}
 */

Html_view.prototype.getModule = function( ) {
	return this._module;
};

/**
 * Method: getModuleName
 * @return {String}
 */

Html_view.prototype.getModuleName = function( ) {
	var name = this._module.split( '/' );

	return name[ 0 ];
};

/**
 * Method: getDocumentTitle
 * @return {String}
 */

Html_view.prototype.getDocumentTitle = function( ) {
	return this._name;
};

/**
 * Method: createDocument
 * @param {Object} def
 * @param {Function} callback
 */

Html_view.prototype.createDocument = function( def, callback ) {
	var module = this.getModuleName( ),
		def = util.merge( {
			name: config.name,
			title: this.getDocumentTitle( ),
			meta: this.createMetaTags( ),
			css: this.createStyleIncludes( ),
			js: this.createScriptIncludes( ),
			require: '/base/js/require.min.js',
			module: this.getModule( ),
			analytics: this.getOptions( ).get( 'app.use.googleAnalytics' )
		}, def );

	if ( config.server.cache == true ) {
		def.require = def.require.replace( 'base', 'cache' );
		def.module = def.module.replace( module, 'cache' ).replace( 'module', module + '.min' );
	}

	def.module = encodeURIComponent( def.module );

	this.partial( '/controllers/base/views/document.html', def, function( err, content ) {
		callback( err, content );
	});
};

/**
 * Method: partial
 * @param {String} path
 * @param {Object} def
 * @param {Function} callback
 */

Html_view.prototype.partial = function( path, def, callback ) {
	var path = ( path.indexOf( '/' ) == -1 ) ? this._viewPath + '/' + path : path,
		def = def || { };

	fs.readFile( process.argv[ 1 ].replace( /\/[^\/]*$/, path ), 'utf8', function( err, data ) {
		if ( err ) {
			callback( new Error( err ), null );
		}
		else {
			var tpl = dot.compile( data ),
				str = tpl( def );

			callback( null, str );
		}
	});
};

/**
 * Method: render
 * @param {String} body
 */

Html_view.prototype.render = function( body ) {
	var body = body || '',
		self = this;

	this.createDocument( { body: body }, function( err, result ) {
		self._response.send( result );
	});
};

/* bind */

module.exports = Html_view;
