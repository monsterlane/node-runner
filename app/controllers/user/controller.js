
/**
 * Controller: User
 */

var util = require( '../../helpers/util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' ),
	view = new( require( './../base/html' ) ),
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

	user.construct( req.db );
	view.construct( res, this._name );

	async.waterfall([
		function( callback ) {
			user.search( query, function( err, records ) {
				callback( null, records );
			});
		},
		function( result, callback ) {
			view.partial( 'main.html', { users: result }, function( err, result ) {
				callback( null, result );
			});
		}
	], function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = User_controller;
