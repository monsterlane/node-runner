
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

	this._styles = [ ];
	this._scripts = [ ];

	this._resolveOptions( );
	this._setDocumentAssets( );
}

util.inherits( Html_view, Base_view );

/**
 * Method: _resolveOptions
 */

Html_view.prototype._resolveOptions = function( ) {
	this.getOptions( ).set( 'app.use.googleAnalytics', null );
};

/**
 * Method: _addStyle
 * @param {String} path
 * @param {Object} opts
 */

Html_view.prototype._addStyle = function( path, opts ) {
	var opts = util.merge( {
		group: 1,
		media: 'all'
	}, opts );

	if ( !this._styles[ opts.group ] ) {
		this._styles[ opts.group ] = [ ];
	}

	this._styles[ opts.group ].push({
		path: path,
		media: opts.media
	});
};

/**
 * Method: _getStyles
 * @return {String}
 */

Html_view.prototype._getStyles = function( ) {
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
 * Method: _addScript
 * @param {String} path
 * @param {Object} opts
 */

Html_view.prototype._addScript = function( path, opts ) {
	var opts = util.merge( {
		group: 1
	}, opts );

	if ( !this._scripts[ opts.group ] ) {
		this._scripts[ opts.group ] = [ ];
	}

	this._scripts[ opts.group ].push({
		path: path,
	});
};

/**
 * Method: _getScripts
 * @return {String}
 */

Html_view.prototype._getScripts = function( ) {
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
 * Method: _setDocumentAssets
 */

Html_view.prototype._setDocumentAssets = function( ) {
	var opts = { group: 0 };

	this._addStyle( '/base/css/bootstrap.min.css', opts );

	this._addScript( '/base/js/jquery.min.js', opts );
	this._addScript( '/base/js/bootstrap.min.js', opts );
	this._addScript( '/base/js/app.js', opts );
	this._addScript( '/base/js/app.module.js', opts );
};

/**
 * Method: _getDocumentTitle
 * @return {String}
 */

Html_view.prototype._getDocumentTitle = function( ) {
	return this._name;
};

/**
 * Method: _getDocumentHeader
 * @param {Object} def
 * @param {Function} callback
 */

Html_view.prototype._getDocumentHeader = function( def, callback ) {
	var def = util.merge( {
		title: this._getDocumentTitle( ),
		styles: this._getStyles( )
	}, def );

	this.partial( '/controllers/base/views/header.html', def, function( err, content ) {
		callback( null, content );
	});
};

/**
 * Method: _getDocumentFooter
 * @param {Object} def
 * @param {Function} callback
 */

Html_view.prototype._getDocumentFooter = function( def, callback ) {
	var def = util.merge( {
		name: this._name.charAt( 0 ).toUpperCase( ) + this._name.slice( 1 ),
		scripts: this._getScripts( ),
		analytics: this._options.get( 'app.use.googleAnalytics' )
	}, def );

	this.partial( '/controllers/base/views/footer.html', def, function( err, content ) {
		callback( null, content );
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
		var tpl, str;

		if ( err ) {
			callback( new Error( err ), null );
		}
		else {
			tpl = dot.compile( data );
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

	async.parallel([
		function( callback ) {
			self._getDocumentHeader( { }, function( err, content ) {
				callback( null, content );
			});
		},
		function( callback ) {
			self._getDocumentFooter( { }, function( err, content ) {
				callback( null, content );
			});
		}
	], function( err, results ) {
		if ( err ) throw Error( err );

		self._response.render( __dirname + '/../base/views/document', {
			header: results[ 0 ],
			body: body,
			footer: results[ 1 ]
		});
	});
};

/* bind */

module.exports = Html_view;
