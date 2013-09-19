
/**
 * Model: User
 */

var util = require( '../helpers/util' ),
	Base_model = require( './base' );

function User_model( ) {
	Base_model.apply( this, arguments );
	this._collection = 'users';
};

util.inherits( User_model, Base_model );

/**
 * Method: search
 * @param {String} query
 * @param {Function} callback
 */

User_model.prototype.search = function( query, callback ) {
	this.getCollection( ).find( query || { } ).toArray( callback );
};

/* bind */

module.exports = User_model;
