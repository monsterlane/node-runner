
/**
 * Controller: Base
 */

var config = require( '../../config' )( ),
	collection = require( '../../helpers/collection' ),
	fs = require( 'fs' ),
	url = require( 'url' );

function Base_controller( ) {
	this._name = 'base';

	this._options = new collection( );
	this._resolveOptions( );

	this._hooks = { before: [ ] };
	this._resolveHooks( );
}

/**
 * Method: _resolveHooks
 */

Base_controller.prototype._resolveHooks = function( ) {
	var self = this;

	this._addHook( 'before', '*', function( req, res, next ) {
		self._getOptions( ).set( 'app.view.type', req.query[ 'view.type' ] || 'html' );
		next( );
	} );
};

/**
 * Method: _addHook
 * @param {String} key
 * @param {String} path
 * @param {Function} callback
 */

Base_controller.prototype._addHook = function( key, path, callback ) {
	if ( this._hooks.hasOwnProperty( key ) ) {
		this._hooks[ key ].push( {
			path: path,
			callback: callback
		} );
	}
	else {
		throw new Error( 'unrecognized hook in ' + this._name + ': ' + key );
	}
};

/**
 * Method: _resolveOptions
 */

Base_controller.prototype._resolveOptions = function( ) {
	this._getOptions( ).set( 'app.requires.authentication', false );
};

/**
 * Method: _getOptions
 * @return {Object}
 */

Base_controller.prototype._getOptions = function( ) {
	return this._options;
};

/* bind */

module.exports = Base_controller;
