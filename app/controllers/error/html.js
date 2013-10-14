
/**
 * View: Error
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function Error_view( res, name ) {
	Html_view.apply( this, arguments );
};

util.inherits( Error_view, Html_view );

/**
 * Method: resolveIncludes
 */

Error_view.prototype.resolveIncludes = function( ) {
	Html_view.prototype.resolveIncludes.apply( this, arguments );

	this.addStyle( '/error/css/style.css' );
};

/**
 * Method: getDocumentTitle
 */

Error_view.prototype.getDocumentTitle = function( ) {
	return 'an error has occured';
};

/* bind */

module.exports = Error_view;
