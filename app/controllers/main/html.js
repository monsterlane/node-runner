
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
 * Method: _setDocumentAssets
 */

Main_view.prototype._setDocumentAssets = function( ) {
	Html_view.prototype._setDocumentAssets.apply( this, arguments );
	this._addScript( '/main/js/module.js' );
};

/**
 * Method: _getDocumentTitle
 */

Main_view.prototype._getDocumentTitle = function( ) {
	return 'welcome';
};

/* bind */

module.exports = Main_view;
