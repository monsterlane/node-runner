
/**
 * Controller: Error
 */

var util = require( '../../helpers/util' ),
	Base_controller = require( './../base/controller' ),
	Html_view = require( './html' );

function Error_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'error';
};

util.inherits( Error_controller, Base_controller );

/**
 * Method: message
 */

Error_controller.prototype.message = function( req, res, code ) {
	var view = new Html_view( res, this._name ),
		file, def;

	if ( code == 404 ) {
		file = '404.html';
		def = { url: req.originalUrl };
	}
	else {
		file = '5xx.html',
		def = { };
	}

	view.partial( file, def, function( err, result ) {
		view.render( result, code );
	});
};

/* bind */

module.exports = Error_controller;
