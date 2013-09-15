
/**
 * Controller: Main
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	System = require( './../system/index' ),
	user_model = new( require( '../../models/user' ) );

function Main( ) {
	System.apply( this, arguments );

	this._name = 'main';
}

util.inherits( Main, System );

/**
 * Route: index
 */

Main.prototype.index = function( req, res, next ) {
	user_model.setDatabase( req.db );

	this._render( res, this._loadFile( this._path + '/views/main.html' ) );
};

/* */

module.exports = Main;
