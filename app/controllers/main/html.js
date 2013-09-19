
/**
 * View: Main
 */

var util = require( '../../helpers/util' ),
	Html_view = require( './../base/html' );

function Main_view( res, name ) {
	Html_view.apply( this, arguments );

	this._addScript( '/main/js/module.js' );
};

util.inherits( Main_view, Html_view );

/* bind */

module.exports = Main_view;
