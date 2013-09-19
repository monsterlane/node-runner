
/**
 * Controller: Base
 */

var config = require( '../../config' )( ),
	fs = require( 'fs' );

function Base_controller( ) {
	this._name = 'base';
	this._options = { };
	this._hooks = { };
}

/**
 * Method: _construct
 */

Base_controller.prototype._construct = function( ) {
	this._setOption( 'app.requiresAuthentication', false );
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

/* bind */

module.exports = Base_controller;
