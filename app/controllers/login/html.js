
/**
 * View: Login
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function Login_view( res, name ) {
	Html_view.apply( this, arguments );
	this.setModule( 'login' );
};

util.inherits( Login_view, Html_view );

/**
 * Method: resolveIncludes
 */

Login_view.prototype.resolveIncludes = function( ) {
	Html_view.prototype.resolveIncludes.apply( this, arguments );

	this.addStyle( '/login/css/style.css' );
};

/**
 * Method: getDocumentTitle
 */

Login_view.prototype.getDocumentTitle = function( ) {
	return 'sign in';
};

/* bind */

module.exports = Login_view;
