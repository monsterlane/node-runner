
/**
 * Controller: Login
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System_controller = require( './../system/index' );

function Login_controller( ) {
	System_controller.apply( this, arguments );

	this._name = 'login';
}

util.inherits( Login_controller, System_controller );

/**
 * Route: index
 */

Login_controller.prototype.index = function( req, res, next ) {
	this._render( res, this._loadFile( this._path + '/views/main.html' ) );
};

/* */

module.exports = Login_controller;
