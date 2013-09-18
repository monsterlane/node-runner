
/**
 * View: Json
 */

var util = require( 'util' ),
	Base_view = require( './base' );

function Json_view( ) {
	Base_view.apply( this, arguments );
}

util.inherits( Json_view, Base_view );

/**
 * Method: render
 */

Json_view.prototype.render = function( ) {

};

/* bind */

module.exports = Json_view;
