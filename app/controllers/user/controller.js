
/**
 * Controller: User
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	dot = require( 'dot' ),
	Base_controller = require( './../base/controller' ),
	user = new( require( '../../models/user' ) );

function User_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'user';
}

util.inherits( User_controller, Base_controller );

/**
 * Route: index
 */

User_controller.prototype.index = function( req, res, next ) {
	var self = this,
		query = { };

	user.setDatabase( req.db );

	user.search( query, function( err, records ) {
		var content = self._template( self._viewPath + '/main.html', {
			users: records
		});

		self._render( res, content );
	});
};

/* bind */

module.exports = User_controller;
