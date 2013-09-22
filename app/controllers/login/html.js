
/**
 * View: Login
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function Login_view( res, name ) {
	Html_view.apply( this, arguments );
};

util.inherits( Login_view, Html_view );

/**
 * Method: getDocumentTitle
 */

Login_view.prototype.getDocumentTitle = function( ) {
	return 'sign in';
};

/* bind */

module.exports = Login_view;
