
/**
 * Controller: Main
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	async = require( 'async' ),
	dot = require( 'dot' ),
	Base_controller = require( './../base/controller' );

function Main_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'main';
}

util.inherits( Main_controller, Base_controller );

/**
 * Route: index
 */

Main_controller.prototype.index = function( req, res, next ) {
	var self = this;

	this._template( this._viewPath + '/main.html', {
		name: this._name
	}, function( err, content ) {
		self._render( res, content );
	});
};

/* bind */

module.exports = Main_controller;
