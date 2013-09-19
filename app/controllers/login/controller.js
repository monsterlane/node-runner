
/**
 * Controller: Login
 */

var util = require( '../../helpers/util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' ),
	Html_view = require( './../base/html' );

function Login_controller( ) {
	this._name = 'login';
};
util.inherits( Login_controller, Base_controller );

/**
 * Route: index
 */

Login_controller.prototype.index = function( req, res, next ) {
	var view = new Html_view( );

	view.construct( res, this._name );

	view.partial( 'main.html', { name: this._name }, function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = Login_controller;
