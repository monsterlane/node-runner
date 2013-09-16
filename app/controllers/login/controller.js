
/**
 * Controller: Login
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System_controller = require( './../system/controller' ),
	user = new( require( '../../models/user' ) );

function Login_controller( ) {
	System_controller.apply( this, arguments );
	this._name = 'login';
}

util.inherits( Login_controller, System_controller );

/**
 * Route: index
 */

Login_controller.prototype.index = function( req, res, next ) {
	var content;

	user.setDatabase( req.db );

	content = this._loadFile( this._viewPath + '/main.html', {
		name: this._name
	});

	this._render( res, content );
};

/* bind */

module.exports = Login_controller;
