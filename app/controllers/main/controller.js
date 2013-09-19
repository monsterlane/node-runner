
/**
 * Controller: Main
 */

var util = require( 'util' ),
	Base_controller = require( './../base/controller' ),
	view = new( require( './../base/html' ) );

function Main_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'main';
}

util.inherits( Main_controller, Base_controller );

/**
 * Route: index
 */

Main_controller.prototype.index = function( req, res, next ) {
	view.construct( res, this._name );

	view.template( 'main.html', { name: this._name }, function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = Main_controller;
