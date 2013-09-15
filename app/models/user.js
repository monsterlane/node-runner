
/**
 * Model: User
 */

var util = require( 'util' ),
	Base_model = require( './base' );

function User_model( db ) {
	Base_model.apply( this, arguments );
}

util.inherits( User_model, Base_model );

/* */

module.exports = User_model;
