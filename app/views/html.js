
/**
 * View: Html
 */

var util = require( 'util' ),
	async = require( 'async' ),
	Base_view = require( './base' );

function Html_view( ) {
	Base_view.apply( this, arguments );
}

util.inherits( Html_view, Base_view );

/**
 * Method: render
 */

Html_view.prototype.render = function( ) {

};

/* bind */

module.exports = Html_view;
