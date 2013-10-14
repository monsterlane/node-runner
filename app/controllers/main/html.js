
/**
 * View: Main
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function Main_view( res, name ) {
	Html_view.apply( this, arguments );
};

util.inherits( Main_view, Html_view );

/**
 * Method: resolveIncludes
 */

Main_view.prototype.resolveIncludes = function( ) {
	Html_view.prototype.resolveIncludes.apply( this, arguments );
	this.setModule( '/main/js/module' );
};

/**
 * Method: getDocumentTitle
 */

Main_view.prototype.getDocumentTitle = function( ) {
	return 'welcome';
};

/* bind */

module.exports = Main_view;
