
/**
 * Controller: Main
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System_controller = require( './../system/controller' );

function Main_controller( ) {
	System_controller.apply( this, arguments );
	this._name = 'main';
}

util.inherits( Main_controller, System_controller );

/**
 * Route: index
 */

Main_controller.prototype.index = function( req, res, next ) {
	this._render( res, this._loadFile( this._viewPath + '/main.html' ) );
};

/* bind */

module.exports = Main_controller;
