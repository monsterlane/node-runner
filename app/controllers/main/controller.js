
/**
 * Controller: Main
 */

var util = require( 'util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' );

function Main_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'main';
}

util.inherits( Main_controller, Base_controller );

/**
 * Method: _construct
 */

Main_controller.prototype._construct = function( ) {
	this.constructor.super_.prototype._construct.apply( this, arguments );
	this._addScript( '/main/js/module.js' );
};

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
