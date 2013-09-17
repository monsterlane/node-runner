
/**
 * Controller: Base
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	async = require( 'async' ),
	dot = require( 'dot' );

function Base_controller( ) {
	this._name = 'base';
	this._options = { };
	this._hooks = { };

	this._webPath = null;
	this._filePath = null;
	this._viewPath = null;

	this._styles = [ ];
	this._scripts = [ ];
}

/**
 * Method: _construct
 */

Base_controller.prototype._construct = function( ) {
	this._setOption( 'app.requiresAuthentication', false );

	this._webPath = '/' + this._name;
	this._filePath = '/controllers/' + this._name;
	this._viewPath = this._filePath + '/views';

	this._addStyle( '/base/css/normalize.min.css', { group: 0 } );
	this._addScript( '/base/js/jquery.min.js', { group: 0 } );
};

/**
 * Method: _defaults
 * @param {Object} obj1
 * @param {Object} obj2
 */

Base_controller.prototype._defaults = function( obj1, obj2 ) {
	for ( var i in obj2 ) {
		if ( obj1.hasOwnProperty( i ) ) {
			if ( obj2[ i ].constructor == Object ) {
				obj1[ i ] = this._defaults( obj1[ i ], obj2[ i ] );
			}
			else {
				obj1[ i ] = obj2[ i ];
			}
		}
		else {
			obj1[ i ] = obj2[ i ];
		}
	}

	return obj1;
};

/**
 * Method: _template
 * @param {String} path
 * @param {Object} def
 * @param {Function} callback
 */

Base_controller.prototype._template = function( path, def, callback ) {
	var def = def || { };

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
 * Method: _getOption
 * @param {String} path
 * @return {Object}
 */

Base_controller.prototype._getOption = function( path ) {
	var path = path.split( '.' ),
		key = this._options,
		i, len;

	for ( i = 0, len = path.length; i < len; i++ ) {
		if ( !key.hasOwnProperty( path[ i ] ) ) {
			return null;
		}

		key = key[ path[ i ] ];
	}

	return key;
};

/**
 * Method: _setOption
 * @param {String} path
 * @param {Object} value
 */

Base_controller.prototype._setOption = function( path, value ) {
	var path = path.split( '.' ),
		key = this._options,
		i, len;

	for ( i = 0, len = path.length; i < len; i++ ) {
		if ( !key.hasOwnProperty( path[ i ] ) ) {
			key[ path[ i ] ] = ( i + 1 < len ) ? { } : value;
		}

		key = key[ path[ i ] ];
	}
};

/**
 * Method: _addStyle
 * @param {String} path
 * @param {Object} opts
 */

Base_controller.prototype._addStyle = function( path, opts ) {
	var opts = this._defaults({
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

Base_controller.prototype._getStyles = function( ) {
	var str = '',
		i, len1,
		j, len2;

	for ( i = 0, len1 = this._styles.length; i < len1; i++ ) {
		for ( j = 0, len2 = this._styles[ i ].length; j < len2; j++ ) {
			str += '<link href="' + this._styles[ i ][ j ].path + '" type="text/css" rel="stylesheet" media="' + this._styles[ i ][ j ].media + '" />';
		}
	}

	return str;
};

/**
 * Method: _addScript
 * @param {String} path
 * @param {Object} opts
 */

Base_controller.prototype._addScript = function( path, opts ) {
	var opts = this._defaults({
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

Base_controller.prototype._getScripts = function( ) {
	var str = '',
		i, len1,
		j, len2;

	for ( i = 0, len1 = this._scripts.length; i < len1; i++ ) {
		for ( j = 0, len2 = this._scripts[ i ].length; j < len2; j++ ) {
			str += '<script src="' + this._scripts[ i ][ j ].path + '" type="text/javascript"></script>';
		}
	}

	return str;
};

/**
 * Method: _getDocumentHeader
 * @param {Object} def
 * @return {String}
 */

Base_controller.prototype._getDocumentHeader = function( def, callback ) {
	var def = this._defaults( {
		name: this._name,
		scripts: this._getScripts( ),
		styles: this._getStyles( )
	}, def );

	this._template( '/controllers/base/views/header.html', def, function( err, content ) {
		callback( null, content );
	});
};

/**
 * Method: _getDocumentFooter
 * @param {Object} def
 * @return {String}
 */

Base_controller.prototype._getDocumentFooter = function( def, callback ) {
	var def = def || { };

	this._template( '/controllers/base/views/footer.html', def, function( err, content ) {
		callback( null, content );
	});
};

/**
 * Method: _render
 * @param {Object} res
 * @param {String} body
 */

Base_controller.prototype._render = function( res, body ) {
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

		res.render( __dirname + '/../base/views/document', {
			header: results[ 0 ],
			body: body,
			footer: results[ 1 ]
		});
	});
};

/* bind */

module.exports = Base_controller;
