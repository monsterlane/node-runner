
/**
 * View: Base
 */

function Base_view( ) {
	this._response = null;
};

/**
 * Method: construct
 */

Base_view.prototype.construct = function( res ) {
	this._response = res;
};

/**
 * Method: render
 */

Base_view.prototype.render = function( def ) { };

/* */

module.exports = Base_view;
