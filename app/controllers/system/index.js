
/**
 * Module: System
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' );

function System( ) {
	this.name = 'system';
	this.options = { };
	this.hooks = { };

	this.styles = [ ];
	this._addStyle( '/system/css/normalize.min.css' );

	this.scripts = [ ];
	this._addScript( '/system/js/jquery.min.js' );
}

/**
 * Method: _merge
 * @param {Object} obj1
 * @param {Object} obj2
 */

System.prototype._merge = function( obj1, obj2 ) {
	var obj1 = obj1 || { },
		obj2 = obj2 || { },
		obj3 = { },
		attr;

	for ( attr in obj1 ) { obj3[ attr ] = obj1[ attr ]; }
	for ( attr in obj2 ) { obj3[ attr ] = obj2[ attr ]; }

	return obj3;
};

/**
 * Method: _loadFile
 * @param {String} path
 */

System.prototype._loadFile = function( path, def ) {
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

System.prototype._getOption = function( path ) {
	var path = path.split( '.' ),
		key = this.options,
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

System.prototype._setOption = function( path, value ) {
	var path = path.split( '.' ),
		key = this.options,
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

System.prototype._addStyle = function( path, opts ) {
	var opts = opts || { media: 'all' };

	this.styles.push({
		path: path,
		media: opts.media
	});
};

/**
 * Method: _getStyles
 * @return {String}
 */

System.prototype._getStyles = function( ) {
	var str = '',
		i, len;

	for ( i = 0, len = this.styles.length; i < len; i++ ) {
		str += '<link href="' + this.styles[ i ].path + '" type="text/css" rel="stylesheet" media="' + this.styles[ i ].media + '" />';
	}

	return str;
};

/**
 * Method: _addStyle
 * @param {String} path
 * @param {Object} opts
 */

System.prototype._addScript = function( path, opts ) {
	var opts = opts || { };

	this.scripts.push({
		path: path,
	});
};

/**
 * Method: _getScripts
 * @return {String}
 */

System.prototype._getScripts = function( ) {
	var str = '',
		i, len;

	for ( i = 0, len = this.scripts.length; i < len; i++ ) {
		str += '<script src="' + this.scripts[ i ].path + '" type="text/javascript"></script>';
	}

	return str;
};

/**
 * Method: _getHeaderContent
 * @param {Object} def
 * @return {String}
 */

System.prototype._getHeaderContent = function( def ) {
	var def = this._merge( {
		name: this.name,
		scripts: this._getScripts( ),
		styles: this._getStyles( )
	}, def );

	return this._loadFile( '/controllers/system/views/header.html', def );
};

/**
 * Method: _getBodyContent
 * @param {Object} def
 * @return {String}
 */

System.prototype._getBodyContent = function( def ) {
	var def = def || { };

	return this._loadFile( '/controllers/system/views/main.html', def );
};

/**
 * Method: _getFooterContent
 * @param {Object} def
 * @return {String}
 */

System.prototype._getFooterContent = function( def ) {
	var def = def || { };

	return this._loadFile( '/controllers/system/views/footer.html', def );
};

/**
 * Route: index
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

System.prototype.index = function( req, res, next ) {
	res.render( __dirname + '/../system/views/template', {
		header: this._getHeaderContent( ),
		body: this._getBodyContent( ),
		footer: this._getFooterContent( )
	});
};

/* */

module.exports = System;
