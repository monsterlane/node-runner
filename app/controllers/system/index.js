
/**
 * Module: system
 */

var util = require( 'util' );

function System( ) {
	this.name = 'System';
}

System.prototype.index = function( req, res, next ) {
	res.render( __dirname + '/../system/views/main' );
};

module.exports = System;
