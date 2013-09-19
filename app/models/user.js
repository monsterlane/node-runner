
/**
 * Model: User
 */

var util = require( '../helpers/util' ),
	Base = require( './base' );

function User( db ) {
	this._collection = 'users';
};
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
