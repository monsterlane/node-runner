
/**
 * Controller: Login
 */

var util = require( '../../helpers/util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' ),
	Html_view = require( './html' );

function Login_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'login';
};

util.inherits( Login_controller, Base_controller );

/**
 * Route: index
 */

Login_controller.prototype.index = function( req, res, next ) {
	var view = new Html_view( res, this._name );

	view.partial( 'main.html', { name: this._name }, function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = Login_controller;
