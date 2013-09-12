
/**
 * Module: main
 */

var util = require( 'util' ),
	System = require( './../system/index' );

function Main( ) {
	System.apply( this, arguments );

	this.name = 'Main';
}

util.inherits( Main, System );

module.exports = Main;
