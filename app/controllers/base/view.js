
/**
 * View: Base
 * @param {Object} options
 */

var collection = require( '../../helpers/collection' );

function Base_view( res ) {
	this._response = res;
	this._options = new collection( );
};

/**
 * Method: getOptions
 */

Base_view.prototype.getOptions = function( ) {
	return this._options;
};

/**
 * Method: render
 */

Base_view.prototype.render = function( def ) { };

/* */

module.exports = Base_view;
