
/**
 * Controller: Login
 */

var util = require( 'util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' ),
	view = new( require( './../base/html' ) );

function Login_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'login';
}

util.inherits( Login_controller, Base_controller );

/**
 * Route: index
 */

Login_controller.prototype.index = function( req, res, next ) {
	view.construct( res, this._name );

	view.template( 'main.html', { name: this._name }, function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = Login_controller;
