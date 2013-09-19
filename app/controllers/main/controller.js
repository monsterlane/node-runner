
/**
 * Controller: Main
 */

var util = require( '../../helpers/util' ),
	Base_controller = require( './../base/controller' ),
	Html_view = require( './html' );

function Main_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'main';
};

util.inherits( Main_controller, Base_controller );

/**
 * Route: index
 */

Main_controller.prototype.index = function( req, res, next ) {
	var view = new Html_view( res, this._name );

	view.partial( 'main.html', { name: this._name }, function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = Main_controller;
