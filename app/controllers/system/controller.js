
/**
 * Controller: System
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' );

function System_controller( ) {
	this._name = 'system';
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

System_controller.prototype._construct = function( ) {
	this._webPath = '/' + this._name;
	this._filePath = '/controllers/' + this._name;
	this._viewPath = this._filePath + '/views';

	this._addStyle( this._webPath + '/css/normalize.min.css', { group: 0 } );
	this._addScript( this._webPath + '/js/jquery.min.js', { group: 0 } );
};

/**
 * Method: _defaults
 * @param {Object} obj1
 * @param {Object} obj2
 */

System_controller.prototype._defaults = function( obj1, obj2 ) {
	for ( var i in obj2 ) {
		try {
			if ( obj2[ i ].constructor == Object ) {
				obj1[ i ] = this._defaults( obj1[ i ], obj2[ i ] );
			}
			else {
				obj1[ i ] = obj2[ i ];
			}
		}
		catch( e ) {
			obj1[ i ] = obj2[ i ];
		}
	}

	return obj1;
};

/**
 * Method: _loadFile
 * @param {String} path
 */

System_controller.prototype._loadFile = function( path, def ) {
	var def = def || { },
		tpl, str;

	str = fs.readFileSync( process.argv[ 1 ].replace( /\/[^\/]*$/, path ) );
	tpl = dot.compile( str );
	str = tpl( def );

	return str;
};

/**
 * Method: _getOption
 * @param {String} path
 * @return {Object}
 */

System_controller.prototype._getOption = function( path ) {
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

System_controller.prototype._setOption = function( path, value ) {
	var path = path.split( '.' ),
		key = this._options,
		i, len;

	for ( i = 0, len = path.length; i < len; i++ ) {
		if ( !key.hasOwnProperty( path[ i ] ) ) {
			key[ path[ i ] ] = { };
		}

		key = key[ path[ i ] ];
	}

	key = value;
};

/**
 * Method: _addStyle
 * @param {String} path
 * @param {Object} opts
 */

System_controller.prototype._addStyle = function( path, opts ) {
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

System_controller.prototype._getStyles = function( ) {
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

System_controller.prototype._addScript = function( path, opts ) {
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

System_controller.prototype._getScripts = function( ) {
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
 * Method: _getHeaderContent
 * @param {Object} def
 * @return {String}
 */

System_controller.prototype._getHeaderContent = function( def ) {
	var def = this._defaults( {
		name: this._name,
		scripts: this._getScripts( ),
		styles: this._getStyles( )
	}, def );

	return this._loadFile( '/controllers/system/views/header.html', def );
};

/**
 * Method: _getFooterContent
 * @param {Object} def
 * @return {String}
 */

System_controller.prototype._getFooterContent = function( def ) {
	var def = def || { };

	return this._loadFile( '/controllers/system/views/footer.html', def );
};

/**
 * Method: _render
 * @param {Object} res
 * @param {String} body
 */

System_controller.prototype._render = function( res, body ) {
	res.render( __dirname + '/../system/views/document', {
		header: this._getHeaderContent( ),
		body: body || '',
		footer: this._getFooterContent( )
	});
};

/* */

module.exports = System_controller;
