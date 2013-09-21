
/**
 * Controller: Base
 */

var config = require( '../../config' )( ),
	fs = require( 'fs' ),
	collection = require( '../../helpers/collection' );

function Base_controller( ) {
	this._name = 'base';

	this._hooks = {
		pre_system: [ ],
		pre_controller: [ ],
		post_controller_constructor: [ ],
		post_controller: [ ]
	};

	this._options = new collection( );
	this._resolveOptions( );
}

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
