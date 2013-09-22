
/**
 * View: User
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function User_view( res, name ) {
	Html_view.apply( this, arguments );
};

util.inherits( User_view, Html_view );

/**
 * Method: getDocumentTitle
 */

User_view.prototype.getDocumentTitle = function( ) {
	return 'users';
};

/* bind */

module.exports = User_view;
