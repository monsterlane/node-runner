
/**
 * Model: User
 */

var util = require( 'util' ),
	Base_model = require( './base' );

function User_model( db ) {
	Base_model.apply( this, arguments );
}

util.inherits( User_model, Base_model );

/**
 * Method: _construct
 * @param {Object} db
 */

User_model.prototype._construct = function( db ) {
	this.super_._construct.apply( this, arguments );

	this.setCollection( 'users' );
};

/* */

module.exports = User_model;
