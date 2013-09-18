
/**
 * View: Base
 */

function Base_view( res, str ) {
	this._response = res;
	this._content = str;
};

/**
 * Method: render
 */

Base_view.prototype.render = function( ) {
	return '';
};

/* */

module.exports = Base_view;
