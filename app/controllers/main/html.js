
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

	this.addStyle( '/main/css/style.css' );
};

/**
 * Method: getDocumentTitle
 */

Main_view.prototype.getDocumentTitle = function( ) {
	return 'welcome home';
};

/* bind */

module.exports = Main_view;
