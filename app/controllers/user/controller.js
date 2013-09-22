
/**
 * Controller: User
 */

var util = require( '../../helpers/util' ),
	async = require( 'async' ),
	Base_controller = require( './../base/controller' ),
	Html_view = require( './html' ),
	user = new( require( '../../models/user' ) );

function User_controller( ) {
	Base_controller.apply( this, arguments );
	this._name = 'user';
};

util.inherits( User_controller, Base_controller );

/**
 * Route: index
 */

User_controller.prototype.index = function( req, res, next ) {
	var view = new Html_view( res, this._name ),
		self = this,
		query = { };

	user.connect( req.db );

	async.waterfall([
		function( callback ) {
			user.search( query, function( err, records ) {
				callback( err, records );
			});
		},
		function( result, callback ) {
			view.partial( 'main.html', { users: result }, function( err, result ) {
				callback( err, result );
			});
		}
	], function( err, result ) {
		view.render( result );
	});
};

/* bind */

module.exports = User_controller;
