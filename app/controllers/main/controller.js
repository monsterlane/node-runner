
/**
 * Controller: Main
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System_controller = require( './../system/controller' ),
	user = new( require( '../../models/user' ) );

function Main_controller( ) {
	System_controller.apply( this, arguments );

	this._name = 'main';
}

util.inherits( Main_controller, System_controller );

/**
 * Route: index
 */

Main_controller.prototype.index = function( req, res, next ) {
	user.setDatabase( req.db );

	this._render( res, this._loadFile( this._path + '/views/main.html' ) );
};

/* */

module.exports = Main_controller;
