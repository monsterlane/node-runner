
/**
 * Module: System
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' );

function System( ) {
	this.name = 'system';
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
 * Method: _getHeaderContent
 */

System.prototype._getHeaderContent = function( def ) {
	var def = this._merge( {
		name: this.name
	}, def );

	return this._loadFile( '/controllers/system/views/header.html', def );
};

/**
 * Method: _getBodyContent
 */

System.prototype._getBodyContent = function( ) {
	return this._loadFile( '/controllers/system/views/main.html' );
};

/**
 * Method: _getFooterContent
 */

System.prototype._getFooterContent = function( ) {
	return this._loadFile( '/controllers/system/views/footer.html' );
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

	next ? next( ) : '';
};

/* */

module.exports = System;
