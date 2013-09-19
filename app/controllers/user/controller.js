
/**
 * Controller: User
 */

var util = require( '../../helpers/util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' ),
	Html_view = require( './../base/html' ),
	user = new( require( '../../models/user' ) );

function User_controller( ) {
	this._name = 'user';
};
util.inherits( User_controller, Base_controller );

/**
 * Route: index
 */

User_controller.prototype.index = function( req, res, next ) {
	var view = new Html_view( ),
		self = this,
		query = { };

	view.constrcut( res, this._name );
	user.construct( req.db );

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
