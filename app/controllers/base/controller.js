
/**
 * Controller: Base
 */

var config = require( '../../config' )( ),
	fs = require( 'fs' ),
	collection = require( '../../helpers/collection' );

function Base_controller( ) {
	this._name = 'base';

	this._hooks = {
		before: [ ],
	};

	this._options = new collection( );
	this._resolveOptions( );
}

/**
 * Method: _addHook
 * @param {String} key
 * @param {Function} callback
 */

Base_controller.prototype._addHook = function( key, callback ) {
	if ( this._hooks.hasOwnProperty( key ) ) {
		this._hooks[ key ].push( callback );
	}
	else {
		throw new Error( 'unrecognized hook in ' + this._name + ': ' + key );
	}
};

/**
 * Method: _getOptions
 * @return {Object}
 */

Base_controller.prototype._getOptions = function( ) {
	return this._options;
};

/**
 * Method: _resolveOptions
 */

Base_controller.prototype._resolveOptions = function( ) {
	this._getOptions( ).set( 'app.requiresAuthentication', false );
};

/* bind */

module.exports = Base_controller;
