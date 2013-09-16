
/**
 * Model: User
 */

var util = require( 'util' ),
	Base = require( './base' );

function User( db ) {
	Base.apply( this, arguments );
	this._collection = 'users';
}

util.inherits( User, Base );

/**
 * Method: search
 * @param {String} query
 * @param {Function} callback
 */

User.prototype.search = function( query, callback ) {
	this.getCollection( ).find( query || { } ).toArray( callback );
};

/* bind */

module.exports = User;
