
/**
 * Module: Login
 */

var util = require( 'util' ),
	System = require( './../system/index' );

function Login( ) {
	System.apply( this, arguments );

	this.name = 'login';
}

util.inherits( Login, System );

/**
 * Method: _getBodyContent
 */

Login.prototype._getBodyContent = function( ) {
	return this._loadFile( '/controllers/login/views/main.html' );
};

module.exports = Login;

/* */
