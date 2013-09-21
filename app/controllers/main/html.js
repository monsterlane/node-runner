
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
 * Method: setDocumentAssets
 */

Main_view.prototype.setDocumentAssets = function( ) {
	Html_view.prototype.setDocumentAssets.apply( this, arguments );
	this.addScript( '/main/js/module.js' );
};

/**
 * Method: getDocumentTitle
 */

Main_view.prototype.getDocumentTitle = function( ) {
	return 'welcome';
};

/* bind */

module.exports = Main_view;
