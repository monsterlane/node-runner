
/**
 * Controller: User
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	async = require( 'async' ),
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

	async.waterfall([
		function( callback ) {
			user.search( query, function( err, records ) {
				callback( null, records );
			});
		},
		function( result, callback ) {
			self._template( self._viewPath + '/main.html', {
				users: result
			}, function( err, content ) {
				callback( null, content );
			});
		}
	], function ( err, result ) {
		self._render( res, result );
	});
};

/* bind */

module.exports = User_controller;
