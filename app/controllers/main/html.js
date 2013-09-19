
/**
 * View: Main
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function Main_view( ) { };
util.inherits( Main_view, Html_view );

/**
 * Method: construct
 */

Main_view.prototype.construct = function( res, name ) {
	this.constructor._superProto.construct.apply( this, arguments );
	this._addScript( '/main/js/module.js' );
};

/* bind */

module.exports = Main_view;
