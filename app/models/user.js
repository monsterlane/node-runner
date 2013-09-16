
/**
 * Model: User
 */

var util = require( 'util' ),
	Base = require( './base' );

function User( db ) {
	Base.apply( this, arguments );
}

util.inherits( User, Base );

/**
 * Method: _construct
 * @param {Object} db
 */

User.prototype._construct = function( db ) {
	this.super_._construct.apply( this, arguments );

	this.setCollection( 'users' );
};

/* bind */

module.exports = User;
