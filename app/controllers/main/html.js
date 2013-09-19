
/**
 * View: Main
 */

var util = require( 'util' ),
	Html_view = require( './../base/html' );

function Main_view( ) {
	Html_view.apply( this, arguments );
}

util.inherits( Main_view, Html_view );

/**
 * Method: construct
 */

Main_view.prototype.construct = function( ) {
	this.constructor.super_.prototype.construct.apply( this, arguments );
	this._addScript( '/main/js/module.js' );
};

/* bind */

module.exports = Main_view;
