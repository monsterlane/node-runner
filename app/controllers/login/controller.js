
/**
 * Controller: Login
 */

var util = require( 'util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' );

function Login_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'login';
}

util.inherits( Login_controller, Base_controller );

/**
 * Route: index
 */

Login_controller.prototype.index = function( req, res, next ) {
	var self = this;

	this._template( this._viewPath + '/main.html', {
		name: this._name
	}, function( err, content ) {
		self._render( res, content );
	});
};

/* bind */

module.exports = Login_controller;
