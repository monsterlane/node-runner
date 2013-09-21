
/**
 * View: Html
 */

var config = require( '../../config' )( ),
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
	this._styles = [ ];
	this._scripts = [ ];

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
 * Method: resolveIncludes
 */

Html_view.prototype.resolveIncludes = function( ) {
	var opts = { group: 0 };

	this.addStyle( '/base/css/bootstrap.min.css', opts );

	this.addScript( '/base/js/jquery.min.js', opts );
	this.addScript( '/base/js/bootstrap.min.js', opts );
	this.addScript( '/base/js/app.js', opts );
	this.addScript( '/base/js/app.module.js', opts );
};

/**
 * Method: addStyle
 * @param {String} path
 * @param {Object} opts
 */

Html_view.prototype.addStyle = function( path, opts ) {
	var opts = util.merge( {
		group: 1,
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

	for ( i = 0, len1 = this._styles.length; i < len1; i++ ) {
		for ( j = 0, len2 = this._styles[ i ].length; j < len2; j++ ) {
			if ( config.environment == 'development' && this._styles[ i ][ j ].path.substring( 0, 2 ) != '//' && this._styles[ i ][ j ].path.indexOf( '.min.' ) == -1 ) {
				str += '<link href="' + this._styles[ i ][ j ].path + '?t=' + t + '" type="text/css" rel="stylesheet" media="' + this._styles[ i ][ j ].media + '" />';
			}
			else {
				str += '<link href="' + this._styles[ i ][ j ].path + '" type="text/css" rel="stylesheet" media="' + this._styles[ i ][ j ].media + '" />';
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
		group: 1
	}, opts );

	if ( !this._scripts[ opts.group ] ) {
		this._scripts[ opts.group ] = [ ];
	}

	this._scripts[ opts.group ].push( {
		path: path,
	} );
};

/**
 * Method: createScriptIncludes
 * @return {String}
 */

Html_view.prototype.createScriptIncludes = function( ) {
	var t = new Date( ).getTime( ),
		str = '',
		i, len1,
		j, len2;

	for ( i = 0, len1 = this._scripts.length; i < len1; i++ ) {
		for ( j = 0, len2 = this._scripts[ i ].length; j < len2; j++ ) {
			if ( config.environment == 'development' && this._scripts[ i ][ j ].path.substring( 0, 2 ) != '//' && this._scripts[ i ][ j ].path.indexOf( '.min.' ) == -1 ) {
				str += '<script src="' + this._scripts[ i ][ j ].path + '?t=' + t + '" type="text/javascript"></script>';
			}
			else {
				str += '<script src="' + this._scripts[ i ][ j ].path + '" type="text/javascript"></script>';
			}
		}
	}

	return str;
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
 * Method: getDocumentTitle
 * @return {String}
 */

Html_view.prototype.getDocumentTitle = function( ) {
	return this._name;
};

/**
 * Method: getDocumentContent
 * @param {Object} def
 * @param {Function} callback
 */

Html_view.prototype.getDocumentContent = function( def, callback ) {
	var def = util.merge( {
		title: this.getDocumentTitle( ),
		meta: this.createMetaTags( ),
		styles: this.createStyleIncludes( ),
		module: this._name.charAt( 0 ).toUpperCase( ) + this._name.slice( 1 ),
		scripts: this.createScriptIncludes( ),
		analytics: this.getOptions( ).get( 'app.use.googleAnalytics' )
	}, def );

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

	self.getDocumentContent( { body: body }, function( err, result ) {
		self._response.send( result );
	});
};

/* bind */

module.exports = Html_view;
