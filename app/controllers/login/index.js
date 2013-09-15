
/**
 * Controller: Login
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System = require( './../system/index' );

function Login( ) {
	System.apply( this, arguments );

	this._name = 'login';
}

util.inherits( Login, System );

/**
 * Route: index
 */

Login.prototype.index = function( req, res, next ) {
	this._render( res, this._loadFile( this._path + '/views/main.html' ) );
};

/* */

module.exports = Login;
