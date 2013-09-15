
/**
 * Controller: Login
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System = require( './../system/index' );

function Login( ) {
	System.apply( this, arguments );

	this.name = 'login';
}

util.inherits( Login, System );

/**
 * Method: _getBodyContent
 * @return {String}
 */

Login.prototype._getBodyContent = function( ) {
	return this._loadFile( '/controllers/login/views/main.html' );
};

/* */

module.exports = Login;
